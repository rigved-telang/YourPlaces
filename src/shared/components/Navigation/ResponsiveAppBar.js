import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MapIcon from "@mui/icons-material/Map";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/auth-context";

function ResponsiveAppBar() {
  const auth = React.useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MapIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            YourPlaces
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to="/"
                  >
                    All Users
                  </Link>
                </Typography>
              </MenuItem>

              {auth.isLoggedIn && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/${auth.userId}/places`}
                    >
                      My Places
                    </Link>
                  </Typography>
                </MenuItem>
              )}

              {auth.isLoggedIn && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/places/new"
                    >
                      Add Places
                    </Link>
                  </Typography>
                </MenuItem>
              )}

              {auth.isLoggedIn && (
                <MenuItem onClick={auth.logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}

              {!auth.isLoggedIn && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/auth"
                    >
                      Authenticate
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <MapIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            YourPlaces
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, mx: 2, color: "white", display: "block" }}
            >
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                ALL USERS
              </Link>
            </Button>

            {auth.isLoggedIn && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/${auth.userId}/places`}
                >
                  MY PLACES
                </Link>
              </Button>
            )}

            {auth.isLoggedIn && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/places/new"
                >
                  ADD PLACES
                </Link>
              </Button>
            )}

            {auth.isLoggedIn && (
              <Button
                onClick={auth.logout}
                sx={{ my: 2, mx: 2, color: "white", display: "block" }}
              >
                LOGOUT
              </Button>
            )}

            {!auth.isLoggedIn && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/auth"
                >
                  AUTHENTICATE
                </Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
