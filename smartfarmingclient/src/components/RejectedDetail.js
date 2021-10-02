import React, { useLayoutEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./ActiveRequestPage.css";
import { useHistory } from "react-router";
import "./ActiveRequestPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RejectedDetail(props) {
  const [image, setImage] = useState("")
  const req = props.location.state.rejected;
  let history = useHistory();

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
        setImage(res.data.user.idimg)
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteRequest = (req) => {
    console.log("Inside deletion method");
    axios.delete(`http://localhost:4000/rejected/${req._id}`).then((res) => {
      toast.configure();
      toast.success("Request Deleted!", {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
      });
      console.log("Request Deleted!");
      console.log(res);
    });
  };

  const handleCancelButton = () => {
    history.push("/rejected");
  };
  return (
    <>
      <Sidebar >
      <div className="position">
        <div className="pagetitle">
          <h3>Rejected Request Detail</h3>
        </div>
        <div className="detailcss">
          <div className="partone">
            <div className="itemdetail">
              <strong>First Name:</strong>
              <span>{" " + props.location.state.rejected.firstname}</span>
            </div>
            <div className="itemdetail">
              <strong>Last Name:</strong>
              {" " + props.location.state.rejected.lastname}
            </div>
            <div className="itemdetail">
              <strong>Institution Name:</strong>
              {" " + props.location.state.rejected.instname}
            </div>
            <div className="itemdetail">
              <strong>Phone Number:</strong>
              {" " + props.location.state.rejected.phoneno}
            </div>
            <div className="itemdetail">
              <strong>Email:</strong>
              {" " + props.location.state.rejected.email}
            </div>
            <div className="itemdetail">
              <strong>Message:</strong>
              {" " + props.location.state.rejected.message}
            </div>
          </div>
          <div className="parttwo">
            <div className="itemdetail">
              <strong>ID image:</strong>
              <div>
                <img
                  className="idImage"
                  src={props.location.state.rejected.idimg}
                  alt="some"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="actionsdiv">
          {/* 
          <button
            className="apprbutton"
            onClick={() => handleRevokeAccess(req)}
          >
            Revoke Access
          </button> */}
          <button
            className="rejbutton"
            onClick={() => handleDeleteRequest(req)}
          >
            Delete
          </button>
          <button
            className="cancelbutton"
            onClick={() => handleCancelButton(req)}
          >
            Cancel
          </button>
        </div>
      </div>
      </Sidebar>
    </>
  );
}

export default RejectedDetail;
