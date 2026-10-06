# 📚 Desktop App Base Documentation

Chào mừng bạn đến với trung tâm tri thức của **dự án này**. Tài liệu được tổ chức theo cấu trúc phân tầng (numbered hierarchy) để đảm bảo tính dễ tìm kiếm, quy củ và dễ dàng mở rộng khi dự án phát triển.

---

## 🗺️ Bản đồ Tài liệu (Document Map)

### [01. Project Context](./01-project-context/)

- **[System Overview](./01-project-context/01-system-overview.md)**: Tổng quan nhanh về dự án, tầm nhìn chiến lược, stack công nghệ và cấu trúc thư mục cốt lõi.

### [02. Architecture](./02-architecture/)

- **[Technical Master](./02-architecture/01-technical-master.md)**: Bản vẽ kiến trúc vĩ mô - Mô tả ranh giới giữa Frontend Desktop, Tauri OS Bridge và Backend communication.
- **[Code Architecture](./02-architecture/02-code-architecture.md)**: Đi sâu vào tổ chức mã nguồn bên trong - Nguyên tắc thiết kế MVVM, quản lý State với Zustand và cơ chế IPC của Tauri.

---

## 🛠️ Quy tắc đóng góp tài liệu

Để duy trì sự thống nhất và chuyên nghiệp cho kho tàng tri thức này, mọi thành viên tham gia đóng góp tài liệu vui lòng tuân thủ:

1. **Numbered Prefix**: Luôn bắt đầu tên thư mục hoặc file bằng hệ thống số đếm (ví dụ: `01-`, `02-`) để duy trì trình tự đọc logic.
2. **Kebab-case**: Sử dụng định dạng `kebab-case` cho tất cả tên file và thư mục (ví dụ: `03-api-integration.md`). Không dùng khoảng trắng hay viết hoa.
3. **Cross-linking**: Mỗi khi tạo thêm một file tài liệu mới ở bất kỳ thư mục con nào, bạn **bắt buộc** phải cập nhật liên kết của file đó vào phần **Bản đồ Tài liệu** ở trên.
