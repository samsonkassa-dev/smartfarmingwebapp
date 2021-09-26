import React from "react";
import "./Cards.css";
import {
  Box,
  Card,
  CardContent,
  Paper,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import { WiThermometer, WiHumidity, WiRaindrops } from "weather-icons-react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useHistory } from "react-router";

function Cards(props) {
  const history = useHistory();
  return (
    <>
      <Container>
        <Card style={{backgroundColor: '#f8f9fa', marginBottom: '20px'}}>
          <Typography variant="h5" component="h2">
            {props.location}
          </Typography>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Paper>
                  <WiThermometer size={35} color="#d00000" />
                  Temperature
                  <Typography variant="h3"
                  noWrap>
                    {props.temperature}
                   </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <WiRaindrops size={35} color="#0077b6" />
                  Moisture
                  <div style={{ color: "#4cc9f0", fontSize: "25px" }}>
                    {props.moisture}
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <WiHumidity size={35} color="#023e8a" />
                  Humidity
                  <div style={{ color: "#0077b6", fontSize: "25px" }}>
                    {" "}
                    {props.humidity}
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      {/* <div className="wrapperr">
        <div className="card__location">
          {props.location}{" "}
          <span className="morecss" onClick={() => history.push("/card")}>
            <MoreHorizIcon />
          </span>
        </div>

        <div className="cards">
          <div className="card">
            <div className="card__icon">
              {" "}
              <WiThermometer size={35} color="#d00000" />
            </div>
            <div className="card__title">Temperature</div>
            <div className="card__content">{props.temperature}</div>
          </div>
          <div className="card">
            <div className="card__icon">
              <WiRaindrops size={35} color="#0077b6" />
            </div>
            <div className="card__title">Moisture</div>
            <div className="card__content">{props.moisture}</div>
          </div>
          <div className="card">
            <div className="card__icon">
              {" "}
              <WiHumidity size={35} color="#023e8a" />
            </div>
            <div className="card__title">Humidity</div>
            <div className="card__content">{props.humidity}</div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Cards;
