import React, { useLayoutEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Admin.css";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import axios from "axios";
// import Iframe from "react-iframe";

function Admin() {
  const [image, setImage] = useState("");
  const [temperature, setTemperature] = useState("");

  useLayoutEffect(() => {
    axios({
      url: "http://localhost:4000/users/user",
      method: "get",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data.user.idimg)
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
        setTemperature(res.data.feeds[0].field1)
      })
      .catch((err) => console.log(err));

  }, [])
  
  return (
    <>
      <Sidebar image={image} />
      <div className="position">
        <div className="pagetitle">
          <h3>Dashboard</h3>
        </div>
        <SearchBar />
        {/* <div className="iframestyle">
            <iframe src={reqapi}/>
            </div> */}

        <br />
        <br />
        <Cards
          location="Location 1"
          temperature={temperature}
          humidity="27"
          moisture="09"
        />
        <Cards
          location="Location 2"
          temperature="31.5"
          humidity="20"
          moisture="12"
        />
      </div>
    </>
  );
}

export default Admin;
