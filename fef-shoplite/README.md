# FEF ShopLite

Dự án web shop đơn giản với cấu trúc front-end cơ bản.

## Cấu Trúc Thư Mục

```
fef-shoplite/
├── index.html          # Trang chủ
├── product.html        # Trang chi tiết sản phẩm
├── cart.html           # Trang giỏ hàng
├── register.html       # Trang đăng ký
├── css/
│   └── style.css       # Stylesheet chính
├── js/
│   ├── api.js          # Hàm fetch API chung
│   ├── utils.js        # Hàm bổ trợ (format, notification)
│   ├── cart.js         # Logic giỏ hàng
│   ├── main.js         # Logic trang chủ
│   ├── detail.js       # Logic trang chi tiết
│   └── auth.js         # Validation đăng ký
└── README.md           # File này
```

## Mô Tả Các Module

### js/api.js
- Chứa các hàm fetch API dùng chung
- Gọi các API endpoint từ backend

### js/utils.js
- Hàm format tiền tệ
- Hàm hiển thị thông báo
- Các hàm tiện ích khác

### js/cart.js
- Thêm sản phẩm vào giỏ hàng
- Sửa số lượng
- Xóa sản phẩm
- Quản lý localStorage

### js/main.js
- Logic cho trang chủ
- Hiển thị danh sách sản phẩm

### js/detail.js
- Logic cho trang chi tiết sản phẩm
- Xử lý thêm vào giỏ hàng

### js/auth.js
- Validation form đăng ký
- Kiểm tra email, mật khẩu

## Hướng Phát Triển

1. Xây dựng HTML structure
2. Style CSS
3. Viết logic JavaScript theo từng module
