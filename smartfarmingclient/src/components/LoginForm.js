import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Footer from "./footer";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function login(event) {
    event.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    console.log("Inside log in");
    const url = "http://localhost:4000/users/login";
    try {
      await axios({
        url: url,
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: user,
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          res.data.role === "admin"
            ? history.push("/adminDash")
            : history.push("/userDash");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      toast.configure();
      toast.error("Username/password incorrect!", {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
      });
    }
  }

  const styles = makeStyles((theme) => ({
    tr: {
      fontFamily: "Manrope",
      borderColor: "#15e577",
      color: "#000",
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "#15e577",
        borderColor: "#564345",
      },
    },
  }));
  const theme = createTheme();

  const classes = styles();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LockOutlinedIcon />
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setEmail(e.target.value);
                  }}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setPassword(e.target.value);
                  }}
                />
                {/* <div className="forgotstyle">Forgot password?</div> */}
                <br />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: "#3e8914", color: "#FFFFFF" }}
                  sx={{ mt: 3, mb: 2 }}
                  onClick={login}
                >
                  Sign In
                </Button>
                <br />
                <br />
                <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/request" variant="body2">
                  {"Request for an account?"}
                </Link>
              </Grid>
            </Grid>
                {/* <Link to="/request">
                  <Button
                    variant="outlined"
                    className={classes.tr}
                    onClick={() => console.log("button clicked")}
                  >
                    Request Data
                  </Button>
                </Link> */}
              </Box>
          <Footer sx={{ mt: 8, mb: 4 }}  />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginForm;
