# Project Antigravity: Frontend Execution Blueprint

This document provides a comprehensive, step-by-step roadmap for building the React frontend of Project Antigravity. It assumes the Express/Node.js backend is fully operational and focuses entirely on client-side architecture, API integration, and implementing the high-end minimalist design from the reference site.

---

## Phase 1: Project Initialization & Backend Connection

Before touching the visual UI, the fundamental communication bridge between the frontend and the existing backend must be established.

### 1.1 Scaffold the Application
Initialize a fast, modern React environment.
*   **Tool:** Vite (React + JavaScript/TypeScript).
*   **Dependencies:** `@mui/material`, `@emotion/react`, `@emotion/styled`, `axios`, `react-router-dom`, `@reduxjs/toolkit`, `react-redux`.

### 1.2 Environment Configuration
Create a `.env` file at the root of the frontend directory to securely store the backend URL.
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 1.3 Axios Instance Setup (`src/api/axios.js`)
Create a centralized Axios instance. This ensures all outgoing requests automatically point to the correct backend and handle credentials (like JWTs) seamlessly.
*   Configure the `baseURL` using the environment variable.
*   Set up request interceptors to automatically attach the Bearer token from local storage to the `Authorization` header.
*   Set up response interceptors to handle global errors (e.g., 401 Unauthorized for expired tokens).

---

## Phase 2: Inject the Reference Design (Theming)

To achieve the boutique, premium aesthetic (inspired by Thread Clothes), the default Material-UI (MUI) styles must be aggressively overridden.

### 2.1 The Custom Theme (`src/theme/theme.js`)
Use MUI's `createTheme` function to establish the new design system.
*   **Palette:** Remove primary blues. Enforce a strict monochrome palette (deep blacks `#000000`, crisp whites `#FFFFFF`, and muted grays for borders/secondary text).
*   **Typography:** Implement a modern sans-serif font stack (e.g., 'Inter', 'Helvetica Neue'). Strip away heavy font weights from body text.
*   **Component Overrides:**
    *   `MuiButton`: Remove `box-shadow`, set `borderRadius` to `0` or `2px`, enforce solid backgrounds with high-contrast text, and apply uppercase text transformation with slight letter-spacing.
    *   `MuiCard`: Set `elevation` to `0`, remove borders, and set background to transparent to let the images do the talking.
    *   `MuiPaper`: Remove default shadows globally.

### 2.2 Global Implementation
Wrap the root application in `main.jsx` with the `<ThemeProvider>` passing in the newly created custom theme. Apply `<CssBaseline />` to normalize browser styles.

---

## Phase 3: Structural Layout & Routing

With the engine and paint ready, construct the skeleton of the application.

### 3.1 Routing Architecture (`src/routes/AppRoutes.jsx`)
Implement `react-router-dom` to handle navigation without page reloads.
*   **Public Routes:** Home (`/`), Shop/Products (`/products`), Product Details (`/products/:id`).
*   **Auth Routes:** Login (`/auth/login`), Register (`/auth/register`).
*   **Protected Routes:** Cart, Checkout, User Profile.

### 3.2 The Layout Wrapper (`src/layouts/MainLayout.jsx`)
Create a persistent layout wrapper that includes the Navbar and Footer, rendering dynamic page content in the middle via `<Outlet />`.

### 3.3 The Minimalist Navbar (`src/components/layout/Navbar.jsx`)
*   Design a sticky header that transitions from transparent to solid white on scroll.
*   Center the brand name.
*   Use lightweight, thin-stroke SVG icons for Search, Account, and Cart.
*   Implement a smooth sliding `<Drawer>` for mobile navigation instead of clunky dropdowns.

---

## Phase 4: Fetch and Render Data Dynamically

Connect the UI skeleton to the backend data streams. **Crucial Rule:** The UI must remain agnostic. It should blindly render the data provided by the backend (prices, images, names) without hardcoding clothing terminology.

### 4.1 State Management Integration
*   Utilize Redux Toolkit `createAsyncThunk` to fetch data from the backend via the Axios instance.
*   Store the resulting product arrays in the Redux store (`product.slice.js`).

### 4.2 Product Grid & Cards (`src/components/product/ProductCard.jsx`)
*   Map over the product array from Redux.
*   Render images in a tall, fashion-forward aspect ratio (e.g., 3:4).
*   Keep text minimal: Product Name, Brand, and Price aligned to the left.
*   Design the "Add to Cart" interaction to be subtle—perhaps revealing the button only on hover or using a simple `+` icon.

### 4.3 Immersive Product Details (`src/pages/products/ProductDetailsPage.jsx`)
*   **Left Column (Media):** Render a full-bleed, vertically scrolling image gallery of the product.
*   **Right Column (Information):** Create a sticky sidebar that holds the product name, price, description, and a flat, full-width "Add to Cart" button. Space elements generously to mimic high-end editorial design.
