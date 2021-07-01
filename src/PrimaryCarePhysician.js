import React, { Component,Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Input from '@material-ui/core/Input';
import {
    Card,
    CardContent,
    CardHeader,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
 } from "@material-ui/core";
 import InputBase from '@material-ui/core/InputBase';
 import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
 import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
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
import SearchIcon from '@material-ui/icons/Search';
import prosk from "./images/Logo-02.png";
import Loader from 'react-loader-spinner'
import CustomizedSnackbar from './customizesnackbar/CustomizedSnackbar.js'
import MenuItem from "@material-ui/core/MenuItem";
import InputMask from "react-input-mask";
import ReactOverlayLoader  from "reactjs-overlay-loader";
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

class PrimaryCarePhysician extends Component {
  constructor(props) {
    super(props);
    this.state = {
      physician: false,
      state_val: "",
      state_label: "",
      physician_dropdown: [
        {name: "AL" },
        {name: "AK" },
        {name: "AZ" },
        {name: "AR" },
        {name: "CA" },
        {name: "CO" },
        {name: "CT" },
        {name: "DE" },
        {name: "FL" },
        {name: "GA" },
        {name: "HI" },
        {name: "ID" },
        {name: "IL" },
        {name: "IN" },
        {name: "IA" },
        {name: "KS" },
        {name: "KY" },
        {name: "LA" },
        {name: "ME" },
        {name: "MD" },
        {name: "MA" },
        {name: "MI" },
        {name: "MT" },
        {name: "MN" },
        {name: "MS" },
        {name: "MO" },
        {name: "NE" },
        {name: "NV" },
        {name: "NH" },
        {name: "DC" },
        {name: "WY" },
        {name: "WI" },
        {name: "WV" },
        {name: "WA" },
        {name: "VA" },
        {name: "VT" },
        {name: "UT" },
        {name: "TX" },
        {name: "TN" },
        {name: "SD" },
        {name: "SC" },
        {name: "RI" },
        {name: "PA" },
        {name: "OR" },
        {name: "OK" },
        {name: "OH" },
        {name: "ND" },
        {name: "NC" },
        {name: "NY" },
        {name: "NM" },
        {name: "NJ" },
        {name: "PR" },
  
      ],
      UserId:localStorage.getItem("UserID"),
      LastCode:localStorage.getItem("zip_code"),
      LastPID:localStorage.getItem("PhysicianID"),
      LastState:localStorage.getItem("state"),
      ZipCode:"",
      filter: "",
      PhysisanData:[],
      selected: "",
      SelectedListId:"",
      filteredData:[],
      isSavedCalled:true,
      isSavedCalled2:true,
    };
  }

  handleChange = event => {
    this.setState({ filter: event.target.value });
  };
  GetExistingData=()=>{
    var ziptext=this.state.ZipCode.replace("-","")
    let url=localStorage.getItem("url") +"/mobile/MobileGetPhysicianList?physican_id="+this.state.LastPID+"&postal_code="+ziptext;
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
        isSavedCalled:false
      });
      console.log(url);
      this.setState({
        PhysisanData:result["Physician_list"],

    });
    for (var i = 0; i < this.state.PhysisanData.length; i++) {
        if ( this.state.LastPID== this.state.PhysisanData[i]["id"]) {
            console.log(this.state.PhysisanData[i]["id"])
          this.setState({
            SelectedListId:this.state.PhysisanData[i]["id"],
            selected :this.state.PhysisanData[i]["id"],
            filter: this.state.PhysisanData[i]["name"]
          }); 
        }
      }
    })
    .catch((error) =>{
      this.setState({
        isSavedCalled:false
      });
      alert("An error occured: " + error)
    })
  }

  GetData=()=>{
    var ziptext=this.state.ZipCode.replace("-","")
    let url=localStorage.getItem("url") +"/mobile/MobileGetPhysicianList?postal_code="+ziptext+
    "&state="+this.state.state_val+"&provider_name="+this.state.filter;
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
        isSavedCalled:false
      });
      this.setState({
        PhysisanData:result["Physician_list"],
    });
    for (var i = 0; i < this.state.PhysisanData.length; i++) {
        if ( this.state.LastPID== this.state.PhysisanData[i]["id"]) {
            console.log(this.state.PhysisanData[i]["id"])
          this.setState({
            selected :this.state.PhysisanData[i]["id"],
            filter: this.state.PhysisanData[i]["name"]
          });
          this.handleChange2();
          
        }
      }
    })
    .catch((error) =>{
      this.setState({
        isSavedCalled:false
      });
      alert("An error occured: " + error)
    })
  }
  renderStateOptions() {
    return this.state.physician_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.name}>
          {dt.name}
        </MenuItem>
      );
    });
  }
  
  Physicianstate = (event) => {
    this.setState({
        state_val: event.target.value,
    });
   // this.GetData();
  };
  changeColor2(myvalue,data) {
    this.setState({ selected: data });
    this.state.SelectedListId=data;
    console.log(this.state.SelectedListId)
  };



  handleSubmit=(event)=>{
    if(this.state.state_val!="" || this.state.ZipCode!=""){
        if(this.state.SelectedListId!=""){
          this.setState({
            isSavedCalled:true
          });
          var ziptext=this.state.ZipCode.replace("-","")
            let url =localStorage.getItem('url') + "/mobile/MobileUpdatePrimaryCarePhysician?user_id="+this.state.UserId
            +"&physician_id="+this.state.SelectedListId+"&zip_code="+ziptext+"&state="+this.state.state_val;
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
                if (result.success == "1") {
                  this.setState({
                    isSavedCalled:false
                  });
                  window.location = "#/Home";
                }else{
                  this.setState({
                    isSavedCalled:false
                  });
                  alert(result.error)
                }
              })
              .catch((error) =>{
                this.setState({
                  isSavedCalled:false
                });
                alert("An error occured: " + error)
              })
        }else{
          this.setState({
            isSavedCalled:false
          });
            alert("Please Select Primary Care Physician from the list");
        }
      
    }else{
      this.setState({
        isSavedCalled:false
      });
      alert("Please select state or provide zip code");
    }


}
  componentDidMount() {
    //  // this.getIpAddress();
    //   this.GetPhysicianData();
    console.log("aqib");
    console.log(this.state.LastPID);
    console.log(this.state.LastCode);
    console.log(this.state.LastState);
          if(this.state.LastPID!=""){
            if(this.state.LastState!=""){
              this.state.state_val=this.state.LastState
              this.state.ZipCode=this.state.LastCode
              this.GetExistingData();
            }else{
              this.state.ZipCode=this.state.LastCode
              this.GetExistingData();
            }

    }else{
      this.setState({
        isSavedCalled:false
      });
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
ZipCode = (event) => {
    this.setState({
        ZipCode: event.target.value,
    });
   // this.GetData();
  };
  filter = (event) => {
    this.setState({
      filter: event.target.value,
    });
   // this.GetData();
  };
  Serach = (event) => {
    this.setState({
        ZipCode: event.target.value,
    });
   // this.GetData();

  };
  handleChange2 = event => {
    this.filterHandler();
  };
  filterHandler = () => {
      if(this.state.filter.length<4){
        alert("Please enter atleast 4 character in primary care provider textfield");
    }else{
      this.setState({
        isSavedCalled:true
      });
      this.GetData();
      // const { filter, PhysisanData } = this.state;
      // const lowercasedFilter = filter.toLowerCase();
      //  this.state.filteredData= this.state.PhysisanData.filter(item => {
      //     return Object.keys(item).some(key =>
      //       item[key].toLowerCase().includes(lowercasedFilter)
      //     );
      //   });
  
      // let highlightFD = [];
      // this.state.filteredData.map((values, index) => {
      //   highlightFD.push({ ...values
      //   });
      // })
      // this.setState({
      //     filteredData: highlightFD
      // });
    }      
   

  };
  
  render() {
    const { classes } = this.props;
    // const lowercasedFilter = this.state.filter.toLowerCase();
    // const { filter, PhysisanData } = this.state;
    // const filteredData= this.state.PhysisanData.filter(item => {
    //   return Object.keys(item).some(key =>
    //     item[key].toLowerCase().includes(lowercasedFilter)
    //   );
    // });
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
            Primary Care Physician
          </Typography>
          <div className={classes.grow}/>
          
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "60px" }}>
        <Card style={{ width: "98%",margin:"auto" }}>
            <CardContent>
            <ReactOverlayLoader 
      loaderContent={<span style={{ color: "#ffffff" }}> Please wait...</span>}
      isActive={this.state.isSavedCalled}
      iconType='TailSpin'
      style={{
        backgroundColor: "rgb(47 46 46 / 81%)"
      }}
    >
              <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                  <Typography variant="title" color="primary"></Typography>
                </Grid>
                <Grid item xs={12} align="left">
                <Typography
                  style={{ textAlign: "left" }}
                  variant="title"
                  style={{ marginBottom: "10px" ,marginTop: "60px",fontSize:"16px",fontFamily:"arial",fontWeight:"bold"  }}
                >
                 Please select the state or provide zip code and press search
                </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl
                      style={{ width: "90%"}}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="state">State</InputLabel>
                      <Select
                        IconComponent="false"
                        style={{ width: "100%" }}
                        value={this.state.state_val}
                        onChange={this.Physicianstate}
                        //helperText={this.state.facility_type_error}
                        autoWidth
                        required
                        inputProps={{
                          name: "state",
                          id: "state",
                        }}
                      >
                        {this.renderStateOptions()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                  <InputMask
               mask="99999-9999"
               onChange={this.ZipCode}
               value={this.state.ZipCode}
                disabled={false}
                maskChar=""
              >
                {() =>
                  <TextField
                  name="ZipCode"
                  label="Zip Code"
                  onKeyDown={this.StopEnter}
                  
                  style={{ width: "90%", height: "5%",fontFamily:"Arial" }}
                />}</InputMask>
              
                  </Grid>
                  <Divider classes={{root: classes.divider2}} />
                  <br/>
                  <Grid item xs={12} sm={4} >
                  
                  <TextField
                        id="standard-adornment-password"
                        ref={(input) => { this.nameInput = input; }} 
                        value={this.state.filter}
                        label="Search Physician"
                      onChange={this.filter}
                        style={{width:"95%",height: "5%",marginTop:"-1px"}}
          />
                 
                  </Grid>
                  <Grid item xs={12} sm={2}>
                  <Button
                                       type="submit"
                                       variant="contained"
                                       color="primary"
                                       className={classes.button}
                                       style={{ marginTop: "2%", marginLeft: "2%" }}
                                       onClick={this.filterHandler}
                                     >
                                       Search
                                     </Button> 
                  </Grid>
                
                <Grid item xs={12} sm={12} style={{marginTop:"7px"}}>
                {this.state.PhysisanData!=""?<div>
                <Divider style={{marginBottom:"9px"}} />
                <Typography
                  style={{ textAlign: "left" }}
                  variant="title"
                  style={{ marginBottom: "10px" ,marginTop: "60px",fontSize:"16px",fontFamily:"arial",fontWeight:"bold"  }}
                >
                 Please select primary care physician from the list
                </Typography>
                </div>:<div></div>}
                {this.state.PhysisanData!=""?this.state.PhysisanData.map((data,index)=>
                 <Fragment key={"doc_type"+index}>
                 {index ? <Divider variant="fullWidth" /> : ""}
                 <ListItem 
                         button
                         selected={this.state.SelectedDate==data.id}
                         style={{backgroundColor: this.state.selected == data.id ? "teal" : "",marginTop:"11px"}}
                         onClick={() => this.changeColor2(this.state.selected,data.id)}
                        >
                          <span style={{fontSize:".9rem", padding:8,color: this.state.selected == data.id ? "white" : "black"}}>
                            <b style={{color: this.state.selected == data.id ? "white" : "black"}}>{data.name} | {data.speciality}</b>
                            <br/>
                            {data.address}
                            <br/>
                            {data.phone_no}
                          </span>
                        </ListItem>
                 <Divider classes={{root: classes.divider}} />
               </Fragment>
                ):<div></div>}
            </Grid>
              </Grid>
              </ReactOverlayLoader>
            </CardContent>
        
        </Card>
      </div>
      <AppBar
          position="fixed"
          style={{ top: "auto", bottom: 0 }}
          color="default"
        >
          <Toolbar variant="dense">
            <div className={classes.grow} />
          
                        <Button  variant="contained" color="primary"
                        onClick={this.handleSubmit}
                      >
                        Continue
                        </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(PrimaryCarePhysician);
