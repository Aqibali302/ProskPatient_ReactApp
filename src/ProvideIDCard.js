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
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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
  width: 100,
  height: 100,
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

function MyDropzone() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const [files, setFiles] = useState([]);

  const thumbs = files.map((file, index) => {
    console.log("===>", index, file.preview);
    if(file.preview!=""&& document.getElementById("show_img")){
      document.getElementById("show_img").removeAttribute('src');
    }
    return (<div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img id="first_dropzone" src={file.preview} style={img} height="50px" />{" "}
      </div>
    </div>)
  });
  console.log(thumbs);
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
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
  if (thumbs == "" && localStorage.getItem("id_img_front")=="") {
    msg = <img src={CameraIcon} height="50px" />;
  }else if(thumbs=="" && localStorage.getItem("id_img_front")!=""){
    msg=<div style={thumb} key={localStorage.getItem("id_img_front")}>
    <div style={thumbInner}>
      <img id="first_dropzone1"  src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("id_img_front")} style={img} height="50px" />{" "}
    </div>
  </div>;
  
  }
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        style={{ marginTop: "-50px", marginLeft: "8px", marginRight: "8px" }}
      >
        <div
          style={{ textAlign: "center" }}
          {...getRootProps({ className: "dropzone" })}
        >
          <Card
            style={{
              backgroundColor: "white",
              marginTop: "5px",
              borderTopStyle: "inset",
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="title"
                  color="primary"
                  style={{
                    fontfamily: "Arial",
                    fontsize: "31px",
                    marginTop: "1px",
                  }}
                >
                  ID Card Front
                </Typography>
              }
              color="primary"
              subheader="Please click 'select file' button and choose photo file of front side"
              style={{ textAlign: "left" }}
            />
            <CardContent>
              <input name="contained-button-file" {...getInputProps()} />
              {msg}

              <Typography
                color="primary"
                style={{
                  fontfamily: "Arial",
                  fontsize: "20px",
                  marginTop: "1px",
                }}
              >
                Drag & Drop File
              </Typography>
              <Typography
                style={{
                  fontfamily: "Arial",
                  fontsize: "31px",
                  marginTop: "1px",
                }}
              >
                or
              </Typography>
              <Typography style={{ marginTop: "10px" }}>
                <Button variant="contained" color="primary">
                  Select File
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
}
function MyDropzone2() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const [files, setFiles] = useState([]);

  const thumbs = files.map((file, index) => {
    console.log("===>", index, file.preview);
    if(file.preview!=""&& document.getElementById("show_img2")){
      document.getElementById("show_img2").removeAttribute('src');
    }
    return (<div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img id="second_dropzone" src={file.preview} style={img} height="50px" />{" "}
      </div>
    </div>)
  });
  console.log(thumbs);
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  console.log(acceptedFiles);
  let msg = thumbs;
  if (thumbs == "" && localStorage.getItem("id_img_back")=="") {
    msg = <img src={CameraIcon} height="50px" />;
  }else if(thumbs=="" && localStorage.getItem("id_img_back")!=""){
    msg=<div style={thumb} key={localStorage.getItem("id_img_back")}>
    <div style={thumbInner}>
      <img id="second_dropzone1"  src={localStorage.getItem("url") +'/mobile/ViewPatientCardsImagesV2?file_name='+localStorage.getItem("id_img_back")} style={img} height="50px" />{" "}
    </div>
  </div>;
  
  }
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        style={{ marginTop: "2px", marginLeft: "8px", marginRight: "8px" }}
      >
        <div
          style={{ textAlign: "center" }}
          {...getRootProps({ className: "dropzone" })}
        >
          <Card
            style={{
              backgroundColor: "white",
              marginTop: "5px",
              borderTopStyle: "inset",
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="title"
                  color="primary"
                  style={{
                    fontfamily: "Arial",
                    fontsize: "31px",
                    marginTop: "1px",
                  }}
                >
                  ID Card Back
                </Typography>
              }
              subheader="Please click 'select file' button and choose photo file of back side"
              style={{ textAlign: "left" }}
            />
            <CardContent>
             <input  name="contained-button-file" {...getInputProps()} />
              {msg}
              <Typography
                color="primary"
                style={{
                  fontfamily: "Arial",
                  fontsize: "31px",
                  marginTop: "1px",
                }}
              >
                Drag & Drop File
              </Typography>
              <Typography
                style={{
                  fontfamily: "Arial",
                  fontsize: "31px",
                  marginTop: "1px",
                }}
              >
                or
              </Typography>
              <Typography style={{ marginTop: "10px" }}>
                <Button variant="contained" color="primary">
                  Select File
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
}
class ProvideIDCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appointment_id: localStorage.getItem("AppointmentID"),
      isSavedCalled:false,
      front_id:localStorage.getItem("id_img_front"),
      Back_id:localStorage.getItem("id_img_back")
    };
  }

  submitForm(event) {
    document.getElementById("submit-button").click();
  }

  handleSubmit1 (event){
    event.preventDefault(); 
    const data = new FormData(event.target);
    let url = localStorage.getItem("url") + "/MobileUploadImageV3";
    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
          window.location = "#/home/";
      })
      .catch((error) => {
        this.setState({
          isSavedCalled:false
        });
        alert("Something went wrong (" + error.status+")");

      });
  }
  handleSubmit =(event) =>{
    event.preventDefault(); 
    var Second_Dropzone=document.getElementById("second_dropzone");
    var Second_Dropzone1=document.getElementById("second_dropzone1");
    var First_Dropzone=document.getElementById("first_dropzone");
    var First_Dropzone1=document.getElementById("first_dropzone1");

    if(First_Dropzone!=null || First_Dropzone1!=null){
      if(Second_Dropzone!=null || Second_Dropzone1!=null){
      this.setState({
        isSavedCalled:true
      });
      
      if(Second_Dropzone!=null){
      const data = new FormData(event.target);
  
      let url = localStorage.getItem("url") + "/MobileUploadImageV3";
      fetch(url, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          if(First_Dropzone!=null){
            document.getElementById("submit-button1").click();
            }else{
              this.setState({
                isSavedCalled:false
              });
            window.location = "#/home/";
            }
        })
        .catch((error) => {
          this.setState({
            isSavedCalled:false
          });
          alert("Something went wrong (" + error.status+")");
  
        });
      }else if(First_Dropzone!=null){
        document.getElementById("submit-button1").click();
      }else{
        this.setState({
          isSavedCalled:false
        });
      window.location = "#/home/";
      }
    }else{
      alert("Please provide ID Card Back Side Image.");
    }
  }else{
    alert("Please provide ID Card Front Side Image.");
  }

  }
  handleMenu = (event) => {
    window.location = "#/home/";
  };

  VerifyAppointment() {
    console.log("AppointmentID=" + localStorage.getItem("AppointmentID"));
    if (localStorage.getItem("AppointmentID") == null || localStorage.getItem("AppointmentID") == "" || localStorage.getItem("AppointmentID") == "null") {
      window.location = "#/";
    }
  }
  componentDidMount() {
    console.log(this.state.Second_Dropzone);
    console.log("AppointmentID2=" + localStorage.getItem("id_img_front"));
    console.log("AppointmentID2=" + localStorage.getItem("id_img_back"));
    this.VerifyAppointment();
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
              ID Card
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
        <div style={{marginTop:"50px",marginBottom:"-35px",padding:"11px"}}>
        <Typography
                    variant="title"
                    style={{
                      fontSize: "16px",
                      fontFamily: "Arial",

                    }}
                  >
                    If not able to upload the ID Card, please skip this secction and the card will be scanned at ckeck-in
                  </Typography>
        </div>
        <Grid
          container
          style={{ marginTop: "100px", marginBottom: "100px" }}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
          <form
            onKeyPress={this.StopEnter}
            onSubmit={this.handleSubmit1}
            id="form1"
            autoComplete="off"
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              id="submit-button1"
              className={classes.button}
              style={{ display: "none" }}
            ></Button>
            <FormControl>
              <input
                type="hidden"
                name="appointment_id"
                value={this.state.appointment_id}
              ></input>
            </FormControl>
            <FormControl>
              <input
                type="hidden"
                name="image_side"
                id="image_side"
                value="Identification_Front"
              ></input>
              <input
                type="hidden"
                name="file_type_id"
                id="file_type_id"
                value="43"
              ></input>
            </FormControl>
              <FormControl style={{ width: "100%" }}>
                <MyDropzone />
              </FormControl>
          </form>
          </Grid>


          <Grid item xs={12}>
          <form
            onKeyPress={this.StopEnter}
            onSubmit={this.handleSubmit}
            autoComplete="off"
          > <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              id="submit-button"
              className={classes.button}
              style={{ display: "none" }}
            ></Button>

            <FormControl>
              <input
                type="hidden"
                name="appointment_id"
                id="appointment_id"
                value={this.state.appointment_id}
              ></input>
            </FormControl>
            <FormControl>
              <input
                type="hidden"
                name="image_side"
                id="image_side"
                value="Identification_Back"
              ></input>
              <input
                type="hidden"
                name="file_type_id"
                id="file_type_id"
                value="43"
              ></input>
            </FormControl>
              <FormControl style={{ width: "100%" }}>
                <MyDropzone2 />
              </FormControl>
            </Grid>

            <AppBar
              position="fixed"
              style={{ top: "auto", bottom: 0 }}
              color="default"
            >
              <Toolbar variant="dense">
                <div className={classes.grow} />
                <Button
                  type="submit"
                  variant="contained"
                  id="submit-button"
                  color="primary"
                  disabled={this.state.isSavedCalled}
                >
                 {this.state.isSavedCalled ? <CircularProgress size={24} />: "Upload"}
                </Button>
              </Toolbar>
            </AppBar>
          </form>
        </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(ProvideIDCard);
