import React, { useLayoutEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./ActiveRequestPage.css";
import { useHistory } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ActiveRequestPage(props) {
  const [image, setImage] = useState("");
  const req = props.location.state.request;
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


  const handleApproveButton = (req) => {
    console.log("Inside detail approve method");
    axios
      .patch(`http://localhost:4000/requests/status/${req._id}`, {
        status: "approved",
      })
      .then((res) =>
        axios({
          method: "post",
          url: "http://localhost:4000/approved",
          data: {
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            phoneno: res.data.phoneno,
            instname: res.data.instname,
            email: res.data.email,
            password: res.data.password,
            message: res.data.message,
            status: res.data.status,
            idimg: res.data.idimg
          },
        })
      )
      .then(
        (response) => {
          toast.configure();
        toast.success("Request Approved!", {
          position: "top-center",
          autoClose: 5000,
          pauseOnHover: true,
          hideProgressBar: true,
        });
          console.log("Request approved!");
          console.log(response);
        },
        (error) => {
          toast.configure();
        toast.error("Request approval failed!", {
          position: "top-center",
          autoClose: 5000,
          pauseOnHover: true,
          hideProgressBar: true,
        });
          console.log(error);
        }
      )
      .then(
        axios({
          method: "post",
          url: "http://localhost:4000/users/register",
          data: {
            name: req.firstname + " " + req.lastname,
            phoneno: req.phoneno,
            email: req.email,
            password: req.password,
          },
        })
      ).then(axios({url:"http://localhost:4000/users/send-approval-mail", method: "post",  data:{
        name: req.firstname,
        recipient: req.email
      }}))
      .then(axios.delete(`http://localhost:4000/requests/${req._id}`));
  };

  const handleRejectButton = (req) => {
    console.log("Inside detail reject method");
    axios
      .patch(`http://localhost:4000/requests/status/${req._id}`, {
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
          },
        })
      )
      .then(
        (response) => {
          toast.configure();
        toast.success("Request Rejected!", {
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
        toast.error("Request rejected failed!", {
          position: "top-center",
          autoClose: 5000,
          pauseOnHover: true,
          hideProgressBar: true,
        });
          console.log(error);
        }
      ).then(axios({url:"http://localhost:4000/users/send-rejection-mail", method: "post",  data:{
        name: req.firstname,
        recipient: req.email
      }}))
      .then(axios.delete(`http://localhost:4000/requests/${req._id}`));
  };

  const handleCancelButton = (req) => {
    console.log("Inside cancel button");
    history.push("/active");
  };

  return (
    <>
      <Sidebar >
      <div className="position">
        <div className="pagetitle">
          <h3>Request Detail</h3>
        </div>
        <div className="detailcss">
          <div className="partone">
            <div className="itemdetail">
              <strong>First Name:</strong>
              {" " + props.location.state.request.firstname}
            </div>
            <div className="itemdetail">
              <strong>Last Name:</strong>
              {" " + props.location.state.request.lastname}
            </div>
            <div className="itemdetail">
              <strong>Institution Name:</strong>
              {" " + props.location.state.request.instname}
            </div>
            <div className="itemdetail">
              <strong>Phone Number:</strong>
              {" " + props.location.state.request.phoneno}
            </div>
            <div className="itemdetail">
              <strong>Email:</strong>
              {" " + props.location.state.request.email}
            </div>
            <div className="itemdetail">
              <strong>Message:</strong>
              {" " + props.location.state.request.message}
            </div>
          </div>
          <div className="parttwo">
            <div className="itemdetail">
              <strong>ID image:</strong>
              <div>
                <img
                  className="idImage"
                  src={props.location.state.request.idimg}
                  alt="some"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="actionsdiv">
          <button
            className="apprbutton"
            onClick={() => handleApproveButton(req)}
          >
            Approve
          </button>
          <button className="rejbutton" onClick={() => handleRejectButton(req)}>
            Reject
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

export default ActiveRequestPage;
