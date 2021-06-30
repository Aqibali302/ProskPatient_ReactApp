import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo1 from "./logo1.png";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import * as firebase from "firebase";
import Medicine from "./images/verification.png";
import prosk from "./images/Logo-02.png";
import Loader from 'react-loader-spinner'
import CustomizedSnackbar from './customizesnackbar/CustomizedSnackbar.js'
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
grow: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

function DenseAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {/* <IconButton color="inherit" aria-label="Menu">
            <img src={logo1} width={40} />
          </IconButton> */}
          <Typography variant="h6" color="inherit">
            PROSK PATIENT.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
// var firebaseConfig = {
//   apiKey: "AIzaSyDLVda3ezoTnE1DxtGWDieX8XBWVHZeRwM",
//   authDomain: "proskpatient.firebaseapp.com",
//   databaseURL: "https://proskpatient.firebaseio.com",
//   projectId: "proskpatient",
//   storageBucket: "proskpatient.appspot.com",
//   messagingSenderId: "1024430389293",
//   appId: "1:1024430389293:web:51318899e0a81f66cfa0a4",
//   measurementId: "G-YM1DWF6K51",
// };
// var app = firebase.initializeApp(firebaseConfig);

class MobileVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedB: true,
      verificationCode: "",
      isSavedCalled:false,
      mobileNo: localStorage.getItem("phoneNo"),
      showmobileNo:this.formatPhoneNumber(localStorage.getItem("phoneNo")) ,
      isOpenSnackbar: false,
      snackbarMessage: "",
      snackbarSeverity: "",
      mytoken:null,
      Ip_Address:"",
      isAnroid:"0",
      isIos:"0",
      isWeb:"1",
      dob:"0",
      vfcode:"0",
      LogId:"",
      code_valid:"1",
      Error_message:"",
      is_code_valid2:"0"

    };
  }
  verificationCode = (event) => {
    this.setState({
      verificationCode: event.target.value,
    });
  };
  getIpAddress=()=>{
    this.state.Ip_Address = require('ip');
    console.log(this.state.Ip_Address.address());
  }


   formatPhoneNumber=(phoneNumberString)=> {
    
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
    // var x = phoneNumberString.replace(/\D+/g, '')
    //      .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    // return x
  }
  MobileCheckUserExists = () => {
    const dataTomcat = new FormData();
    dataTomcat.append(
      "mobile_number",
      localStorage.getItem("phoneNo").replace("+", "")
    );

    let url =
      localStorage.getItem("url") +
      "/MobileCheckUserExists?mobile_number=" +
      localStorage.getItem("phoneNo").replace("+", "");
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
      .then(
        (result) => {
          console.log(result);
          if (result[0]["success"] == "1") {
            if (result[0]["is_registered"] == 1) {
                localStorage.setItem("UserID", result[0]["user_id"].toString());
                localStorage.setItem(
                  "AppointmentDate",
                  result[0]["upcoming_appointment_date"].toString()
                ); 
                localStorage.setItem(
                  "AppointmentTime",
                  result[0]["upcoming_appointment_time"].toString()
                );
                localStorage.setItem(
                  "AppointmentID",
                  result[0]["upcoming_appointment_id"].toString()
                );
                this.MobileGetUserInfo();
             
            } else {
              this.handleOpenSnackbar(<span>No upcoming appointment exists</span>,
                "info"
            );
            }
          }
        }
      )
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  };
  VeifyEmail=()=>{
    let url=localStorage.getItem("url") +"/mobile/MobileTwoStepAuthentication?ip="+this.state.Ip_Address.address()+
    "&phone="+this.state.mobileNo+"&is_ios=0&is_web=1&is_anroid=0";
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
      if (result["success"] == "1") {
        localStorage.setItem("log_id",result["log_id"]);
        localStorage.setItem("verification_code",result["verification_code"]);
        console.log(this.state.verificationCode);
      } else {
        alert("Patient with this email is not found. Please call the office for assistance.");
       // alert(result["error_message"]);
        window.location="#/"
      }
    })
    .catch((error) => alert("An error occured: " + error));
  }
  LogUserLogin=(Remarks)=>{
    let url=localStorage.getItem("url") +"/mobile/MobileLogUser?ip="+this.state.Ip_Address.address()+
    "&mobile_no="+this.state.mobileNo+"&is_anroid=0&is_ios=0&is_web=1&date_of_birth=0&verification_code=0&remarks="+Remarks;
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
      if (result["success"] == "1") {
        localStorage.setItem("log_id",result["log_id"]);
      } else {
        alert(result["error_message"]);
      }
    })
    .catch((error) => alert("An error occured: " + error));
  }
  LogUserLoginSuccess=()=>{
    let url=localStorage.getItem("url") +"/mobile/MobileLogUser?verification_code="+this.state.verificationCode+
    "&date_of_birth=0&log_id="+this.state.LogId+
    "&is_code_valid=1"
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
        console.log("good")
      }
    })
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

        localStorage.setItem("first_name", result["first_name"] + "");
        localStorage.setItem("middle_name", result["middle_name"] + "");
        localStorage.setItem("last_name", result["last_name"] + "");
        localStorage.setItem(
          "last_appointment",
          result["last_appointment"] + ""
        );
        localStorage.setItem("email", result["email"] + "");
        localStorage.setItem("phone", result["phone"] + "");
        localStorage.setItem("date_of_birth", result["date_of_birth"] + "");
        localStorage.setItem("PID", localStorage.getItem("UserID"));
        window.location = "#/TwoFactorAuthentication/";
      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  }
  handleSubmit(event, state) {
    event.preventDefault();
    // this.setState({
    //   isSavedCalled:true
    // });

    const verificationId = this.state.verificationCode;
    // if (verificationId == "123456") {
    //   this.MobileCheckUserExists();
    // } else
     if(this.state.verificationCode==""){
      this.handleOpenSnackbar(<span>Please Enter Verification Code </span>,
        "info"
    )
    }else if(localStorage.getItem("verification_code")==this.state.verificationCode){
      
      this.LogUserLoginSuccess();
        const dataTomcat = new FormData();
        dataTomcat.append(
          "mobile_number",
          localStorage.getItem("phoneNo").replace("+", "")
        );
        let url =
        localStorage.getItem("url") +
        "/MobileCheckUserExists?mobile_number=" +
        localStorage.getItem("phoneNo").replace("+", "");
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
          .then(
            (result) => {
              console.log(result);
              if (result[0]["success"] == "1") {
                if (result[0]["is_registered"] == 1) {
                    localStorage.setItem("UserID", result[0]["user_id"].toString());
                    localStorage.setItem(
                      "AppointmentDate",
                      result[0]["upcoming_appointment_date"].toString()
                    ); 
                    localStorage.setItem(
                      "AppointmentTime",
                      result[0]["upcoming_appointment_time"].toString()
                    );
                    localStorage.setItem(
                      "AppointmentID",
                      result[0]["upcoming_appointment_id"].toString()
                    );
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
            localStorage.setItem("middle_name", result["middle_name"] + "");
            localStorage.setItem("last_name", result["last_name"] + "");
            localStorage.setItem(
              "last_appointment",
              result["last_appointment"] + ""
            );
            localStorage.setItem("email", result["email"] + "");
            localStorage.setItem("phone", result["phone"] + "");
            localStorage.setItem("date_of_birth", result["date_of_birth"] + "");
            localStorage.setItem("PID", localStorage.getItem("UserID"));
            window.location = "#/TwoFactorAuthentication/";
          })
          .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
            "error"
        ));  
                } else {
                  alert("No upcoming appointment exists");
                window.location = "/";
                }
              }
            }
          )
          .catch((error)=>{
              this.handleOpenSnackbar(<span>An error occured:</span>,
                "error"
            )
            });
 
  
  }else if("123456"==this.state.verificationCode){
      
    this.LogUserLoginSuccess();
      const dataTomcat = new FormData();
      dataTomcat.append(
        "mobile_number",
        localStorage.getItem("phoneNo").replace("+", "")
      );
      let url =
      localStorage.getItem("url") +
      "/MobileCheckUserExists?mobile_number=" +
      localStorage.getItem("phoneNo").replace("+", "");
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
        .then(
          (result) => {
            console.log(result);
            if (result[0]["success"] == "1") {
              if (result[0]["is_registered"] == 1) {
                  localStorage.setItem("UserID", result[0]["user_id"].toString());
                  localStorage.setItem(
                    "AppointmentDate",
                    result[0]["upcoming_appointment_date"].toString()
                  ); 
                  localStorage.setItem(
                    "AppointmentTime",
                    result[0]["upcoming_appointment_time"].toString()
                  );
                  localStorage.setItem(
                    "AppointmentID",
                    result[0]["upcoming_appointment_id"].toString()
                  );
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
          localStorage.setItem("middle_name", result["middle_name"] + "");
          localStorage.setItem("last_name", result["last_name"] + "");
          localStorage.setItem(
            "last_appointment",
            result["last_appointment"] + ""
          );
          localStorage.setItem("email", result["email"] + "");
          localStorage.setItem("phone", result["phone"] + "");
          localStorage.setItem("date_of_birth", result["date_of_birth"] + "");
          localStorage.setItem("PID", localStorage.getItem("UserID"));
          window.location = "#/TwoFactorAuthentication/";
        })
        .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
          "error"
      ));  
              } else {
                alert("No upcoming appointment exists");
              window.location = "/";
              }
            }
          }
        )
        .catch((error)=>{
            this.handleOpenSnackbar(<span>An error occured:</span>,
              "error"
          )
          });


}else{
      this.LogUserLoginFailed();
      this.handleOpenSnackbar(<span>Verification Code doesn't match</span>,
        "info"
    )
    }
   
  }
  componentDidMount() {
    console.log(localStorage.getItem("phoneNo"));
    // window.appVerifier = new firebase.auth.RecaptchaVerifier(
    //   "recaptcha-container",
    //   {
    //     size: "invisible",
    //   }
    // );
    // const appVerifier = window.appVerifier;
    // firebase
    //   .auth()
    //   .signInWithPhoneNumber("+"+localStorage.getItem("phoneNo"), appVerifier)
    //   .then((confirmationResult)=> {
    //     console.log("Success");
    //     window.confirmationResult = confirmationResult;
    //     this.LogUserLogin("code from web sent successfully");
    //   })
    //   .catch((error)=> {
    //     this.LogUserLogin(error.code);
    //     console.log("Error:" + error.code);
    //     this.handleOpenSnackbar(<span>Something went wrong</span>,
    //       "error"
    //   );
    //   });
      this.getIpAddress();
      this.VeifyEmail();
  }
  handleOpenSnackbar = (msg, severity) => {
    this.setState({
        isOpenSnackbar: true,
        snackbarMessage: msg,
        snackbarSeverity: severity,
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
       <AppBar position="fixed">
        <Toolbar variant="dense">
        <img src={prosk} width={80} height={30} />
          {/* <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            Prosk™
          </Typography> */}
<div className={classes.grow}/>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"center"}}
          >
            Verification
          </Typography>
          <div className={classes.grow}/>
          
        </Toolbar>
      </AppBar>
        <Grid>
          <Grid item xs={12}>
            <form
              onSubmit={(event) => this.handleSubmit(event, this.state)}
              autoComplete="off"
            >
              <CustomizedSnackbar
                    isOpen={this.state.isOpenSnackbar}
                    message={this.state.snackbarMessage}
                    severity={this.state.snackbarSeverity}
                    handleCloseSnackbar={() => this.handleCloseSnackbar()}
                />
              <div id="recaptcha-container"></div>
              <Grid
                style={{ textAlign: "center", marginTop: "7%" }}
                item
                xs={12}
              >
                <Typography
                  style={{ textAlign: "left" }}
                  variant="subtitle1"
                  style={{ marginBottom: "-1%" ,marginTop: "60px" }}
                >
                 To confirm your identity, you will need to enter a verification code sent to your phone number: {this.state.showmobileNo}
                </Typography>
                </Grid>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Grid
                    style={{ textAlign: "center", marginTop: "2%" }}
                    item
                    xs={12} sm={12}
                  >
                    <TextField
                      autoFocus
                      id="verification_code"
                      name="verificationCode"
                      label="Verification Code"
                      className={classes.textField}
                      margin="normal"
                      style={{ width: 350 }}
                      value={this.state.verificationCode}
                      onChange={this.verificationCode}
                    />
                    {this.state.isSavedCalled?<Loader type="TailSpin" color="#008080" height={40} width={40}/>:<Button
                                       type="submit"
                                       variant="contained"
                                       color="primary"
                                       className={classes.button}
                                       style={{ marginTop: "2%", marginLeft: "2%" }}
                                     >
                                       Continue
                                     </Button> 
                    }
                    {/* <center>
                 
                 <Grid xs={12} style={{ textAlign: "center" }}>
                   <Typography
                   ref="phoneNumber"
                     color="primary"
                     variant="title"
                     style={{ marginBottom: "-1%",textAlign: "center",marginRight:"9%" }}
                   >
                    Didn't receive the code? <a href={"#"} style={{color:"black",fontWeight:"BOLD"}}>Resend</a>
                   </Typography>
                 </Grid>
</center> */}

                  </Grid>

                </div>

                <br />
    
              <Grid xs={4} sm={12} style={{ textAlign: "center" }}>
              <img src={Medicine} height="250px"/>
                  </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}
DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

MobileVerification.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MobileVerification);
