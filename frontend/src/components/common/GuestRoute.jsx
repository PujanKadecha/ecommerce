import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function GuestRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default GuestRoute;
