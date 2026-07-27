import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
  Outlet,
} from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import GuestRoute from "../components/common/GuestRoute";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import HomePage from "../pages/home/HomePage";
import ProductPage from "../pages/products/ProductPage";
import ProductDetailsPage from "../pages/products/ProductDetailsPage";
import CategoryPage from "../pages/categories/CategoryPage";

import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import ProfilePage from "../pages/profile/ProfilePage";
import OrdersPage from "../pages/orders/OrdersPage";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import NotFoundPage from "../pages/error/NotFoundPage";

import AdminRoute from "../components/common/AdminRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsersPage from "../pages/admin/users/AdminUsersPage";
import AdminProductsPage from "../pages/admin/products/AdminProductsPage";
import AdminCategoriesPage from "../pages/admin/categories/AdminCategoriesPage";
import AdminOrdersPage from "../pages/admin/orders/AdminOrdersPage";

function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "products",
            element: <ProductPage />,
          },
          {
            path: "categories",
            element: <CategoryPage />,
          },
          {
            path: "products/:id",
            element: <ProductDetailsPage />,
          },
          {
            path: "cart",
            element: <CartPage />,
          },
          {
            path: "checkout",
            element: (
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "profile",
            element: (
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "orders",
            element: (
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/auth",
        element: (
          <GuestRoute>
            <AuthLayout />
          </GuestRoute>
        ),
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />,
          },   
        ],
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "users",
            element: <AdminUsersPage />,
          },
          {
            path: "products",
            element: <AdminProductsPage />,
          },
          {
            path: "categories",
            element: <AdminCategoriesPage />,
          },
          {
            path: "orders",
            element: <AdminOrdersPage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
