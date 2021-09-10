import React, { Component } from "react";
import Sidebar from "./Sidebar";
import "./ApprovedRequests.css";
import { withRouter } from "react-router";
// import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const json = localStorage.getItem("admin");
// const userID = JSON.parse(json);

class ApprovedRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedRequests: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const url = "http://localhost:4000/approved";
    const response = await axios.get(url);
    this.setState({
      approvedRequests: response.data,
      loading: false,
    });
    console.log(response);
  }

  handleMoreDetailButton = (req) => {
    this.props.history.push({pathname: '/approvedpage', state: { approved: req}})
  }

  handleRevokeRequest = (req) => {
    console.log("Inside revoke method");
    console.log(req._id)
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
      .then(axios.delete(`http://localhost:4000/users/${req._id}`))
      .then(axios.delete(`http://localhost:4000/approved/${req._id}`));
  };

  render() {
    if (this.state.loading || !this.state.approvedRequests) {
      return (
        <>
          <Sidebar />
          <CircularProgress className="progresscircular" />
        </>
      );
    } else {
      const json = localStorage.getItem("admin");
      const userID = JSON.parse(json);
      return (
        <>
          <Sidebar image={userID.idimg} />
          <div className="position">
            <div className="pagetitle">
              <h3>Approved Requests</h3>
            </div>
            <div className="scrollablecontent">
              <table>
                <tbody>
                <tr>
                  <th>Requester Name</th>
                  <th>Instituition Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
                {this.state.approvedRequests.map((req) => (
                  <tr className="hoverablerow" key={req._id}>
                    <td>
                      {req.firstname} {req.lastname}
                    </td>
                    <td>{req.instname}</td>
                    <td>{req.status}</td>
                    <td>
                      <button id="icons" onClick={() => this.handleMoreDetailButton(req)}>
                        <MoreVertIcon />
                      </button>
                      <button
                        id="icons2"
                        onClick={() => this.handleRevokeRequest(req)}
                      >
                        <NotInterestedIcon />
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
    }
  }
}

export default withRouter(ApprovedRequests);
