import React, {  Component } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import "./ActiveRequests.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CircularProgress from "@material-ui/core/CircularProgress";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Requests({
  request,
  index,
  approveRequest,
  rejectRequest,
  reqDetails,
}) {
  return (
    <tr className="hoverablerow">
      <td>
        {request.firstname} {request.lastname}
      </td>
      <td>{request.instname}</td>
      <td>{request.status}</td>
      <td>
        <button id="icon1" onClick={() => approveRequest(request)}>
          <ThumbUpIcon />
        </button>
        <button id="icons2" onClick={() => rejectRequest(request)}>
          <ThumbDownIcon />
        </button>
        <button id="icon3" onClick={() => reqDetails(request)}>
          <MoreVertIcon />
        </button>
      </td>
    </tr>
  );
}

class ActiveRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      image: "",
      loading: true,
    };
  }

  handleApproveButton = (req) => {
    console.log("Inside approve method");
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
      )
      .then(axios({
        method: "post",
        url: "http://localhost:4000/users/send-approval-mail",
        data:{
          name: req.firstname,
          email: req.email
        }
      }))
      .then(
        this.setState(axios.delete(`http://localhost:4000/requests/${req._id}`))
      );
  };

  handleRejectButton = (req) => {
    console.log("Inside reject method");
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
          toast.error("Request rejection failed!", {
            position: "top-center",
            autoClose: 5000,
            pauseOnHover: true,
            hideProgressBar: true,
          });
          console.log(error);
        }
      ).then(axios({
        method: "post",
        url: "http://localhost:4000/users/send-rejection-mail",
        data:{
          name: req.firstname,
          email: req.email
        }
      }))
      .then(
        this.setState(axios.delete(`http://localhost:4000/requests/${req._id}`))
      );
  };

  handleMoreButton = (req) => {
    this.props.history.push({
      pathname: "/requestpage",
      state: { request: req },
    });
  };

  async componentDidMount() {
    const url = "http://localhost:4000/requests";
    const response = await axios.get(url);
    this.setState({
      requests: response.data,
      loading: false,
    });
    console.log(response);
    axios({
      url: "http://localhost:4000/users/user",
      method: "get",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data.user.idimg);
        this.setState({
          image: res.data.user.idimg})
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (this.state.loading || !this.state.requests) {
      return (
        <>
          <Sidebar image={this.state.image}/>
          <CircularProgress className="progresscircular" />
        </>
      );
    } else {
      return (
        <>
          <Sidebar>

          <div className="position">
            <div className="pagetitle">
              <h3>Active Requests</h3>
            </div>
            <div className="scrollablecontent">
              <table>
                <tbody>
                  <tr>
                    <th>Requester Name</th>
                    <th>Institution Name</th>
                    <th>Status </th>
                    <th>Actions</th>
                  </tr>
                  {this.state.requests.map((req, index) => (
                    <Requests
                      key={index}
                      index={index}
                      request={req}
                      approveRequest={this.handleApproveButton}
                      rejectRequest={this.handleRejectButton}
                      reqDetails={this.handleMoreButton}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </Sidebar>
        </>
      );
    }
  }
}

export default withRouter(ActiveRequests);
