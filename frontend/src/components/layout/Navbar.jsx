import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputBase,
  Collapse,
  Divider,
} from "@mui/material";
import {
  ShoppingBagOutlined,
  Search,
  Menu,
  Close,
  PersonOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth || {});
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#ffffff",
        color: "#111111",
        borderBottom: "1px solid #e5e5e5",
        boxShadow: "none",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1400,
          width: "100%",
          mx: "auto",
          px: { xs: 2, md: 4 },
          height: 72,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Navigation (Desktop) & Hamburger (Mobile) */}
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <IconButton
            onClick={toggleDrawer}
            edge="start"
            sx={{
              display: { xs: "inline-flex", md: "none" },
              color: "#111111",
              mr: 1,
            }}
          >
            <Menu />
          </IconButton>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
            }}
          >
            <Typography
              component={Link}
              to="/"
              variant="button"
              sx={{
                color: "#111111",
                textDecoration: "none",
                fontWeight: 600,
                letterSpacing: "0.1em",
                "&:hover": { color: "#666666" },
              }}
            >
              Home
            </Typography>

            <Typography
              component={Link}
              to="/products"
              variant="button"
              sx={{
                color: "#111111",
                textDecoration: "none",
                fontWeight: 600,
                letterSpacing: "0.1em",
                "&:hover": { color: "#666666" },
              }}
            >
              Shop
            </Typography>

            <Typography
              component={Link}
              to="/categories"
              variant="button"
              sx={{
                color: "#111111",
                textDecoration: "none",
                fontWeight: 600,
                letterSpacing: "0.1em",
                "&:hover": { color: "#666666" },
              }}
            >
              Categories
            </Typography>
          </Box>
        </Box>

        {/* Center Brand Logo */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 800,
              letterSpacing: "0.15em",
              color: "#000000",
              textDecoration: "none",
              fontSize: { xs: "1.1rem", md: "1.35rem" },
              textTransform: "uppercase",
            }}
          >
            E-Commerce
          </Typography>
        </Box>

        {/* Right Side Icons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: { xs: 1, md: 2 },
            flex: 1,
          }}
        >
          <IconButton
            onClick={() => setSearchOpen(!searchOpen)}
            sx={{ color: "#111111" }}
          >
            <Search fontSize="small" />
          </IconButton>

          {!isAuthenticated ? (
            <IconButton
              component={Link}
              to="/auth/login"
              sx={{ color: "#111111", display: { xs: "none", sm: "inline-flex" } }}
            >
              <PersonOutlined fontSize="small" />
            </IconButton>
          ) : (
            <Button
              component={Link}
              to="/profile"
              variant="text"
              sx={{
                color: "#111111",
                minWidth: "auto",
                px: 1,
                fontSize: "0.75rem",
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              Account
            </Button>
          )}

          <IconButton
            component={Link}
            to="/cart"
            sx={{ color: "#111111" }}
          >
            <Badge
              badgeContent={cartCount}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  fontSize: "0.65rem",
                  minWidth: 16,
                  height: 16,
                },
              }}
            >
              <ShoppingBagOutlined fontSize="small" />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Expandable Search Input Bar */}
      <Collapse in={searchOpen}>
        <Box
          sx={{
            px: { xs: 2, md: 4 },
            py: 1.5,
            backgroundColor: "#fafafa",
            borderTop: "1px solid #e5e5e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: 600,
              borderBottom: "1px solid #000000",
              px: 1,
              py: 0.5,
            }}
          >
            <Search fontSize="small" sx={{ mr: 1, color: "#666666" }} />
            <InputBase
              placeholder="SEARCH PRODUCTS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              autoFocus
              sx={{
                flex: 1,
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
              }}
            />
            <IconButton size="small" onClick={() => setSearchOpen(false)}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Collapse>

      {/* Off-Canvas Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 300,
            backgroundColor: "#ffffff",
            p: 3,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Menu
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 1.5 }}>
            <ListItemButton component={Link} to="/" onClick={toggleDrawer} sx={{ px: 0 }}>
              <ListItemText
                primary="HOME"
                primaryTypographyProps={{ fontWeight: 600, letterSpacing: "0.08em", fontSize: "0.9rem" }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 1.5 }}>
            <ListItemButton component={Link} to="/products" onClick={toggleDrawer} sx={{ px: 0 }}>
              <ListItemText
                primary="SHOP ALL"
                primaryTypographyProps={{ fontWeight: 600, letterSpacing: "0.08em", fontSize: "0.9rem" }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 1.5 }}>
            <ListItemButton component={Link} to="/categories" onClick={toggleDrawer} sx={{ px: 0 }}>
              <ListItemText
                primary="CATEGORIES"
                primaryTypographyProps={{ fontWeight: 600, letterSpacing: "0.08em", fontSize: "0.9rem" }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        <Box>
          {!isAuthenticated ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Button
                component={Link}
                to="/auth/login"
                variant="outlined"
                fullWidth
                onClick={toggleDrawer}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to="/auth/register"
                variant="contained"
                fullWidth
                onClick={toggleDrawer}
              >
                Create Account
              </Button>
            </Box>
          ) : (
            <Button
              component={Link}
              to="/profile"
              variant="contained"
              fullWidth
              onClick={toggleDrawer}
            >
              My Account
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
