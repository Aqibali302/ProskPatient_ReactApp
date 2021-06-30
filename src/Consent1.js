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
  Button,
  RadioGroup
} from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import BottomBar from "./BottomBar";
import * as moment from "moment";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Progress from 'react-progressbar';
import { Line, Circle } from 'rc-progress';
import ProgressBar from 'react-animated-progress-bar';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DoneIcon from '@material-ui/icons/Done';
import { properties } from "./properties";
import Loader from 'react-loader-spinner'
import Radio from '@material-ui/core/Radio';
import CustomizedSnackbar from './customizesnackbar/CustomizedSnackbar.js'
import InputMask from "react-input-mask";
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
class Consent1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      PatientID:localStorage.getItem("PID"),
      appointment_id: localStorage.getItem("AppointmentID"),
      date_of_birth: localStorage.getItem("date_of_birth"),
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      address:"",
      city:"",
      states:"",
      zip_code:"",
      check_mobile:false,
      check_email:false,
      phone_no: localStorage.getItem("phone"),
      email: localStorage.getItem("email"),
      emergency_email:"",
      relation:"",
      emergency_phone:"",
      isSavedCalled:false,
      isOpenSnackbar: false,
      snackbarMessage: "",
      snackbarSeverity: "",
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
    this.VerifyAppointment();
	    if(this.state.PatientID==this.state.PatientID){ 
      let url =
      localStorage.getItem("url") +
      "/MobileGetAllSavedConsentDataInfo?PID="+
      this.state.PatientID+
      "&consent_id=1";
      console.log(url);
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
        console.log(result);
        this.setState({
          city: result["City"],
          address:result["Address"],
          states:result["State"],
          zip_code:result["Zipcode"],
          emergency_email:result["ECN"],
          emergency_phone:result["ECP"],
          relation:result["ECR"],
          check_email:result["PCMM"],
          check_mobile:result['PCME'],
        });
        if(this.state.address==null||this.state.address=="undefined"||this.state.address=="null"){
          this.setState({
            address:""
          })
        }
        if(this.state.city==null || this.state.city=="undefined" || this.state.city=="null"){
          this.setState({
            city:""
          })
        }
        if(this.state.states==null || this.state.states=="undefined"||this.state.states=="null" ){
          this.setState({
            states:""
          })
        }
        if(this.state.zip_code==null || this.state.zip_code=="undefined"||this.state.zip_code=="null"){
          this.setState({
            zip_code:""
          })
        }
        if(this.state.emergency_email==null|| this.state.emergency_email=="undefined" ||this.state.emergency_email=="null"){
          this.setState({
            emergency_email:""
          })
        }
        if(this.state.emergency_phone==null || this.state.emergency_phone=="undefined"||this.state.emergency_phone=="null"){
          this.setState({
            emergency_phone:""
          })
        }
        if(this.state.relation==null || this.state.relation=="undefined"||this.state.relation=="null"){
          this.setState({
            relation:""
          })
        }
        if(this.state.check_email==null || this.state.check_email=="undefined"||this.state.check_email=="null"){
          this.setState({
            check_email:""
          })
        }
        if(this.state.check_mobile==null || this.state.check_mobile=="undefined" ||this.state.check_mobile=="null"){
          this.setState({
            check_mobile:""
          })
        }
      })
      // .catch((error) => alert("An error occured: " + error));
    }
  }
check_mobile = (event) => {
    this.setState({
      check_mobile: !this.state.check_mobile,
    });
  };

  check_email = (event) => {
    this.setState({
      check_email: !this.state.check_email,
    });
  };
first_name = (event) => {
    this.setState({
      first_name: event.target.value,
    });
  };

  last_name = (event) => {
    this.setState({
      last_name: event.target.value,
    });
  };
  address = (event) => {
    this.setState({
      address: event.target.value,
    });
  };
  city = (event) => {
    this.setState({
      city: event.target.value,
    });
  };
  states = (event) => {
    this.setState({
      states: event.target.value,
    });
  };
  zip_code = (event) => {
    this.setState({
      zip_code: event.target.value,
    });
  };
  phone_no = (event) => {
    this.setState({
      phone_no: event.target.value,
    });
  };
  email = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  emergency_email = (event) => {
    this.setState({
      emergency_email: event.target.value,
    });
  };
  relation = (event) => {
    this.setState({
      relation: event.target.value,
    });
  };
  emergency_phone = (event) => {
    this.setState({
      emergency_phone: event.target.value,
    });
  };
handleDateOfBirthChangeFrom = (event) => {
    this.setState({ date_of_birth: event });
  };
  

  SkipForm() {
    window.location = "#/Consent2";
  }
submitForm(event) {
    document.getElementById("submit-button").click();
  }
  handleSubmit(event, state) {
    event.preventDefault();
    if(this.state.check_email==null&&this.state.check_mobile==null){
      alert("Select One Value")
    }
    const Formitteddatofbirth = moment(this.state.date_of_birth).format(
      "MM/DD/YYYY"
    );


    let url =
      localStorage.getItem("url") +
      "/MobileSaveMedicalEvaluationV2?FName=" +
      this.state.first_name +
      "&PID=" +
      this.state.PatientID +
      "&LName=" +
      this.state.last_name +
      "&MName=&Phone=" +
      this.state.phone_no +
      "&Email=" +
      this.state.email +
      "&Address=" +
      this.state.address +
      "&City=" +
      this.state.city +
      "&DOB=" +
      Formitteddatofbirth +
      "&State=" +
      this.state.states +
      "&Zipcode=" +
      this.state.zip_code +
      "&PCMM=" +
      this.state.check_mobile+
      "&PCME=" +
      this.state.check_email+
      "&ECN=" +
      this.state.emergency_email+
      "&ECR=" +
      this.state.relation+
      "&ECP=" +
      this.state.emergency_phone;
      console.log(url)
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
          this.MobileGetUserInfo();
          window.location = "#/Consent2/";
        
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

      localStorage.setItem("first_name", result["first_name"] + "");
      localStorage.setItem("last_name", result["last_name"] + "");
      localStorage.setItem("last_appointment",result["last_appointment"] + ""
      );
      localStorage.setItem("email", result["email"] + "");
      localStorage.setItem("phone", result["phone"] + "");
      localStorage.setItem("date_of_birth", result["date_of_birth"] + "");
      localStorage.setItem("PCME", result["PCME"] + "");
      localStorage.setItem("PCMM", result["PCMM"] + "");
      localStorage.setItem("PID", localStorage.getItem("UserID"));
    })
    .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
      "error"
  ));
}
  render() {
    const { classes } = this.props;

    return (
    <div className={classes.root}> 
    <form
          onKeyPress={this.StopEnter}
          onSubmit={(event) => this.handleSubmit(event, this.state)}
          autoComplete="off"
        >   <Button
                type="submit"
                variant="contained"
                color="primary"
                id="submit-button"
                className={classes.button}
                style={{ display: "none" }}
              >
                submit
              </Button>
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
            Medical Evaluation
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
      <CustomizedSnackbar
                    isOpen={this.state.isOpenSnackbar}
                    message={this.state.snackbarMessage}
                    severity={this.state.snackbarSeverity}
                    handleCloseSnackbar={() => this.handleCloseSnackbar()}
                />
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
                      fontSize: "20px",
                      fontFamily: "Arial",
                      fontWeight: "bolder",
                    }}
                  >
                    Authorization for Medical Evaluation of an Adult Patient
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="FirstName"
                    label="First Name"
                    style={{ width: "90%", height: "5%",fontFamily:"Arial" }}
                    className={classes.textFieldCard}
                    onChange={this.first_name}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.first_name}
                    //helperText={this.state.remarks_error}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                    style={{ width: "90%", height: "5%",fontFamily:"Arial" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          keyboard
                          views={["year", "month", "day"]}
                          openTo={"year"}
                          format={"dd-MM-yyyy"}
                          placeholder="18-10-2019"
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
                          onChange={this.date_of_birth}
                          value={this.state.date_of_birth}
                        />
                      </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="Address"
                    label="Address"
                    // className={classes.textFieldCard}
                     onChange={this.address}
                    // margin="normal"
                    // error={this.state.remarks}
                    value={this.state.address}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "90%", height: "5%",fontFamily:"Arial" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="City"
                    label="City"
                    // className={classes.textFieldCard}
                     onChange={this.city}
                    // margin="normal"
                    // error={this.state.remarks}
                    value={this.state.city}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "90%", height: "5%",fontFamily:"Arial" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="State"
                    label="State"
                    // className={classes.textFieldCard}
                    onChange={this.states}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.states}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "90%", height: "5%",fontFamily:"Arial" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="ZipCode"
                    label="Zip Code"
                    // className={classes.textFieldCard}
                     onChange={this.zip_code}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.zip_code}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "90%", height: "5%" ,fontFamily:"Arial"}}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                <InputMask
               mask="999-999-99999"
               onChange={this.phone_no}
               value={this.state.phone_no}
                disabled={false}
                maskChar=""
              >
                {() =>
                  <TextField
                  name="PhoneNumber"
                  label="Phone Number"
                  
                  style={{ width: "90%", height: "5%",fontFamily:"Arial" }}
                />}</InputMask>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="Email"
                    label="Email"
                    // className={classes.textFieldCard}
                     onChange={this.email}
                     value={this.state.email}
                    // margin="normal"
                    // error={this.state.remarks}
                    //helperText={this.state.remarks_error}
                    required
                    style={{ width: "90%", height: "5%",fontFamily:"Arial" }}
                  />
                </Grid>
                <Grid item xs={12} align="left">
                  <Typography
                    variant="title"
                    color="primary"
                    style={{ height: "5%" }}
                  >
                    Peferred method of contact
                  </Typography>
                </Grid>
                
                <Grid item xs={11} sm={1} align="left">
                <input type="radio" style={{height:"15px",width:"15px"}}  value={this.state.check_mobile} name="checkedI"  onChange={this.check_mobile}  />Phone
                {/* <FormControlLabel
                    control={
                      <RadioGroup
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<RadioGroup fontSize="small" />}
                        name="checkedI"
                        
                     onChange={this.check_mobile}
                     value={this.state.check_mobile}
                      />
                    }
                    label="Phone "
                  /> */}
                </Grid>
                
                <Grid item xs={11} sm={1}>
                  <Typography
                    variant="title"
                    style={{ marginTop: "5px", marginLeft: "10px" }}
                  >
                    or
                  </Typography>
                </Grid>
                
                <Grid item xs={11} sm={1} align="left">
                  <label>
                  <input type="radio" style={{height:"15px",width:"15px"}}   value={this.state.check_email} name="checkedI"   onChange={this.check_email}  />Email
                  </label>
                {/* <FormControlLabel
                    control={
                      <RadioGroup 
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<RadioGroup  fontSize="small" />}
                        name="checkedI"
                     onChange={this.check_email}
                     value={this.state.check_email}
                      />
                    }
                    label="Email "
                  /> */}
                </Grid>

                <Grid item xs={12} align="left">
                  <Typography
                    variant="title"
                    color="primary"
                    style={{ height: "5%" }}
                  >
                    Emergency Contact:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="Email"
                    label="Name"
                    // className={classes.textFieldCard}
                     onChange={this.emergency_email}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.emergency_email}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "90%", height: "5%",fontFamily:"Arial" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="Relation"
                    label="Relation"
                    // className={classes.textFieldCard}
                     onChange={this.relation}
                    // margin="normal"
                    // error={this.state.remarks}
                    value={this.state.relation}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "90%", height: "5%",fontFamily:"Arial" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                <InputMask
               mask="999-999-99999"
               onChange={this.emergency_phone}
               value={this.state.emergency_phone}
                disabled={false}
                maskChar=""
              >
                {() =>
                  <TextField
                  name="Phone"
                  label="Phone(000) 000-00000"
                  style={{ width: "90%", height: "5%",fontFamily:"Arial" }}
                />}</InputMask>
                </Grid>
                <Grid item xs={12} style={{height:"216px"}}>
                  <Typography
                    variant="title"
                    style={{
                      marginTop: "10px",
                      fontSize: "18px",
                      fontFamily: "Arial",
                    
                    }}
                  >
                    • I give permission for Summit Orthopaedics to provide medical evaluation
                    services.This consent begins on the date below and remains in effect unless revoked in writing. {this.state.today}
                  </Typography>
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
          <div className={classes.grow} />
        <ProgressBar
        width="400px"
        height="16px"
        rect
        fontColor="gray"
        percentage="10"
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
            color="default"
            onClick={this.SkipForm}
            style={{marginRight:"10px"}}
          >
            <SkipNextIcon style={{marginRight:"1px"}} />Skip
          </Button>
          {this.state.isSavedCalled?<Loader type="TailSpin" color="#00BFFF" height={50} width={50}/>:
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


export default withStyles(useStyles)(Consent1);
