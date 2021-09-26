import React, { useEffect, useState } from "react";
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
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MainListItems from "./listItems";
import Chart from "./Chart";
import Avatar from "./Avatar";
import Popup from "./Popup";
import axios from "axios";
import AppLogo from '../images/logo2.png'
import { Button, makeStyles } from "@material-ui/core";

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

const renderUserSwitch = () => {
  switch (window.location.pathname) {
    case "/userDash":
      return "Dashboard";
      break;
    case "/userAccount":
      return "Manage Account";
      break;
    default:
      break;
  }
};

const renderSwitch = () => {
  switch (window.location.pathname) {
    case "/userDash":
      return "Dashboard";
      break;
    case "/adminDash":
      return "Dashboard";
      break;
    case "/active":
      return "Active Requests";
      break;
    case "/rejected":
      return "Rejected Requests";
      break;
    case "/approved":
      return "Approved Request";
      break;
    case "/account":
      return "Manage Account";
      break;
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


  const classes = useStyles();
  const { children } = props;
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
              {renderSwitch()}
            </Typography>
            <IconButton color="inherit">
              <img src ={AppLogo} alt="alt" width="96" />
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
          <Divider />
          <List>
            <MainListItems />
          </List>
        </Drawer>

        {/* <div className="sidebar">
      <Avatar imageAvatar={props.image} />
      <hr className="linesep" />
      <ul className="sidebarlist">
        <li
          className="row"
          id={window.location.pathname === "/adminDash" ? "active" : ""}
          onClick={() => {
            window.location.pathname = "/adminDash";
          }}
        >
          <div id="icon">
            <DashboardIcon />
          </div>
          <div id="title">Dashboard</div>
        </li>
        <li
          className="row"
          id={window.location.pathname === "/account" ? "active" : ""}
          onClick={() => {
            window.location.pathname = "/account";
          }}
        >
          <div id="icon">
            <AccountBoxIcon />
          </div>
          <div id="title">Manage account</div>
        </li>
        <li
          className="row"
          id={window.location.pathname === "/active" ? "active" : ""}
          onClick={() => {
            window.location.pathname = "/active";
          }}
        >
          <div id="icon">
            <DashboardIcon />
          </div>
          <div id="title">Active requests</div>
        </li>
        <li
          className="row"
          id={window.location.pathname === "/approved" ? "active" : ""}
          onClick={() => {
            window.location.pathname = "/approved";
          }}
        >
          <div id="icon">
            <ThumbUpIcon />
          </div>
          <div id="title">Approved requests</div>
        </li>
        <li
          className="row"
          id={window.location.pathname === "/rejected" ? "active" : ""}
          onClick={() => {
            window.location.pathname = "/rejected";
          }}
        >
          <div id="icon">
            <ThumbDownIcon />
          </div>
          <div id="title">Rejected requests</div>
        </li>
        <li
          className="row"
          id={window.location.pathname === "/" ? "active" : ""}
          onClick={logout}
        >
          <div id="icon">
            <ExitToAppIcon />
          </div>
          <div id="title">Log out</div>
        </li> */}
        {/* {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              onClick={() => {
                window.location.pathname = val.link;
              }}
              id={window.location.pathname === val.link ? "active" : ""}
              className="row"
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })} */}
        {/* </ul>
    </div> */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.white
                : theme.palette.grey[900],
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
