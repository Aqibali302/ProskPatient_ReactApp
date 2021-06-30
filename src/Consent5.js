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
class Consent5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientID:localStorage.getItem("PID"),
      TimePast:"",
      TimeFuture:"",
      TimePeriod:"All past, present and future periods", 
      isSavedCalled:false,

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
  }
   SkipForm() {
    window.location = "#/Consent6";
  }
   PrevisousForm() {
    window.location = "#/Consent4";
  }
  TimeFuture = (event) => {
    this.setState({
      TimeFuture: event.target.value,
    });
  };
    TimePast= (event) => {
    this.setState({
      TimePast: event.target.value,
    });
  };
 TimePeriod = (event) => {
   
      if(this.state.TimePeriod=="All past, present and future periods"){
         this.setState({
          TimePeriod:"Past months and future months"
           });
      }else if(this.state.TimePeriod=="Past months and future months"){
         this.setState({
          TimePeriod:"All past, present and future periods"
           });
      };
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
      "/MobileSaveObtainProtectedHealthV2?TimeFuture=" +
      this.state.TimeFuture +
      "&PID=" +
      this.state.PatientID +
      "&TimePeriod=" +
      this.state.TimePeriod+
      "&TimePast=" +
      this.state.TimePast ;
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
          window.location = "#/Consent6/";
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
            Obtain Protected Health
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
                      fontSize: "20px",
                      fontFamily: "Arial",
                      fontWeight: "bolder",
                    }}
                  >
Authorization to Obtain Protected Health Information (permission to obtain medical records).
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
                    1. Authorization to Obtain Protected Health Information
                    (permission to obtain medical records).
                  </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                  <Typography
                    variant="title"
                    style={{
                      marginTop: "10px",
                      fontSize: "18px",
                      fontFamily: "Arial",
                    }}
                  >
                    4103 Mercantile Drive,Lake Oswego, OR 97035
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
                    This medical information may be used by Summit Orthopaedics for medical
                    evaluation, treatment, consultation, billing claims or
                    payment, or other purposes as I may direct.
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
                    COVERING PERIOD: This Release of Information covers the
                    period of health care from
                  </Typography>
                </Grid>
                <Grid item xs={11} align="left">
                <input type="radio" style={{height:"15px",width:"15px"}}  value={1} name="checkedI" />All past, present and future periods
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedI"
                        value={1}
                      />
                    }
                    label="All past, present and future periods "
                  /> */}
                </Grid>
                <Grid item xs={12} align="left">
                  <Typography
                    variant="title"
                    style={{
                      marginTop: "10px",
                      fontSize: "18px",
                      fontFamily: "Arial",
                      paddingLeft:"5px",
                      fontWeight:"700"
                    }}
                  >
                      or
                  </Typography>
                </Grid>
                <Grid item xs={11} align="left">
                <input type="radio" style={{height:"15px",width:"15px"}}  value={this.state.TimePeriod} onChange={this.TimePeriod} name="checkedI" />Past months and future months
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedI"
                        onChange={this.TimePeriod}
                      value={this.state.TimePeriod}
                      />
                    }
                    label="Past months and future months "
                  /> */}
                </Grid>
                {this.state.TimePeriod=="Past months and future months"?(
              <Grid container >   <Grid item xs={12} sm={6}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="PastMonths"
                    label="Past Months"
                    style={{ width: "90%", height: "5%" }}
                    className={classes.textFieldCard}
                     onChange={this.TimePast}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.TimePast}
                    //helperText={this.state.remarks_error}
                    
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="FutureMonths"
                    label="Future Months"
                    style={{ width: "90%", height: "5%" }}
                    className={classes.textFieldCard}
                     onChange={this.TimeFuture}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.TimeFuture}
                    //helperText={this.state.remarks_error}
                    
                  />
                </Grid></Grid>
                 ): (
            <center>
            </center>
          )}
             
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
          <Grid item style={{height:"60px"}}>
        
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
        percentage="50"
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
          {this.state.isSavedCalled?      <Loader type="TailSpin" color="#00BFFF"height={50} width={50}/>:
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

export default withStyles(useStyles)(Consent5);