import React, { Component } from "react";
import { Grid, Divider } from "@material-ui/core";
class Counter extends Component {
  state = {};
  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <Grid container>
          <br />
          <Grid xs={6}>abc</Grid>
          <Grid xs={6}>
            abc
            <Divider variant="middle" />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Counter;
