import React, { useLayoutEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./ActiveRequestPage.css";
import { useHistory } from "react-router";
import "./ActiveRequestPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ApprovedDetail(props) {
  const [image, setImage] = useState("");
  const req = props.location.state.approved;
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
        setImage(res.data.user.idimg);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRevokeAccess = (req) => {
    console.log("Inside revoke method");
    axios
      .patch(`http://localhost:4000/approved/status/${req._id}`, {
        status: "rejected",
      })
      .then((res) =>
        axios({
          method: "post",
          url: "http://localhost:4000/rejected",
          data: {
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            phoneno: res.data.phoneno,
            instname: res.data.instname,
            email: res.data.email,
            password: res.data.password,
            message: res.data.message,
            status: res.data.status,
            idimg: res.data.idimg,
          },
        })
      )
      .then(
        (response) => {
          toast.configure();
          toast.success("Request Revoked!", {
            position: "top-center",
            autoClose: 5000,
            pauseOnHover: true,
            hideProgressBar: true,
          });
          console.log("Request rejected!");
          console.log(response);
        },
        (error) => {
          toast.configure();
          toast.error("Request rejection failed!", {
            position: "top-center",
            autoClose: 5000,
            pauseOnHover: true,
            hideProgressBar: true,
          });
          console.log(error);
        }
      )
      .then(axios({
        method: "post",
        url: "http://localhost:4000/users/send-rejection-mail",
        data:{
          name: req.firstname,
          email: req.email
        }
      }))
      .then(axios.delete(`http://localhost:4000/users/${req._id}`))
      .then(axios.delete(`http://localhost:4000/approved/${req._id}`));
  };

  const handleCancelButton = () => {
    history.push("/approved");
  };
  return (
    <>
      <Sidebar>
      <div className="position">
        <div className="pagetitle">
          <h3>Approved Request Detail</h3>
        </div>
        <div className="detailcss">
          <div className="partone">
            <div className="itemdetail">
              <strong>First Name:</strong>
              <span>{" " + props.location.state.approved.firstname}</span>
            </div>
            <div className="itemdetail">
              <strong>Last Name:</strong>
              {" " + props.location.state.approved.lastname}
            </div>
            <div className="itemdetail">
              <strong>Institution Name:</strong>
              {" " + props.location.state.approved.instname}
            </div>
            <div className="itemdetail">
              <strong>Phone Number:</strong>
              {" " + props.location.state.approved.phoneno}
            </div>
            <div className="itemdetail">
              <strong>Email:</strong>
              {" " + props.location.state.approved.email}
            </div>
            <div className="itemdetail">
              <strong>Message:</strong>
              {" " + props.location.state.approved.message}
            </div>
          </div>
          <div className="parttwo">
            <div className="itemdetail">
              <strong>ID image:</strong>
              <div>
                <img
                  className="idImage"
                  src={props.location.state.approved.idimg}
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
          <button className="rejbutton" onClick={() => handleRevokeAccess(req)}>
            Revoke Access
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

export default ApprovedDetail;
