import React, { useState, useEffect } from "react";
import prosk from "./images/Logo-02.png";
import {
  Grid,
  Card,
  IconButton,
  CardHeader,
  Typography,
  CardContent,
  Avatar,
  Stepper,
  Step,
  Image,
  StepButton,
  CircularProgress,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import * as moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import Medicine from "./images/policy.gif";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from '@material-ui/core/Divider';
import { makeStyles, withStyles } from "@material-ui/styles";
import PrimaryAppBar from "./PrimaryAppBar";
import BottomBar from "./BottomBar";
import StepLabel from "@material-ui/core/StepLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useDropzone } from "react-dropzone";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CameraIcon from "./images/camera.png";
import Loader from 'react-loader-spinner'
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

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
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  bigAvatar: {
    margin: 10,
  },

  inline: {
    display: "inline",
  },
  card: {
    marginLeft: "50%",
    marginRight: "50%",
    marginTop: "10px",
  },
}));
function getSteps() {
  return ["Front ID Card", "Back ID Card"];
}
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "150px",
  height: "150px",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
// primary--------------------------------------------------------------------
function PrimaryDropzone(props) {
  console.log(props.front_img_url);
  const [files, setFiles] = useState([]);
  const thumbs = files.map((file, index) => {
 
    return (<div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img id="first_dropzone" src={file.preview} style={img} height="80px" />{" "}
      </div>
    </div>)
  });
  console.log(thumbs);
  const Layout = ({
    input,
    previews,
    submitButton,
    dropzoneProps,
    files,
    extra: { maxFiles },
  }) => {
    return (
      <div>
        {previews}

        <div {...dropzoneProps}>{files.length < maxFiles && input}</div>

        {files.length > 0 && submitButton}
      </div>
    );
  };
  let msg = thumbs;
  if (thumbs == "" && localStorage.getItem("insurance_img_front")=="") {
    msg = <img src={CameraIcon} height="50px" />;
  }else if(thumbs=="" && localStorage.getItem("insurance_img_front")!=""){
    msg=<div style={thumb} key={localStorage.getItem("insurance_img_front")}>
    <div style={thumbInner}>

      <img id="first_dropzone1" src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("insurance_img_front")} style={img} height="50px" />{" "}
    </div>
  </div>;
  }
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        style={{ marginTop: "-44px", marginLeft: "8px", marginRight: "8px" }}
      >
        <div
          style={{ textAlign: "center" }}
        >
            <Typography
                          style={{
                            fontSize: "20px",
                            fontFamily: "Arial",
                            marginRight: "3%"
                          }}
                        >
                          Front Side
                        </Typography>
         {msg}
        </div>
      </Grid>
    </Grid>
  );
}
function PrimaryDropzone2() {
  const [files, setFiles] = useState([]);

  const thumbs = files.map((file, index) => {
    console.log("===>", index, file.preview);
    console.log(file.preview);
  
    return (<div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img id="second_dropzone" src={file.preview} style={img} height="80px" />{" "}
      </div>
    </div>)
  });
  console.log(thumbs);
  let msg = thumbs;
  if (thumbs == "" && localStorage.getItem("insurance_img_back")=="") {
    msg = <img src={CameraIcon} height="50px" />;
  }else if(thumbs=="" && localStorage.getItem("insurance_img_back")!=""){
    msg=<div style={thumb} key={localStorage.getItem("insurance_img_back")}>
    <div style={thumbInner}>
      <img id="second_dropzone1" name={localStorage.getItem('insurance_img_back')} src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("insurance_img_back")} style={img} height="50px" />{" "}
    </div>
  </div>;
  
  }
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        style={{ marginTop: "-44px", marginLeft: "8px", marginRight: "8px" }}
      >
        <div
          style={{ textAlign: "center" }}
        >
        <Typography
                      style={{
                        fontSize: "20px",
                        fontFamily: "Arial",
                        marginRight: "3%"
                      }}
                    >
                      Back Side
                    </Typography>
         {msg}
        </div>
      </Grid>
    </Grid>
  );
}
// Seconday-----------------------------------------------------------------
function SecondayDropzone(props) {
    console.log(props.front_img_url);
    const [files, setFiles] = useState([]);
    const thumbs = files.map((file, index) => {
   
      return (<div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img id="first_dropzone" src={file.preview} style={img} height="80px" />{" "}
        </div>
      </div>)
    });
    console.log(thumbs);
    const Layout = ({
      input,
      previews,
      submitButton,
      dropzoneProps,
      files,
      extra: { maxFiles },
    }) => {
      return (
        <div>
          {previews}
  
          <div {...dropzoneProps}>{files.length < maxFiles && input}</div>
  
          {files.length > 0 && submitButton}
        </div>
      );
    };
    let msg = thumbs;
    if (thumbs == "" && localStorage.getItem("insurance_secondry_img_front")=="") {
      msg = <img src={CameraIcon} height="50px" />;
    }else if(thumbs=="" && localStorage.getItem("insurance_secondry_img_front")!=""){
      msg=<div style={thumb} key={localStorage.getItem("insurance_secondry_img_front")}>
      <div style={thumbInner}>
        <img id="first_dropzone1" src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("insurance_secondry_img_front")} style={img} height="50px" />{" "}
      </div>
    </div>;
    }
    return (
      <Grid container>
        <Grid
          item
          xs={12}
          style={{ marginTop: "-44px", marginLeft: "8px", marginRight: "8px" }}
        >
          <div
            style={{ textAlign: "center" }}
          >
              
            <Typography
                          style={{
                            fontSize: "20px",
                            fontFamily: "Arial",
                            marginRight: "3%"
                          }}
                        >
                          Front Side
                        </Typography>
           {msg}
          </div>
        </Grid>
      </Grid>
    );
  }
  function SecondayDropzone2() {
    const [files, setFiles] = useState([]);
  
    const thumbs = files.map((file, index) => {
      console.log("===>", index, file.preview);
      console.log(file.preview);
    
      return (<div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img id="second_dropzone" src={file.preview} style={img} height="80px" />{" "}
        </div>
      </div>)
    });
    console.log(thumbs);
    let msg = thumbs;
    if (thumbs == "" && localStorage.getItem("insurance_secondry_img_back")=="") {
      msg = <img src={CameraIcon} height="50px" />;
    }else if(thumbs=="" && localStorage.getItem("insurance_secondry_img_back")!=""){
      msg=<div style={thumb} key={localStorage.getItem("insurance_secondry_img_back")}>
      <div style={thumbInner}>
        <img id="second_dropzone1" name={localStorage.getItem('insurance_secondry_img_back')} src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("insurance_secondry_img_back")} style={img} height="50px" />{" "}
      </div>
    </div>;
    
    }
    return (
      <Grid container>
        <Grid
          item
          xs={12}
          style={{ marginTop: "-44px", marginLeft: "8px", marginRight: "8px" }}
        >
          <div
            style={{ textAlign: "center" }}
          >
              
            <Typography
                          style={{
                            fontSize: "20px",
                            fontFamily: "Arial",
                            marginRight: "3%"
                          }}
                        >
                          Back Side
                        </Typography>
           {msg}
          </div>
        </Grid>
      </Grid>
    );
  }
  
// third-------------------------------

function PriDropzone(props) {
    console.log(props.front_img_url);
    const [files, setFiles] = useState([]);
    const thumbs = files.map((file, index) => {
   
      return (<div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img id="first_dropzone" src={file.preview} style={img} height="80px" />{" "}
        </div>
      </div>)
    });
    console.log(thumbs);
    const Layout = ({
      input,
      previews,
      submitButton,
      dropzoneProps,
      files,
      extra: { maxFiles },
    }) => {
      return (
        <div>
          {previews}
  
          <div {...dropzoneProps}>{files.length < maxFiles && input}</div>
  
          {files.length > 0 && submitButton}
        </div>
      );
    };
    let msg = thumbs;
    if (thumbs == "" && localStorage.getItem("insurance_tertiary_img_front")=="") {
      msg = <img src={CameraIcon} height="50px" />;
    }else if(thumbs=="" && localStorage.getItem("insurance_tertiary_img_front")!=""){
      msg=<div style={thumb} key={localStorage.getItem("insurance_tertiary_img_front")}>
      <div style={thumbInner}>
        <img id="first_dropzone1" src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("insurance_tertiary_img_front")} style={img} height="50px" />{" "}
      </div>
    </div>;
    }
    return (
      <Grid container>
        <Grid
          item
          xs={12}
          style={{ marginTop: "-44px", marginLeft: "8px", marginRight: "8px" }}
        >
          <div
            style={{ textAlign: "center" }}
          >
              
            <Typography
                          style={{
                            fontSize: "20px",
                            fontFamily: "Arial",
                            marginRight: "3%"
                          }}
                        >
                          Front Side
                        </Typography>
           {msg}
          </div>
        </Grid>
      </Grid>
    );
  }
  function PriDropzone2() {
    const [files, setFiles] = useState([]);
  
    const thumbs = files.map((file, index) => {
      console.log("===>", index, file.preview);
      console.log(file.preview);
    
      return (<div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img id="second_dropzone" src={file.preview} style={img} height="80px" />{" "}
        </div>
      </div>)
    });
    console.log(thumbs);
    let msg = thumbs;
    if (thumbs == "" && localStorage.getItem("insurance_tertiary_img_back")=="") {
      msg = <img src={CameraIcon} height="50px" />;
    }else if(thumbs=="" && localStorage.getItem("insurance_tertiary_img_back")!=""){
      msg=<div style={thumb} key={localStorage.getItem("insurance_tertiary_img_back")}>
      <div style={thumbInner}>
        <img id="second_dropzone1" name={localStorage.getItem('insurance_tertiary_img_back')} src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("insurance_tertiary_img_back")} style={img} height="50px" />{" "}
      </div>
    </div>;
    
    }
    return (
      <Grid container>
        <Grid
          item
          xs={12}
          style={{ marginTop: "-44px", marginLeft: "8px", marginRight: "8px" }}
        >
          <div
            style={{ textAlign: "center" }}
          >
              
            <Typography
                          style={{
                            fontSize: "20px",
                            fontFamily: "Arial",
                            marginRight: "3%"
                          }}
                        >
                          Back Side
                        </Typography>
           {msg}
          </div>
        </Grid>
      </Grid>
    );
  }
class ProvideInsuranceCardMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
            
      appointment_id: localStorage.getItem("AppointmentID"),
      PatientID:localStorage.getItem("PID"),
      isSavedCalled: false,
      check_policy:false,
      ISSN:"",
      InsuranceGender:"",
      IRelationship:"", 
      CompanyName:"",
      DOB:localStorage.getItem("date_of_birth"), 
      InsurancePlan:"",
      PolicyNumber:"", 
      InsuranceName:"",
      FrontPreview:localStorage.getItem("insurance_img_front"),
      BackPreview:localStorage.getItem("insurance_img_back"),

      SecondaryFrontPreview:localStorage.getItem("insurance_secondry_img_front"),
      SecondayBackPreview:localStorage.getItem("insurance_secondry_img_back"),

      tetiaryFrontPreview:localStorage.getItem("insurance_tertiary_img_front"),
      tetiaryBackPreview:localStorage.getItem("insurance_tertiary_img_back")

    };
  }
  VerifyAppointment() {
    console.log("AppointmentID=" + localStorage.getItem("AppointmentID"));
    if (localStorage.getItem("AppointmentID") == null || localStorage.getItem("AppointmentID") == "" || localStorage.getItem("AppointmentID") == "null") {
      window.location = "#/";
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
        localStorage.setItem("insurance_img_front", result["insurance_img_front"]+ "");
        localStorage.setItem("insurance_img_back", result["insurance_img_back"]+ "");
        localStorage.setItem("insurance_secondry_img_front", result["insurance_secondry_img_front"]+ "");
        localStorage.setItem("insurance_secondry_img_back", result["insurance_secondry_img_back"]+ "");
        localStorage.setItem("insurance_tertiary_img_front", result["insurance_tertiary_img_front"]+ "");
        localStorage.setItem("insurance_tertiary_img_back", result["insurance_tertiary_img_back"]+ "");

        this.setState({
            
      FrontPreview:localStorage.getItem("insurance_img_front"),
      BackPreview:localStorage.getItem("insurance_img_back"),

      SecondaryFrontPreview:localStorage.getItem("insurance_secondry_img_front"),
      SecondayBackPreview:localStorage.getItem("insurance_secondry_img_back"),

      tetiaryFrontPreview:localStorage.getItem("insurance_tertiary_img_front"),
      tetiaryBackPreview:localStorage.getItem("insurance_tertiary_img_back")
        })
      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  }
  componentDidMount() {
    this.MobileGetUserInfo();
    console.log("AppointmentID2=" + localStorage.getItem("insurance_img_front"));
    console.log("AppointmentID2=" + localStorage.getItem("insurance_img_back"));
    this.VerifyAppointment();

  }
  handleMenu = (event) => {
    window.location = "#/home/";
  };
  Home= (event) => {
    window.location = "#/home/";
  }
  Primary= (event) => {
    window.location = "#/ProvideInsuranceCard/";
  }
  Secondary= (event) => {
    window.location = "#/ProvideInsuranceCard2/";
  }
  tertiary= (event) => {
    window.location = "#/ProvideInsuranceCard3/";
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
            </Typography> */}
            <div className={classes.grow} />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
              Insurance Card Main
            </Typography>


            <div className={classes.grow}> </div>
            <IconButton color="inherit" onClick={this.handleMenu}>
              <HomeIcon /> <Typography
                color="inherit"
                noWrap
              >
                Home
            </Typography>
            </IconButton>

          </Toolbar>
        </AppBar>
         {/* Primary */}
         {this.state.FrontPreview!=""&&this.state.BackPreview!=""?        <div
            style={{
              marginTop: "60px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card style={{ width: "98%",marginTop:"20px" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                  <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"left",fontFamily:"sans-serif",marginBottom:"-50px",fontSize:"20",color:"teal"}}
          >
            Primary Insurance
          </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  
                  <PrimaryDropzone  front_img_url={this.state.FrontPreview}/>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <PrimaryDropzone2  />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                  </Grid>
                                        <Grid item xs={12} align="left">
                        <Typography
                          variant="title"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Arial",
                            fontWeight: "bolder",
                            marginRight: "3%"
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                             onClick={this.Primary}
                          >
                             Update
          </Button>
                        </Typography>
                      </Grid>
                </Grid>
                <button
                  type="submit"
                  id="form1"
                  style={{ display: "none" }}
                ></button>
              </CardContent>
            </Card>
          </div>:<div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card style={{ width: "98%",marginTop:"20px" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                  <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"left",fontFamily:"sans-serif",marginBottom:"-50px",fontSize:"20",color:"teal"}}
          >
           Primary Insurance
          </Typography>
                  </Grid>
                  <Grid item xs={12} align="left">
                        <Typography
                          variant="title"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Arial",
                            fontWeight: "bolder",
                            marginRight: "3%"
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                             onClick={this.Secondary}
                          >
                             Add
          </Button>
                        </Typography>
                      </Grid>
                </Grid>
                <button
                  type="submit"
                  id="form1"
                  style={{ display: "none" }}
                ></button>
              </CardContent>
            </Card>
          </div>}

          {/* secondary */}
          {this.state.SecondaryFrontPreview!=""&&this.state.SecondaryBackPreview!=""?<div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card style={{ width: "98%" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                  <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"left",fontFamily:"sans-serif",marginBottom:"-50px",fontSize:"20",color:"teal"}}
          >
            Secondary Insurance
          </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <SecondayDropzone  front_img_url={this.state.SecondaryFrontPreview}/>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <SecondayDropzone2  />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                  </Grid>
                                        <Grid item xs={12} align="left">
                        <Typography
                          variant="title"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Arial",
                            fontWeight: "bolder",
                            marginRight: "3%"
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.Secondary}
                          >
                             Update
          </Button>
                        </Typography>
                      </Grid>
                </Grid>
                <button
                  type="submit"
                  id="form1"
                  style={{ display: "none" }}
                ></button>
              </CardContent>
            </Card>
          </div>:<div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card style={{ width: "98%" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                  <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"left",fontFamily:"sans-serif",marginBottom:"-50px",fontSize:"20",color:"teal"}}
          >
            Secondary Insurance
          </Typography>
                  </Grid>
                  <Grid item xs={12} align="left">
                        <Typography
                          variant="title"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Arial",
                            fontWeight: "bolder",
                            marginRight: "3%"
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                             onClick={this.Secondary}
                          >
                             Add
          </Button>
                        </Typography>
                      </Grid>
                </Grid>
                <button
                  type="submit"
                  id="form1"
                  style={{ display: "none" }}
                ></button>
              </CardContent>
            </Card>
          </div>}



          {/* third */}
          {this.state.SecondaryFrontPreview!=""&&this.state.SecondaryBackPreview!=""?
          <div
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card style={{ width: "98%" }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                  <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"left",fontFamily:"sans-serif",fontSize:"20",color:"teal"}}
          >
            Tertiary Insurance
          </Typography>
                  </Grid>
                  {this.state.tetiaryFrontPreview!=""&&this.state.tetiaryBackPreview!=""? <Grid  container spacing={4}>
                  <Grid item xs={12} sm={12}>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <PriDropzone  front_img_url={this.state.tetiaryFrontPreview}/>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <PriDropzone2  />
                  </Grid>
                  <Grid item xs={12} sm={2}>
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
                          <Button
                            variant="contained"
                            color="primary"
                             onClick={this.tertiary}
                          >
                             Update
          </Button>
                        </Typography>
                      </Grid></Grid>:<Grid  container spacing={4}
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card style={{ width: "98%" }}>
              <CardContent>
                <Grid container spacing={4}>
               
                  <Grid item xs={12} align="left">
                        <Typography
                          variant="title"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Arial",
                            fontWeight: "bolder",
                            marginRight: "3%"
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                             onClick={this.tertiary}
                          >
                             Add
          </Button>
                        </Typography>
                      </Grid>
                </Grid>
                <button
                  type="submit"
                  id="form1"
                  style={{ display: "none" }}
                ></button>
              </CardContent>
            </Card>
          </Grid>}
                </Grid>
              </CardContent>
            </Card>
          </div>:<div></div>}
          <div  style={{ height: "50px" }}></div>
          <AppBar
                position="fixed"
                style={{ top: "auto", bottom: 0 }}
                color="default"
              >
                <Toolbar variant="dense">
                  <div className={classes.grow} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.Home}
                    style={{marginRight:"10px"}}
                    >Next
          </Button>
                </Toolbar>
              </AppBar>
      </div>
    );
  }
}

export default withStyles(useStyles)(ProvideInsuranceCardMain);
