import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function AuthHeader({ title, subtitle }) {
  return (
    <Box mb={4}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "#111111",
          letterSpacing: "-0.02em",
          mb: 0.75,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: "#888888",
          fontSize: "0.95rem",
          lineHeight: 1.6,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default AuthHeader;
