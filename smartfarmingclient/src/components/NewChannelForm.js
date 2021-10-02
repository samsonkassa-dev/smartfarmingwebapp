import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
  Grid,
} from "@material-ui/core";
import axios from "axios";

export default function NewChannelForm() {
  const [name, setName] = useState("");
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("")
  const [field3, setField3] = useState("")
  const [field4, setField4] = useState("")
  const [field5, setField5] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    const data = {
      name,
      field1,
      field2,
      field3,
      field4,
      field5
    };
    console.log(data)
    // axios({
    //   url: "http://localhost:4000/channel/add",
    //   method: "post",
    //   data: data,
    // }).then((res) => console.log(res))
  };

  return (
    <form onSubmit={submitHandler}>
      <Grid container xs={12} spacing={2} direction="row">
        <Grid item>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <TextField
              type="text"
              placeholder="Channel name..."
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl>
            <FormLabel>Field 1</FormLabel>
            <TextField
              type="text"
              onChange={(e) => setField1(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Field 2</FormLabel>
            <TextField type="text" onChange={(e) => setField2(e.target.value)}/>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Field 3</FormLabel>
            <TextField type="text" onChange={(e) => setField3(e.target.value)}/>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Field 4</FormLabel>
            <TextField type="text" onChange={(e) => setField4(e.target.value)}/>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Field 5</FormLabel>
            <TextField type="text" onChange={(e) => setField5(e.target.value)}/>
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained" style={{backgroundColor: "green", color: "#fff"}} type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
