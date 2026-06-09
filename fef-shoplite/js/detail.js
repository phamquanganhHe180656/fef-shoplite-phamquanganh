// Detail Module - Logic cho trang chi tiết sản phẩm

let currentProduct = null;

function parseProductId() {
	const rawId = getQueryParam('id');
	const id = Number(rawId);

	if (!rawId || Number.isNaN(id) || id <= 0) {
		return null;
	}

	return id;
}

function updateCartBadge() {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
	const badge = document.getElementById('cart-count');

	if (badge) {
		badge.textContent = totalItems;
	}
}

function setQuantity(value) {
	const quantityInput = document.getElementById('quantity');
	if (!quantityInput) return;
	quantityInput.value = String(Math.max(1, value));
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

function renderProduct(product) {
	document.getElementById('product-image').src = product.image;
	document.getElementById('product-image').alt = product.title;
	document.getElementById('product-title').textContent = product.title;
	document.getElementById('product-price').textContent = formatCurrency(product.price);
	document.getElementById('product-description').textContent = product.description;
	document.getElementById('product-rating').textContent = formatRating(product.rating?.rate || 0);
	document.getElementById('product-category').textContent = product.category;

	document.title = `ShopLite - ${product.title}`;

	hideElement('loading');
	hideError();
	showElement('product-detail');
}

function addToCart(product, quantity) {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	const existingItem = cart.find((item) => item.id === product.id);

	if (existingItem) {
		existingItem.quantity += quantity;
	} else {
		cart.push({
			id: product.id,
			title: product.title,
			price: product.price,
			image: product.image,
			quantity
		});
	}

	localStorage.setItem('cart', JSON.stringify(cart));
	updateCartBadge();
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
			const quantity = getQuantity();
			addToCart(currentProduct, quantity);
			showSuccess(`Da them ${quantity} san pham vao gio hang.`);
		});
	}
}

async function initDetailPage() {
	showElement('loading');
	hideElement('product-detail');
	hideError();

	updateCartBadge();
	bindEvents();

	const productId = parseProductId();
	if (!productId) {
		hideElement('loading');
		showError('ID san pham khong hop le. Vui long quay lai trang chu.');
		return;
	}

	try {
		currentProduct = await fetchProductById(productId);
		renderProduct(currentProduct);
	} catch (error) {
		hideElement('loading');
		showError(error.message || 'Khong the tai chi tiet san pham.');
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initDetailPage);
} else {
	initDetailPage();
}
