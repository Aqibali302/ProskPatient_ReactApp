import React, { useState, useCallback } from "react";
import { withStyles } from "@material-ui/styles";
import prosk from "./images/Logo-02.png";
import Medicine from "./images/thankyou.png";
import {
  Grid,
  IconButton,
  Typography,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
//import Autocomplete from '@material-ui/lab/Autocomplete';
import * as moment from "moment";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/Home";

let suggestions = [];

let course_code_data = [];
let course_account_data = [];
const useStyles = (theme) => ({
  downShift: {
    paddingTop: "18px !important",
  },
  textFieldCard: {
    paddingTop: "0px !important",
  },
  cardcontent: {
    paddingTop: "0px !important",
    paddingLeft: "4px",
    paddingRight: "4px",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  asdf: {
    margin: 1000,
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
  },

  sectionDesktop: {
    display: "none",
  },
  sectionMobile: {
    display: "flex",
  },

  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  container: {
    marginTop: "100px",
  },
});

function DenseAppBar(props) {
  const { classes } = props;
  const handleMenu = (event) => {
    window.location = "#/MenuPage/";
  };
  return (
    <div className={classes.root}>
              <AppBar position="fixed">
          <Toolbar variant="dense">
          <img src={prosk} width={80} height={30} />
            {/* <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
              Prosk™
            </Typography> */}
            <div className={classes.grow} />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
              
            </Typography>
            <div className={classes.grow} />
            <div>
            <IconButton color="inherit" onClick={handleMenu}>
              <ExitToAppIcon />   Home
            </IconButton>
            </div>
          </Toolbar>
        </AppBar>
     {/* <AppBar position="fixed">
        <Toolbar variant="dense">
        <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
             Prosk™
          </Typography>
          <div className={classes.grow}/>
          <div>
            <IconButton color="inherit" onClick={handleMenu}>
              <ExitToAppIcon />   Home
            </IconButton>
          </div>
        </Toolbar>
      </AppBar> */}
    </div>
  );
}
class ThankyouPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form>
          <DenseAppBar classes={classes} />
          <div
            style={{
              marginTop: "60px",
              marginBottom: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card style={{ width: "98%" }}>
              <CardContent>
                <Grid container spacing={8}>
                  <Grid item xs={12} sm={12}>
                  <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"center",fontFamily:"Arial",marginBottom:"-18px",fontSize:"30px"}}
          >
            Thank You
          </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Typography
                  style={{ textAlign: "left" }}
                  variant="h6"
                  style={{ textAlign:"center",fontFamily:"Arial",fontWeight:"400",marginBottom: "-1%" ,marginTop: "-26px" }}
                >
                You have completed the online check-in process for your upcoming appointment with Summit Orthopaedics.
                </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <img src={Medicine} height="350px" width="350px" style={{marginTop:"-50px",marginLeft:"-3px"}} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  </Grid>
                </Grid>
                <button
                  type="submit"
                  id="form1"
                  style={{ display: "none" }}
                ></button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    );
  }
}
export default withStyles(useStyles)(ThankyouPage);
