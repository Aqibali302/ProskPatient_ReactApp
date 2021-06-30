import React, { useState, useCallback } from "react";
import { withStyles } from "@material-ui/styles";
import prosk from "./images/Logo-02.png";
import Medicine from "./images/thankyou.png";
import Loader from 'react-loader-spinner'
import CustomizedSnackbar from './customizesnackbar/CustomizedSnackbar.js'
import HomeIcon from "@material-ui/icons/Home";
import {
  Grid,
  IconButton,
  Typography,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
//import Autocomplete from '@material-ui/lab/Autocomplete';
import * as moment from "moment";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

let suggestions = [];

let course_code_data = [];
let course_account_data = [];
const useStyles = (theme) => ({
  downShift: {
    paddingTop: "18px !important",
  },
  textFieldCard: {
    paddingTop: "0px !important",
  },
  cardcontent: {
    paddingTop: "0px !important",
    paddingLeft: "4px",
    paddingRight: "4px",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  asdf: {
    margin: 1000,
  },
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

  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  container: {
    marginTop: "100px",
  },
});

function DenseAppBar(props) {
  const { classes } = props;
  const handleMenu = (event) => {
    window.location = "#/";
  };
  return (
    <div className={classes.root}>
     <AppBar position="fixed">
        <Toolbar variant="dense">
          <div className={classes.grow}/>
          <div>
            <IconButton color="inherit" onClick={handleMenu}>
              <ExitToAppIcon />   Logout 
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
class MenuPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        days: 0,
        hours: 0,
        minutes: 0,
        appointmentDate:localStorage.getItem("AppointmentDate"),
        appointmentTime:localStorage.getItem("AppointmentTime"),
        firstName:localStorage.getItem("first_name"),
        lastName:localStorage.getItem("last_name"),
        PMH:false,
        isSavedCalled:false,
        isOpenSnackbar: false,
        snackbarMessage: "",
        snackbarSeverity: "",
        Survey:( <Button>
        </Button>),
        showGrid:false,
    };
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
      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  }
  componentDidMount() {
    const then = moment(new Date(this.state.appointmentDate+" "+this.state.appointmentTime));
    const now = moment(new Date());
    this.interval = setInterval(() => {
        const countdown = moment(then - now);
        const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
        const hours =  Math.floor((countdown / (1000 * 60 * 60) % 24));
        const minutes =   Math.floor((countdown / 1000 / 60) % 60);

        this.setState({ days:days, hours:hours, minutes:minutes });
    }, 1000
    );
    this.MobileGetUserInfo();
    this.MobileCheckUserExists();
    console.log(this.state.firstName);
    console.log(this.state.lastName);
}

handleReview() {

  
  window.location = "#/Home/";
}

Survey() {

  window.location = "#/SurveyScoreReview/";
}
PatientGuide(){
  //let url =localStorage.getItem("url") +"/alpha/ProskAlphaLogin?User_Id=" +
  //localStorage.getItem("UserID");
  window.open(
    'https://dev.myprosk.com/alpha/VerificationPage.jsp?User_Id='+localStorage.getItem("UserID"),
    '_blank' // <- This is what makes it open in a new window.
  );
// fetch(url, {
//   method: "POST",
//   //  body: dataTomcat,
// })
//   .then((res) => {
//     if (!res.ok) {
//       throw res;
//     }
//     return res.json();
//   })
//   .then((result) => {
//     console.log(result);
//     if (result.success == "1") {
    
//     } 
//   })
//   .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
//     "error"
// ));
}
handleStart() {
 
  window.location = "#/MeetingRoom/";
}
handleStar() {
 
  window.location = "#/Home/";
}
handleMenu = (event) => {
  window.location = "#/";
};
componentWillUnmount() {
   if (this.interval) {
       clearInterval(this.interval);
    }
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


MobileCheckUserExists = (event) => {
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
    .then((result) => {
      console.log(result);

      if (result[0]["success"] == "1") {
        if (result[0]["is_registered"] == 1) {
          localStorage.setItem("UserID", result[0]["user_id"].toString());

          localStorage.setItem(
            "AppointmentID",
            result[0]["upcoming_appointment_id"].toString()
          );
          if (
            result[0]["attempted_questions"] +
              result[0]["attempted_questions"] >
            18
          ) {
            this.setState({
              showGrid:true,
              Survey:(<Button
                type="submit"
                variant="contained"
                color="lightgrey"
                onClick={this.Survey}
                    style={{width:"150px",color:" white",marginTop:"70px",backgroundColor:"#17a2b8"}}
              >
                Survey Score
              </Button>),
            });
          }
        } else {
          // window.location = "#/retailer/UserProfile/";
        }
      }
    })
    .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
      "error"
  ));
};



  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form>
        <AppBar position="fixed">
          <Toolbar variant="dense">
         
          {/* <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
              Prosk™
            </Typography> */}
            <div className={classes.grow} />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
              {this.state.firstName} {this.state.lastName}
            </Typography>
            <div className={classes.grow} />

            <div>
              <IconButton color="inherit" onClick={this.handleMenu}>
                <ExitToAppIcon /> <Typography
              color="inherit"
              noWrap
              
            >
              Logout
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
          <div
            style={{
              marginTop: "60px",
              marginBottom: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card style={{ width: "98%" }}>
              <CardContent>
                <Grid container spacing={8}>
                  <Grid item xs={12} sm={12}>
                {this.state.showGrid?<Typography
                  variant="h6"
                  style={{ fontFamily:"Arial",fontWeight:"700",marginBottom: "-1%" ,marginTop: "10px",textAlign:"center" }}
                >
Please complete all of the following check-in sections prior to your appointment on {this.state.appointmentDate} at {this.state.appointmentTime}
                </Typography>:<Typography
                  variant="h6"
                  style={{ fontFamily:"Arial",fontWeight:"700",marginBottom: "-1%" ,marginTop: "10px",textAlign:"center" }}
                >
Please complete all of the following check-in sections prior to your appointment on {this.state.appointmentDate} at {this.state.appointmentTime}
                </Typography>}
            </Grid>

            <Grid item xs={12} sm={12}>
                  <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"center",fontFamily:"Arial",fontWeight:"400",marginTop:"-50px",fontSize:"20px"}}
          >
              Your  session will start in
          </Typography>
             </Grid> 
             <Grid container style={{ width: "70%",marginLeft:"15%" }}  >
             <Grid item xs={4}>
            <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"center",fontFamily:"Arial",fontWeight:"400",marginTop:"-30px",fontSize:"40px"}}
          >
              Days
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            noWrap
            style={{textAlign:"center",fontFamily:"Arial",fontWeight:"400",marginTop:"-13px",fontSize:"40px"}}
          >
            {this.state.days}
          </Typography>
            </Grid>
                  <Grid item xs={4}>

            <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"center",fontFamily:"Arial",fontWeight:"400",marginTop:"-30px",fontSize:"40px"}}
          >
              Hrs
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            noWrap
            style={{textAlign:"center",fontFamily:"Arial",fontWeight:"400",marginTop:"-13px",fontSize:"40px"}}
          >
            {this.state.hours}
          </Typography>
                 </Grid>
                 <Grid item xs={4}>
            <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"center",fontFamily:"Arial",fontWeight:"400",marginTop:"-30px",fontSize:"40px"}}
          >
              Mins
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            noWrap
            style={{textAlign:"center",fontFamily:"Arial",fontWeight:"400",marginTop:"-13px",fontSize:"40px"}}
          >
            {this.state.minutes}
          </Typography>
                 </Grid> 
            </Grid> 
             
            {this.state.showGrid?<Grid container>
              <Grid item xs={12} sm={12}  style={{textAlign:"center"}}>
                   {this.state.isSavedCalled? <Loader type="TailSpin" color="#00BFFF" height={30} width={30}/>:
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={this.handleStart}
                                    style={{width:"150px",color:"white",marginTop:"30px"}}
                                  >
                                    Start
                                  </Button>
                   }
                  </Grid>
                  <Grid item xs={12}>
                  <Typography
                  variant="h6"
                  style={{ marginBottom: "-1%" ,marginTop: "10px",textAlign:"center",marginTop:"30px" }}
                >
              If you would like to review or make changes to the pre-appointment information you have submitted, tap the review button
                </Typography>
                  </Grid>
            </Grid>:
                          <Grid container>
                            <Grid item xs={12} sm={12}  style={{textAlign:"center"}}>
                          {this.state.isSavedCalled? <Loader type="TailSpin" color="#00BFFF" height={30} width={30}/>:
                                           <Button
                                           variant="contained"
                                           color="primary"
                                           className={classes.button}
                                           onClick={this.handleStar}
                                           style={{width:"150px",color:"white",marginTop:"30px"}}
                                         >
                                           Start
                                         </Button>
                          }
                         </Grid>
                         {/* <Grid item xs={12} sm={12}  style={{textAlign:"center"}}>
                          {this.state.isSavedCalled? <Loader type="TailSpin" color="#00BFFF" height={30} width={30}/>:
                                           <Button
                                           variant="contained"
                                           color="primary"
                                           className={classes.button}
                                           onClick={this.PatientGuide}
                                           style={{width:"150px",color:"white",marginTop:"30px",marginBottom:"35px"}}
                                         >
                                           Patient Guide
                                         </Button>
                          }
                         </Grid> */}
                          </Grid>
            }
                  {this.state.showGrid?<Grid container style={{marginBottom:"10px"}}>
                      <Grid item xs={12} sm={4} ></Grid>
                  <Grid item xs={12} sm={2}  style={{textAlign:"center"}}>
                    {this.state.isSavedCalled?<Loader type="TailSpin" color="#00BFFF" height={50} width={50}/>:
                                     <Button
                                     type="submit"
                                     variant="contained"
                                     color="lightgrey"
                                     className={classes.button}
                                     onClick={this.handleReview}
                                     style={{width:"150px",color:" white",marginTop:"70px",marginBottom:"12px",backgroundColor:"#17a2b8"}}
                                   >
                                     Review
                                   </Button>
                    }

                  </Grid>
                   <Grid item xs={12} sm={2}  style={{textAlign:"center"}}>
                     {this.state.Survey}
                  </Grid>
                  <Grid item xs={12} sm={4} >

                  </Grid>
                    </Grid>:("")}
                </Grid>
                <button
                  type="submit"
                  id="form1"
                  style={{ display: "none" }}
                ></button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    );
  }
}
export default withStyles(useStyles)(MenuPage);
