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
  // const [field2, setField2] = useState("")
  // const [field3, setField3] = useState("")

  const submitHandler = (e) => {
    const data = {
      name,
      field1,
    };
    axios({
      url: "http://localhost:4000/channel/add",
      method: "post",
      data: data,
    }).then((res) => console.log(res))
  };

  return (
    <form onSubmit={submitHandler}>
      <Grid container spacing={2}>
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
            <TextField type="text" />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Field 3</FormLabel>
            <TextField type="text" />
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
