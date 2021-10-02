import React, { Component } from "react";
import Sidebar from "./Sidebar";
import "./ApprovedRequests.css";
import { withRouter } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ApprovedRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedRequests: [],
      loading: true,
      image: "",
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
          image: res.data.user.idimg,
        });
      })
      .catch((err) => console.log(err));
  }

  handleMoreDetailButton = (req) => {
    this.props.history.push({
      pathname: "/approvedpage",
      state: { approved: req },
    });
  };

  handleRevokeRequest = (req) => {
    console.log("Inside revoke method");
    console.log(req._id);
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
      ).then(axios({url:"http://localhost:4000/users/send-revocation-mail", method: "post",  data:{
        name: req.firstname,
        recipient: req.email
      }}))
      .then(axios.delete(`http://localhost:4000/users/${req._id}`))
      .then(axios.delete(`http://localhost:4000/approved/${req._id}`));
  };

  render() {
    if (this.state.loading || !this.state.approvedRequests) {
      return (
        <>
          <Sidebar image={this.state.image} />
          <CircularProgress className="progresscircular" />
        </>
      );
    } else {
      return (
        <>
          <Sidebar>
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
                        <button
                          id="icons"
                          onClick={() => this.handleMoreDetailButton(req)}
                        >
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
          </Sidebar>
        </>
      );
    }
  }
}

export default withRouter(ApprovedRequests);
