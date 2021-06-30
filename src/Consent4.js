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
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import BottomBar from "./BottomBar";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Line, Circle } from 'rc-progress';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DoneIcon from '@material-ui/icons/Done';
import { properties } from "./properties";
import ProgressBar from 'react-animated-progress-bar';
import * as moment from "moment";
import Loader from 'react-loader-spinner';
import InputMask from "react-input-mask";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";
import CustomizedSnackbar from './customizesnackbar/CustomizedSnackbar.js'
import { el } from "date-fns/locale";

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

class Consent4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PatientID:localStorage.getItem("PID"),
      FName:"",
      MName:"",
      LName:"",
      DOB:"", 
      SSN:"",
      check_policy:false,
      InsuranceName:"",
      PolicyNumber:"",
      CompanyName:"", 
      InsurancePlan:"",
      InsuranceSkip:"",
      HaveInsurance:"",
      IRelationship:"", 
      InsuranceGender:"",
      ISSN:"",
      chk1:"",
      chk2:"",
      chk3:"",
      chk4:"",
      isSavedCalled:false,
      insuranceCard:true,
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
	    if(this.state.PatientID==this.state.PatientID){ 
      let url =
      localStorage.getItem("url") +
      "/MobileGetAllSavedConsentDataInfo?PID="+
      this.state.PatientID+
      "&consent_id=4";
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
        //console.log("abc",result);
        this.setState({
          SSN:result["SSN"],
          MMID: result["MMID"],
          InsuranceName: result["InsuranceName"],
          InsuranceSkip: result["InsuranceSkip"],
          PolicyNumber: result["PolicyNumber"],
          CompanyName: result["CompanyName"],
          InsurancePlan: result["InsurancePlan"],
          HaveInsurance: result["HaveInsurance"],
          IRelationship: result["IRelationship"],
          ISSN: result["ISSN"],
          // chk1:result["chk1"],
          // chk2: result["chk2"],
          // chk3: result["chk3"],
          // chk4: result["chk4"],
                 });
      })
      console.log(this.state.InsuranceName)
      // .catch((error) => alert("An error occured: " + error));
    }
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
          LName:result.last_name,
          DOB:result.date_of_birth
        });
      })
  }
   SkipForm() {
    window.location = "#/Consent5";
  }
   PrevisousForm() {
    window.location = "#/Consent3";
  }
  insurance_Card = (event) => {
    this.setState({
      insuranceCard: event.target.value,
    });
  };
  check_policy = (event) => {
    this.setState({
      check_policy: !this.state.check_policy,
    });
  };
  FName = (event) => {
    this.setState({
      FName: event.target.value,
    });
  };
MName = (event) => {
    this.setState({
      MName: event.target.value,
    });
  };
  LName = (event) => {
    this.setState({
      LName: event.target.value,
    });
  };
DOB = (event) => {
    this.setState({
      DOB: event,
    });
  };
  SSN = (event) => {
    this.setState({
      SSN: event.target.value ,
    });
  };
InsuranceName = (event) => {
    this.setState({
      InsuranceName: event.target.value,
    });
  };
  PolicyNumber = (event) => {
    this.setState({
      PolicyNumber: event.target.value,
    });
  };
CompanyName = (event) => {
    this.setState({
      CompanyName: event.target.value,
    });
  };
  InsurancePlan = (event) => {
    this.setState({
      InsurancePlan: event.target.value,
    });
  };
InsuranceSkip = (event) => {
    this.setState({
      InsuranceSkip: event.target.value,
    });
  };
  HaveInsurance = (event) => {
    this.setState({
      HaveInsurance: event.target.value,
    });
  };
IRelationship = (event) => {
    this.setState({
      IRelationship: event.target.value,
    });
  };
  InsuranceGender = (event) => {
    this.setState({
      InsuranceGender: event.target.value,
    });
  };
  ISSN = (event) => {
    this.setState({
      ISSN: event.target.value,
    });
  };
chk1 = (event) => {
  this.setState({
    chk1: !this.state.chk1
  })

  };
  chk2 = (event) => {
    this.setState({
      chk2: !this.state.chk2
    })

  };
chk3 = (event) => {
   
  this.setState({
    chk3: !this.state.chk3
  })
  };
  chk4 = (event) => {
   
    this.setState({
      chk4: !this.state.chk4
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
    const FormittedIDOB = moment(this.state.IDOB).format(
      "MM/DD/YYYY"
    );

    let url =
      localStorage.getItem("url") +
      "/MobileSaveInsuranceBillingV2?FName=" +
      this.state.FName +
      "&PID=" +
      this.state.PatientID +
      "&MName=" +
      this.state.MName+
      "&LName=" +
      this.state.LName +
      "&DOB=" +
      this.state.DOB+
      "&SSN=" +
      this.state.SSN +
      "&InsuranceName=" +
      this.state.InsuranceName+
      "&PolicyNumber=" +
      this.state.PolicyNumber +
      "&CompanyName=" +
      this.state.CompanyName+
      "&InsurancePlan=" +
      this.state.InsurancePlan +
      "&InsuranceSkip=" +
      this.state.InsuranceSkip+
      "&HaveInsurance=" +
      this.state.HaveInsurance +
      "&IRelationship=" +
      this.state.IRelationship+
      "&IDOB=" +
      FormittedIDOB+
      "&InsuranceGender=" +
      this.state.InsuranceGender+
      "&ISSN=" +
      this.state.ISSN +
      "&chk1=" +
      this.state.chk1+
      "&chk2=" +
      this.state.chk2 +
      "&chk3=" +
      this.state.chk3 +
      "&chk4=" +
      this.state.chk4;
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
          }else if(!this.state.chk3){
            alert("Please authorize the consent to proceed");
          }else if(!this.state.chk4){
            alert("Please authorize the consent to proceed");
          }else{
            this.setState({
              isSavedCalled:true
            });
            window.location = "#/Consent5/";
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
            Insurance Billing
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
              <Grid container spacing={3}>
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
                <Grid item xs={12} sm={3}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="FirstName"
                    label="First Name"
                    style={{ width: "90%", height: "2%" }}
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
                    name="LastName"
                    label="Last Name"
                    // className={classes.textFieldCard}
                     onChange={this.LName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.LName}
                    //helperText={this.state.remarks_error}
                    required
                    style={{ width: "90%", height: "2%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          keyboard
                          views={["year", "month", "day"]}
                          openTo={"year"}
                          format={"dd/MM/yyyy"}
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
                          onChange={this.DOB}
                          value={this.state.DOB}
                        />
                      </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                <InputMask
               mask="999-99-9999"
                value={this.state.SSN}
                disabled={false}
                onChange={this.SSN}
                maskChar=""
              >
                {() =>
                  <TextField
                    name="Patient"
                    label="Patient's SSN (000-00-0000)"
                    style={{ width: "90%", height: "2%" }}
                />}</InputMask>
                
                </Grid>
                <Grid item xs={12} sm={12} align="left">
                <input type="radio" style={{height:"15px",width:"15px"}}  value={this.state.insuranceCard} name="checkedI" onChange={this.insurance_Card} />Insurance card provided
                {/* <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedI"
                     value={true}
                      />
                    }
                    label="Insurancce Card provided "
                  /> */}
                </Grid>
                
                <Grid item xs={11} sm={12}>
                  <Typography
                    variant="title"
                    style={{ marginTop: "5px", marginLeft: "10px",fontWeight:"700"}}
                  >
                    or
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={12} align="left">
                <input type="radio" style={{height:"15px",width:"15px"}}   value={this.state.check_policy} name="checkedI" onChange={this.check_policy} />I will provide Medicaid Information
                {/* <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedI"
                        
                     onChange={this.check_policy}
                     value={this.state.check_policy}
                      />
                    }
                    label="I will provide Policy Information "
                  /> */}
                </Grid>
{this.state.check_policy?(<div >
              <Grid container spacing={8}><Grid item xs={12} sm={3}>

                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="InsuranceCompany"
                    label="Insurance Company"
                    // className={classes.textFieldCard}
                     onChange={this.InsuranceName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.InsuranceName}
                    //helperText={this.state.remarks_error}
                    style={{ width: "90%", height: "2%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="PolicyIDNumber"
                    label="Policy ID Number"
                    // className={classes.textFieldCard}
                     onChange={this.PolicyNumber}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.PolicyNumber}
                    //helperText={this.state.remarks_error}
                    style={{ width: "90%", height: "2%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="InsurancePlan/Group"
                    label="Insurance Plan/Group"
                    // className={classes.textFieldCard}
                    onChange={this.InsurancePlan}
                    // margin="normal"
                    // error={this.state.remarks}
                    value={this.state.InsurancePlan}
                    //helperText={this.state.remarks_error}
                    style={{ width: "90%", height: "2%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="NameofPolicyHolder"
                    label="Name of Policy Holder"
                    // className={classes.textFieldCard}
                     onChange={this.CompanyName}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.CompanyName}
                    //helperText={this.state.remarks_error}
                    style={{ width: "90%", height: "2%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="RelationshiptoPatient"
                    label="Relationship to Patient"
                    // className={classes.textFieldCard}
                     onChange={this.IRelationship}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.IRelationship}
                    //helperText={this.state.remarks_error}
                    style={{ width: "90%", height: "2%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      keyboard
                      format={"dd/MM/yyyy"}
                      placeholder="18/10/2019"
                      label="Policy holder's Date Of Birth"
                      name="validFrom"
                      id="validFrom"
                      //margin="normal"
                      // error={this.state.date_valid_from}
                      // value={this.state.date_of_birth_val}
                      // helperText={this.state.date_valid_from_error}
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
                      style={{ width: "90%", height: "2%" }}
                       onChange={this.IDOB}
                       value={this.state.IDOB}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: "90%", height: "5%" }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Policy holder's Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.InsuranceGender}
                      onChange={this.InsuranceGender}
                    >
                      <MenuItem value={1}>Male</MenuItem>
                      <MenuItem value={2}>Female</MenuItem>
                      <MenuItem value={3}>other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="PolicyHolder'sSocialSecurity"
                    label="Policy Holder's Social Security"
                    // className={classes.textFieldCard}
                     onChange={this.ISSN}
                    // margin="normal"
                    // error={this.state.remarks}
                     value={this.state.ISSN}
                    //helperText={this.state.remarks_error}
                    style={{ width: "90%", height: "2%" }}
                  />
                </Grid> </Grid>  </div>
          ): (
            <center>
            </center>
          )}
                
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
                    Authorization (Please read and mark each authorization
                    below)
                  </Typography>
                </Grid>
                <Grid item xs={12} align="left">
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
                    label="I authorize the submission of a claim for any services provided to me by Summit Orthopaedics now, in the past, or in the future. I understand that this authorization shall remain valid without expiration unless expressly revoked by me in writing."
                  />
                </Grid>
                <Grid item xs={12} align="left">
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
                    label="I authorize Summit Orthopaedics. to appeal payment denials or other adverse decisions on my behalf. I authorize and direct any holder of medical, insurance, billing or other relevant information about me to release such information to Summit Orthopaedics. and its billing agents, the Centers for Medicare and Medicaid Services, and/or any other payers or insurers, and their respective agents or contractors, as may be necessary to determine these or other benefits payable for any services provided to me."
                  />
                </Grid>
                <Grid item xs={12} align="left">
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedI"
                     onChange={this.chk3}
                     value={this.state.chk3}
                      />
                    }
                    label="I understand that some third-party payers may require that my medical information, including copies of treatment notes, be submitted along with requests for payment. I hereby authorize Summit Orthopaedics to release all medical information necessary to secure payment of benefits from third-party payers. I understand that this information may include medical information related to drug and alcohol abuse, sexually transmitted diseases, HIV/AIDS and mental health. I authorize the use of this signature on all related submissions."
                  />
                </Grid>
                <Grid item xs={12} align="left">
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedI"
                     onChange={this.chk4}
                     value={this.state.chk4}
                      />
                    }
                    label="I authorize Summit Orthopaedics to obtain medical, insurance, billing and other relevant information about me from any party, database or other source that maintains such information."
                  />
                </Grid>
                <Grid item xs={12} align="left">
                  <Divider variant="middle" />
                </Grid>
                <Grid item xs={12} align="left" style={{height:"60px"}}>
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
        percentage="40"
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

export default withStyles(useStyles)(Consent4);
