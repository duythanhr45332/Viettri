# Hướng Dẫn Nhập và Chỉnh Sửa Thông Tin — Từ Điển Đa Ngôn Ngữ

Tài liệu này hướng dẫn chi tiết cách sử dụng công cụ **Từ điển Đa ngôn ngữ (Quản Lý Bản Dịch Website)** trong trang quản trị WordPress để cập nhật nội dung Tiếng Việt và Tiếng Anh cho website **Việt Trì Legacy Lakeside**.

---

## 1. Cách Truy cập & Bố cục Giao diện

1. Đăng nhập vào trang quản trị WordPress tại địa chỉ: `https://viettrilegacylakeside.vn/wp-admin`
2. Trên thanh menu màu đen bên trái, bấm vào mục **Từ điển Đa ngôn ngữ** (biểu tượng chữ A/dịch thuật).

### Các khu vực chính trên màn hình:
- **Góc trên bên phải:**
  - **Giao diện Trực quan** *(Mặc định)*: Chế độ nhập liệu theo từng ô biểu mẫu song song Việt – Anh, dành cho biên tập viên và quản trị viên nội dung.
  - **Mã nguồn JSON**: Chế độ chỉnh sửa mã nguồn trực tiếp, dành cho bộ phận kỹ thuật.
  - Nút **Lưu Thay Đổi** (màu xanh đậm): Lưu toàn bộ nội dung vừa chỉnh sửa lên hệ thống.
- **Thanh chọn Phân mục / Trang (5 Tab):**
  - **Dùng chung (`common`):** Thông tin SEO & Metadata, Thanh điều hướng (Header & Menu), Chân trang (Footer & Liên hệ), Hộp thoại Đăng ký tư vấn (Modal Form).
  - **Trang chủ (`home`):** Banner chính (Hero), Bộ sưu tập hình ảnh (Gallery), Giới thiệu & Tuyên ngôn (Intro), Thông số Villa Compound, Hệ sinh thái tiện ích (Features), Vị trí & Kết nối vùng (Map), Bộ sưu tập sản phẩm (Products), Đối tác & Chủ đầu tư (Partners).
  - **Giới thiệu (`about`):** SEO trang Giới thiệu, Banner chính, Trình chiếu hình ảnh di sản (Slider), Vị trí & Kết nối vùng, Giá trị độc bản (Values).
  - **Không gian sống (`livingSpace`):** SEO trang Không gian sống, Banner chính, Phân khu Noor, Phân khu LJ & Ven hồ, Không gian Gia đình (Family), Dịch vụ Ana Services.
  - **Dòng sản phẩm (`theVillas`):** SEO trang Dòng sản phẩm, Banner chính, So sánh thiết kế (Split Slider), Dinh thự Contemporary Tropical, Dinh thự Modern Indochine.
- **Ô "Tìm kiếm từ khóa..." (bên phải thanh chọn trang):** Giúp lọc nhanh bất kỳ từ hoặc cụm từ nào đang có trong trang hiện tại.

---

## 2. Quy trình Chỉnh sửa Nội dung (Chế độ Giao diện Trực quan)

### Bước 1: Chọn Trang cần chỉnh sửa
Bấm vào một trong 5 tab trang: **Dùng chung**, **Trang chủ**, **Giới thiệu**, **Không gian sống** hoặc **Dòng sản phẩm**.

### Bước 2: Tìm vị trí nội dung cần sửa
- **Cách 1 (Cuộn theo phân khu):** Kéo xuống tìm theo tên thẻ tiêu đề in đậm (ví dụ: *Thông tin SEO & Metadata*, *Thanh điều hướng*, *Banner chính*...).
- **Cách 2 (Tìm kiếm nhanh):** Nhập từ khóa cần tìm vào ô **Tìm kiếm từ khóa...** (ví dụ: nhập số điện thoại, tên phân khu hoặc câu tiêu đề hiện tại). Hệ thống sẽ ẩn các ô không liên quan và chỉ giữ lại đúng dòng chứa từ khóa đó.

### Bước 3: Nhập và chỉnh sửa song ngữ
Mỗi mục nội dung được chia thành **2 cột đối xứng 50/50**:
- **Cột bên trái (`🇻🇳 VN` - TIẾNG VIỆT):** Nhập nội dung hiển thị cho giao diện Tiếng Việt (`/`).
- **Cột bên phải (`🇬🇧 ENG` - TIẾNG ANH):** Nhập nội dung tương ứng cho giao diện Tiếng Anh (`/en`).

> **Giải thích ký hiệu trên mỗi dòng:**
> - **Bên trái phía trên ô nhập** (ví dụ: `title`, `description`, `subtitle`): Tên trường dữ liệu.
> - **Bên phải phía trên ô nhập** (ví dụ: `common.meta.title`): Đường dẫn định danh của văn bản đó trên website.

### Bước 4: Bấm "Lưu Thay Đổi"
1. Sau khi chỉnh sửa xong (bạn có thể sửa ở nhiều tab trang khác nhau trong cùng một lần thao tác), bấm nút **Lưu Thay Đổi** ở góc trên bên phải (hoặc ở thanh công cụ cuối trang).
2. Nút sẽ chuyển sang trạng thái *"Đang lưu..."*.
3. Khi xuất hiện thanh thông báo màu xanh lá: **"Đã lưu thành công bản dịch Tiếng Việt và Tiếng Anh!"**, nội dung mới đã được ghi nhận và tự động làm mới bộ nhớ đệm (cache) trên website chính.

---

## 3. Chế độ "Mã nguồn JSON" (Dành cho Kỹ thuật viên)

Khi cần sao chép/thay thế hàng loạt cấu trúc dữ liệu:
1. Bấm nút **Mã nguồn JSON** ở góc trên bên phải.
2. Màn hình sẽ hiển thị 2 khung soạn thảo mã nguồn của file `vi.json` (bên trái) và `en.json` (bên phải).
3. Sau khi chỉnh sửa mã nguồn:
   - Bấm **Kiểm tra cú pháp**: Hệ thống sẽ kiểm tra xem mã JSON có bị thiếu dấu phẩy `,` hay dấu ngoặc kép `"` không.
   - Bấm **Làm đẹp mã**: Tự động căn lề chuẩn cho cả 2 khung JSON.
4. Bấm **Lưu Thay Đổi** để áp dụng.

---

## 4. Sao lưu, Nhập/Xuất File & Khôi phục Mặc định (Thanh công cụ cuối trang)

Ở cuối trang quản trị có bộ công cụ hỗ trợ quản lý an toàn dữ liệu:

| Nút chức năng | Công dụng |
| :--- | :--- |
| **Tải về 🇻🇳 `vi.json`** / **Tải về 🇬🇧 `en.json`** | Tải toàn bộ nội dung bản dịch hiện tại về máy tính dưới dạng file `.json` để lưu trữ dự phòng (Backup) trước khi chỉnh sửa lớn. |
| **Tải lên 🇻🇳** / **Tải lên 🇬🇧** | Chọn file `.json` từ máy tính để nạp vào biểu mẫu. *(Lưu ý: Sau khi tải file lên và thấy thông báo nạp thành công, hãy bấm **Lưu Thay Đổi** để lưu chính thức lên hệ thống).* |
| **Khôi phục mặc định ban đầu** *(Chữ đỏ bên phải)* | Đưa toàn bộ nội dung Tiếng Việt và Tiếng Anh quay về bản gốc lúc mới bàn giao website. **Thao tác này sẽ xóa các chỉnh sửa trước đó**, hệ thống sẽ hỏi xác nhận trước khi thực hiện. |

---

## 5. Một số Lưu ý Quan trọng khi Biên tập

1. **Không tải lại trang (F5) khi chưa bấm Lưu:** Mọi thay đổi bạn gõ vào các ô sẽ được giữ tạm khi bạn chuyển qua lại giữa các tab (*Dùng chung*, *Trang chủ*, *Giới thiệu*...), nhưng chỉ chính thức được lưu vào cơ sở dữ liệu khi bạn bấm **Lưu Thay Đổi**.
2. **Đảm bảo tính đồng bộ 2 ngôn ngữ:** Khi cập nhật số liệu (diện tích, số lượng dinh thự, số hotline, địa chỉ...) ở cột Tiếng Việt (`🇻🇳 VN`), hãy kiểm tra và cập nhật luôn ở cột Tiếng Anh (`🇬🇧 ENG`) ngay bên cạnh.
3. **Không tự ý sửa các trường đường dẫn kỹ thuật:** Nếu gặp các trường mang tên `href`, `url`, `src`, `image` hoặc có giá trị dạng đường dẫn (ví dụ `/gioi-thieu`, `/images/...`), chỉ sửa khi bạn thực sự muốn thay đổi đường dẫn liên kết; nếu chỉ muốn đổi chữ hiển thị trên nút bấm, hãy sửa ở trường `label`, `title` hoặc `text` kế bên.
4. **Cài đặt đồng bộ Webhook Next.js (Phần mở rộng dưới cùng):** Đây là cấu hình kỹ thuật giúp WordPress báo cho máy chủ giao diện Next.js cập nhật tức thì (`https://viettrilegacylakeside.vn/api/revalidate-dictionary`). Biên tập viên **không cần thay đổi** mục này trong quá trình sử dụng hàng ngày.
