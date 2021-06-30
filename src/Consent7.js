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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Line, Circle } from 'rc-progress';
import ProgressBar from 'react-animated-progress-bar';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DoneIcon from '@material-ui/icons/Done';
import { properties } from "./properties";
import Loader from 'react-loader-spinner'
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";

import * as moment from "moment";

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
class Consent7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientID:localStorage.getItem("PID"),
      FName:"",
      MName:"",
      LName:"",
      DOB:"", 
      chk1:"",
      chk2:"",
      isSavedCalled:false,
      isOpenSnackbar: false,
      snackbarMessage: "",
      snackbarSeverity: "",

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
          FName:result.first_name,
          MName:result.middle_name,
          LName:result.last_name,
          DOB:result.date_of_birth
        });
        if(this.state.FName==null||this.state.FName=="undefined"||this.state.FName=="null"){
          this.setState({
            FName:""
          })
        }
        if(this.state.MName==null||this.state.MName=="undefined"||this.state.MName=="null"){
          this.setState({
            MName:""
          })
        }
        if(this.state.LName==null||this.state.LName=="undefined"||this.state.LName=="null"){
          this.setState({
            LName:""
          })
        }
        if(this.state.DOB==null||this.state.DOB=="undefined"||this.state.DOB=="null"){
          this.setState({
            DOB:""
          })
        }
      })
  }
   SkipForm() {
    window.location = "#/Consent8";
  }
   PrevisousForm() {
    window.location = "#/Consent6";
  }
  FName = (event) => {
    this.setState({
      FName: event.target.value,
    });
  };
    MName= (event) => {
    this.setState({
      MName: event.target.value,
    });
  };
   LName = (event) => {
    this.setState({
      LName: event.target.value,
    });
  };
    DOB= (event) => {
    this.setState({
      DOB: event,
    });
  };

 chk1 = (event) => {
  this.setState({
    chk1: !this.state.chk1
  })
  };
   chk2= (event) => {
    this.setState({
      chk2: !this.state.chk2
    })
  };


   handleMenu = (event) => {
    window.location = "#/home/";
  };
  submitForm(event) {
    document.getElementById("submit-button").click();
  };
  handleSubmit(event, state) {
    event.preventDefault();
 const FormittedIDOB = moment(this.state.DOB).format(
      "MM/DD/YYYY"
    );
    let url =
      localStorage.getItem("url") +
      "/MobileSaveHIPAAEmailConsentV2?PID=" +
      this.state.PatientID +
      "&FName=" +
      this.state.FName +
      "&MName=" +
      this.state.MName+
      "&LName=" +
      this.state.LName +
      "&DOB=" +
      FormittedIDOB+
      "&chk1=" +
      this.state.chk1 +
      "&chk2=" +
      this.state.chk2 ;
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
          if(!this.state.chk1){
            alert("Please authorize the consent to proceed");
          }else if(!this.state.chk2){
            alert("Please authorize the consent to proceed");
          }else{
            this.setState({
              isSavedCalled:true
            });
            window.location = "#/Consent8/";
          }
        
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
  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    this.setState({
        isOpenSnackbar: false,
    });
};
handleOpenSnackbar = (msg, severity) => {
  this.setState({
      isOpenSnackbar: true,
      snackbarMessage: msg,
      snackbarSeverity: severity,
  });
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
            HIPAA Email Consent
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
                <Grid item xs={12} sm={3}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="PatientName"
                    label="Patient Name"
                    style={{ width: "95%", height: "5%" }}
                    className={classes.textFieldCard}
                    onChange={this.FName}
                    // margin="normal"
                    // error={this.state.remarks}
                    value={this.state.FName}
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
                     onChange={this.MName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.MName}
                    //helperText={this.state.remarks_error}
                    
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
                     onChange={this.LName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.LName}
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
                          onChange={this.DOB}
                          value={this.state.DOB}
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
                    • HIPAA stands for the Health Insurance Portability and Accountability Act  
                  </Typography>
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
                    • HIPAA was passed by the U.S. government in 1996 in order to establish privacy and security protections for health information  
                  </Typography>
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
                    • Most popular email services (ex. Hotmail®, Gmail®, Yahoo®) do not utilize encrypted email 
                  </Typography>
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
                    • When we send you an email, or you send us an email, the information that is sent is not encrypted. This means a third party may be able to access the information and read it since it is transmitted over the Internet.
                  </Typography>
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
                    • In addition, once the email is received by you, someone may be able to access your email account and read it.
                  </Typography>
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
                    •Email is a very popular and convenient way to communicate for a lot of people, so in their latest modification to the HIPAA act, the federal government provided guidance on email and HIPAA. 
                  </Typography>
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
                    • The information is available in a pdf (page 5634) on the U.S. Department of Health and HumanServices website
                  </Typography>
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
                    • The guidelines state that if a patient has been made aware of the risks of unencrypted email,and that same patient provides consent to receive health information via email, then a health entity may send that patient personal medical information via unencrypted email
                  </Typography>
                </Grid>

                <Grid item xs={11} align="left">
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedI"
                        onChange={this.chk1}
                      value={this.state.chk1}
                      />
                    }
                    label="I authorize the submission of a claim for any services provided to me by Summit Orthopaedics now, in the past, or in the future. I understand that this authorization shall remain valid without expiration unless expressly revoked by me in writing. "
                  />
                </Grid>
                <Grid item xs={11} align="left">
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedI"
                        onChange={this.chk2}
                      value={this.state.chk2}
                      />
                    }
                    label="I authorize Summit Orthopaedics to appeal payment denials or other adverse decisions on my behalf. I authorize and direct any holder of medical, insurance, billing or other relevant information about me to release such information to Summit Orthopaedics and its billing agents, the Centers for Medicare and Medicaid Services, and/or any other payers or insurers, and their respective agents or contractors, as may be necessary to determine these or other benefits payable for any services provided to me.. "
                  />
                </Grid>
<Grid item xs={11} style={{height:"60px"}}>
                  
                </Grid>
              </Grid>
            </CardContent>
        </Card>
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
        percentage="70"
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
{this.state.isSavedCalled?      <Loader type="TailSpin" color="#00BFFF" height={50} width={50}/>:
          <Button
          variant="contained"
          color="primary"
          type="submit"
        >
        <DoneIcon style={{marginRight:"1px"}} /> Agree
        </Button>
}

        </Toolbar>
      </AppBar>
 </form>
    </div>
  );
}

}

export default withStyles(useStyles)(Consent7);
