import React from "react";
import Navbar from "./Navbar";
import LineImage from "../images/line1.png";
import SFImage from "../images/smartfarming.jpg";
import "./About.css";
import Footer from "./footer";

function About() {
  return (
    <div>
      <Navbar />
      <div className="line">
        <img className="lineimage" src={LineImage} alt="Line" />
      </div>
      <div className="aboutwrapper">
        <div className="sfwrapper">
          <img className="sfimage" src={SFImage} alt="smartfarming" />
        </div>
        <div className="para">
          <p>
           <span className="highlight"> SmartFarm</span>, was founded by a team of agriculture experts. SmartFarm
            harnesses the power of technology alongside both know-how and the
            experience necessary for optimizing dairy farms around the world.
            Utilizing cloud-based technologies SmartFarm is able to help farmers
            minimize their costs and optimize their productivity which enables
            farmers to grow their business and increase profit.
          </p>
          <div className="highlight">Our Mission</div> To provide medium- to large-scale farmers with precision
          irrigation monitoring and control systems that will revolutionize
          their ability to conserve water and energy, improve crop yields, and
          reduce labor and equipment maintenance costs.
        </div>
      </div>
      <Footer sx={{ mt: 8, mb: 4 }}  />
    </div>
  );
}

export default About;
