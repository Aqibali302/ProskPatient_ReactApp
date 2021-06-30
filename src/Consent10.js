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
} from "@material-ui/core";
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
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Progress from 'react-progressbar';
import { Line, Circle } from 'rc-progress';
import ProgressBar from 'react-animated-progress-bar';
import SignatureCanvas from 'react-signature-canvas'
import SaveIcon from '@material-ui/icons/Save';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";
import Loader from 'react-loader-spinner'
import { properties } from "./properties";
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
class Consent10 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientID:localStorage.getItem("PID"),
      isSavedCalled:false,
      appointment_id: localStorage.getItem("AppointmentID"),
      trimmedDataURL:null

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
    window.location = "#/home/";
  }
   ClearForm() {
    window.location.reload(true);
  }
 PrevisousForm() {
  window.location = "#/Consent9";
}
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
    "/alpha/SignOnConsents";
    console.log(url)
    console.log(this.state.PatientID)
    console.log(this.state.appointment_id)
  fetch(url, {
    method: "POST",
    headers: {"Content-type": "application/x-www-form-urlencoded"},
    body: "PID="+this.state.PatientID+"&appointment_id="+this.state.appointment_id+"&SignImg="+this.state.trimmedDataURL+"&SignData=ABC"
    //body: data,
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((result) => {
      console.log(result);
      if (result["success"] == "1") {
              let url1 =
          localStorage.getItem("url") +
          "/alpha/Consents/ConsentsGeneratePDF.jsp?PID=" +
          this.state.PatientID ;
          console.log(url1);
        fetch(url1, {
          method: "POST",
          // body: JSON.stringify(data),
        })
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            return res.json();
          })
          .then((result1) => {
            console.log(result1);
            if (result1["success"] == "1") {
              window.location = "#/home/";
            } else {
              alert(result1["error_message"]);
            }
          })
          .catch((error) => alert("An error occured: " + error));
        //window.location = "#/home/";
      } else {
        alert(result["error_message"]);
      }
    })
    .catch((error) => alert("An error occured: " + error));
  }
   handleMenu = (event) => {
    window.location = "#/home/";
  };
  sigPad = {}
  clear = () => {
    this.sigPad.clear()
  }
  trim = () => {
    this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png')},() => {

        //console.log(this.state.trimmedDataURL);
      })
  }
render() {
    const { classes } = this.props;

    let {trimmedDataURL} = this.state;
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
            Signature
          </Typography>
          <div className={classes.grow}/>
          <div>
            <IconButton color="inherit" onClick={this.handleMenu}>
              <HomeIcon /><Typography
              color="inherit"
              noWrap>
              Home
            </Typography>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "60px",marginLeft:"10px",marginRight:"10px"}}>
        <Card style={{ width: "100%",marginTop:"10px"}}>
          <form
            // onKeyPress={this.StopEnter}
            // onSubmit={this.handleSubmit}
            autoComplete="off"
          >
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
                Signature of Patient OR Legal Guardian.

                  </Typography>
                </Grid>
                <Grid  item xs={12} sm={4} align="center">
                </Grid>
                <Grid  item xs={12} sm={4} align="center">
                <Card style={{ backgroundColor: "rgb(230, 222, 222)",height:"300px" ,marginTop:"5px",borderTopStyle:"inset",}}>
                    <CardContent>
                    <SignatureCanvas penColor='black'  
          ref={(ref) => { this.sigPad = ref }}
                     canvasProps={{width: "800px", height: "800px", className: 'sigPad'}} style={{textAlign:"center"}} />
                    </CardContent>
                </Card>
                </Grid>
                <Grid  item xs={12} sm={4} align="center">
                </Grid>

                <Grid  item xs={12} sm={4} align="center">
                </Grid>
                <Grid  item xs={12} sm={4}>
                <Typography
                    variant="title"
                    style={{
                      fontSize: "15px",
                      fontFamily: "Arial",
                      fontWeight: "bolder",
                    }}
                  >
                Note:Signature of Patient OR Legal Guardian.

                  </Typography>
                </Grid>
                <Grid  item xs={12} sm={4} align="center">
                </Grid>

              </Grid>
              <Grid item xs={12} align="center">
              <Button
            variant="contained"
            color="primary"
            onClick={this.clear}
            style={{marginRight:"10px",marginTop:"2%"}}
          >
            Clear
          </Button> 
              </Grid>
                <Grid  item xs={12} sm={4}  style={{height:"120px"}}>
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
        percentage="100"
        rectPadding="1px"
        rectBorderRadius="100px"
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
          {this.state.isSavedCalled?      <Loader type="TailSpin" color="#00BFFF" height={50} width={50}/>:
                    <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={this.trim}
                    className={classes.button}
                  >
                    <SaveIcon style={{marginRight:"1px"}} />Save
                  </Button>
          }
        </Toolbar>
      </AppBar>
 </form>
    </div>
  );
}

}

export default withStyles(useStyles)(Consent10);
