import React, { Component, useEffect } from "react";
import prosk from "./images/Logo-02.png";
import { makeStyles, useTheme, withStyles } from "@material-ui/styles";
import {
  Card,
  ListGroup,
  CardHeader,
  Divider,
  CardActions,
  Typography,
  Avatar,
  CardContent,
  Badge,
  IconButton,
  Tooltip,
  LinearProgress,
  ListItemText,
  ListItemSecondaryAction,
  List,
  ListItem,
  ListItemAvatar,
  Button
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Medicine from "./images/complete.png";
import Review from "./images/Review.png";
import pend from "./images/pend.png";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HelpIcon from "./images/contract.png";
import CommunityIcon from "./images/packing_list.png";
import GradeBookIcon from "./images/delivery_order.png";
import MyObjectivesIcon from "./images/invoice.png";
import LeavesIcon from "./images/cost_sheet.png";
import done from "./images/done.png";
import pending from "./images/pending.png";
import ID from "./images/id.png";
import issurance from "./images/issurance.png";

import sign from "./images/sign.png";
import survey from "./images/survey.png";
import medicalhistory from "./images/medical-history.png";
import med from "./images/med.png";
import PrimaryCarePhysician from "./images/physician_image.png";
import PrimaryCarepharmacy from "./images/Pharmacy_image.png";
import LeaveStatus from "./homepage/Profile";
import { Grid } from "@material-ui/core";
import Workfellow from "./homepage/Workfellow";
import LeavesApproval from "./homepage/LeavesApproval";
import Initials from "./homepage/Initials";
import PrimaryAppBar from "./PrimaryAppBar";
import GradeBook from "./homepage/GradeBook";
import MyObjectives from "./homepage/MyObjectives";
import Community from "./homepage/Community";
import Loader from 'react-loader-spinner'
import CustomizedSnackbar from './customizesnackbar/CustomizedSnackbar.js'
const styles = (theme) => ({
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
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IDCard:false,
      InsuranceCard:false,
      Consect:false,
      PMH:false,
      Survey:false,
      checkedB: true,
      AllergiesTrailing: "done.png",
      isSavedCalled:false,
      isOpenSnackbar: false,
      snackbarMessage: "",
      snackbarSeverity: "",
      
      appointment_id: localStorage.getItem("AppointmentID"),
      baseUrl: "./images/",
      PrimaryCarepharmacyStatus: (
        <Typography variant="title" style={{ color: "yellow" }}>
           <img src={pend} height="56px" width="60px"  />
        </Typography>
      ),
      PrimaryCarePhysicianStatus: (
        <Typography variant="title" style={{ color: "yellow" }}>
           <img src={pend} height="56px" width="60px"  />
        </Typography>
      ),
      IDCardStatus: (
        <Typography variant="title" style={{ color: "red" }}>
           <img src={pend} height="56px" width="60px"/>
          {/* Not Submitted */}
        </Typography>
      ),
      InsuranceCardStatus: (
        <Typography variant="title" style={{ color: "red" }}>
           <img src={pend} height="56px" width="60px"  />
        </Typography>
      ),
      ConsentsStatus: (
        <Typography variant="title" style={{ color: "red" }}>
           <img src={pend} height="56px" width="60px" />
        </Typography>
      ),
      QuestionStatus: (
        <Typography variant="title" style={{ color: "red" }}>
           <img src={pend} height="56px" width="60px" />
        </Typography>
      ),
      PMHStatus: (
        <Typography variant="title" style={{ color: "red" }}>
           <img src={pend} height="56px" width="60px"  />
        </Typography>
      ),
      MedicationsStatus: (
        <Typography variant="title" style={{ color: "yellow" }}>
           <img src={pend} height="56px" width="60px"  />
        </Typography>
      ),
    };
  }
  handleListItemClick = (event) => {
    window.location = "#/ProvideIDCard";
  };
  handleListItemClick2 = (event) => {
    console.log("aqib");
    window.location = "#/ProvideInsuranceCard";
  };
  handleListItemClick9 = (event) => {
    console.log("haseeb");
    window.location = "#/ProvideInsuranceCardMain";
  };
  handleConsentClick = (event) => {
    window.location = "#/Consent1";
  };
  handleSurveyClick = (event) => {
    window.location = "#/Survey";
  };
  handlePMHClick = (event) => {
    window.location = "#/PMH";
  };
  handleMedicationsClick = (event) => {
    window.location = "#/MedicationForm";
  };
  

  handlePrimaryCarepharmacyClick = (event) => {
    window.location = "#/PrimaryCarepharmacy";
  };

  handlePrimaryCarePhysicianClick = (event) => {
    window.location = "#/PrimaryCarePhysician";
  };
  handleMenu = (event) => {
    window.location = "#/";
  };
  Finish = (event) => {
    if(localStorage.getItem("appointment_type_id")=="1"){
    if(this.state.IDCard==false){
      window.location = "#/ProvideIDCard";
    }else if(this.state.InsuranceCard==false){
      window.location = "#/ProvideInsuranceCard";
    }else if(this.state.Consect==false){
      window.location = "#/Consent1";
    }else if(this.state.PMH==false){
      window.location = "#/PMH";
    }else if(this.state.Survey==false){
      window.location = "#/Survey";
    }else{
      this.setState({
        isSavedCalled:true
      });
      window.location = "#/ThankyouPage";
    }
  }else if(localStorage.getItem("appointment_type_id")=="2"){
    if(this.state.Survey==false){
      window.location = "#/Survey";
    }else{
      this.setState({
        isSavedCalled:true
      });
      window.location = "#/ThankyouPage";
    }
  }
  }
  // pending----------------------------------
  MobileCheckUserExists = (event) => {
    const dataTomcat = new FormData();
    dataTomcat.append(
      "mobile_number",
      localStorage.getItem("phoneNo").replace("+", "")
    );

    let url =
      localStorage.getItem("url") +
      "/MobileCheckUserExistsV2?appointment_id=" +this.state.appointment_id+"&user_id="+localStorage.getItem("UserID");
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
          localStorage.setItem("UserID", result[0]["user_id"].toString());

          localStorage.setItem("appointment_type_id", result[0]["appointment_type_id"].toString());
          if (result[0]["is_registered"] == 1) {
            localStorage.setItem(
              "AppointmentID",
              result[0]["upcoming_appointment_id"].toString()
            );
            localStorage.setItem("state", result[0]["state"]);
            localStorage.setItem("zip_code", result[0]["zip_code"]);
            localStorage.setItem("PhysicianID", result[0]["physician_id"]);
            this.MobileGetUserInfo();
            this.getSurveyData();
            if (
              result[0]["is_id_front_uploaded"] == 1 &&
              result[0]["is_id_back_uploaded"] == 1
            ) {
              if(result[0]["appointment_type_id"]==1){
                this.setState({
                  IDCard:true,
                  IDCardStatus: (
                    <Typography variant="title" style={{ color: "green" }}>
                    <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                    </Typography>
                  ),
                });
              }else if(result[0]["appointment_type_id"]==2&&result[0]["is_id_provided"]==0){
                this.setState({
                  IDCard:true,
                  IDCardStatus: (
                    <Typography variant="title" style={{ color: "green",marginRight:"32px" }}>
                    <img src={Review}  height="56px" width="60px"  />
                    </Typography>
                  ),
                });
              }else if(result[0]["appointment_type_id"]==2&&result[0]["is_id_provided"]==1){
                this.setState({
                  IDCard:true,
                  IDCardStatus: (
                    <Typography variant="title" style={{ color: "green" }}>
                    <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                    </Typography>
                  ),
                });
              }
            }
            if (
              result[0]["is_insurance_front_uploaded"] == 1 &&
              result[0]["is_insurance_back_uploaded"] == 1
            ) {

              if(result[0]["appointment_type_id"]==1){
                this.setState({
                  InsuranceCard:true,
                  InsuranceCardStatus: (
                    <Typography variant="title" style={{ color: "green" }}>
                    <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                    </Typography>
                  ),
                });
              }else if(result[0]["appointment_type_id"]==2&&result[0]["is_insurance_provided"]==0){
                this.setState({
                  InsuranceCard:true,
                  InsuranceCardStatus: (
                    <Typography variant="title" style={{ color: "green",marginRight:"32px"  }}>
                    <img src={Review}  height="56px" width="60px"   />
                    </Typography>
                  ),
                });
              }else if(result[0]["appointment_type_id"]==2&&result[0]["is_insurance_provided"]==1){
                this.setState({
                  InsuranceCard:true,
                  InsuranceCardStatus: (
                    <Typography variant="title" style={{ color: "green" }}>
                    <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                    </Typography>
                  ),
                });
              }
            }
            if (result[0]["IsConsentsExists"] == 1) {
              if(result[0]["appointment_type_id"]==1){
                this.setState({
                  Consect:true,
                  ConsentsStatus: (
                    <Typography variant="title" style={{ color: "green" }}>
                    <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                    </Typography>
                  ),
                });
              }else if(result[0]["appointment_type_id"]==2&&result[0]["is_consent_provided"]==0){
                this.setState({
                  Consect:true,
                  ConsentsStatus: (
                    <Typography variant="title" style={{ color: "green",marginRight:"32px"  }}>
                    <img src={Review}  height="56px" width="60px"   />
                    </Typography>
                  ),
                });
              }else if(result[0]["appointment_type_id"]==2&&result[0]["is_consent_provided"]==1){
                this.setState({
                  Consect:true,
                  ConsentsStatus: (
                    <Typography variant="title" style={{ color: "green" }}>
                    <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                    </Typography>
                  ),
                });
              }
            }
            if (
              result[0]["attempted_questions"] +
                result[0]["attempted_questions"] >
              18
            ) {
              if(result[0]["appointment_type_id"]==1){
                this.setState({
                  Survey:true,
                  QuestionStatus: (
                    <Typography variant="title" style={{ color: "green" }}>
                    <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                    </Typography>
                  ),
                });
              }else if(result[0]["appointment_type_id"]==2&&result[0]["is_survey_provided"]==0){
                this.setState({
                  Survey:true,
                  QuestionStatus: (
                    <Typography variant="title" style={{ color: "green" ,marginRight:"32px" }}>
                    <img src={Review}  height="56px" width="60px"   />
                    </Typography>
                  ),
                });
              }else if(result[0]["appointment_type_id"]==2&&result[0]["is_survey_provided"]==1){
                this.setState({
                  Survey:true,
                  QuestionStatus: (
                    <Typography variant="title" style={{ color: "green" }}>
                    <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                    </Typography>
                  ),
                });
              }

            }
            if (
              result[0]["attempted_questions_pmh"] +
                result[0]["attempted_questions_pmh"] >
              50
            ) {
              if(result[0]["appointment_type_id"]==1){
                this.setState({
                  PMH:true,
                  PMHStatus: (
                    <Typography variant="title" style={{ color: "green" }}>
                    <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                    </Typography>
                  ),
                });
              }else if(result[0]["appointment_type_id"]==2&&result[0]["is_pmh_provided"]==0){
                this.setState({
                  PMH:true,
                  PMHStatus: (
                    <Typography variant="title" style={{ color: "green",marginRight:"32px"  }}>
                    <img src={Review}  height="56px" width="60px"   />
                    </Typography>
                  ),
                });
              }else if(result[0]["appointment_type_id"]==2&&result[0]["is_pmh_provided"]==1){
                this.setState({
                  PMH:true,
                  PMHStatus: (
                    <Typography variant="title" style={{ color: "green" }}>
                    <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                    </Typography>
                  ),
                });
              }
            }
            if (result[0]["is_medication_available"] == 1) {
              if(result[0]["appointment_type_id"]==1){
                this.setState({
                  MedicationsStatus:true,
                  MedicationsStatus: (
                    <Typography variant="title" style={{ color: "green" }}>
                    <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                    </Typography>
                  ),
                });
              }else if(result[0]["appointment_type_id"]==2&&result[0]["is_medication_provided"]==0){
                this.setState({
                  MedicationsStatus:true,
                  MedicationsStatus: (
                    <Typography variant="title" style={{ color: "green",marginRight:"32px"  }}>
                    <img src={Review}  height="56px" width="60px"  />
                    </Typography>
                  ),
                });
              }else if(result[0]["appointment_type_id"]==2&&result[0]["is_medication_provided"]==1){
                this.setState({
                  MedicationsStatus:true,
                  MedicationsStatus: (
                    <Typography variant="title" style={{ color: "green" }}>
                    <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                    </Typography>
                  ),
                });
              }
            }if(result[0]["IsprimaryCarePhysician"]==1){
              this.setState({
                PrimaryCarePhysicianStatus:true,
                PrimaryCarePhysicianStatus: (
                  <Typography variant="title" style={{ color: "green" }}>
                  <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                  </Typography>
                ),
              });
            }
            if(result[0]["IsprimaryCarePhysician"]==1){
              this.setState({
                PrimaryCarepharmacyStatus:true,
                PrimaryCarepharmacyStatus: (
                  <Typography variant="title" style={{ color: "green" }}>
                  <img src={Medicine}  height="100px" width="100px" style={{marginRight:"-23px"}} />
                  </Typography>
                ),
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
        localStorage.setItem("id_img_front", result["id_img_front"]+ "");
        localStorage.setItem("id_img_back", result["id_img_back"]+ "");
        localStorage.setItem("insurance_img_front", result["insurance_img_front"]+ "");
        localStorage.setItem("insurance_img_back", result["insurance_img_back"]+ "");
        localStorage.setItem("insurance_secondry_img_front", result["insurance_secondry_img_front"]+ "");
        localStorage.setItem("insurance_secondry_img_back", result["insurance_secondry_img_back"]+ "");
        localStorage.setItem("insurance_tertiary_img_front", result["insurance_tertiary_img_front"]+ "");
        localStorage.setItem("insurance_tertiary_img_back", result["insurance_tertiary_img_back"]+ "");
      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  }

  getSurveyData() {
    let url =
      localStorage.getItem("url") +
      "/MobileGetDoneSurveys?appointment_id=" +
      localStorage.getItem("AppointmentID") +
      "&type_id=1";
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
        let MedicationList = result["medication"];
        let AllergiesList = result["allergies"];

      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  }

  GetAppointmentId(){
console.log("AppointmentID",this.state.appointment_id);
  if(this.state.appointment_id==null&&this.state.appointment_id==""){
  window.location = "#/";
}else{
  // alert("Please Login Again!")
}
  }
  componentDidMount() {
    this.MobileCheckUserExists();
    this.GetAppointmentId();
  }
  handleMenu = (event) => {
    window.location = "#/";
  };
  handleOpenSnackbar = (msg, severity) => {
    this.setState({
        isOpenSnackbar: true,
        snackbarMessage: msg,
        snackbarSeverity: severity,
    });
  };
  homemenu = (event) => {
    window.location = "#/MenuPage/";
  };
  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    this.setState({
        isOpenSnackbar: false,
    });
  };
  PatientGuide(){
    //let url =localStorage.getItem("url") +"/alpha/ProskAlphaLogin?User_Id=" +
    //localStorage.getItem("UserID");
    window.open(
      'https://dev.myprosk.com/alpha/VerificationPage.jsp?User_Id='+localStorage.getItem("UserID"),
      '_blank' // <- This is what makes it open in a new window.
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
           <img src={prosk} width={80} height={30} />
             {/* <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
              Prosk™
            </Typography>  */}
            <div className={classes.grow} />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
              Main Menu
            </Typography>
            <div className={classes.grow} />
            <div>
            <IconButton color="inherit" onClick={this.PatientGuide}>
              <Typography
              color="inherit"
              noWrap
              
            >
              Patient Guide
            </Typography>
            </IconButton>
            </div>
            <div>
            <IconButton color="inherit" onClick={this.homemenu}>
              <HomeIcon /><Typography
              color="inherit"
              noWrap
              
            >
              Home
            </Typography>
            </IconButton>
            </div>
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
        <div style={{ marginTop: "60px" }}>
        <CustomizedSnackbar
                    isOpen={this.state.isOpenSnackbar}
                    message={this.state.snackbarMessage}
                    severity={this.state.snackbarSeverity}
                    handleCloseSnackbar={() => this.handleCloseSnackbar()}
                />
          <Grid container>
            <Grid item xs={12} sm={12} container>
              <Grid item xs={12} sm={12}>
                <Card
                  style={{
                    marginLeft: "1%",
                    marginRight: "1%",
                    marginTop:"3%"
                  }}
                >
                  <Typography
                    variant="title"
                   
                    style={{ marginLeft: "1%",fontWeight:"bold" ,fontFamily: "Arial",}}
                  >
                    Your appointment is confirmed.
                  </Typography>
                  <Grid  item xs={12} sm={12}>
                  <Typography variant="title" style={{ marginLeft: "1%",fontFamily: "Arial", }}>
                    Please complete the following pre-appointment information.
                  </Typography>
                  </Grid>
                  <List className={classes.root}>
                    <Card
                      style={{
                        marginLeft: "0%",
                      }}
                    >
                      <ListItem
                        button
                        onClick={(event) => this.handleListItemClick(event)}
                      >
                        <ListItemText>
                          <CardHeader
                            title={
                              <Typography
                              
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "Arial",
                                }}
                              >
                                Provide ID Card
                              </Typography>
                            }
                            avatar={
                              <Avatar
                                className={classes.bigAvatar}
                                src={ID}
                                style={{ height: "50px", width: "50px" }}
                              />
                            }
                          />
                        </ListItemText>
                        <ListItemSecondaryAction >
                          {this.state.IDCardStatus}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Card>
                    <Card
                      style={{
                        marginLeft: "0%",
                      }}
                    >
                      <ListItem
                        button
                        
                        onClick={(event) => {this.state.InsuranceCard==true?this.handleListItemClick9(event):this.handleListItemClick2(event)}}
                      >
                        <ListItemText>
                          <CardHeader
                            title={
                              <Typography
                               
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "Arial",
                                }}
                              >
                                Provide Insurance Card
                              </Typography>
                            }
                            avatar={
                              <Avatar
                                className={classes.bigAvatar}
                                src={issurance}
                                style={{ height: "50px", width: "50px" }}
                              />
                            }
                          />
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {this.state.InsuranceCardStatus}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Card>
                    <Card
                      style={{
                        marginLeft: "0%",
                      }}
                    >
                      <ListItem
                        button
                        onClick={(event) => this.handleConsentClick(event)}
                      >
                        <ListItemText>
                          <CardHeader
                            title={
                              <Typography
                               
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "Arial",
                                }}
                              >
                                Sign Consents
                              </Typography>
                            }
                            avatar={
                              <Avatar
                                className={classes.bigAvatar}
                                src={sign}
                              />
                            }
                          />
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {this.state.ConsentsStatus}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Card>
                    <Card
                      style={{
                        marginLeft: "0%",
                      }}
                    >
                      <ListItem
                        button
                        onClick={(event) => this.handleSurveyClick(event, 3)}
                      >
                        <ListItemText>
                          <CardHeader
                            title={
                              <Typography
                                
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "Arial",
                                }}
                              >
                                Take Questionnaire
                              </Typography>
                            }
                            avatar={
                              <Avatar
                                className={classes.bigAvatar}
                                src={survey}
                              />
                            }
                          />
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {this.state.QuestionStatus}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Card>
                    {localStorage.getItem("appointment_type_id")=="2"?<div></div>:<Card
                      style={{
                        marginLeft: "0%",
                      }}
                    >
                      <ListItem
                        button
                        onClick={(event) => this.handlePMHClick(event, 4)}
                      >
                        <ListItemText>
                          <CardHeader
                            title={
                              <Typography
                                
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "Arial",
                                }}
                              >
                                Medical History
                              </Typography>
                            }
                            avatar={
                              <Avatar
                                className={classes.bigAvatar}
                                src={medicalhistory}
                              />
                            }
                          />
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {this.state.PMHStatus}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Card>}
                    <Card
                      style={{
                        marginLeft: "0%",
                      }}
                    >
                      <ListItem
                        button
                        onClick={(event) =>
                          this.handleMedicationsClick(event, 5)
                        }
                      >
                        <ListItemText>
                          <CardHeader
                            title={
                              <Typography
                                
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "Arial",
                                }}
                              >
                                Medications
                              </Typography>
                            }
                            avatar={
                              <Avatar className={classes.bigAvatar} src={med} />
                            }
                          />
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {this.state.MedicationsStatus}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Card>
                    <Card
                      style={{
                        marginLeft: "0%",
                      }}
                    >
                      <ListItem
                        button
                        onClick={(event) => this.handlePrimaryCarePhysicianClick(event, 4)}
                      >
                        <ListItemText>
                          <CardHeader
                            title={
                              <Typography
                                
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "Arial",
                                }}
                              >
                                Primary Care Physician
                              </Typography>
                            }
                            avatar={
                              <Avatar
                                className={classes.bigAvatar}
                                src={PrimaryCarePhysician}
                              />
                            }
                          />
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {this.state.PrimaryCarePhysicianStatus}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Card> 

                    {/* <Card
                      style={{
                        marginLeft: "0%",
                      }}
                    >
                      <ListItem
                        button
                        onClick={(event) => this.handlePrimaryCarepharmacyClick(event, 4)}
                      >
                        <ListItemText>
                          <CardHeader
                            title={
                              <Typography
                                
                                style={{
                                  fontSize: "25px",
                                  fontFamily: "Arial",
                                }}
                              >
                                Primary Care Pharmacy
                              </Typography>
                            }
                            avatar={
                              <Avatar
                                className={classes.bigAvatar}
                                src={PrimaryCarepharmacy}
                              />
                            }
                          />
                        </ListItemText>
                        <ListItemSecondaryAction>
                          {this.state.PrimaryCarepharmacyStatus}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Card>  */}
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <br />
        </div>
        <AppBar
            position="fixed"
            style={{ top: "auto", bottom: 0 }}
            color="default"
          >
            <Toolbar variant="dense">
              <div className={classes.grow} />
              {this.state.isSavedCalled?      <Loader type="TailSpin" color="#00BFFF" height={80} width={80}/>:
                            <Button type="submit" variant="contained" color="primary"
                            onClick={this.Finish}
                               >
                                Continue
                              </Button>
              }
            </Toolbar>
          </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
