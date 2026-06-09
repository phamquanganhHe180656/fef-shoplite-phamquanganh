// Product Module - Product detail page logic

let currentProduct = null;

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');

    if (badge) {
        badge.textContent = totalItems;
    }
}

function getProductIdFromQuery() {
    const rawId = getQueryParam('id');
    const id = Number(rawId);

    if (!rawId || Number.isNaN(id) || id <= 0) {
        return null;
    }

    return id;
}

function renderRatingStars(ratingValue) {
    const rating = Math.max(0, Math.min(5, Number(ratingValue) || 0));
    const rounded = Math.round(rating);

    return Array.from({ length: 5 }, (_, i) => {
        if (i < rounded) {
            return '<i class="bi bi-star-fill"></i>';
        }
        return '<i class="bi bi-star"></i>';
    }).join('');
}

function setQuantity(value) {
    const quantityInput = document.getElementById('quantity');
    if (!quantityInput) return;
    quantityInput.value = String(Math.max(1, Math.floor(value)));
}

function getQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (!quantityInput) return 1;

    const value = Number(quantityInput.value);
    if (Number.isNaN(value) || value < 1) {
        setQuantity(1);
        return 1;
    }

    return Math.floor(value);
}

function renderBreadcrumb(product) {
    const categoryNode = document.getElementById('breadcrumb-category');
    const productNode = document.getElementById('breadcrumb-product');

    if (categoryNode) {
        categoryNode.textContent = product.category || 'Danh mục';
    }

    if (productNode) {
        productNode.textContent = product.title || 'Chi tiết sản phẩm';
    }
}

function renderProduct(product) {
    const imageNode = document.getElementById('product-image');
    const titleNode = document.getElementById('product-title');
    const ratingNode = document.getElementById('product-rating');
    const categoryNode = document.getElementById('product-category');
    const priceNode = document.getElementById('product-price');
    const descriptionNode = document.getElementById('product-description');

    if (imageNode) {
        imageNode.src = product.image;
        imageNode.alt = product.title;
    }

    if (titleNode) {
        titleNode.textContent = product.title;
    }

    if (ratingNode) {
        const score = Number(product.rating?.rate || 0).toFixed(1);
        ratingNode.innerHTML = `${renderRatingStars(product.rating?.rate)} <span class="text-muted ms-1">${score}/5</span>`;
    }

    if (categoryNode) {
        categoryNode.textContent = product.category;
    }

    if (priceNode) {
        priceNode.textContent = formatCurrency(product.price);
    }

    if (descriptionNode) {
        descriptionNode.textContent = product.description;
    }

    renderBreadcrumb(product);
    document.title = `ShopLite - ${product.title}`;
}

function showAddSuccess(quantity) {
    const successNode = document.getElementById('success-message');
    if (!successNode) return;

    successNode.textContent = `Da them ${quantity} san pham vao gio hang.`;
    successNode.classList.remove('d-none');
    successNode.classList.add('fade-in-anim');

    setTimeout(() => {
        successNode.classList.add('d-none');
        successNode.classList.remove('fade-in-anim');
    }, 1800);
}

function addToCart(product, quantity) {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity
        });
    }

    setCart(cart);
    updateCartBadge();
    showAddSuccess(quantity);
}

function renderRelatedProducts(products, currentId) {
    const grid = document.getElementById('related-products-grid');
    const section = document.getElementById('related-products-section');
    if (!grid || !section) return;

    const related = products
        .filter((item) => item.id !== currentId)
        .slice(0, 4);

    if (related.length === 0) {
        section.classList.add('d-none');
        grid.innerHTML = '';
        return;
    }

    grid.innerHTML = related.map((item) => `
        <div class="col">
            <div class="card related-card h-100 border-0 shadow-sm">
                <img src="${item.image}" class="card-img-top" alt="${item.title}">
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title mb-2">${item.title}</h6>
                    <div class="text-warning small mb-2">${renderRatingStars(item.rating?.rate)}</div>
                    <div class="fw-semibold text-danger mb-3">${formatCurrency(item.price)}</div>
                    <a href="product.html?id=${item.id}" class="btn btn-outline-primary btn-sm mt-auto">
                        <i class="bi bi-eye"></i> Xem chi tiet
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    section.classList.remove('d-none');
}

function bindEvents() {
    const minusBtn = document.getElementById('qty-minus');
    const plusBtn = document.getElementById('qty-plus');
    const quantityInput = document.getElementById('quantity');
    const addButton = document.getElementById('add-to-cart-btn');

    if (minusBtn) {
        minusBtn.addEventListener('click', () => {
            setQuantity(getQuantity() - 1);
        });
    }

    if (plusBtn) {
        plusBtn.addEventListener('click', () => {
            setQuantity(getQuantity() + 1);
        });
    }

    if (quantityInput) {
        quantityInput.addEventListener('input', () => {
            if (!quantityInput.value) return;
            setQuantity(getQuantity());
        });
    }

    if (addButton) {
        addButton.addEventListener('click', () => {
            if (!currentProduct) return;
            addToCart(currentProduct, getQuantity());
        });
    }
}

async function initProductPage() {
    showElement('loading');
    hideError();
    hideElement('product-detail');
    hideElement('related-products-section');
    updateCartBadge();
    bindEvents();

    const productId = getProductIdFromQuery();
    if (!productId) {
        hideElement('loading');
        showError('ID san pham khong hop le. Vui long quay lai trang chu.');
        return;
    }

    try {
        const product = await fetchProductById(productId);
        currentProduct = product;
        renderProduct(product);

        const categoryProducts = await fetchProductsByCategory(product.category);
        renderRelatedProducts(categoryProducts, product.id);

        hideElement('loading');
        showElement('product-detail');
    } catch (error) {
        hideElement('loading');
        showError(error.message || 'Khong the tai chi tiet san pham.');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductPage);
} else {
    initProductPage();
}
