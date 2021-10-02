import React, { useLayoutEffect, useEffect, useState } from "react";
import "./User.css";
import Cards from "./Cards";
import { Box } from "@material-ui/core";
import axios from "axios";
import Sidebar from "./Sidebar";

function User() {
  const [image, setImage] = useState("");
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
      .catch((err) => console.log(err));
  }, []);


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


  return (
    <>
      <Sidebar>
      <Box
          component="main"
          sx={{
            position: "relative",
            top: "5rem",
          }}
        >
          
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
                humidity={field22}
                moisture={field33}
              />
            );
          })}
        </Box>
        </Sidebar>
    </>
  );
        }

export default User
