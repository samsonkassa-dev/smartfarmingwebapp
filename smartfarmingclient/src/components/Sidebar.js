import React, {  useEffect, useState } from "react";
import "./Sidebar.css";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainListItems from "./listItems";
import AppLogo from "../images/logo22.png";
import {  makeStyles } from "@material-ui/core";
import axios from 'axios'
import Avatar from './Avatar'

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const renderSwitch = (param) => {
  switch (window.location.pathname) {
    case "/userDash":
      return "Dashboard";
    case "/card":
      return `${param}`;
    case "/adminDash":
      return "Dashboard";
    case "/active":
      return "Active Requests";
    case "/rejected":
      return "Rejected Requests";
    case "/approved":
      return "Approved Request";
    case "/account":
      return "Manage Account";
    case "/requestpage":
      return "Request Detail";
    case "/rejectedpage":
      return "Request Detail";
    case "/approvedpage":
      return "Request Detail";
    default:
      break;
  }
};
function Sidebar(props) {
  const useStyles = makeStyles(() => ({
    appBar: {
      backgroundColor: "red",
    },
  }));

  const { children } = props;
  const [open, setOpen] = useState(true);
  const [image, setImage] = useState("")
  const toggleDrawer = () => {
    setOpen(!open);
    <Avatar />
  };

  useEffect(()=> {
    axios({
      url: "http://localhost:4000/users/user",
      method: "get",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        setImage(res.data.user.idimg);
      })
      .catch((err) => console.log(err));
  },)

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          style={{ backgroundColor: "#1c6a2f" }}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {renderSwitch(props.name)}
            </Typography>
            <IconButton color="inherit">
              <img src={AppLogo} alt="alt" width="30" />
              {/* <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge> */}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <div style={!open ? {display: 'none'} : {}}>
          <Avatar avatarimg = {image}/>
          </div>
          <Divider />
          <List>
            <MainListItems />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Sidebar;
