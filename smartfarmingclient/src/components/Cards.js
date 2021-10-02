import React, { useEffect, useState } from "react";
import "./Cards.css";
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
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useHistory } from "react-router";

function Cards(props) {
  const history = useHistory();
  const [name, setName] = useState(props.location);
  const [temp, setTemp] = useState(props.temperature);
  const [moisture, setMoisture] = useState(props.moisture);
  const [humid, setHumid] = useState(props.humidity);

  const [tempInd, setTempInd] = useState("");
  const [humidInd, setHumidInd] = useState("");
  const [moistInd, setMoistInd] = useState("");

  useEffect(() => {
    if (temp <= 25) {
      setTempInd("Low");
    } else if (temp >= 50) {
      setTempInd("High");
    } else {
      setTempInd("Moderate");
    }
  }, []);

  useEffect(() => {
    if (moisture <= 700) {
      setMoistInd("Wet");
    } else if (moisture >= 800) {
      setMoistInd("Dry");
    } else {
      setMoistInd("Moderate");
    }
  }, []);

  const getMoistureData = () => {
    if (moistInd === "Dry") {
      return (
        <Typography
          style={{ marginLeft: "120px", fontSize: "12px", color: "red" }}
        >
          {moistInd}
        </Typography>
      );
    } else if (moistInd === "Wet") {
      return (
        <Typography
          style={{ marginLeft: "120px", fontSize: "12px", color: "yellow" }}
        >
          {moistInd}
        </Typography>
      );
    } else {
      return (
        <Typography
          style={{ marginLeft: "120px", fontSize: "12px", color: "blue" }}
        >
          {moistInd}
        </Typography>
      );
    }
  };

  const getTempData = () => {
    if (tempInd === "Low") {
      return (
        <Typography
          style={{ marginLeft: "120px", fontSize: "12px", color: "Low" }}
        >
          {tempInd}
        </Typography>
      );
    } else if (tempInd === "High") {
      return (
        <Typography
          style={{ marginLeft: "120px", fontSize: "12px", color: "red" }}
        >
          {tempInd}
        </Typography>
      );
    } else {
      return (
        <Typography
          style={{ marginLeft: "120px", fontSize: "12px", color: "blue" }}
        >
          {tempInd}
        </Typography>
      );
    }
  };

  return (
    <>
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
              {name}
            </Typography>
            <span
              className="morecss"
              onClick={() =>
                history.push({
                  pathname: "/card",
                  state: {
                    location: name,
                    temperature: temp,
                    humidity: humid,
                    moisture: moisture,

                  },
                })
              }
            >
              <MoreHorizIcon />
            </span>
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
                    {getTempData()}
                  </Toolbar>
                  <Typography
                    variant="h3"
                    style={{ color: "#d00", textAlign: "center" }}
                    noWrap
                  >
                    {props.temperature}
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
                    {getMoistureData()}
                  </Toolbar>
                  <Typography
                    variant="h3"
                    style={{ color: "#4cc9f0", textAlign: "center" }}
                  >
                    {props.moisture}
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
                    {props.humidity}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Cards;
