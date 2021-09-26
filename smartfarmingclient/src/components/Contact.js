import React from "react";
import Navbar from "./Navbar";
import "./Contact.css";
import Footer from "./footer";

function Contact() {
  return (
    <div>
      <Navbar />
      <div className="contactus">
        <div className="highlightcontact">Contact Us</div>
        <div className="address">
          5 Kilo, Arada <br />
          Addis Ababa, Ethiopia
        </div>
        <br />
        <br />
        <div className="address">Phone: +25196857489</div>
        <br />
        <div className="address">Email: smartfarmingco@gmail.com</div>
      </div>
      <Footer sx={{ mt: 8, mb: 4 }} />
    </div>
  );
}

export default Contact;
