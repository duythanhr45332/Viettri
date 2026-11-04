# Viet Tri Translation Editor (WordPress Plugin)

Plugin chuyên biệt quản trị từ điển đa ngôn ngữ (`vi.json` & `en.json`) dành riêng cho dự án **Việt Trì Legacy Lakeside**.

---

## 1. Tính năng nổi bật

- **Quản lý 2 ngôn ngữ**: Tiếng Việt (`vi.json`) và Tiếng Anh (`en.json`).
- **Phân chia theo từng trang rõ ràng**:
  - `common`: Dùng chung (Header, Footer, Modal tư vấn, Meta)
  - `home`: Trang chủ (Hero, Gallery, Intro, Villa, Features, Map, Products, Partners)
  - `about`: Giới thiệu dự án
  - `livingSpace`: Không gian sống (Noor, LJ, Family, Ana)
  - `theVillas`: Dòng sản phẩm (Tropical, Indochine, So sánh)
- **2 Chế độ chỉnh sửa**:
  - **Form Trực quan (Visual Editor)**: Nhập liệu như form bình thường, khách hàng không cần biết code, có thanh tìm kiếm lọc từ khóa nhanh.
  - **Mã nguồn JSON (JSON Code Editor)**: Cho phép dev/kỹ thuật copy-paste, kiểm tra cú pháp (Validate) và làm đẹp (Format JSON).
- **Sao lưu & Phục hồi**:
  - Xuất file JSON (Export) về máy tính.
  - Nhập file JSON (Import) tải lên lại.
  - Khôi phục về mặc định gốc (Reset to default).
- **Tích hợp Next.js Headless CMS**:
  - Cung cấp Public REST API: `GET /wp-json/viettri/v1/dictionary?lang=vi` (hoặc `en`).
  - Hỗ trợ Webhook tự động revalidate cache Next.js ngay khi admin bấm **Lưu Thay Đổi**.

---

## 2. Hướng dẫn cài đặt vào WordPress

### Cách 1: Nén file Zip & Tải lên qua WP-Admin
1. Nén toàn bộ thư mục `viettri-translation-editor` thành file `viettri-translation-editor.zip`.
2. Đăng nhập vào trang quản trị WordPress (`/wp-admin`).
3. Vào **Plugins (Gói mở rộng)** $\rightarrow$ **Add New Plugin (Cài mới)** $\rightarrow$ **Upload Plugin (Tải plugin lên)**.
4. Chọn file zip vừa nén và bấm **Install Now (Cài đặt)** $\rightarrow$ **Activate (Kích hoạt)**.

### Cách 2: Copy trực tiếp vào thư mục wp-content/plugins
- Copy thư mục `viettri-translation-editor` vào:
  `/var/www/html/wp-content/plugins/viettri-translation-editor` (trên server hoặc container Docker WordPress).
- Vào **Plugins** trong `/wp-admin` và bấm **Kích hoạt**.

---

## 3. REST API Endpoint cho Next.js

- **Lấy từ điển tiếng Việt**:
  ```http
  GET /wp-json/viettri/v1/dictionary?lang=vi
  hoặc
  GET /wp-json/viettri/v1/dictionary/vi
  ```

- **Lấy từ điển tiếng Anh**:
  ```http
  GET /wp-json/viettri/v1/dictionary?lang=en
  hoặc
  GET /wp-json/viettri/v1/dictionary/en
  ```
