import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function SellerRoute() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user?.role !== "admin" && user?.role !== "seller") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default SellerRoute;
