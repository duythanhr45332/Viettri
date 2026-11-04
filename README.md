# Kiến trúc Hệ thống Dự án Việt Trì Legacy Lakeside (System Architecture)

Tài liệu này mô tả chi tiết kiến trúc tổng thể, hạ tầng và luồng dữ liệu của dự án **Việt Trì Legacy Lakeside**, được thiết kế và triển khai theo mô hình **Headless Architecture (Decoupled CMS)**.

---

## 1. Tổng quan Kiến trúc (Architectural Overview)

Dự án tách biệt hoàn toàn giữa hai thành phần chính:
- **Tầng Trình diễn (Presentation Layer - Frontend):** Được xây dựng bằng Next.js hiện đại để mang lại hiệu năng cao nhất, tối ưu trải nghiệm người dùng (UX) và chuẩn SEO.
- **Tầng Quản trị Nội dung (Content Management Layer - Backend):** Sử dụng WordPress như một Headless CMS, cung cấp dữ liệu qua GraphQL API mà không can thiệp vào mã nguồn giao diện.
- **Tầng Định tuyến & Hạ tầng (Infrastructure & Routing Layer):** Được đóng gói hoàn chỉnh bằng Docker & Docker Compose, sử dụng Nginx làm Reverse Proxy duy nhất điều phối toàn bộ lưu lượng mạng.
---

## 2. Chi tiết các Tầng Thành phần

### 2.1. Frontend: Next.js 16 & React 19
- **Framework & Công nghệ cốt lõi:**
  - **Next.js 16 (App Router):** Hỗ trợ kiến trúc module hóa với thư mục `src/app/[lang]/`, hỗ trợ render linh hoạt theo cơ chế Server-Side Rendering (SSR) cho SEO và Static Site Generation (SSG) cho tốc độ tải tức thì.
  - **React 19 & TypeScript:** Đảm bảo type safety, hỗ trợ Server Components, Client Components (`'use client'`) và tối ưu hiệu năng render.
  - **Turbopack:** Tối ưu hóa quá trình build và fast-refresh trong môi trường phát triển.
- **Hệ thống Design & Styling:**
  - Sử dụng hệ thống Design Tokens tập trung trong [globals.css](file:///c:/viettri/viettri/frontend/src/app/globals.css) (màu sắc HSL, phông chữ Zalando Sans Expanded, Playfair Display, kích thước container chuẩn).
  - Phân tách CSS scoped theo CSS Modules (`*.module.css`) nhằm tránh xung đột style và tăng tính tái sử dụng.
- **Đa ngôn ngữ (i18n):**
  - Cấu trúc thư mục theo Dynamic Route `/[lang]/` (hỗ trợ `vi` và `en`).
  - Hệ thống từ điển JSON (`vi.json`, `en.json`) được nạp server-side thông qua [dictionaries.ts](file:///c:/viettri/viettri/frontend/src/dictionaries.ts).

### 2.2. Backend / CMS: WordPress Headless
- **Vai trò:**
  - Đóng vai trò là **Content Engine**: Quản lý tin tức, sự kiện, thông tin dự án, danh mục tiện ích và thư viện hình ảnh/media.
  - Cung cấp giao diện trực quan thân thiện (`/wp-admin`) cho biên tập viên và đội ngũ marketing thao tác nội dung mà không cần can thiệp vào source code.
- **Giao tiếp Dữ liệu (API):**
  - Tích hợp plugin **WPGraphQL** để mở endpoint `/graphql`.
  - Frontend gọi dữ liệu thông qua biến môi trường `NEXT_PUBLIC_WORDPRESS_URL=https://viettrilegacylakeside.vn/graphql`.
  - Phương thức GraphQL giúp Frontend chỉ truy vấn đúng các trường dữ liệu cần thiết (tránh over-fetching), giảm tải băng thông và tăng tốc độ phản hồi.
- **Lưu trữ dữ liệu:**
  - Cơ sở dữ liệu: Kết nối MySQL Server bên ngoài (`WORDPRESS_DB_HOST: 192.168.1.227:33063`).
  - Media & Tệp tải lên: Lưu trữ bền vững qua Docker Named Volume `viettri_uploads_staging`.

### 2.3. Hạ tầng & Mạng: Docker & Nginx Reverse Proxy
Toàn bộ hệ thống chạy trên nền tảng Docker với cấu hình tại [docker-compose.staging.yml](file:///c:/viettri/viettri/docker-compose.staging.yml) và [nginx.staging.conf](file:///c:/viettri/viettri/nginx.staging.conf):

#### Bảng cấu hình các Container Service:

| Service | Container Name | Port Mapping | Chức năng chính |
| :--- | :--- | :--- | :--- |
| **`nginx`** | `viettri_nginx_staging` | `3035:80` | Reverse Proxy cổng vào, phân luồng request theo URI |
| **`frontend`** | `viettri_frontend_staging` | Nội bộ mạng Docker | Ứng dụng Next.js SSR, lắng nghe cổng nội bộ `3037` |
| **`wordpress`**| `viettri_wordpress_staging` | `3036:80` (Direct) | WordPress CMS, phục vụ `/wp-admin` và `/graphql` |

#### Cơ chế Phân luồng của Nginx ([nginx.staging.conf](file:///c:/viettri/viettri/nginx.staging.conf)):
1. **Luồng WordPress CMS & API:**
   ```nginx
   location ~ ^/(wp-admin|wp-includes|wp-content|wp-json|wp-login\.php|graphql) {
       proxy_pass http://wordpress:80;
   }
   location ~ \.php$ {
       proxy_pass http://wordpress:80;
   }
   ```
   *Mọi yêu cầu truy cập trang quản trị, tệp media upload, tệp PHP hoặc truy vấn GraphQL đều được chuyển trực tiếp đến container WordPress.*

2. **Luồng Frontend:**
   ```nginx
   location / {
       proxy_pass http://frontend:3037;
   }
   ```
   *Tất cả các route hiển thị cho người dùng cuối (`/`, `/about`, `/vi/...`, `/en/...`) đều được Nginx ủy quyền cho Next.js xử lý.*

3. **Tối ưu kết nối & Tải tệp:**
   - `client_max_body_size 64M`: Cho phép tải lên các tệp media có dung lượng lớn vào CMS.
   - `proxy_read_timeout 300`: Giữ kết nối ổn định cho các tác vụ xử lý ảnh hoặc build nặng.
   - Thiết lập đầy đủ header chuyển tiếp (`Host`, `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`) giúp WordPress nhận diện đúng giao thức HTTPS gốc.

---

## 3. Luồng Dữ liệu Điển hình (Request & Data Flow)

### Luồng 1: Người dùng truy cập trang Web (Next.js SSR)
1. Người dùng gửi request `GET https://viettrilegacylakeside.vn/about`.
2. Nginx nhận request tại cổng công khai, so khớp thấy không thuộc tiền tố WordPress -> Forward sang `http://frontend:3037`.
3. Next.js Server thực thi logic trang (nạp từ điển đa ngôn ngữ, nếu có tin tức động sẽ gọi GraphQL query sang `http://wordpress/graphql`).
4. Next.js hoàn thiện HTML & CSS (SSR) và phản hồi lại Nginx -> Trả về trình duyệt người dùng với First Contentful Paint (FCP) tối ưu.

### Luồng 2: Quản trị viên cập nhật bài viết / Tin tức
1. Biên tập viên truy cập `https://viettrilegacylakeside.vn/wp-admin`.
2. Nginx nhận diện tiền tố `/wp-admin` -> Chuyển tiếp request đến `http://wordpress:80`.
3. Biên tập viên đăng nhập, chỉnh sửa nội dung và tải ảnh lên. Dữ liệu văn bản được ghi vào MySQL DB; tệp ảnh lưu vào volume `viettri_uploads_staging`.
4. Khi bài viết được công bố, Next.js truy vấn dữ liệu mới qua endpoint `/graphql` và cập nhật tức thì trên giao diện website.

---

## 4. Ưu điểm của Kiến trúc

1. **Hiệu năng & Tối ưu SEO vượt trội:**
   - Tầng hiển thị hoàn toàn do Next.js đảm nhiệm với mã nguồn tối ưu, loại bỏ tình trạng cồng kềnh thường gặp của các theme WordPress truyền thống.
   - Điểm số Core Web Vitals cao nhờ khả năng nén ảnh (`next/image`), tối ưu font cục bộ và SSR.
2. **Bảo mật cao (Security Hardening):**
   - Khách truy cập thông thường chỉ tương tác với ứng dụng Node.js/Next.js, không tiếp cận trực tiếp cấu trúc thư mục hoặc file nguồn PHP của WordPress.
   - Giảm thiểu tối đa nguy cơ bị tấn công qua lỗ hổng plugin hay database injection trên giao diện người dùng.
3. **Trải nghiệm biên tập thân thiện:**
   - Tận dụng hệ sinh thái quản lý bài viết, phân quyền biên tập viên và media phong phú của WordPress.
4. **Khả năng mở rộng (Scalability):**
   - Dễ dàng nâng cấp hoặc mở rộng cụm Frontend (scale nhiều container Next.js) độc lập với cụm CMS khi lượng truy cập tăng đột biến.

---

## 5. Hướng dẫn Vận hành & Triển khai

### Khởi chạy môi trường Staging
Tại thư mục gốc dự án:
```bash
# Khởi chạy toàn bộ hệ thống ở chế độ daemon
docker compose -f docker-compose.staging.yml up -d --build

# Kiểm tra trạng thái các container
docker compose -f docker-compose.staging.yml ps

# Xem log theo thời gian thực
docker compose -f docker-compose.staging.yml logs -f
```

### Kiểm tra dịch vụ
- **Giao diện Website:** `http://<SERVER_IP>:3035/`
- **Trang Quản trị WordPress:** `http://<SERVER_IP>:3035/wp-admin/`
- **GraphQL Endpoint:** `http://<SERVER_IP>:3035/graphql`
