import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      light: "#333333",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
      light: "#ffffff",
      dark: "#e5e5e5",
      contrastText: "#000000",
    },
    success: {
      main: "#16a34a",
      light: "#dcfce7",
      dark: "#15803d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#d97706",
      light: "#fef3c7",
      dark: "#b45309",
      contrastText: "#ffffff",
    },
    info: {
      main: "#0284c7",
      light: "#e0f2fe",
      dark: "#0369a1",
      contrastText: "#ffffff",
    },
    error: {
      main: "#dc2626",
      light: "#fee2e2",
      dark: "#b91c1c",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#fafafa",
    },
    text: {
      primary: "#111111",
      secondary: "#666666",
    },
    divider: "#e5e5e5",
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.03em",
      textTransform: "uppercase",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      textTransform: "uppercase",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
    subtitle1: {
      letterSpacing: "0.02em",
      color: "#666666",
    },
    button: {
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: "0.08em",
      fontSize: "0.8125rem",
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "none",
          padding: "12px 28px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "none",
            opacity: 0.9,
          },
        },
        containedPrimary: {
          backgroundColor: "#000000",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#222222",
          },
        },
        outlinedPrimary: {
          borderColor: "#000000",
          color: "#000000",
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
            backgroundColor: "#000000",
            color: "#ffffff",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 0,
          border: "none",
          backgroundColor: "transparent",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor: "#ffffff",
          color: "#111111",
          borderBottom: "1px solid #e5e5e5",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 600,
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            "& fieldset": {
              borderColor: "#e5e5e5",
            },
            "&:hover fieldset": {
              borderColor: "#111111",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#000000",
              borderWidth: "1.5px",
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #f0f0f0",
        },
        head: {
          fontWeight: 700,
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          transition: "all 0.15s ease",
        },
      },
    },
  },
});

export default theme;
