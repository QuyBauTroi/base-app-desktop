# Tổng quan Hệ thống (System Overview)

## 1. Giới thiệu Dự án

Dự án này là ứng dụng Desktop Base được xây dựng dựa trên framework Tauri và React TypeScript. Ứng dụng cung cấp khung sườn (boilerplate / base architecture) chuẩn hóa, hiệu suất cao và giao diện hiện đại hỗ trợ đa nền tảng (Windows, macOS, Linux).

## 2. Mục tiêu Chiến lược

- **Hiệu suất Tối ưu:** Sử dụng Tauri để giảm thiểu chiếm dụng RAM so với các giải pháp Electron truyền thống.
- **Trải nghiệm Premium:** Giao diện người dùng mượt mà với các hiệu ứng chuyển động và phản hồi tức thì.
- **Tính Linh hoạt:** Hỗ trợ đa nền tảng từ một kho mã nguồn duy nhất.
- **Bảo mật:** Tận dụng sự an toàn của ngôn ngữ Rust cho các tác vụ xử lý lõi.

## 3. Stack Công nghệ

### Frontend

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4 (CSS-first)
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Internationalization:** i18next

### Desktop Host (Tauri OS Bridge)

- **Language:** Rust
- **Runtime:** Tauri 2.0
- **Plugins:** Updater (OTA), Opener, v.v.

## 4. Cấu trúc Thư mục Chính

- `/src`: Mã nguồn Frontend (React).
- `/src-tauri`: Mã nguồn Desktop Host (Rust/Tauri configuration).
- `/documents`: Tài liệu kiến trúc và nghiệp vụ của dự án.
- `/.agent/skills`: Cấu hình skill hỗ trợ cho AI Agent.
