import React, { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LayersIcon from "@mui/icons-material/Layers";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";

const logout = () => {
  localStorage.clear();
  localStorage.removeItem("token");
  window.location.pathname = "/";
};
const useStyles = makeStyles(() => ({
  active: {
    backgroundColor: "grey",
  },
}));

console.log(window.location.pathname);

function AdminList() {
  const classes = useStyles();
  return (
    <div>
      <ListItem
        button
        component={Link}
        to="/adminDash"
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/account">
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Account" />
      </ListItem>
      <ListItem button component={Link} to="/active">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Active Requests" />
      </ListItem>
      <ListItem button component={Link} to="/approved">
        <ListItemIcon>
          <ThumbUpIcon />
        </ListItemIcon>
        <ListItemText primary="Approved Requests" />
      </ListItem>
      <ListItem button component={Link} to="/rejected">
        <ListItemIcon>
          <ThumbDownIcon />
        </ListItemIcon>
        <ListItemText primary="Rejected Requests" />
      </ListItem>
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </div>
  );
}

function UserList() {
  return (
    <div>
      <ListItem button component={Link} to="/userDash">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button component={Link} to="/account">
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Account" />
      </ListItem>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </div>
  );
}

// const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );

function MainListItems() {
  const [role, setRole] = useState("");

  useEffect(() => {
    axios({
      url: "http://localhost:4000/users/user",
      method: "get",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data.user.role);
        setRole(res.data.user.role);
      })
      .catch((err) => console.log("Error " + err));
  }, []);

  return role === "admin" ? <AdminList /> : <UserList />;
}

export default MainListItems;
