import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        p: 2,
      }}
    >
      <Outlet />
    </Box>
  );
}

export default AuthLayout;
