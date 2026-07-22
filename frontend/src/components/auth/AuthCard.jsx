import { Paper } from "@mui/material";

function AuthCard({ children }) {
  return (
    <Paper
      elevation={6}
      sx={{
        width: "100%",
        maxWidth: 450,
        p: 4,
        borderRadius: 3,
      }}
    >
      {children}
    </Paper>
  );
}

export default AuthCard;
