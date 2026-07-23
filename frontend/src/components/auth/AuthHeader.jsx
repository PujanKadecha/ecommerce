import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function AuthHeader({ title, subtitle }) {
  return (
    <Box mb={3} textAlign="center">
      <Typography variant="h4" fontWeight="bold">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          E-Commerce
        </Link>
      </Typography>

      <Typography variant="h5" mt={2}>
        {title}
      </Typography>

      <Typography color="text.secondary">{subtitle}</Typography>
    </Box>
  );
}

export default AuthHeader;
