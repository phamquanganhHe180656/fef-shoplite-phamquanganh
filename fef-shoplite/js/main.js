// Main Module - Logic cho trang chủ
// Lấy và render danh sách sản phẩm

// ========================================
// State
// ========================================
let allProducts = [];
let filteredProducts = [];
let currentCategory = '';
let searchQuery = '';

// ========================================
// Initialize
// ========================================

/**
 * Khởi tạo trang
 */
async function init() {
    try {
        // Hiển thị loading
        showElement('loading');
        hideElement('error');
        hideElement('empty-state');
        
        // Load dữ liệu
        await Promise.all([
            loadProducts(),
            loadCategories()
        ]);
        
        // Setup event listeners
        setupEventListeners();
        
    } catch (error) {
        showError(error.message);
    }
}

// ========================================
// Load Data
// ========================================

/**
 * Load tất cả sản phẩm từ API
 */
async function loadProducts() {
    try {
        allProducts = await fetchProducts();
        filteredProducts = [...allProducts];
        renderProducts(filteredProducts);
        hideElement('loading');
    } catch (error) {
        hideElement('loading');
        showError(error.message);
    }
}

/**
 * Load danh sách categories
 */
async function loadCategories() {
    try {
        const categories = await fetchCategories();
        populateCategories(categories);
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

/**
 * Populate category dropdown
 * @param {Array} categories - Mảng categories
 */
function populateCategories(categories) {
    const selectElement = document.getElementById('category-filter');
    if (!selectElement) return;
    
    // Xóa options cũ (giữ lại "All")
    while (selectElement.options.length > 1) {
        selectElement.remove(1);
    }
    
    // Thêm categories mới
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        selectElement.appendChild(option);
    });
}

// ========================================
// Render Products
// ========================================

/**
 * Render danh sách sản phẩm
 * @param {Array} products - Mảng sản phẩm
 */
function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    
    if (!products || products.length === 0) {
        grid.innerHTML = '';
        showElement('empty-state');
        return;
    }
    
    hideElement('empty-state');
    
    grid.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="card product-card h-100">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}" 
                         style="max-height: 200px; object-fit: contain;">
                </div>
                <div class="product-info">
                    <h5 class="product-name">${product.title}</h5>
                    <p class="product-rating">${formatRating(product.rating?.rate || 0)}</p>
                    <h3 class="product-price">${formatCurrency(product.price)}</h3>
                    <div class="product-actions">
                        <a href="product.html?id=${product.id}" class="btn btn-outline-primary btn-sm">
                            <i class="bi bi-eye"></i> Chi Tiết
                        </a>
                        <button class="btn btn-danger btn-sm add-to-cart-btn" data-product-id="${product.id}">
                            <i class="bi bi-cart-plus"></i> Thêm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
}

// ========================================
// Event Listeners
// ========================================

/**
 * Setup tất cả event listeners
 */
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            searchQuery = e.target.value.toLowerCase();
            applyFilters();
        }));
    }
    
    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            applyFilters();
        });
    }
    
    // Sort buttons
    const sortAscBtn = document.getElementById('sort-asc');
    if (sortAscBtn) {
        sortAscBtn.addEventListener('click', () => {
            filteredProducts.sort((a, b) => a.price - b.price);
            renderProducts(filteredProducts);
        });
    }
    
    const sortDescBtn = document.getElementById('sort-desc');
    if (sortDescBtn) {
        sortDescBtn.addEventListener('click', () => {
            filteredProducts.sort((a, b) => b.price - a.price);
            renderProducts(filteredProducts);
        });
    }
    
    // Add to cart
    const grid = document.getElementById('product-grid');
    if (grid) {
        grid.addEventListener('click', (e) => {
            // Kiểm tra xem người dùng có click vào nút "Thêm" hoặc icon bên trong nút không
            const btn = e.target.closest('.add-to-cart-btn');
            
            if (btn) {
                e.preventDefault();
                // Lấy ID từ data attribute
                const productId = parseInt(btn.getAttribute('data-product-id'));
                // Tìm sản phẩm trong mảng allProducts
                const product = allProducts.find(p => p.id === productId);
                
                if (product) {
                    // Gọi hàm addToCart (đảm bảo hàm này có trong cart.js hoặc main.js)
                    addToCart(product, 1);
                }
            }
        });
    }
}


/**
 * Lọc sản phẩm theo search và category
 */
function applyFilters() {
    let filtered = [...allProducts];
    
    // Lọc theo category
    if (currentCategory) {
        filtered = filtered.filter(product => product.category === currentCategory);
    }
    
    // Lọc theo search
    if (searchQuery) {
        filtered = filtered.filter(product => 
            product.title.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery)
        );
    }
    
    filteredProducts = filtered;
    renderProducts(filteredProducts);
}

// ========================================
// Init on DOM Ready
// ========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Update cart badge on page load
window.addEventListener('load', updateCartBadge);
