import React, { useLayoutEffect, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Admin.css";
import AddIcon from '@mui/icons-material/Add';
import Cards from "./Cards";
import axios from "axios";
import {  createTheme } from "@mui/material/styles";
import Popup from "./Popup";
import { Button, makeStyles, Box } from "@material-ui/core";
import NewChannelForm from "./NewChannelForm";

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

// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

function Admin() {
  const [image, setImage] = useState("");
  const [temperature, setTemperature] = useState("");
  const [moisture, setMoisture] = useState("");
  const [humidity, setHumidity] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [name, setName] = useState("");
  const [channelData, setChannelData] = useState([]);
  const [mock, setMock] = useState("");

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

  // useLayoutEffect(() => {
  //   axios({
  //     url: "https://api.thingspeak.com/channels/1476026/feeds.json?api_key=Y86I2FMYYUQQ7O7Z&results=1",
  //     method: "get",
  //   })
  //     .then((res) => {
  //       console.log(res.data.feeds[0].field1);
  //       setTemperature(res.data.feeds[0].field1);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    const interval = setInterval(getChartData, 5000);
    return () => clearInterval(interval);
  }, []);

  function getChartData(){
    axios({ url: "http://localhost:4000/channel", method: "get" }).then(
      (res) => {
        console.log(res.data);
        setChannelData(res.data);
      }
    );
    // console.log("hello")
  }

  // useLayoutEffect(() => {
  //   axios({ url: "http://localhost:4000/channel", method: "get" }).then(
  //     (res) => {
  //       console.log(res.data);
  //       setChannelData(res.data);
  //     }
  //   );
  // });
    // .then(

    //     // const interval = setInterval(() => {

    //     // }, 1000);
    //     // return () => clearInterval(interval);

    //   })

  return (
    <>
      <Sidebar>
        <Box
          component="main"
          sx={{
            position: "relative",
            top: "5rem",
            alignItems: "center",
          }}
        >
          <Button style={{backgroundColor: "green", color: "#fff", margin: "20px", marginLeft: "28px"}} onClick={() => setOpenPopup(true)}>
           <AddIcon/> Add new channel
          </Button>
          {channelData.map((items) => {
            const field11 = items.field1;
            const field1 = items.field1[field11.length - 1].val;
            const field2 = items.field2;
            const field22 = items.field2[field2.length - 1].val;
            const field3 = items.field3;
            const field33 = items.field3[field3.length - 1].val;
            return (
              <Cards
                location={items.name}
                temperature={field1}
                humidity={field33}
                moisture={field22}
              />
            );
          })}
        </Box>
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
