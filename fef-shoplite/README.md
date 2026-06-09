# ShopLite - Mini E-Commerce Project

> **Module:** FEF (Nền tảng Front-End)  
> **Duration:** 1 week  
> **Status:** ⚙️ Development

A fully functional e-commerce website built entirely on the client-side using **vanilla JavaScript**, **HTML5**, **CSS3**, and **Bootstrap 5**.

---

## 🎯 Project Overview

**ShopLite** is a multi-page shopping application that demonstrates foundational front-end development skills:
- Semantic HTML structure
- Responsive CSS layouts (Flexbox/Grid)
- Vanilla JavaScript DOM manipulation
- Fetch API for real-time data
- LocalStorage for cart persistence
- Form validation

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
├── index.html              # Home page - Product listing
├── product.html            # Detail page - Single product view
├── cart.html               # Shopping cart
├── register.html           # User registration form
├── css/
│   └── style.css           # Main stylesheet (responsive)
├── js/
│   ├── api.js              # Shared Fetch API functions
│   ├── utils.js            # Utility functions (format, notify)
│   ├── cart.js             # Cart logic & localStorage
│   ├── main.js             # Home page logic
│   ├── detail.js           # Product detail logic
│   └── auth.js             # Form validation
├── assets/                 # Images, icons (when downloaded)
└── README.md
```

---

## 🚀 Technologies Used

| Category | Technology |
|----------|-----------|
| **Markup** | HTML5 (Semantic tags) |
| **Styling** | CSS3, Bootstrap 5, Responsive Design |
| **Scripting** | Vanilla JavaScript (ES6+) |
| **API** | Fetch API with `async/await` |
| **Storage** | LocalStorage |
| **Data Source** | Fake Store API (`https://fakestoreapi.com/`) |

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

## ✅ Scoring Rubric (0-10)

### Pass Tier (0-6 points)
- ✅ All 4 pages linked via navbar (1.0)
- ✅ Semantic HTML structure (1.0)
- ✅ Home page fetches & renders products (1.5)
- ✅ Detail page displays correct product (1.0)
- ✅ Registration form validation (1.0)
- ✅ Basic mobile responsiveness (0.5)

### Good Tier (+1-2 points)
- ✅ Full cart functionality with localStorage (1.0)
- ✅ Search & filter by category (0.5)
- ✅ Loading/error states (0.3)
- ✅ Clean Flexbox/Grid layout (0.2)

### Excellent Tier (+1-2 points)
- 🎯 Event delegation for dynamic items (0.5)
- 🎯 Combined search + filter + sort (0.5)
- 🎯 Cart count badge synced (0.3)
- 🎯 Pagination/load more (0.3)
- 🎯 Skeleton loaders, toast notifications (0.2)
- 🎯 High-quality, modular code (0.2)

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
   git clone https://github.com/username/fef-shoplite-yourname.git
   cd fef-shoplite
   ```

2. **Start a local server:**
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using Node.js (http-server)
   npx http-server

   # Or open index.html directly in browser
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
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

Coming soon! 🚀  
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

## 🎓 Academic Integrity

- ✅ You may use AI/Google to learn and debug
- ✅ You must understand and explain every line of code
- ⚠️ Copying from peers = 0 for both parties
- 📝 Be prepared for code defense (viva)

---

## 📦 Submission Checklist

- [ ] Source code pushed to GitHub
- [ ] Demo deployed (GitHub Pages/Netlify)
- [ ] README includes screenshots
- [ ] Local run instructions included
- [ ] Features marked (Pass/Good/Excellent)
- [ ] All 4 pages functional
- [ ] No console errors
- [ ] Git history with clear commits

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

**Last Updated:** June 2024  
**Author:** Pham Quang Anh  
**Contact:** info@shoplite.com
