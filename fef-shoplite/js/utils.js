// Utils Module - Hàm bổ trợ
// Format tiền tệ, hiển thị thông báo, các utility khác

// ========================================
// Format Functions
// ========================================

/**
 * Format số thành tiền tệ VND
 * @param {number} price - Giá tiền
 * @returns {string} Chuỗi định dạng tiền tệ
 */
function formatCurrency(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(Math.round(price));
}

/**
 * Format rating thành sao
 * @param {number} rating - Điểm rating (0-5)
 * @returns {string} HTML sao
 */
function formatRating(rating) {
    if (!rating || rating < 0) return '⭐ Chưa có đánh giá';
    
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (hasHalfStar) {
        stars += '✨';
    }
    
    return stars + ` ${roundedRating}/5`;
}

// ========================================
// DOM Manipulation
// ========================================

/**
 * Ẩn phần tử
 * @param {string} elementId - ID phần tử
 */
function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('d-none');
    }
}

/**
 * Hiển thị phần tử
 * @param {string} elementId - ID phần tử
 */
function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('d-none');
    }
}

/**
 * Hiển thị thông báo lỗi
 * @param {string} message - Nội dung lỗi
 * @param {string} containerId - ID container để hiển thị
 */
function showError(message, containerId = 'error') {
    const container = document.getElementById(containerId);
    if (container) {
        const errorElement = container.querySelector('#error-message');
        if (errorElement) {
            errorElement.textContent = message;
        }
        showElement(containerId);
    }
    console.error('Error:', message);
}

/**
 * Ẩn thông báo lỗi
 * @param {string} containerId - ID container
 */
function hideError(containerId = 'error') {
    hideElement(containerId);
}

/**
 * Hiển thị thông báo thành công
 * @param {string} message - Nội dung thông báo
 * @param {number} duration - Thời gian hiển thị (ms)
 */
function showSuccess(message, duration = 3000) {
    // Tạo toast element
    const toast = document.createElement('div');
    toast.className = 'alert alert-success alert-dismissible fade show';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Thêm vào body
    document.body.appendChild(toast);
    
    // Auto dismiss
    setTimeout(() => {
        toast.remove();
    }, duration);
}

// ========================================
// Utility Functions
// ========================================

/**
 * Debounce function - Giảm số lần gọi hàm
 * @param {Function} func - Hàm cần debounce
 * @param {number} delay - Độ trễ (ms)
 * @returns {Function} Hàm debounced
 */
function debounce(func, delay = 300) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * Lấy query string parameter
 * @param {string} param - Tên parameter
 * @returns {string|null} Giá trị parameter
 */
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Kiểm tra email hợp lệ
 * @param {string} email - Email
 * @returns {boolean} True nếu email hợp lệ
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Kiểm tra điện thoại hợp lệ (Việt Nam)
 * @param {string} phone - Số điện thoại
 * @returns {boolean} True nếu hợp lệ
 */
function isValidPhone(phone) {
    const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
    return phoneRegex.test(phone);
}
