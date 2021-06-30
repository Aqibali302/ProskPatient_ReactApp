import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Avatar,
  Stepper,
  Step,
  StepButton,
  Divider,
  Button,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import BottomBar from "./BottomBar";
import { green } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { Line, Circle } from 'rc-progress';
import ProgressBar from 'react-animated-progress-bar';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DoneIcon from '@material-ui/icons/Done';
import * as moment from "moment";
import { properties } from "./properties";
import Loader from 'react-loader-spinner'
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";

import { format } from "date-fns";

const useStyles = (theme) => ({
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
  bigAvatar: {
    margin: 10,
  },
  inline: {
    display: "inline",
  },
  iconSmall: {
    fontSize: 20,
  },
  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
});

const classes = makeStyles((theme) => ({
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
  bigAvatar: {
    margin: 10,
  },

  inline: {
    display: "inline",
  },
  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
}));

class Consent2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      PatientID:localStorage.getItem("PID"),
      appointment_id: localStorage.getItem("AppointmentID"),
      date_of_birth: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      isSavedCalled:false,
      today:format(new Date(), 'MM/dd/yyyy')
    };
    localStorage.setItem("url", properties.url);
  }
  VerifyAppointment() {
    console.log("AppointmentID=" + localStorage.getItem("AppointmentID"));
    if (localStorage.getItem("AppointmentID") == null || localStorage.getItem("AppointmentID") == "" || localStorage.getItem("AppointmentID") == "null") {
      window.location = "#/";
    }
  }
  componentDidMount() {
    this.MobileGetUserInfo();
    this.VerifyAppointment();
  }
  MobileGetUserInfo() {
  let url =
    localStorage.getItem("url") +
    "/MobileConsentGetUserInformationv2?user_id=" +
    localStorage.getItem("UserID");
  //let url="/WaveEdu/IndexExecuteVerifyCode";
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
    .then((result) => {
      console.log(result);
      this.setState({
        first_name:result.first_name,
        last_name:result.last_name,
        middle_name:result.middle_name,
        date_of_birth:result.date_of_birth
      });
      if(this.state.first_name==null||this.state.first_name=="undefined"||this.state.first_name=="null"){
        this.setState({
          first_name:""
        })
      }
      if(this.state.last_name==null||this.state.last_name=="undefined"||this.state.last_name=="null"){
        this.setState({
          last_name:""
        })
      }
      if(this.state.middle_name==null||this.state.middle_name=="undefined"||this.state.middle_name=="null"){
        this.setState({
          middle_name:""
        })
      }
      if(this.state.date_of_birth==null||this.state.date_of_birth=="undefined"||this.state.date_of_birth=="null"){
        this.setState({
          date_of_birth:""
        })
      }
    })
}
   SkipForm= (event) => {
    window.location = "#/Consent3";
  }
  
   PrevisousForm= (event) => {
    window.location = "#/Consent1";
  }
first_name = (event) => {
    this.setState({
      first_name: event.target.value,
    });
  };
middle_name = (event) => {
    this.setState({
      middle_name: event.target.value,
    });
  };
  last_name = (event) => {
    this.setState({
      last_name: event.target.value,
    });
  };
handleDateOfBirthChangeFrom = (event) => {
    this.setState({ date_of_birth: event });
  };
  

submitForm(event) {
    document.getElementById("submit-button").click();
  };
  handleSubmit(event, state) {
    event.preventDefault();
    this.setState({
      isSavedCalled:true
    });
    const Formitteddatofbirth = moment(this.state.date_of_birth).format(
      "MM/DD/YYYY"
    );

    let url =
      localStorage.getItem("url") +
      "/MobileSaveAuthorizationComplianceV2?FName=" +
      this.state.first_name +
      "&PID=" +
      this.state.PatientID +
      "&LName=" +
      this.state.last_name +
      "&MName=" +
      this.state.middle_name +
      "&DOB=" +
      Formitteddatofbirth ;
    fetch(url, {
      method: "POST",
      // body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((result) => {
        if (result["success"] == "1") {
          window.location = "#/Consent3/";
        } else {
          alert(result["error_message"]);
        }
      })
      .catch((error) => alert("An error occured: " + error));
  }
keyPress(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }
  StopEnter(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }
   handleMenu = (event) => {
    window.location = "#/home/";
  };
  render() {
    const { classes } = this.props;

  return (
    <div className={classes.root}>
      <form
          onKeyPress={this.StopEnter}
          onSubmit={(event) => this.handleSubmit(event, this.state)}
          autoComplete="off"
        >
      <AppBar position="fixed">
        <Toolbar variant="dense">
          {/* <IconButton color="inherit" aria-label="Menu">
            <img src={logo1} width={30} />
          </IconButton> */}
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"center"}}
          >
            Prosk™
          </Typography>
          <div className={classes.grow}/>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"center"}}
          >
            Authorization
          </Typography>
          <div className={classes.grow}/>
          <div>
            <IconButton color="inherit" onClick={this.handleMenu}>
              <HomeIcon /><Typography
              color="inherit"
              noWrap
            >
              Home
            </Typography>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "60px" }}>
        <Card style={{ width: "98%",margin:"auto" }}>
         
            <CardContent>
              <Grid container spacing={8}>
                <Grid item xs={12} align="center">
                  <Typography variant="title" color="primary"></Typography>
                </Grid>
                <Grid item xs={12} align="left">
                  <Typography
                    variant="title"
                    style={{
                      marginBottom: "10px",
                      fontSize: "20px",
                      fontFamily: "Arial",
                      fontWeight: "bolder",
                    }}
                  >
                    Authorization for Compliance with the Oregon's Prescription
                    Monitoring Program
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="PatientName"
                    label="Patient Name"
                    style={{ width: "95%", height: "5%" }}
                    className={classes.textFieldCard}
                     onChange={this.first_name}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.first_name}
                    //helperText={this.state.remarks_error}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="MiddleName"
                    label="Middle Name"
                    // className={classes.textFieldCard}
                     onChange={this.middle_name}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.middle_name}
                    //helperText={this.state.remarks_error}
                   // required
                    style={{ width: "95%", height: "5%" }}
                  />
                </Grid>
               
                <Grid item xs={12} sm={3}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="LastName"
                    label="Last Name"
                    // className={classes.textFieldCard}
                     onChange={this.last_name}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.last_name}
                    //helperText={this.state.remarks_error}
                    required
                    style={{ width: "95%", height: "5%" }}
                  />
                </Grid>
                 <Grid item xs={12} sm={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          keyboard
                          views={["year", "month", "day"]}
                          openTo={"year"}
                          format={"dd/MM/yyyy"}
                          placeholder="18/10/2019"
                          label="Date of Birth"
                          name="dateOfBirth"
                          id="date_of_birth"
                          // required
                          mask={(value) =>
                            // handle clearing outside if value can be changed outside of the component
                            value
                              ? [
                                  /\d/,
                                  /\d/,
                                  "/",
                                  /\d/,
                                  /\d/,
                                  "/",
                                  /\d/,
                                  /\d/,
                                  /\d/,
                                  /\d/,
                                ]
                              : []
                          }
                          disableOpenOnEnter
                          animateYearScrolling={false}
                          style={{ width: "90%" }}
                          onChange={this.handleDateOfBirthChangeFrom}
                          value={this.state.date_of_birth}
                        />
                      </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} align="left">
                  <Typography
                    variant="title"
                    style={{
                      marginTop: "10px",
                      fontSize: "18px",
                      fontFamily: "Arial",
                    }}
                  >
                    <p>
                      • I understand that Summit Orthopaedics participates in the Oregon's
                      Prescription Monitoring Program.
                    </p>
                  </Typography>
                  
                  <Typography
                    variant="title"
                    style={{
                      marginTop: "10px",
                      fontSize: "18px",
                      fontFamily: "Arial",
                    }}
                  >
                    • I give permission for Summit Orthopaedics to access this database for
                      Prescription Compliance and consult with any other physician
                      prescribing controlled substances.This consent begins on the date below and remains in effect unless revoked in writing. {this.state.today}
                  </Typography>
                  <Typography
                    variant="title"
                    style={{
                      marginTop: "10px",
                      fontSize: "18px",
                      fontFamily: "Arial",
                    }}
                  >
                    <p>
                      • Oregon's Prescription Drug Monitoring Program (PDMP) is a program developed to promote public health and welfare and help improve patient care. The information will aid healthcare providers and pharmacists to better manage patients' prescriptions to improve quality of care. It will also support the appropriate use of prescription drugs.
                    </p>
                  </Typography>
                </Grid>

                
              </Grid>
            </CardContent>
        </Card>
        <div  style={{height:"60px"}}>
                  
                </div>
      </div>

      <AppBar
        position="fixed"
        style={{ top: "auto", bottom: 0 }}
        color="default"
      >
        <Toolbar variant="dense">
          <Button
            variant="contained"
            color="default"
            onClick={this.PrevisousForm}
          >
              <SkipPreviousIcon style={{marginRight:"1px"}} /> Back
          </Button>
          <div className={classes.grow} />
        <ProgressBar
        width="400px"
        height="16px"
        rect
        fontColor="gray"
        percentage="20"
        rectPadding="1px"
        rectBorderRadius="20px"
        trackPathColor="transparent"
        bgColor="primary"
        trackBorderColor="grey"
        defColor={{
          fair: 'teal',
          good: 'teal',
          excellent: 'teal',
          poor: 'teal',
        }}
      />
          <div className={classes.grow} />
          <Button
            variant="contained"
            color="defualt"
            onClick={this.SkipForm}
            style={{marginRight:"10px"}}
          >
            <SkipNextIcon style={{marginRight:"1px"}} />Skip
          </Button>
          {this.state.isSavedCalled?  <Loader type="TailSpin" color="#00BFFF" height={50} width={50}/>:
                    <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                  <DoneIcon style={{marginRight:"1px"}} />Agree
                  </Button>
          }

        </Toolbar>
      </AppBar>
      
          </form>
    </div>
  );
}
}
export default withStyles(useStyles)(Consent2);
