# Project Antigravity: Frontend Redesign Strategy

## 1. Project Overview
This document outlines the frontend redesign plan for **Project Antigravity**. The goal is to completely overhaul the visual design of the existing React/Material-UI frontend to match the aesthetic and user experience (UX) of [Thread Clothes](https://threadclothes.com/), while maintaining the application as a **general-purpose E-commerce platform**. 

**Crucially, the store will not be hardcoded to sell clothes.** The reference site is purely for design inspiration (layout, typography, spacing, and animations).

## 2. Strict Constraints
*   **Backend Immutable:** **Zero changes** are to be made to the Node.js/Express backend. The existing API routes, controllers, models, and database schema will remain exactly as they are.
*   **General E-commerce Data:** No clothing-specific terminology (e.g., sizes, fabrics) should be hardcoded into the UI. The frontend must dynamically render whatever data the backend provides (e.g., electronics, books, accessories, or generic items).
*   **Existing State Management:** Continue using the existing Redux Toolkit slices (`auth.slice.js`, `cart.slice.js`, `product.slice.js`, etc.) and Axios instance (`api/axios.js`).

## 3. Design System & Theming (Material UI)
To match the modern, sleek aesthetic of the target reference, the global Material-UI theme needs a complete override. 

*   **Color Palette:** Shift from the current default blue (`#1976d2`) to a minimalist palette. Use deep blacks, crisp whites, and muted grays for accents.
*   **Typography:** Implement a clean, modern sans-serif font (e.g., Inter, Helvetica Neue, or a Google Font like Montserrat). Remove heavy font weights from standard text; use bold only for stark contrast on headers.
*   **Component Overrides (in `theme.js`):**
    *   *Buttons:* Remove heavy drop shadows. Use flat, sharp-cornered (or slightly rounded) buttons with solid dark backgrounds and white text, mimicking modern boutique sites.
    *   *Cards:* Remove the default MUI elevation/shadows. Use flat, borderless cards with high-quality imagery.

## 4. Component-by-Component Redesign Plan

### 4.1. Navigation (`Navbar.jsx`)
*   **Current State:** Standard MUI AppBar with blue styling.
*   **Target Design:** A transparent or crisp white sticky header.
*   **Action Items:**
    *   Center the logo ("E-Commerce" or brand name).
    *   Move navigation links (Home, Products, Categories) to the left or distribute them evenly.
    *   Use sleek, thin-line icons for Search, User, and Cart.
    *   Implement an off-canvas sidebar (Drawer) for the mobile menu that slides smoothly, replacing the standard dropdowns.

### 4.2. Home Page (`HomePage.jsx`)
*   **Current State:** Blue gradient hero banner and icon-based category cards.
*   **Target Design:** Immersive, full-width aesthetic.
*   **Action Items:**
    *   **Hero Section (`HeroBanner.jsx`):** Remove the blue gradient. Implement a full-width, edge-to-edge image or video background with a stark, bold typography overlay and a minimalist "Shop Now" call-to-action button.
    *   **Categories (`CategoriesSection.jsx`):** Replace the Material icons (Laptop, Phone) with high-quality, aesthetic image blocks. The grid should be tight with minimal gaps, using image overlays for category names.
    *   **Featured Products (`FeaturedProducts.jsx`):** Display as a clean grid (e.g., 4 columns on desktop). 

### 4.3. Product Grid & Cards (`ProductCard.jsx`)
*   **Current State:** Outlined cards with a blue price tag and standard "Add to Cart" button.
*   **Target Design:** High-fashion/boutique display.
*   **Action Items:**
    *   Remove all card borders and shadows.
    *   Increase the image height ratio (e.g., 3:4 or 4:5 aspect ratio) to give a premium feel.
    *   Hide the "Add to Cart" button until hover, or simplify it to a sleek icon.
    *   Align product name and price to the left or center with a minimalist font.

### 4.4. Product Details Page (`ProductDetailsPage.jsx` & `ProductInfo.jsx`)
*   **Current State:** Standard 50/50 split grid with basic tabs.
*   **Target Design:** Immersive product storytelling.
*   **Action Items:**
    *   **Gallery:** Implement a sleek, vertical scrolling image gallery or a clean carousel without bulky arrow buttons. 
    *   **Product Info:** Make the right-side info sticky on scroll. Use generous whitespace.
    *   **Buttons:** Make the "Add To Cart" button full-width, black, and flat.

## 5. Development Workflow
1.  **Environment:** Ensure `VITE_API_URL=http://localhost:5000/api/v1` is correctly set in the `.env` file to maintain backend connectivity.
2.  **Theme Initialization:** Create a `src/theme/theme.js` file to centralize the MUI overrides.
3.  **Iterative Styling:** Start with global layout components (`MainLayout.jsx`, `Navbar.jsx`, `Footer.jsx`), then move to the Home Page, and finally the Product Listing and Detail pages.
4.  **Testing:** Verify that adding items to the cart, viewing categories, and authenticating still trigger the correct Redux actions and API calls without errors.
