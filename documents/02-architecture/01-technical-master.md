# Kiến trúc Hệ thống (Technical Master)

Tài liệu này mô tả kiến trúc tổng quan của **Ứng dụng Desktop Base (Frontend & OS Bridge)**, tập trung vào cấu trúc bên trong ứng dụng và cách nó tương tác với các hệ thống bên ngoài.

---

## 1. Kiến Trúc Vĩ Mô (Context Diagram)

Trong hệ thống ứng dụng Desktop, ứng dụng đóng vai trò là giao diện người dùng (Client-side), kết nối với hệ thống Backend Cloud và các dịch vụ bên ngoài.

**Lưu ý:** Dự án này bao gồm phần mã nguồn Frontend Desktop và Tauri OS Bridge. Toàn bộ logic nghiệp vụ tập trung và cơ sở dữ liệu chính nằm ở hệ thống **Backend Service** (Hệ thống bên ngoài).

```mermaid
C4Context
    title C4 Context - Desktop App Base (Frontend Only)

    Person(customer, "Người dùng", "Sử dụng máy tính cá nhân để thao tác trên ứng dụng Desktop.")

    System(desktop_app, "Desktop App Base", "Ứng dụng đa nền tảng (Frontend). Lưu giữ logic giao diện và xử lý tương tác cục bộ.")

    System_Ext(backend, "Backend API", "Hệ thống Backend (External). Xử lý xác thực, phân quyền, lưu trữ database và logic nghiệp vụ chính.")

    Rel(customer, desktop_app, "Tương tác, thao tác cấu hình, điều khiển")
    Rel(desktop_app, backend, "Gửi yêu cầu API, xác thực, đồng bộ dữ liệu", "HTTPS / JSON")
```

---

## 2. Kiến Trúc Container (Container Diagram)

Kiến trúc bên trong dự án này bao gồm lớp hiển thị web (React) và lớp cầu nối với hệ điều hành (Tauri Core).

```mermaid
C4Container
    title C4 Container - Desktop App Base

    Person(customer, "Người dùng", "Tương tác với chuột/bàn phím.")

    System_Boundary(desktop_frontend_boundary, "Desktop App Base (Internal)") {

        Container(react_ui, "UI Frontend (React)", "React 19, Zustand", "Lớp hiển thị người dùng, xử lý trạng thái giao diện.")

        Container(tauri_bridge, "Desktop Host / OS Bridge (Tauri/Rust)", "Rust Core", "Lớp cầu nối hệ thống: Quản lý cửa sổ, File system, Socket mạng và IPC.")

    }

    System_Ext(backend, "Remote Backend API", "Hệ thống Backend chính xử lý logic nghiệp vụ.")

    Rel(customer, react_ui, "Sử dụng GUI", "Screen/Input")

    Rel(react_ui, tauri_bridge, "Yêu cầu tài nguyên hệ thống/Mạng", "Tauri IPC")

    Rel(tauri_bridge, backend, "Giao tiếp HTTPS tới API trung tâm", "HTTPS/TLS")
```

---

## 3. Vai trò của dự án này

1.  **Giao diện người dùng (Presentation Layer):** Cung cấp trải nghiệm ứng dụng desktop mượt mà, tối ưu trên máy tính.
2.  **Cầu nối Desktop (Desktop Host):** Tận dụng Tauri để truy cập vào các tính năng hệ thống mà trình duyệt web thông thường không làm được (file system, cửa sổ native, IPC, socket).
3.  **Tối ưu hiệu năng:** Chuyển các tác vụ nặng xuống lớp Rust để giảm tải cho Browser Engine.

**Dự án này KHÔNG chứa:** logic phân quyền database, lưu trữ persistent user data tập trung (trừ local state / cache), hoặc các tác vụ server-side.

---

## 4. Đánh giá Ưu - Nhược điểm và Kết luận Kiến trúc Vĩ mô

### 4.1 Ưu điểm (Pros)

- **Hiệu năng & Tối ưu Tài nguyên:** Trái ngược với các app Desktop dùng bộ khung Electron vốn kềnh càng và "ngốn" RAM, kiến trúc Tauri kết hợp Webview của hệ điều hành giúp ứng dụng cực kỳ nhẹ, tối ưu tài nguyên phần cứng.
- **Quyền năng OS-Native thực sự:** Khác với một Web-app thuần túy, cấu trúc Tauri OS Bridge cung cấp sức mạnh điều khiển Native thực sự (truy cập hệ thống, quản lý ứng dụng, giao tiếp thiết bị/socket).
- **Phục vụ đa Nền tảng (Cross-Platform):** Lớp mã nguồn React hoàn toàn có thể tái sử dụng, trong khi Tauri compile app Native cho thẳng Windows, macOS lẫn Linux từ duy nhất một codebase.

### 4.2 Nhược điểm (Cons)

- **Rào cản ngôn ngữ cho Cầu nối OS:** Việc viết thêm hay bảo trì các Module Native trên Tauri yêu cầu kiến thức lập trình ngôn ngữ Rust, một ngôn ngữ hiện đại an toàn nhưng có "độ dốc bài học" (learning curve) đối với nhà phát triển Frontend.

### 4.3 Kết luận (Conclusion)

Lựa chọn kiến trúc **Frontend Desktop dựa trên Tauri OS Bridge** là nước đi chiến lược phù hợp để phát triển ứng dụng Desktop chuyên nghiệp. Sự kết hợp này mang lại trải nghiệm phần mềm "Nhẹ như Web, Mạnh như Native", là nền tảng vững chắc (Base) để phát triển các dự án ứng dụng máy tính đa dạng.
