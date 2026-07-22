import { Typography, Box } from "@mui/material";

function AuthHeader({ title, subtitle }) {
  return (
    <Box mb={3} textAlign="center">
      <Typography variant="h4" fontWeight="bold">
        E-Commerce
      </Typography>

      <Typography variant="h5" mt={2}>
        {title}
      </Typography>

      <Typography color="text.secondary">{subtitle}</Typography>
    </Box>
  );
}

export default AuthHeader;
