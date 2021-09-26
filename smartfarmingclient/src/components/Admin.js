import React, { useLayoutEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Admin.css";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import axios from "axios";
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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import Chart from "./Chart";
import Avatar from "./Avatar";
import Popup from "./Popup";
import { Button, makeStyles } from "@material-ui/core";
import NewChannelForm from "./NewChannelForm";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

// const MapWithAMarker = withScriptjs(withGoogleMap(props =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     <Marker
//       position={{ lat: 9.0438, lng: 38.7612 }}
//     />
//   </GoogleMap>
// ));

// import Iframe from "react-iframe";
const mdTheme = createTheme();

function Admin() {
  const [image, setImage] = useState("");
  const [temperature, setTemperature] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [name, setName] = useState("");
  const [channelData, setChannelData] = useState([]);

  useLayoutEffect(() => {
    axios({
      url: "http://localhost:4000/users/user",
      method: "get",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data.user.idimg);
        setImage(res.data.user.idimg);
      })
      .catch((err) => console.log("Error " + err));
  }, []);

  useLayoutEffect(() => {
    axios({
      url: "https://api.thingspeak.com/channels/1476026/feeds.json?api_key=Y86I2FMYYUQQ7O7Z&results=1",
      method: "get",
    })
      .then((res) => {
        console.log(res.data.feeds[0].field1);
        setTemperature(res.data.feeds[0].field1);
      })
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    axios({ url: "http://localhost:4000/channel", method: "get" }).then(
      (res) => {
        setChannelData(res.data);
      }
    );
  }, []);

  return (
    <>
      <Sidebar>

        <Button color="primary" onClick={() => setOpenPopup(true)}>
          Add new channel
        </Button>
        {channelData.map((items) => {
          const field11 = items.field1;
          const field1 = items.field1[field11.length - 1].val;
          console.log(field1);
          return (
            <Cards
              location={items.name}
              temperature={field1}
              humidity="27"
              moisture="09"
            />
          );
        })}
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title={"Add New Channel"}
        >
          {" "}
          <NewChannelForm />{" "}
        </Popup>
      </Sidebar>
    </>
  );
}

export default Admin;
