// Main Module - Logic cho trang chủ
// Lấy và render danh sách sản phẩm

// ========================================
// State
// ========================================
let allProducts = [];
let filteredProducts = [];
let currentCategory = '';
let searchQuery = '';
let currentSort = '';
let currentPage = 1;
const itemsPerPage = 8; // Đề xuất 8 để khớp với Grid 4 cột của Bootstrap

// ========================================
// Initialize
// ========================================

async function init() {
    try {
        showElement('loading');
        hideElement('error');
        hideElement('empty-state');
        
        await Promise.all([
            loadProducts(),
            loadCategories()
        ]);
        
        setupEventListeners();
    } catch (error) {
        showError(error.message);
    }
}

// ========================================
// Load Data
// ========================================

async function loadProducts() {
    try {
        allProducts = await fetchProducts();
        filteredProducts = [...allProducts];
        // FIX: Gọi hàm phân trang thay vì render tất cả
        renderProductsWithPagination();
        hideElement('loading');
    } catch (error) {
        hideElement('loading');
        showError(error.message);
    }
}

async function loadCategories() {
    try {
        const categories = await fetchCategories();
        populateCategories(categories);
    } catch (error) {
        // Log lỗi nhẹ nhàng cho dev, không hiện ra ngoài
    }
}

function populateCategories(categories) {
    const selectElement = document.getElementById('category-filter');
    if (!selectElement) return;
    
    while (selectElement.options.length > 1) {
        selectElement.remove(1);
    }
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        selectElement.appendChild(option);
    });
}

// ========================================
// Render Logic
// ========================================

/**
 * Hàm core: Chỉ làm nhiệm vụ vẽ mảng sản phẩm được đưa vào
 */
function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    if (!products || products.length === 0) {
        grid.innerHTML = '';
        showElement('empty-state');
        return;
    }
    
    hideElement('empty-state');
    
    grid.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="card product-card h-100 shadow-sm border-0">
                <div class="product-image p-3">
                    <img src="${product.image}" alt="${product.title}" 
                         style="height: 200px; width: 100%; object-fit: contain;">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="product-name h6 text-truncate-2" style="height: 3rem; overflow: hidden;">${product.title}</h5>
                    <p class="product-rating small text-warning mb-2">${formatRating(product.rating?.rate || 0)}</p>
                    <h3 class="product-price h5 text-danger mb-3">${formatCurrency(product.price)}</h3>
                    <div class="product-actions mt-auto d-flex gap-2">
                        <a href="product.html?id=${product.id}" class="btn btn-outline-primary btn-sm flex-grow-1">
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

/**
 * Hàm bọc: Xử lý cắt mảng dữ liệu theo trang
 */
function renderProductsWithPagination() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredProducts.slice(startIndex, endIndex);

    renderProducts(paginatedItems); 
    renderPaginationControls();
}

/**
 * Vẽ các nút chuyển trang
 */
function renderPaginationControls() {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let html = '';
    // Nút Previous
    html += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <button class="page-link" onclick="changePage(${currentPage - 1})">Trước</button>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <button class="page-link" onclick="changePage(${i})">${i}</button>
            </li>
        `;
    }

    // Nút Next
    html += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <button class="page-link" onclick="changePage(${currentPage + 1})">Sau</button>
        </li>
    `;

    paginationContainer.innerHTML = html;
}

/**
 * Hàm chuyển trang toàn cục (Global)
 */
window.changePage = function(page) {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderProductsWithPagination();
    window.scrollTo({ top: 300, behavior: 'smooth' }); // Cuộn xuống phần sản phẩm
};

// ========================================
// Filter & Events
// ========================================

function applyFilters() {
    let result = [...allProducts];

    if (currentCategory) {
        result = result.filter(p => p.category === currentCategory);
    }

    if (searchQuery) {
        result = result.filter(p => 
            p.title.toLowerCase().includes(searchQuery) || 
            p.description.toLowerCase().includes(searchQuery)
        );
    }

    if (currentSort === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
    }

    filteredProducts = result;
    currentPage = 1; // Reset về trang 1 khi lọc
    // FIX: Gọi hàm phân trang
    renderProductsWithPagination();
}

function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const sortAscBtn = document.getElementById('sort-asc');
    const sortDescBtn = document.getElementById('sort-desc');

    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            searchQuery = searchInput.value.toLowerCase();
            applyFilters();
        }, 400));
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            applyFilters();
        });
    }

    if (sortAscBtn) {
        sortAscBtn.addEventListener('click', () => {
            currentSort = 'price-asc';
            applyFilters();
        });
    }

    if (sortDescBtn) {
        sortDescBtn.addEventListener('click', () => {
            currentSort = 'price-desc';
            applyFilters();
        });
    }

    const grid = document.getElementById('product-grid');
    if (grid) {
        grid.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-to-cart-btn');
            if (btn) {
                e.preventDefault();
                const productId = parseInt(btn.dataset.productId);
                const product = allProducts.find(p => p.id === productId);
                if (product) addToCart(product, 1);
            }
        });
    }
}

// ========================================
// Execution
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    init();
    updateCartBadge();
});

window.addEventListener('load', updateCartBadge);