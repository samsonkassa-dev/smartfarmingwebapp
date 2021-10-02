import React, { useLayoutEffect, useState } from "react";
import UserSidebar from "./UserSidebar";
import Sidebar from "./Sidebar";
import axios from "axios";
import Iframe from "react-iframe";
import { height, sizing } from "@mui/system";
import "./CardDetail.css";
import Charts from "./Charts";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Paper,
  Typography,
  Grid,
  Container,
  Toolbar,
} from "@material-ui/core";
import { WiThermometer, WiHumidity, WiRaindrops } from "weather-icons-react";

function Average() {
  return <div>Something</div>;
}

function CardDetail(props) {
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  // const [temperature, setTemperature] = useState(props.temperature);
  // const [humidity, setHumidity] = useState(props.humidity);

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
        console.log(res.data.user.role);
        setRole(res.data.user.role);
        setImage(res.data.user.idimg);
      })
      .catch((err) => console.log(err));
  }, []);

  // useLayoutEffect(() => {
  //   axios({
  //     url: "https://api.thingspeak.com/channels/1476026/feeds.json?api_key=Y86I2FMYYUQQ7O7Z&results=1",
  //     method: "get",
  //   })
  //     .then((res) => {
  //       console.log(res.data.feeds[0].field1);
  //       setTemperature(res.data.feeds[0].field1)
  //       setHumidity(res.data.feeds[0].field2)
  //     })
  //     .catch((err) => console.log(err));

  // }, [])
  const location = useLocation();

  return (
    <>
      <Sidebar name={location.state.location}>
        <Box style={{top: "80px", position: "relative"}}>
        <Container>
          <Card style={{ backgroundColor: "#f8f9fa", marginBottom: "20px" }}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <Typography variant="h5" component="h2">
                {location.state.location}
              </Typography>
            </Toolbar>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Paper>
                    <Toolbar
                      sx={{
                        display: "flex",
                        px: [1],
                      }}
                    >
                      <WiThermometer size={35} color="#d00000" />
                      Temperature
                      
                    </Toolbar>
                    <Typography
                      variant="h3"
                      style={{ color: "#d00", textAlign: "center" }}
                      noWrap
                    >
                      {location.state.temperature}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper>
                    <Toolbar
                      sx={{
                        display: "flex",

                        px: [1],
                      }}
                    >
                      <WiRaindrops size={35} color="#0077b6" />
                      Moisture
                    </Toolbar>
                    <Typography
                      variant="h3"
                      style={{ color: "#4cc9f0", textAlign: "center" }}
                    >
                      {location.state.moisture}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper>
                    <WiHumidity size={35} color="#023e8a" />
                    Humidity
                    <Typography
                      variant="h3"
                      style={{ color: "#0077b6", textAlign: "center" }}
                    >
                      {location.state.humidity}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
        <Charts channelname={location.state.location} />
        {/* <div className="pagetitle">
            <h3>Location 1</h3>
          </div>
          <div className="cards">
            <div className="card">
              <div className="card__icon">
                {" "}
                <WiThermometer size={35} color="#d00000" />
              </div>
              <div className="card__title">Temperature</div>
              <div className="card__content">{location.state.temperature}</div>
            </div>
            <div className="card">
              <div className="card__icon">
                <WiRaindrops size={35} color="#0077b6" />
              </div>
              <div className="card__title">Moisture</div>
              <div className="card__content">{location.state.moisture}</div>
            </div>
            <div className="card">
              <div className="card__icon">
                {" "}
                <WiHumidity size={35} color="#023e8a" />
              </div>
              <div className="card__title">Humidity</div>
              <div className="card__content">{location.state.humidity}</div>
            </div>
          </div>
           */}

        {/* <Box
          p={10}
            sx={{
              height: '25%',
            }}
            style={{
              height: '5%'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Charts />
              </Grid>
              <Grid item xs={4}>
                <Charts />
              </Grid>
              <Grid item xs={4}>
                <Charts />
              </Grid>
            </Grid>
          </Box> */}
          </Box>
      </Sidebar>
    </>
  );
}

export default CardDetail;
