// js/cart.js

// --- CÁC HÀM CỐT LÕI (Đặt ở ngoài cùng để các file khác đều gọi được) ---

/**
 * Lấy giỏ hàng từ localStorage
 */
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

/**
 * Lưu giỏ hàng và cập nhật giao diện
 */
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

/**
 * Hàm thêm sản phẩm vào giỏ (HÀM NÀY ĐANG BỊ BÁO LỖI THIẾU)
 */
function addToCart(product, quantity = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart(cart);
    
    if (typeof showSuccess === 'function') {
        showSuccess(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
    } else {
        alert('Đã thêm vào giỏ hàng!');
    }
}

/**
 * Cập nhật số lượng hiển thị trên Navbar
 */
function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = totalItems;
    }
}

/**
 * Hiển thị danh sách trong trang cart.html
 */
function renderCart() {
    const cart = getCart();
    const cartListDesktop = document.getElementById('cart-list-desktop');
    const cartListMobile = document.getElementById('cart-list-mobile'); // Danh sách Mobile
    const cartItemsSection = document.getElementById('cart-items'); // Khối chứa toàn bộ giỏ hàng
    const emptyCartSection = document.getElementById('empty-cart'); // Khối báo giỏ trống
    
    const totalPriceElem = document.getElementById('total-price');
    const subtotalElem = document.getElementById('subtotal');
    const itemCountLabel = document.getElementById('cart-item-count-label');

    if (!cartListDesktop && !cartListMobile) return; // Nếu không phải trang cart.html thì dừng

    // Trường hợp giỏ hàng trống
    if (cart.length === 0) {
        if (cartItemsSection) cartItemsSection.classList.add('d-none');
        if (emptyCartSection) emptyCartSection.classList.remove('d-none');
        if (itemCountLabel) itemCountLabel.textContent = '0 mặt hàng';
        if (cartListDesktop) cartListDesktop.innerHTML = '';
        if (cartListMobile) cartListMobile.innerHTML = '';
        return;
    }

    // Trường hợp có hàng: Hiện nội dung, ẩn báo trống
    if (cartItemsSection) cartItemsSection.classList.remove('d-none');
    if (emptyCartSection) emptyCartSection.classList.add('d-none');
    if (itemCountLabel) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        itemCountLabel.textContent = `${totalItems} mặt hàng`;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const itemCardTemplate = (item) => {
        const itemTotal = item.price * item.quantity;
        return `
            <div class="card cart-item-card shadow-sm border-0 mb-3">
                <div class="card-body">
                    <div class="d-flex gap-3 align-items-center">
                        <img src="${item.image}" alt="${item.title}" class="cart-item-thumb rounded border p-2">
                        <div class="flex-grow-1">
                            <div class="d-flex flex-column flex-md-row justify-content-between gap-2 mb-2">
                                <h6 class="mb-0 cart-item-title">${item.title}</h6>
                                <span class="fw-bold text-primary">$${itemTotal.toFixed(2)}</span>
                            </div>
                            <p class="text-muted small mb-3">Đơn giá: $${item.price.toFixed(2)}</p>

                            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
                                <div class="input-group input-group-sm cart-qty-group">
                                    <button class="btn btn-outline-secondary btn-minus" data-id="${item.id}">
                                        <i class="bi bi-dash-lg"></i>
                                    </button>
                                    <input type="text" class="form-control text-center fw-bold" value="${item.quantity}" readonly>
                                    <button class="btn btn-outline-secondary btn-plus" data-id="${item.id}">
                                        <i class="bi bi-plus-lg"></i>
                                    </button>
                                </div>
                                <button class="btn btn-sm btn-outline-danger btn-remove" data-id="${item.id}">
                                    <i class="bi bi-trash3-fill"></i> Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    const desktopHtml = cart.map(item => itemCardTemplate(item)).join('');
    if (cartListDesktop) {
        cartListDesktop.innerHTML = desktopHtml;
    }

    if (cartListMobile) {
        cartListMobile.innerHTML = desktopHtml;
    }

    // Cập nhật các con số tổng
    if (subtotalElem) subtotalElem.textContent = `$${total.toFixed(2)}`;
    if (totalPriceElem) totalPriceElem.textContent = `$${total.toFixed(2)}`;
}

// --- XỬ LÝ SỰ KIỆN KHI TRANG LOAD ---

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    renderCart();

    // Lắng nghe các nút bấm trong trang giỏ hàng (+, -, xóa)
    const cartContainer = document.querySelector('main'); 
    if (cartContainer) {
        cartContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn || !btn.dataset.id) return;

            const id = parseInt(btn.dataset.id);
            let cart = getCart();
            const item = cart.find(i => i.id === id);

            if (btn.classList.contains('btn-plus')) {
                item.quantity++;
            } else if (btn.classList.contains('btn-minus')) {
                if (item.quantity > 1) item.quantity--;
            } else if (btn.classList.contains('btn-remove')) {
                cart = cart.filter(i => i.id !== id);
            } else {
                return;
            }

            saveCart(cart);
            renderCart();
        });
    }

    // Nút xóa hết giỏ hàng
    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Xóa toàn bộ giỏ hàng?')) {
                saveCart([]);
                renderCart();
            }
        });
    }
});