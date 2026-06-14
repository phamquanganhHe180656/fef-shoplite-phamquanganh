// js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Chặn hành động gửi form mặc định

            // 1. Lấy dữ liệu từ các ô input
            const fullname = document.getElementById('fullname');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');
            const agreeTerms = document.getElementById('agree-terms');

            let isValid = true;

            // 2. Hàm helper để hiển thị lỗi chuyên nghiệp
            function showError(input, errorId, message) {
                const errorElement = document.getElementById(errorId);
                if (message) {
                    input.classList.add('is-invalid');
                    errorElement.textContent = message;
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                    errorElement.textContent = '';
                }
            }

            // 3. Thực hiện kiểm tra chi tiết (Validation Logic)
            
            // Check Fullname
            showError(fullname, 'fullname-error', 
                fullname.value.trim().length < 3 ? 'Họ tên phải có ít nhất 3 ký tự.' : '');

            // Check Email (Sử dụng hàm từ utils.js)
            showError(email, 'email-error', 
                !isValidEmail(email.value) ? 'Email không đúng định dạng (VD: abc@gmail.com).' : '');

            // Check Phone (Sử dụng hàm từ utils.js)
            showError(phone, 'phone-error', 
                !isValidPhone(phone.value) ? 'Số điện thoại Việt Nam không hợp lệ.' : '');

            // Check Password
            showError(password, 'password-error', 
                password.value.length < 6 ? 'Mật khẩu phải từ 6 ký tự trở lên.' : '');

            // Check Confirm Password
            showError(confirmPassword, 'confirm-password-error', 
                confirmPassword.value !== password.value ? 'Mật khẩu xác nhận không khớp.' : '');

            // Check Agree Terms
            showError(agreeTerms, 'agree-terms-error', 
                !agreeTerms.checked ? 'Bạn phải đồng ý với điều khoản dịch vụ.' : '');

            // 4. Nếu tất cả đều hợp lệ
            if (isValid) {
                // Hiển thị thông báo thành công
                const successMsg = document.getElementById('success-message');
                successMsg.classList.remove('d-none');
                
                // Disable nút submit để tránh bấm nhiều lần
                const submitBtn = registerForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Đang xử lý...';

                // Sau 2 giây chuyển hướng về trang chủ
                setTimeout(() => {
                    alert('Đăng ký thành công! Chào mừng bạn đến với ShopLite.');
                    window.location.href = 'index.html';
                }, 2000);
            }
        });
    }
});