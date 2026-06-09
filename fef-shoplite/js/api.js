// API Module - Fetch từ Fake Store API
// Base URL
const API_BASE_URL = 'https://fakestoreapi.com';

// ========================================
// Products API
// ========================================

/**
 * Fetch tất cả sản phẩm
 * @returns {Promise<Array>} Mảng sản phẩm
 */
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
    }
}

/**
 * Fetch sản phẩm theo ID
 * @param {number} id - ID sản phẩm
 * @returns {Promise<Object>} Chi tiết sản phẩm
 */
async function fetchProductById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw new Error('Không thể tải chi tiết sản phẩm.');
    }
}

/**
 * Fetch danh sách categories
 * @returns {Promise<Array>} Mảng category
 */
async function fetchCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/products/categories`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Không thể tải danh sách danh mục.');
    }
}

/**
 * Fetch sản phẩm theo category
 * @param {string} category - Tên category
 * @returns {Promise<Array>} Mảng sản phẩm trong category
 */
async function fetchProductsByCategory(category) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching products by category ${category}:`, error);
        throw new Error(`Không thể tải sản phẩm từ danh mục ${category}.`);
    }
}
