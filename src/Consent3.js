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
  Button
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
import { properties } from "./properties";
import Loader from 'react-loader-spinner'
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
class Consent3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      PatientID:localStorage.getItem("PID"),
      BName:"",
      MMID:"",
      isSavedCalled:false,
      chk1:"",
      is_hide:false,
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
      "&consent_id=3";
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
          BName:result["BName"],
          MMID: result["MMID"],
        });
        if(this.state.BName==null||this.state.BName=="undefined"||this.state.BName=="null"){
          this.setState({
            BName:""
          })
        }
        if(this.state.MMID==null||this.state.MMID=="undefined"||this.state.MMID=="null"){
          this.setState({
            MMID:""
          })
        }
      })
      // .catch((error) => alert("An error occured: " + error));
    }
  }
   SkipForm= (event) => {
    window.location = "#/Consent4";
  }
   PrevisousForm= (event) => {
    window.location = "#/Consent2";
  }
  BName = (event) => {
    this.setState({
      BName: event.target.value,
    });
  };
  chk1 = (event) => {
    this.setState({
      is_hide: event.target.checked === true ? -1 : 0 || event.target.value
    })
  
    };
MMID = (event) => {
    this.setState({
      MMID: event.target.value,
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
      "/MobileSaveMedicareMedicaidV2?BName=" +
      this.state.BName +
      "&PID=" +
      this.state.PatientID +
      "&MMID=" +
      this.state.MMID ;
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
          window.location = "#/Consent4/";
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
            Medicare Medicaid
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
              <Grid container spacing={2}>
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
                     This authorization allows Summit Orthopaedics to submit assigned and non-assigned claims on the beneficiary's behalf.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="NameofBeneficiary"
                    label="Name of Beneficiary"
                    style={{ width: "90%", height: "5%" }}
                    className={classes.textFieldCard}
                    disabled={this.state.is_hide === -1 ? true : false}
                     onChange={this.BName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.BName}
                    //helperText={this.state.remarks_error}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="MidicareMedicalId"
                    label="Medical or Medicaid ID"
                    disabled={this.state.is_hide === -1 ? true : false}
                    // className={classes.textFieldCard}
                     onChange={this.MMID}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.MMID}
                    //helperText={this.state.remarks_error}
                    required
                    style={{ width: "90%", height: "5%" }}
                  />
                </Grid>
                <Grid item xs={12} align="left">
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedI"
                     onChange={this.chk1}
                     checked={this.state.is_hide}
                      />
                    }
                    label="Name of Beneficiary"
                  />
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
                      {/* • I request that payment of authorized Medicare benefits be made either to me or on my behalf to the name of provider of service and (or) supplier for any services furnished to me by that provider of service and (or) supplier.  */}
                      • I authorize any holder of medical information about me to release to the Centers for Medicare and Medicaid Services and its agents any information needed to determine these benefits or the benefits payable for related service.
                    </p>
                  </Typography>
                </Grid>
                <Grid item xs={12} align="left">
                  <Divider variant="middle" />
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
        percentage="30"
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

export default withStyles(useStyles)(Consent3);
