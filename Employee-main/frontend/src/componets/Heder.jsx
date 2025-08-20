
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Icons
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import CloseIcon from "@mui/icons-material/Close";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Heder({ title, lin, tit, li, list = [] }) {
  const theme = useTheme();
  const pages = [...(Array.isArray(list) ? list : [list])];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <Box style={{ position: "relative", zIndex: 1300 }}>
        {/* الشريط العلوي */}
        <Box
          justifyContent="space-between"
          sx={{
            display: "flex",
            backgroundColor: theme.palette.primary.main,
            color: "white",
          }}
        >
          <div style={{ display: "flex", marginLeft: "80px", gap: "10px" }}>
            <FacebookOutlinedIcon />
            <LinkedInIcon />
            <InstagramIcon />
          </div>

          <div style={{ display: "flex", marginRight: "80px", gap: "10px" }}>
            <PhoneOutlinedIcon />
            <p>0 (552) 725 50 51</p>
            <MailOutlinedIcon />
            <p>alaaelden.hamad911@gmail.com</p>
          </div>
        </Box>

        {/* AppBar الرئيسي */}
        <AppBar
          position="relative"
          sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <img
                src="https://mui.com/static/logo.png"
                width="120"
                alt="MUI Logo"
                style={{ marginRight: "20px" }}
              />

              <Link to={li} style={{ textDecoration: "none" }}>
                <Button variant="contained" size="large" sx={{ m: "0 10px" }}>
                  {tit}
                </Button>
              </Link>

              <Link to={lin} style={{ textDecoration: "none" }}>
                <Button variant="contained" size="large" sx={{ m: "0 10px" }}>
                  {title}
                </Button>
              </Link>

              {/* زر قائمة الجوال: يظهر دائما */}
              <Box sx={{ flexGrow: 1, display: "flex",justifyContent:"end" }}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                  color="inherit"
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
              </Box>

              {/* القائمة للـ md وأعلى: مخفية دائما */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: "none",
                  justifyContent: "end",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {pages.map((page, index) => (
                  <Link
                    to={`/${page}`}
                    key={index}
                    style={{ textDecoration: "none" }}
                  >
                    <Button sx={{ my: 2, color: theme.palette.text.primary }}>
                      {page}
                    </Button>
                  </Link>
                ))}
                <IconButton>
                  <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                  <DarkModeOutlinedIcon />
                </IconButton>
              </Box>

              {/* قائمة المستخدم */}
              <Box sx={{ flexGrow: 0 }}>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      {/* Drawer للشاشات الصغيرة (الآن يظهر دائماً على أي شاشة) */}
      <Drawer
  
  anchor="left"
  open={drawerOpen}
  onClose={toggleDrawer(false)}
  PaperProps={{ sx: { width: 250, zIndex: 1400 } }}
  ModalProps={{ style: { zIndex: 1400 } }}
>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="h6">List</Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <NotificationsOutlinedIcon />
          <DarkModeOutlinedIcon />
        </Box>
        <List>
          {(Array.isArray(list) ? list : [list]).map((item, index) => (
            <Link to={`/${item}`} style={{ textDecoration: "none" }} key={index}>
              <ListItem button onClick={toggleDrawer(false)}>
                <ListItemText primary={item} sx={{ textAlign: "center" }} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
}
