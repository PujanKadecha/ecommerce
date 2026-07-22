import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  InputBase,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { ShoppingCart, Search, Menu } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar
        sx={{
          maxWidth: 1400,
          width: "100%",
          mx: "auto",
          gap: 3,
        }}
      >
        {/* Logo */}

        <Box
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <Menu />
          </IconButton>
        </Box>

        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
          }}
        >
          E-Commerce
        </Typography>

        {/* Navigation */}

        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            gap: 2,
          }}
        >
          <Button component={Link} to="/">
            Home
          </Button>

          <Button component={Link} to="/products">
            Products
          </Button>

          <Button component={Link} to="/categories">
            Categories
          </Button>
        </Box>

        {/* Search */}

        <Paper
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            alignItems: "center",
            px: 2,
            flex: 1,
            maxWidth: 450,
          }}
        >
          <Search />

          <InputBase
            placeholder="Search products..."
            sx={{
              ml: 1,
              flex: 1,
            }}
          />
        </Paper>

        {/* Right Side */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton>
            <Badge badgeContent={0} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {!isAuthenticated ? (
            <>
              <Button component={Link} to="/auth/login">
                Login
              </Button>

              <Button variant="contained" component={Link} to="/auth/register">
                Register
              </Button>
            </>
          ) : (
            <Button variant="contained">Profile</Button>
          )}
        </Box>
      </Toolbar>
      
      <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" onClick={toggleDrawer}>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/products"
                onClick={toggleDrawer}
              >
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/categories"
                onClick={toggleDrawer}
              >
                <ListItemText primary="Categories" />
              </ListItemButton>
            </ListItem>

            {!isAuthenticated && (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/auth/login"
                    onClick={toggleDrawer}
                  >
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/auth/register"
                    onClick={toggleDrawer}
                  >
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
