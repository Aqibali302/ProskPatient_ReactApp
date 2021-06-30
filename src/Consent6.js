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
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
class Consent6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientID:localStorage.getItem("PID"),
      FirstMemberFirstName:"",
      FirstMemberMiddleName:"",
      FirstMemberLastName:"",
      FirstMemberPhoneNo:"",
      FirstMemberEmail:"",
      FirstMemberRole:"",
      SecondMemberFirstName:"",
      SecondMemberMiddleName:"",
      SecondMemberLastName:"",
      SecondMemberPhoneNo:"",
      SecondMemberEmail:"",
      SecondMemberRole:"",
      ThirdMemberFirstName:"",
      ThirdMemberMiddleName:"",
      ThirdMemberLastName:"",
      ThirdMemberPhoneNo:"",
      ThirdMemberEmail:"",
      ThirdMemberRole:"",
      isSavedCalled:false,
      firstName:localStorage.getItem("first_name"),
      lastName:localStorage.getItem("last_name"),
      MiddleName:localStorage.getItem("middle_name"),

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
      "&consent_id=6";
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
        console.log(result["memeberlist"]);
        // console.log(url);
        if(result["memeberlist"]!=null){
          for(var i =0;i<result["memeberlist"].length;i++){
            console.log(result["memeberlist"][i]["MemeberFlag"]);
            if(result["memeberlist"][i]["MemeberFlag"]==1){
              this.setState({
                FirstMemberFirstName:result["memeberlist"][i]["txt-careteam-fname"],
                FirstMemberMiddleName: result["memeberlist"][i]["txt-careteam-mname"],
                FirstMemberLastName: result["memeberlist"][i]["txt-careteam-lname"],
                FirstMemberPhoneNo: result["memeberlist"][i]["txt-careteam-phone"],
                FirstMemberEmail: result["memeberlist"][i]["txt-careteam-email"],

              })
              if(result["memeberlist"][i]["txt-careteam-role"]!=null && result["memeberlist"][i]["txt-careteam-role"]!="" && result["memeberlist"][i]["txt-careteam-role"]!="null" && result["memeberlist"][i]["txt-careteam-role"]!="0"  ){
                this.setState({
                 FirstMemberRole: result["memeberlist"][i]["txt-careteam-role"],
                })
              }
              if(this.state.FirstMemberFirstName==null||this.state.FirstMemberFirstName=="undefined"||this.state.FirstMemberFirstName=="null"){
                this.setState({
                  FirstMemberFirstName:""
                })
              }
              if(this.state.FirstMemberMiddleName==null||this.state.FirstMemberMiddleName=="undefined"||this.state.FirstMemberMiddleName=="null"){
                this.setState({
                  FirstMemberMiddleName:""
                })
              }

              if(this.state.FirstMemberLastName==null||this.state.FirstMemberLastName=="undefined"||this.state.FirstMemberLastName=="null"){
                this.setState({
                  FirstMemberLastName:""
                })
              }
              if(this.state.FirstMemberPhoneNo==null||this.state.FirstMemberPhoneNo=="undefined"||this.state.FirstMemberPhoneNo=="null"){
                this.setState({
                  FirstMemberPhoneNo:""
                })
              }
              if(this.state.FirstMemberEmail==null||this.state.FirstMemberEmail=="undefined"||this.state.FirstMemberEmail=="null"){
                this.setState({
                  FirstMemberEmail:""
                })
              }

            }
            if(result["memeberlist"][i]["MemeberFlag"]==2){
              this.setState({
                SecondMemberFirstName: result["memeberlist"][i]["txt-careteam-fname"],
                SecondMemberMiddleName: result["memeberlist"][i]["txt-careteam-mname"],
                SecondMemberLastName: result["memeberlist"][i]["txt-careteam-lname"],
                SecondMemberPhoneNo: result["memeberlist"][i]["txt-careteam-phone"],
                SecondMemberEmail: result["memeberlist"][i]["txt-careteam-email"],

              })
              if(result["memeberlist"][i]["txt-careteam-role"]!=null && result["memeberlist"][i]["txt-careteam-role"]!="" && result["memeberlist"][i]["txt-careteam-role"]!="null" && result["memeberlist"][i]["txt-careteam-role"]!="0"  ){
                this.setState({
                 SecondMemberRole: result["memeberlist"][i]["txt-careteam-role"],
                })
              }

              if(this.state.SecondMemberFirstName==null||this.state.SecondMemberFirstName=="undefined"||this.state.SecondMemberFirstName=="null"){
                this.setState({
                  SecondMemberFirstName:""
                })
              }
              if(this.state.SecondMemberMiddleName==null||this.state.SecondMemberMiddleName=="undefined"||this.state.SecondMemberMiddleName=="null"){
                this.setState({
                  SecondMemberMiddleName:""
                })
              }
              if(this.state.SecondMemberLastName==null||this.state.SecondMemberLastName=="undefined"||this.state.SecondMemberLastName=="null"){
                this.setState({
                  SecondMemberLastName:""
                })
              }
              if(this.state.SecondMemberPhoneNo==null||this.state.SecondMemberPhoneNo=="undefined"||this.state.SecondMemberPhoneNo=="null"){
                this.setState({
                  SecondMemberPhoneNo:""
                })
              }
              if(this.state.SecondMemberEmail==null||this.state.SecondMemberEmail=="undefined"||this.state.SecondMemberEmail=="null"){
                this.setState({
                  SecondMemberEmail:""
                })
              }
            }
            if(result["memeberlist"][i]["MemeberFlag"]==3){
              this.setState({
                ThirdMemberFirstName: result["memeberlist"][i]["txt-careteam-fname"],
                ThirdMemberMiddleName: result["memeberlist"][i]["txt-careteam-mname"],
                ThirdMemberLastName: result["memeberlist"][i]["txt-careteam-lname"],
                ThirdMemberPhoneNo: result["memeberlist"][i]["txt-careteam-phone"],
                ThirdMemberEmail: result["memeberlist"][i]["txt-careteam-email"],

              })
              if(result["memeberlist"][i]["txt-careteam-role"]!=null && result["memeberlist"][i]["txt-careteam-role"]!="" && result["memeberlist"][i]["txt-careteam-role"]!="null" && result["memeberlist"][i]["txt-careteam-role"]!="0"  ){
                this.setState({
                  ThirdMemberRole: result["memeberlist"][i]["txt-careteam-role"],
                })
              }

              if(this.state.ThirdMemberFirstName==null||this.state.ThirdMemberFirstName=="undefined"||this.state.ThirdMemberFirstName=="null"){
                this.setState({
                  ThirdMemberFirstName:""
                })
              }
              if(this.state.ThirdMemberMiddleName==null||this.state.ThirdMemberMiddleName=="undefined"||this.state.ThirdMemberMiddleName=="null"){
                this.setState({
                  ThirdMemberMiddleName:""
                })
              }
              if(this.state.ThirdMemberLastName==null||this.state.ThirdMemberLastName=="undefined"||this.state.ThirdMemberLastName=="null"){
                this.setState({
                  ThirdMemberLastName:""
                })
              }
              if(this.state.ThirdMemberPhoneNo==null||this.state.ThirdMemberPhoneNo=="undefined"||this.state.ThirdMemberPhoneNo=="null"){
                this.setState({
                  ThirdMemberPhoneNo:""
                })
              }
              if(this.state.ThirdMemberEmail==null||this.state.ThirdMemberEmail=="undefined"||this.state.ThirdMemberEmail=="null"){
                this.setState({
                  ThirdMemberEmail:""
                })
              }
            }
          }
        }
      })
            // .catch((error) => alert("An error occured: " + error));
    }
  }
   SkipForm() {
    window.location = "#/Consent7";
  }
   PrevisousForm() {
    window.location = "#/Consent5";
  }
FirstMemberFirstName = (event) => {
    this.setState({
      FirstMemberFirstName: event.target.value,
    });
  };
    FirstMemberMiddleName= (event) => {
    this.setState({
      FirstMemberMiddleName: event.target.value,
    });
  };
  FirstMemberLastName = (event) => {
    this.setState({
      FirstMemberLastName: event.target.value,
    });
  };
    FirstMemberPhoneNo= (event) => {
    this.setState({
      FirstMemberPhoneNo: event.target.value,
    });
  };
  FirstMemberEmail = (event) => {
    this.setState({
      FirstMemberEmail: event.target.value,
    });
  };
    FirstMemberRole= (event) => {
    this.setState({
      FirstMemberRole: event.target.value,
    });
  };
  SecondMemberFirstName = (event) => {
    this.setState({
      SecondMemberFirstName: event.target.value,
    });
  };
    SecondMemberMiddleName= (event) => {
    this.setState({
      SecondMemberMiddleName: event.target.value,
    });
  };
  SecondMemberLastName = (event) => {
    this.setState({
      SecondMemberLastName: event.target.value,
    });
  };
    SecondMemberPhoneNo= (event) => {
    this.setState({
      SecondMemberPhoneNo: event.target.value,
    });
  };
  SecondMemberEmail = (event) => {
    this.setState({
      SecondMemberEmail: event.target.value,
    });
  };
    SecondMemberRole= (event) => {
    this.setState({
      SecondMemberRole: event.target.value,
    });
  };
  ThirdMemberFirstName = (event) => {
    this.setState({
      ThirdMemberFirstName: event.target.value,
    });
  };
    ThirdMemberMiddleName= (event) => {
    this.setState({
      ThirdMemberMiddleName: event.target.value,
    });
  };
  ThirdMemberLastName = (event) => {
    this.setState({
      ThirdMemberLastName: event.target.value,
    });
  };
    ThirdMemberPhoneNo= (event) => {
    this.setState({
      ThirdMemberPhoneNo: event.target.value,
    });
  };
  ThirdMemberEmail = (event) => {
    this.setState({
      ThirdMemberEmail: event.target.value,
    });
  };
    ThirdMemberRole= (event) => {
    this.setState({
      ThirdMemberRole: event.target.value,
    });
  };

  


   handleMenu = (event) => {
    window.location = "#/home/";
  };
  submitForm(event) {
    document.getElementById("submit-button").click();
  };
  handleSubmit(event, state) {
    event.preventDefault();
    this.setState({
      isSavedCalled:true
    });
    let url =
      localStorage.getItem("url") +
      "/MobileSaveHIPAARightOfAccessV2?PID=" +
      this.state.PatientID +
      "&txt-careteam-fname=" +
      this.state.FirstMemberFirstName +
      "&txt-careteam-mname=" +
      this.state.FirstMemberMiddleName+
      "&txt-careteam-lname=" +
      this.state.FirstMemberLastName+
      "&txt-careteam-email=" +
      this.state.FirstMemberEmail +
      "&txt-careteam-phone=" +
      this.state.FirstMemberPhoneNo+
      "&txt-careteam-role=" +
      this.state.FirstMemberRole  ;
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
    
        } else {
          alert(result["error_message"]);
        }
      })
      .catch((error) => alert("An error occured: " + error));
let url1 =
      localStorage.getItem("url") +
      "/MobileSaveHIPAARightOfAccessV2?PID=" +
      this.state.PatientID +
      "&txt-careteam-fname=" +
      this.state.SecondMemberFirstName +
      "&txt-careteam-mname=" +
      this.state.SecondMemberMiddleName+
      "&txt-careteam-lname=" +
      this.state.SecondMemberLastName+
      "&txt-careteam-email=" +
      this.state.SecondMemberEmail +
      "&txt-careteam-phone=" +
      this.state.SecondMemberPhoneNo+
      "&txt-careteam-role=" +
      this.state.SecondMemberRole  ;
    fetch(url1, {
      method: "POST",
      // body: JSON.stringify(data),
    })
      .then((res1) => {
        if (!res1.ok) {
          throw res1;
        }
        return res1.json();
      })
      .then((result1) => {
        if (result1["success"] == "1") {
  
        } else {
          alert(result1["error_message"]);
        }
      })
      .catch((error1) => alert("An error occured: " + error1));
        let url2 =
      localStorage.getItem("url") +
      "/MobileSaveHIPAARightOfAccessV2?PID=" +
      this.state.PatientID +
      "&txt-careteam-fname=" +
      this.state.ThirdMemberFirstName +
      "&txt-careteam-mname=" +
      this.state.ThirdMemberMiddleName+
      "&txt-careteam-lname=" +
      this.state.ThirdMemberLastName+
      "&txt-careteam-email=" +
      this.state.ThirdMemberEmail +
      "&txt-careteam-phone=" +
      this.state.ThirdMemberPhoneNo+
      "&txt-careteam-role=" +
      this.state.ThirdMemberRole  ;
    fetch(url2, {
      method: "POST",
      // body: JSON.stringify(data),
    })
      .then((res2) => {
        if (!res2.ok) {
          throw res2;
        }
        return res2.json();
      })
      .then((result2) => {
        if (result2["success"] == "1") {
          window.location = "#/Consent7/";
        } else {
          alert(result2["error_message"]);
        }
      })
      .catch((error2) => alert("An error occured: " + error2));
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
           HIPAA Right of Access Form
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
          <form
            // onKeyPress={this.StopEnter}
            // onSubmit={this.handleSubmit}
            autoComplete="off"
          >
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
HIPAA Right of Access Form for Family Member/Friend/Care Provider (permission to send medical information)
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
                    I {this.state.firstName} {this.state.lastName} direct my health care and medical services providers and payers to disclose and release my protected health information to:
                  </Typography>
                </Grid>
                <Grid item xs={12} align="left">
                  <Typography
                    variant="title"
                    style={{
                      marginTop: "10px",
                      fontSize: "20px",
                      fontFamily: "Arial",
                      fontWeight: "bolder",
                    }}
                  >
                    Member One
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>

                   <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="FirstName"
                    label="First Name"
                    style={{ width: "90%", height: "5%" }}
                    className={classes.textFieldCard}
                    onChange={this.FirstMemberFirstName}
                     value={this.state.FirstMemberFirstName}
                     required
                  /> 
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="MiddleName"
                    label="Middle Name"
                    // className={classes.textFieldCard}
                     onChange={this.FirstMemberMiddleName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.FirstMemberMiddleName}
                    //helperText={this.state.remarks_error}
                    style={{ width: "95%", height: "5%" }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="LastName"
                    label="Last Name"
                    // className={classes.textFieldCard}
                     onChange={this.FirstMemberLastName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.FirstMemberLastName}
                    //helperText={this.state.remarks_error}
                    style={{ width: "90%", height: "5%" }}
                    required/>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="PhoneNumber"
                    label="Phone Number"
                    // className={classes.textFieldCard}
                     onChange={this.FirstMemberPhoneNo}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.FirstMemberPhoneNo}
                    //helperText={this.state.remarks_error}
                    style={{ width: "90%", height: "5%" }}
                    required/>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="Email"
                    label="Email"
                    // className={classes.textFieldCard}
                     onChange={this.FirstMemberEmail}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.FirstMemberEmail}
                    //helperText={this.state.remarks_error}
                    style={{ width: "90%", height: "5%" }}
                    required/>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: "90%", height: "5%" }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.FirstMemberRole}
                      onChange={this.FirstMemberRole}
                    >
                      <MenuItem value={1}>Primary Care Phyiscian</MenuItem>
                      <MenuItem value={2}>Referring Phyiscian</MenuItem>
                      <MenuItem value={3}>Orthopedic Surgeon</MenuItem>
                      <MenuItem value={4}>Neurosurgeon</MenuItem>
                      <MenuItem value={5}>Physiatrist</MenuItem>
                      <MenuItem value={6}>Pain Specialist</MenuItem>
                      <MenuItem value={7}>Physical Therapist</MenuItem>
                      <MenuItem value={8}>Chiropractor</MenuItem>
                      <MenuItem value={9}>Family Member</MenuItem>
                      <MenuItem value={10}>Friend</MenuItem>
                      <MenuItem value={11}>Care Giver</MenuItem>
                      <MenuItem value={12}>Other</MenuItem>
                      <MenuItem value={13}>New Role</MenuItem>
                      <MenuItem value={14}>Cardio</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} align="left">
                  <Typography
                    variant="title"
                    style={{
                      marginTop: "10px",
                      fontSize: "20px",
                      fontFamily: "Arial",
                      fontWeight: "bolder",
                    }}
                  >
                    Member Two
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="FirstName"
                    label="First Name"
                    style={{ width: "90%", height: "5%" }}
                    className={classes.textFieldCard}
                     onChange={this.SecondMemberFirstName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.SecondMemberFirstName}
                    //helperText={this.state.remarks_error}
                    
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="MiddleName"
                    label="Middle Name"
                    // className={classes.textFieldCard}
                     onChange={this.SecondMemberMiddleName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.SecondMemberMiddleName}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "95%", height: "5%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="LastName"
                    label="Last Name"
                    // className={classes.textFieldCard}
                    onChange={this.SecondMemberLastName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.SecondMemberLastName}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "90%", height: "5%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="PhoneNumber"
                    label="Phone Number"
                    // className={classes.textFieldCard}
                    onChange={this.SecondMemberPhoneNo}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.SecondMemberPhoneNo}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "90%", height: "5%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="Email"
                    label="Email"
                    // className={classes.textFieldCard}
                     onChange={this.SecondMemberEmail}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.SecondMemberEmail}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "90%", height: "5%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: "90%", height: "5%" }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.SecondMemberRole}
                      onChange={this.SecondMemberRole}
                    >
                      <MenuItem value={1}>Primary Care Phyiscian</MenuItem>
                      <MenuItem value={2}>Referring Phyiscian</MenuItem>
                      <MenuItem value={3}>Orthopedic Surgeon</MenuItem>
                      <MenuItem value={4}>Neurosurgeon</MenuItem>
                      <MenuItem value={5}>Physiatrist</MenuItem>
                      <MenuItem value={6}>Pain Specialist</MenuItem>
                      <MenuItem value={7}>Physical Therapist</MenuItem>
                      <MenuItem value={8}>Chiropractor</MenuItem>
                      <MenuItem value={9}>Family Member</MenuItem>
                      <MenuItem value={10}>Friend</MenuItem>
                      <MenuItem value={11}>Care Giver</MenuItem>
                      <MenuItem value={12}>Other</MenuItem>
                      <MenuItem value={13}>New Role</MenuItem>
                      <MenuItem value={14}>Cardio</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} align="left">
                  <Typography
                    variant="title"
                    style={{
                      marginTop: "10px",
                      fontSize: "20px",
                      fontFamily: "Arial",
                      fontWeight: "bolder",
                    }}
                  >
                    Member Three
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="FirstName"
                    label="First Name"
                    style={{ width: "90%", height: "5%" }}
                    className={classes.textFieldCard}
                     onChange={this.ThirdMemberFirstName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.ThirdMemberFirstName}
                    //helperText={this.state.remarks_error}
                    
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="MiddleName"
                    label="Middle Name"
                    // className={classes.textFieldCard}
                     onChange={this.ThirdMemberMiddleName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.ThirdMemberMiddleName}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "95%", height: "5%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="LastName"
                    label="Last Name"
                    // className={classes.textFieldCard}
                     onChange={this.ThirdMemberLastName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.ThirdMemberLastName}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "90%", height: "5%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="PhoneNumber"
                    label="Phone Number"
                    // className={classes.textFieldCard}
                     onChange={this.ThirdMemberPhoneNo}
                    // margin="normal"
                    // error={this.state.remarks}
                    value={this.state.ThirdMemberPhoneNo}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "90%", height: "5%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="Email"
                    label="Email"
                    // className={classes.textFieldCard}
                     onChange={this.ThirdMemberEmail}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.ThirdMemberEmail}
                    //helperText={this.state.remarks_error}
                    
                    style={{ width: "90%", height: "5%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: "90%", height: "5%" }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.ThirdMemberRole}
                      onChange={this.ThirdMemberRole}
                    >
                      <MenuItem value={1}>Primary Care Phyiscian</MenuItem>
                      <MenuItem value={2}>Referring Phyiscian</MenuItem>
                      <MenuItem value={3}>Orthopedic Surgeon</MenuItem>
                      <MenuItem value={4}>Neurosurgeon</MenuItem>
                      <MenuItem value={5}>Physiatrist</MenuItem>
                      <MenuItem value={6}>Pain Specialist</MenuItem>
                      <MenuItem value={7}>Physical Therapist</MenuItem>
                      <MenuItem value={8}>Chiropractor</MenuItem>
                      <MenuItem value={9}>Family Member</MenuItem>
                      <MenuItem value={10}>Friend</MenuItem>
                      <MenuItem value={11}>Care Giver</MenuItem>
                      <MenuItem value={12}>Other</MenuItem>
                      <MenuItem value={13}>New Role</MenuItem>
                      <MenuItem value={14}>Cardio</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} align="left">
          <Typography
            variant="title"
            style={{
              marginTop: "10px",
              fontSize: "18px",
              fontFamily: "Arial",
              fontWeight: "bolder",
            }}
          >
            Note: HIPAA Authority for Right of Access: 45 C.F.R. ยง 164.524 
          </Typography>
        </Grid>
        <Grid item xs={12} align="left">
          <Typography
            variant="title"
            style={{
              marginTop: "10px",
              fontSize: "18px",
              fontFamily: "Arial",
              fontWeight: "bolder",
            }}
          >
            You may revoke this authorization in writing at any time by notifying Summit Orthopaedics.
          </Typography>
        </Grid>
              </Grid>
              <Grid item style={{height:"60px"}}>
        
        </Grid>
            </CardContent>
          </form>
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
        percentage="60"
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

export default withStyles(useStyles)(Consent6);