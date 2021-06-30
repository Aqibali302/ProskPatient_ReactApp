import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo1 from "./images/Email.png";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import { Link, Icon } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { properties } from "./properties.js";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import Medicine from "./images/Mobile.png";
import Loader from 'react-loader-spinner'
import * as moment from "moment";
import CustomizedSnackbar from './customizesnackbar/CustomizedSnackbar.js'
import prosk from "./images/Logo-02.png";
import startsWith from 'lodash.startswith';
const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },

  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  PhoneInputInput: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "56px",
    borderRadius: "4px",
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    transition: "0.3s all",
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    textAlign: "center",
    color: theme.palette.text.secondary,

  },
});

//firebase.analytics();
function DenseAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          
        {/* <img src={logo1} height={30}  /> */}
          {/* <IconButton color="inherit" aria-label="Menu">
            <img src={logo1} height={30} />
          </IconButton> */}
          
            <img src={prosk} width={90} />
          {/* <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
             Prosk™
          </Typography> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

class EmailArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedB: true,
      phoneNumber: "",
      isSavedCalled:false,
      isOpenSnackbar: false,
      snackbarMessage: "",
      snackbarSeverity: "",
      email: "",
    };
    localStorage.setItem("url", properties.url);

    // localStorage.setItem("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzAxNzE4ODU0MSIsImV4cCI6MTYxNTk2NzQ0MCwiaWF0IjoxNTg0NDMxNjYxfQ.emDcDz9LyqzyNfmotqQxyGmFGKuxWc9uHVbJkMYxc-zfpe_LwVmcpp9BymCbQqKVlupuwxM1PMCB8b3VYRPdYA");
  }

  handleSignUp = (event) => {
    event.preventDefault();
  };


  handleSubmit(event, state) {
    event.preventDefault();
    localStorage.setItem("email", this.state.email);
    if (this.state.email=="") {
      this.setState({
        isSavedCalled:false
      });
      this.handleOpenSnackbar(<span>Please Enter Your Email</span>,
        "info"
    );
    }else if(localStorage.getItem("email")==this.state.email){
      this.setState({
        isSavedCalled:true
      });
      this.props.history.push("/EmailVerification/");
    }else{
      this.handleOpenSnackbar(<span>Please Enter Your Email</span>,
        "info"
    );
    }
  }
  getMedication=()=>{
    let url =
    localStorage.getItem("url") +
    "/MobileGetMedicationsV2?call_id=1"
    console.log(url);
    fetch(url, {
      method: "POST",
      //  body: dataTomcat,
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(
        (result) => {
          sessionStorage.clear();
          sessionStorage.setItem("medicine",JSON.stringify(result['medication']));
          
        }
      )
  }
  getMedication2=()=>{
    let url =
    localStorage.getItem("url") +
    "/MobileGetMedicationsV2?call_id=2"
    console.log(url);
    fetch(url, {
      method: "POST",
      //  body: dataTomcat,
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(
        (result) => {
          localStorage.setItem("medicine1",JSON.stringify(result['medication']));
        }
      )
  }
  phoneNumber = (event) => {
    this.setState({
      phoneNumber: event,
    });
  };
  componentDidMount(){
    localStorage.clear();
    localStorage.setItem('url',properties.url);
    this.getMedication();
    this.getMedication2();

  }
  handleOpenSnackbar = (msg, severity) => {
    this.setState({
        isOpenSnackbar: true,
        snackbarMessage: msg,
        snackbarSeverity: severity,
    });
};
email = (event) => {
  this.setState({
    email: event.target.value,
  });
};
  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    this.setState({
        isOpenSnackbar: false,
    });
};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <DenseAppBar classes={classes} />
        <CustomizedSnackbar
                    isOpen={this.state.isOpenSnackbar}
                    message={this.state.snackbarMessage}
                    severity={this.state.snackbarSeverity}
                    handleCloseSnackbar={() => this.handleCloseSnackbar()}
                />
        <Grid>
          <Grid item xs={12}>
            <form
              id="myForm"
              name="myForm"
              onSubmit={(event) => this.handleSubmit(event, this.state)}
              encType={"application/json"}
              key="myForm"
            >
              <Grid
                style={{ textAlign: "center", marginTop: "10%" }}
                item
                xs={12}
              > <center>
                 
                  <Grid xs={12} style={{ textAlign: "center" }}>
                  <Typography
                      color="primary"
                      style={{ textAlign: "center", marginBottom: "-1%" }}
                      variant="h6"
                    >
                      Enter your email address:
                    </Typography>
                  </Grid>
 </center>
                <br />
                <center>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  className={classes.textField}
                  margin="normal"
                  style={{ width: 320 }}
                  value={this.state.email}
                  onChange={this.email}
                />
                {/* <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="Email"
                    label="Email"
                    // className={classes.textFieldCard}
                    //  onChange={this.emergency_email}
                    // margin="normal"
                    // error={this.state.remarks}
                    //  value={this.state.emergency_email}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "20%", height: "5%",fontFamily:"Arial" }}
                  /> */}
                  {/* <PhoneInput
                    defaultCountry="US"
                    name="phoneNumber"
            type="text"
            country={"us"}
                      label="Date Of Birth"
            onlyCountries={["us","pk","nl"]}
            inputProps={{
              name: "phone",
              country: "us",
              required: true,
              autoFocus: true
            }}
                    style={{ width: 300}}
            value={this.state.phoneNumber}
            onChange={this.phoneNumber}
            // Set your inline styles here
            required
                  /> */}
                </center>
                <Typography
                    ref="phoneNumber"
                    
                      variant="title"
                      style={{ marginBottom: "-1%",marginRight:"155px"}}
                    >
                     <a style={{color:" #009688"}} href={"#/"} >Login using Phone#</a>
                    </Typography>

                {this.state.isSavedCalled?<Loader type="TailSpin" color="#008080" height={80} width={80}/>:
                                <Button
                                style={{ marginLeft: "-6em",marginTop:"10px" }}
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                              >
                                Continue
                              </Button>
                }
                <br />
                
              </Grid>
              <Grid xs={4} sm={12} style={{ textAlign: "center" }}>
              <img src={logo1} height="250px"/>
                  </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(useStyles)(EmailArea);
