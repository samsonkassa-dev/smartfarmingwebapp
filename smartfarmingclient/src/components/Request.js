import React, { Component } from "react";
import Navbar from "./Navbar";
import "./Request.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  Grid,
  Input,
  TextareaAutosize,
  TextField,
  Box,
  Button,
} from "@material-ui/core";
class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: props.firstname,
      lastname: props.lastname,
      phoneno: props.phoneno,
      instname: props.instname,
      email: props.email,
      password: props.password,
      message: props.message,
      idimg: "",
      loading: true,
      error: false,
      helpertext: "",
      confirmpassword: "",
      passhelpertext: "",
      passerror: false,
      fnameHelperText: "",
      fnameError: false,
      phoneHelperText: "",
      phoneError: false
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstname", this.state.firstname);
    formData.append("lastname", this.state.lastname);
    formData.append("phoneno", this.state.phoneno);
    formData.append("instname", this.state.instname);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("message", this.state.message);
    formData.append("idimg", this.state.idimg);
    const url = "http://localhost:4000/requests";
    axios({
      method: "post",
      url: url,
      data: formData,
    }).then(
      (response) => {
        toast.configure();
        toast.success(
          "Request sent!. We'll notify you after we review your application asap!",
          {
            position: "top-center",
            autoClose: 5000,
            pauseOnHover: true,
            hideProgressBar: true,
          }
        );
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleFileChange(event) {
    var filename = this.state.idimg;
    filename = event.target.files[0];
    console.log(filename);
    this.setState({ idimg: filename });
  }

  handleFirstNameChanged(event) {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var firstname = this.state.firstname;
    firstname = event.target.value;
    if (firstname !== "") {
      this.setState({fnameHelperText: ""})
      this.setState({fnameError: false})
      this.setState({ firstname: firstname });
    } else if (format.test(firstname)) {
      this.setState({ fnameHelperText: "Invalid input" });
      this.setState({ fnameError: true });
    } else {
      this.setState({fnameHelperText: "Please fill out this field"})
      this.setState({fnameError: true})
    }
  }

  handleLastNameChanged(event) {
    var lastname = this.state.lastname;
    lastname = event.target.value;

    this.setState({ lastname: lastname });
  }

  handlePhoneNoChanged(event) {
    var phoneno = this.state.phoneno;
    phoneno = event.target.value;
    if(phoneno.length === 10){
      this.setState({phoneHelperText: ""})
      this.setState({phoneError: false})
      this.setState({ phoneno: phoneno });
    }else{
      this.setState({phoneHelperText: "Phone number should be 10 characters"})
      this.setState({phoneError: true})
    }
  }

  handleInstNameChanged(event) {
    var instname = this.state.instname;
    instname = event.target.value;

    this.setState({ instname: instname });
  }

  handleEmailChanged(event) {
    var email = this.state.email;
    email = event.target.value;
    if (email.includes("@")) {
      this.setState({ helpertext: "" });
      this.setState({ error: false });
      this.setState({ email: email });
    } else if (email === "") {
      this.setState({ helpertext: "This is a required field" });
      this.setState({ error: true });
    } else {
      this.setState({ helpertext: "Please enter a valid email" });
      this.setState({ error: true });
    }
  }

  handlePasswordChanged(event) {
    var password = this.state.password;
    password = event.target.value;

    this.setState({ password: password });
  }

  handleConfirmPasswordChange(event) {
    var cpass = this.state.confirmpassword;
    cpass = event.target.value;
    if (cpass === "") {
      this.setState({ passhelpertext: "Please enter password" });
      this.setState({ passerror: true });
    } else if (cpass !== this.state.password) {
      this.setState({ passhelpertext: "Password do not match" });
      this.setState({ passerror: true });
    } else {
      this.setState({ confirmpassword: cpass });
    }
  }

  handleMessageChanged(event) {
    var message = this.state.message;
    message = event.target.value;

    this.setState({ message: message });
  }

  handleButtonClick = () => {};

  render() {
    return (
      <div>
        <Navbar />
        <h3 className="reqtitle">Send us a request</h3>
        <form
          onSubmit={this.handleSubmit.bind(this)}
          encType="multipart/form-data"
        >
          <Grid container spacing={3}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  fullWidth
                  label="First Name"
                  helperText={this.state.fnameHelperText}
                  error={this.state.fnameError}
                  defaultValue={this.state.firstname || ""}
                  onChange={this.handleFirstNameChanged.bind(this)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Last Name"
                  fullWidth
                  value={this.state.lastname || ""}
                  onChange={this.handleLastNameChanged.bind(this)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Phone Number"
                  fullWidth
                  helperText={this.state.phoneHelperText}
                  error={this.state.phoneError}
                  defaultValue={this.state.phoneno || ""}
                  onChange={this.handlePhoneNoChanged.bind(this)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Institution Name"
                  fullWidth
                  value={this.state.instname || ""}
                  onChange={this.handleInstNameChanged.bind(this)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  helperText={this.state.helpertext}
                  error={this.state.error}
                  defaultValue={this.state.email || ""}
                  onChange={this.handleEmailChanged.bind(this)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="password"
                  fullWidth
                  label="Password"
                  variant="outlined"
                  value={this.state.password || ""}
                  onChange={this.handlePasswordChanged.bind(this)}
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm password"
                  variant="outlined"
                  helperText={this.state.passhelpertext}
                  error={this.state.passerror}
                  defaultValue={this.state.confirmpassword || ""}
                  onChange={this.handleConfirmPasswordChange.bind(this)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  multiline
                  fullWidth
                  maxRows="5"
                  label="Describe your purpose"
                  variant="outlined"
                  value={this.state.message || ""}
                  onChange={this.handleMessageChanged.bind(this)}
                />
              </Grid>
              <Grid item xs={6}>
                <label>Upload a clear view of your ID</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  multiple={false}
                  onChange={this.handleFileChange.bind(this)}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  style={{
                    backgroundColor: "#3e8914",
                    color: "#FFFFFF",
                    paddingRight: "20px",
                    paddingLeft: "20px",
                  }}
                  type="submit"
                  onClick={this.handleButtonClick}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default Request;
