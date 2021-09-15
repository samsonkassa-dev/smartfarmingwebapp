import React, { useLayoutEffect, useState } from "react";
import UserSidebar from "./UserSidebar";
import Sidebar from "./Sidebar";
import axios from "axios";
import Iframe from "react-iframe";
import './CardDetail.css'
import { WiThermometer, WiHumidity, WiRaindrops } from "weather-icons-react";

function CardDetail(props) {
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");

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

  return (
    <>
      {role === "admin" ? (
        <Sidebar image={image} />
      ) : (
        <UserSidebar image={image} />
      )}
      <div className="position">
        <div className="pagetitle">
          <h3>Location 1</h3>
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
        <div className="graphs">
          <div className="charts">
            Temperature
            <Iframe
              width="450"
              height="250"
              url="https://thingspeak.com/channels/1476026/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15&api_key=Y86I2FMYYUQQ7O7Z"
            />
            </div>
            <div className="charts">
              Humidity
            <Iframe
              width="450"
              height="250"
              url="https://thingspeak.com/channels/1476026/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15&api_key=Y86I2FMYYUQQ7O7Z"
            />
            </div>
        </div>
      </div>
    </>
  );
}

export default CardDetail;
