import React, { useLayoutEffect, createRef, useState } from "react";
import Sidebar from "./Sidebar";
import "./ManageAccount.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Grid, Button, Input } from "@material-ui/core";
import { toast } from "react-toastify";

function ManageAccount() {
  const inputRef = createRef();
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState({ preview: "", raw: "" });

  useLayoutEffect(() => {
    axios({
      url: "http://localhost:4000/users/user",
      method: "get",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data.user);
        setID(res.data.user._id);
        setImage(res.data.user.idimg);
        setEmail(res.data.user.email);
        setName(res.data.user.name);
        setPhoneno(res.data.user.phoneno);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleImageFile = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    var fd = new FormData();
    fd.append("idimg", image.raw);
    console.log(image);
    const url = `http://localhost:4000/users/photo/${id}`;
    console.log(id);
    axios
      .patch(url, fd)
      .then((res) => {
        console.log(res.data.idimg);
      })
      .then(() => {
        toast.configure();
        toast.success("Uploaded Successfully", {
          position: "top-center",
          autoClose: 5000,
          pauseOnHover: true,
          hideProgressBar: true,
        });
      });
    // console.log("image now "+ image)
    //console.log(image);
  };

  const updateName = (e) => {
    e.preventDefault();
    console.log("Inside name update");
    axios({
      url: `http://localhost:4000/users/updatename/${id}`,
      method: "patch",
      data: {
        name: name,
      },
    })
      .then((res) => {
        console.log(res);
        toast.configure();
        toast.success("Name changed Successfully", {
          position: "top-right",
          autoClose: 5000,
          pauseOnHover: true,
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.configure();
        toast.error("Name change failed", {
          position: "top-right",
          autoClose: 5000,
          pauseOnHover: true,
          hideProgressBar: true,
        });
      });
    console.log(name);
  };

  const updatePhoneNumber = (e) => {
    e.preventDefault();
    console.log("inside phone number update");
    axios({
      url: `http://localhost:4000/users/updatephone/${id}`,
      method: "patch",
      data: {
        phoneno: phoneno,
      },
    })
      .then((res) => {
        console.log(res);
        toast.configure();
        toast.success("Phone Number changed Successfully", {
          position: "top-right",
          autoClose: 5000,
          pauseOnHover: true,
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.configure();
        toast.error("Phone Number change failed", {
          position: "top-right",
          autoClose: 5000,
          pauseOnHover: true,
          hideProgressBar: true,
        });
      });
    console.log(phoneno);
  };

  const updateEmail = (e) => {
    e.preventDefault();
    console.log("Inside email update");
    axios({
      url: `http://localhost:4000/users/updateemail/${id}`,
      method: "patch",
      data: {
        email: email,
      },
    })
      .then((res) => {
        console.log(res);
        toast.configure();
        toast.success("Email changed Successfully", {
          position: "top-right",
          autoClose: 5000,
          pauseOnHover: true,
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.configure();
        toast.error("Email change failed", {
          position: "top-right",
          autoClose: 5000,
          pauseOnHover: true,
          hideProgressBar: true,
        });
      });
    console.log(email);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNoChange = (e) => {
    setPhoneno(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Sidebar>
          <div className="avatarwrapper">
            <div className="boxed">
              <img
                className="avatar"
                src={image.preview ? image.preview : image}
                alt="anime"
              />
            </div>
            <div>
              <Input type='file' type="file"
                name="image"
                accept="image/*"
                multiple={false}
                onChange={handleImageFile.bind(this)}/>
              {/* <input
                type="file"
                name="image"
                accept="image/*"
                multiple={false}
                onChange={handleImageFile.bind(this)}
              /> */}
              <Button
                className="propicbutton"
                onClick={handleUpload.bind(this)}
              >
                Upload
              </Button>
            </div>
          </div>
          <hr />

          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  value={name}
                  variant="outlined"
                  onChange={handleNameChange}
                  fullWidth
                />
                              </Grid>
                {/* <label>Name </label>
              <div className="inputfield">
                <input
                  ref={inputRef}
                  type="text"
                  defaultValue={name}
                  onChange={handleNameChange}
                  className="inputf"
                /> */}
                <Grid xs={6}>
                  <Button
                    className="submitbutton"
                    onClick={updateName.bind(this)}
                  >
                    Ok
                  </Button>
                </Grid>

              {/* <label>Phone number </label>
              <div className="inputfield">
                <input
                  ref={inputRef}
                  type="text"
                  defaultValue={phoneno}
                  onChange={handlePhoneNoChange}
                  className="inputf"
                /> */}
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  value={phoneno}
                  variant="outlined"
                  onChange={handlePhoneNoChange}
                  fullWidth
                />
              </Grid>
                <Grid item xs={6}>
                  <Button
                    className="submitbutton"
                    onClick={updatePhoneNumber.bind(this)}
                  >
                    Ok
                  </Button>
                </Grid>

              {/* <label>Email </label>
              <div className="inputfield">
                <input
                  ref={inputRef}
                  type="text"
                  defaultValue={email}
                  onChange={handleEmailChange}
                  className="inputf"
                /> */}
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  value={email}
                  variant="outlined"
                  onChange={handleEmailChange}
                  fullWidth
                />
                </Grid>
                <Grid xs={6}>
                <Button
                  className="submitbutton"
                  onClick={updateEmail.bind(this)}
                >
                  Ok
                </Button>
              </Grid>
            </Grid>
          </form>

      </Sidebar>
    </>
  );
}

export default ManageAccount;
