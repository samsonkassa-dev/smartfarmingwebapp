import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";

function Charts(props) {
  const [chartTempData, setTempChartData] = useState([]);
  const [chartHumidData, setHumidChartData] = useState([]);
  const [chartMoistureData, setMoistureChartData] = useState([]);
  useEffect(() => {
    axios({
      url: `http://localhost:4000/channel/${props.channelname}`,
      method: "get",
    }).then((res) => {
      // console.log(res.data);
      setTempChartData(res.data.field1);
      setHumidChartData(res.data.field2);
      setMoistureChartData(res.data.field3);
    });
  }, []);

  const tempvalues = [];

  const dates = [];

  chartTempData.map((it) => {
    const date = new Date(it.date);
    console.log(date)
    var d = date.toString();
    var dd = d.substr(0, 23);
    var ddd = dd.substr(0, 10);
    var time = dd.substr(16, 20);
    var datetime = ddd + " " + time;
    // console.log(datetime);
    tempvalues.push(it.val);
    dates.push(time);
  });

  // var sum = 0;
  // for (var i = 0; i < tempvalues.length; i++) {
  //   sum = parseInt(tempvalues[i]) + sum;
  // }

  // var tempAvg = (sum / tempvalues.length).toFixed(2);

  const humidityvalues = [];

  chartHumidData.map((it) => {
    // console.log(it.date);
    const date = new Date(parseInt(it.date));
    var d = date.toString();
    var dd = d.substr(0, 23);
    var ddd = dd.substr(0, 10);
    var time = dd.substr(16, 20);
    var datetime = ddd + " " + time;
    dates.push(time);
    // console.log(datetime);
    humidityvalues.push(it.val);
  });

  // var sum = 0;
  // for (var i = 0; i < humidityvalues.length; i++) {
  //   sum = parseInt(humidityvalues[i]) + sum;
  // }

  // var humidAvg = (sum / humidityvalues.length).toFixed(2);

  const moisturevalues = [];

  chartMoistureData.map((it) => {
  
    const date = new Date(parseInt(it.date));
    var d = date.toString();
    var dd = d.substr(0, 23);
    var ddd = dd.substr(0, 10);
    var time = dd.substr(16, 20);
    var datetime = ddd + " " + time;
    dates.push(time);
    moisturevalues.push(it.val);
    
  });

  // var sum = 0;
  // for (var i = 0; i < moisturevalues.length; i++) {
  //   sum = parseInt(moisturevalues[i]) + sum;
  // }

  //var moistAvg = (sum / moisturevalues.length).toFixed(2);
  //  console.log(dates)
  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          <Line
          
            data={{
              labels: dates,
              datasets: [
                {
                  label: "Temperature",
                  data: tempvalues,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Line
            data={{
              labels: dates,
              datasets: [
                {
                  label: "Humidity",
                  data: humidityvalues,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Line
            data={{
              labels: dates,
              datasets: [
                {
                  label: "Moisture",
                  data: moisturevalues,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </Grid>
      </Grid>
      {/* <Grid container>
        <Grid item xs={4}>
          <div style={{textAlign: 'center', marginTop: '20px'}}>
            Average temperature
           
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{textAlign: 'center', marginTop: '20px'}}>
            Average Moisture
            
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{textAlign: 'center', marginTop: '20px'}}>
            Average Humidity
           
          </div>
        </Grid>
      </Grid> */}
    </div>
  );
}

export default Charts;
