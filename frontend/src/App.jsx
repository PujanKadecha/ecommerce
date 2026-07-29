import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser, logoutLocal } from "./store/slices/auth.slice";
import theme from "./theme/theme";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    const handleAuthExpired = () => {
      dispatch(logoutLocal());
      toast.error("Your session has expired. Please log in again.");

      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 1500);
    };

    window.addEventListener("auth:expired", handleAuthExpired);
    // return () => window.removeEventListener("auth:expired", handleAuthExpired);
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
