# ShopLite - Mini E-Commerce Project

> **Module:** FEF (Front-End Foundation)  
> **Duration:** 1 week  
> **Status:** ✅ Completed / Production Ready

A fully functional e-commerce website built entirely on the client-side using **vanilla JavaScript**, **HTML5**, **CSS3**, and **Bootstrap 5**. This project serves as the final assignment for the FEF module, demonstrating proficiency in DOM manipulation, API integration, and responsive design.
---

## 🎯 Project Overview

**ShopLite** is a multi-page shopping application that demonstrates foundational front-end development skills:
- Using meaningful tags for SEO and accessibility.
- Hand-written CSS combined with Bootstrap 5 (Flexbox/Grid).
- Professional DOM & Event handling without frameworks.
- Asynchronous data retrieval with `async/await` and error handling.
- ** Using `localStorage` for persistent shopping cart data.
- Implementation of pagination, debouncing, and toast notifications.

**Features:**
- Browse products from Fake Store API
- View detailed product information
- Add/remove items to/from cart
- Persistent shopping cart
- User registration form with validation
- Fully responsive design (mobile, tablet, desktop)

---

## 📁 Project Structure

```
fef-shoplite/
├── index.html              # Home page - Product listing & Filters
├── product.html            # Detail page - Product info & Related items
├── cart.html               # Shopping cart - Management & Checkout
├── register.html           # User registration form
├── css/
│   └── style.css           # Main stylesheet (responsive)
├── js/
│   ├── api.js              # Shared Fetch API functions
│   ├── utils.js            # Utility functions (format, notify)
│   ├── cart.js             # Cart logic & localStorage
│   ├── main.js             # Home page logic (Pagination, Combined Filters)
│   ├── product.js          # Detail page logic & Related products flow
│   └── auth.js             # Form validation
├── assets/                 # Images, icons (when downloaded)
└── README.md
```

---

## 🚀 Technologies Used

| Category | Technology |
|----------|-----------|
| **Markup** | HTML5 (Semantic Structure) |
| **Styling** | CSS3, Bootstrap 5, Bootstrap Icons |
| **Scripting** | Vanilla JavaScript (ES6+) |
| **API** | Fetch API with `async/await` |
| **Storage** | LocalStorage (Persistence) |
| **Data Source** | [Fake Store API](https://fakestoreapi.com/) |

---

## 📋 Pages & Features

### 1. **Home Page** (`index.html`)
- Sticky navbar with cart badge
- Hero banner section
- Product grid with search & filter
- Category dropdown
- Sort options (price ascending/descending)
- Loading and error states
- Footer with links

### 2. **Product Detail** (`product.html`)
- Fetch product by query string ID
- Product image, description, rating
- Adjustable quantity selector
- Add to cart functionality
- Success notification

### 3. **Shopping Cart** (`cart.html`)
- Display all added items
- Modify quantities
- Remove items
- Calculate totals
- Persistent storage (survives page refresh)
- Empty cart state
- Responsive table/mobile layout

### 4. **Registration** (`register.html`)
- Full name field
- Email validation
- Phone number field
- Password confirmation
- Gender selector
- Terms & conditions checkbox
- Real-time error messages
- Success confirmation

---

## ✅ Completed Features & Scoring Rubric

### Pass Tier (Foundation)
- [x] **4 Linked Pages:** Seamless navigation via shared Navbar.
- [x] **Semantic HTML:** Correct use of `header`, `nav`, `main`, `section`, `footer`.
- [x] **Home Page:** Dynamic fetching and rendering of product list.
- [x] **Detail Page:** Dynamic rendering based on URL Query String (`?id=x`).
- [x] **Registration:** JS-based validation for all fields.
- [x] **Responsiveness:** Fluid layout across mobile, tablet, and desktop.

### Good Tier (Intermediate)
- [x] **Full Cart Logic:** Add, remove, update quantities, and total calculation.
- [x] **Combined Search & Filter:** Real-time updates based on user input.
- [x] **State Handling:** Professional Loading spinners and Error messages.
- [x] **Clean Layout:** Polished CSS Grid/Flexbox implementation.

### Excellent Tier (Advanced)
- [x] **Event Delegation:** Optimized event listeners on parent containers for dynamic items.
- [x] **Combined Advanced Logic:** Search + Category Filter + Price Sorting working simultaneously.
- [x] **Cart Badge Sync:** Navbar badge updates instantly across all pages.
- [x] **Pagination:** Client-side pagination (8-10 items per page) for better performance.
- [x] **Enhanced UX:** Search debouncing and Toast notifications for "Add to Cart" actions.
- [x] **Code Quality:** Modular JS, no `console.log`, and zero Console errors.


---

## 📝 Development Timeline (1 Week)

| Day | Task |
|-----|------|
| **Day 1** | Initialize repo, HTML skeleton, navbar/footer |
| **Day 2** | CSS styling, responsive grid, Bootstrap cards |
| **Day 3** | Fetch products, render DOM, loading states |
| **Day 4** | Product detail page, query strings, add-to-cart |
| **Day 5** | Cart logic, localStorage, total calculation |
| **Day 6** | Form validation, search/filter/sort |
| **Day 7** | Bug fixes, responsiveness, deploy, documentation |

---

## 🔧 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- No backend required (uses public Fake Store API)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/phamquanganhHe180656/fef-shoplite-phamquanganh.git
   cd fef-shoplite
   ```

2. **Start a local server:**
   ```
   Run the project:
   Simply open index.html in your browser.
   Recommended: Use the Live Server extension in VS Code for the best experience.
   ```

3. **Open in browser:**
   ```
   http://localhost:5500
   ```

---

## 📚 Key Learning Outcomes

- ✔️ Build semantic, accessible HTML
- ✔️ Design responsive layouts with CSS Grid & Flexbox
- ✔️ Manipulate DOM with vanilla JavaScript
- ✔️ Handle async operations with Fetch API
- ✔️ Persist data with LocalStorage
- ✔️ Validate user input with JavaScript
- ✔️ Deploy to GitHub Pages / Netlify
- ✔️ Version control with Git & GitHub

---

## 🌐 Live Demo
https://phamquanganhhe180656.github.io/fef-shoplite-phamquanganh/
*(Deploy with GitHub Pages, Netlify, or Vercel)*

---

## 📖 API Documentation

### Fake Store API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/products` | Fetch all products |
| GET | `/products/{id}` | Fetch single product |
| GET | `/products/categories` | Fetch all categories |
| GET | `/products/category/{name}` | Filter by category |

**Base URL:** `https://fakestoreapi.com/`  
**Docs:** https://fakestoreapi.com/docs

---

## 💡 Tips for Success

1. **Start with Pass tier** - Get basic features working first
2. **Test responsiveness** - Use DevTools device emulation
3. **Check console** - No errors = professional code
4. **Commit frequently** - Git history shows your process
5. **Clean code** - Use meaningful variable names
6. **Modular JS** - Keep functions focused and reusable
7. **Read docs** - Fake Store API has everything you need

---

## 🤝 Support Resources

- 📖 [MDN Web Docs](https://developer.mozilla.org/)
- 🎓 [FEF Module Handbook](../Lectures/00_Study_Guide_Handbook.md)
- 🔗 [Fake Store API](https://fakestoreapi.com/)
- 📱 [Bootstrap Docs](https://getbootstrap.com/docs/)
- 🚀 [GitHub Pages Deployment](https://pages.github.com/)

---

## 📄 License

This project is part of the **FEF Course** for educational purposes.

---

**Last Updated:** June 2026  
**Author:** Pham Quang Anh  
**Contact:** anhpqhe180656@fpt.edu.vn