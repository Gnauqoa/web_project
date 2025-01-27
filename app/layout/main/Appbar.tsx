import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useOptionalUser } from "~/utils/user";
import { getUserImgSrc } from "~/utils/misc";
import { useNavigate } from "@remix-run/react";
import { PATH_PAGE } from "~/config/path";
import useLogout from "~/hooks/useLogout";
import SearchBar from "./QuestionDetail/SearchBar";
import { Stack } from "@mui/material";

const pages = [
  { title: "Home", path: () => PATH_PAGE.root },
  { title: "Questions", path: PATH_PAGE.user.question },
  { title: "Answers", path: PATH_PAGE.user.answer },
];

function ResponsiveAppBar() {
  const user = useOptionalUser();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const logout = useLogout();
  const settings = [
    {
      title: "Profile",
      onClick: () => navigate(PATH_PAGE.user.root(user?.id || "")),
    },
    { title: "Logout", onClick: () => logout() },
  ];

  const navigate = useNavigate();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ px: 2 }}>
      <Toolbar disableGutters>
        <div
          onClick={() => navigate(PATH_PAGE.root)}
          className="flex flex-row items-center cursor-pointer"
        >
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
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
            WEBPACK
          </Typography>
        </div>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <AdbIcon
              onClick={() => navigate(PATH_PAGE.root)}
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
          </IconButton>
          <Menu
            disableScrollLock={true}
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
            {pages.map((page) => (
              <MenuItem
                key={page.title}
                onClick={() => {
                  navigate(page.path(user?.id || ""));
                  handleCloseNavMenu();
                }}
              >
                <Typography textTransform={"none"} textAlign="center">
                  {page.title}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page.title}
              onClick={() => {
                navigate(page.path(user?.id || ""));
                handleCloseNavMenu();
              }}
              sx={{
                textTransform: "none",
                my: 2,
                color: "white",
                display: "block",
              }}
            >
              {page.title}
            </Button>
          ))}
        </Box>
        <SearchBar />
        <Stack>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={getUserImgSrc(user?.avatarId)} />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting.title}
                onClick={() => {
                  setting.onClick();
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">{setting.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
