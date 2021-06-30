import React, { useState, useCallback,Fragment} from "react";
import { withStyles } from "@material-ui/styles";
import Medicine from "./images/twoFactor.png";
import Loader from 'react-loader-spinner'
import prosk from "./images/Logo-02.png";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
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
  Button,
  DialogActions,
  Snackbar,
} from "@material-ui/core";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
//import Autocomplete from '@material-ui/lab/Autocomplete';
import * as moment from "moment";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CustomizedSnackbar from './customizesnackbar/CustomizedSnackbar.js'
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

class TwoFactorAuthentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      DateOfBirthRecived:null,
      Year:0,
      Years5Before:0,
      Years5After:0,
      date_of_birth:null,
      yearBegin:"2016",
      yearEnd:"2017",
      Year2:"",
      MaxDateString:"",
      MinDateString:"",
      isSavedCalled:false,
      isOpenSnackbar: false,
      snackbarMessage: "",
      snackbarSeverity: "",
      UserId:localStorage.getItem("UserID"),
      DateYear:[],
      DateDay:[],
      DateMonth:[],
      SelectedDate:"",
      SelectedYear:"",
      SelectedMonth:"",
      selected: "",
      selected2: "",
      selected3: "",
      value:0,
      value2:"",
      Static_dob:"",
      selectMon:"",
      val:"",
      val2:"",
      selectDate:"",
      Actual_Value:"",
    
    };
  }
 
  handleDateOfBirth = (event) => {
    this.setState({ date_of_birth: event.toLocaleDateString('en-US')});

  };
  
  componentDidMount(){
    // this.handleDateOfBirthChangeFrom();
    this. MobileGetUserConsentData();
    
  }
  Static_dob = (event) => {
    this.setState({
      Static_dob: event.target.value,
    });
  };
  MobileGetUserConsentData() {
    let url =localStorage.getItem('url') + "/MobileConsentGetUserInformationv2?user_id="+this.state.UserId;
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
        this.setState({
          DateYear:result["date_year"],
          DateDay:result["date_days"],
          DateMonth:result["date_months"],

        });
        console.log(this.state.DateYear)
        console.log(this.state.DateDay)
        console.log(this.state.DateMonth)
      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  }
  handleSubmit=(event)=>{
    if(this.state.Static_dob!=""){
      const Formitteddatofbirth = moment(this.state.Static_dob).format(
        "YYYY-MM-DD"
      );
      let url =localStorage.getItem('url') + "/mobile/MobileLogUser?user_id="+this.state.UserId
      +"&date_of_birth="+Formitteddatofbirth+"&is_dob_valid=1&verification_code=0";
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
            window.location = "#/GetFacilitiesListData/";
          }else{
            alert(result.error)
            if(this.state.val<10){
              this.state.value2=this.state.val
              console.log(this.state.value2)
              this.state.SelectedDate=this.state.value2
            }
            this.state.date_of_birth=this.state.SelectedYear+"-"+this.state.SelectedMonth+"-"+this.state.SelectedDate
          }
        })
        .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
          "error"
      ));
    }else{
      if(this.state.SelectedMonth!="" ){
        console.log("1")
        if(this.state.SelectedDate!=""){
          console.log("2")
          if(this.state.SelectedYear!=""){
            console.log("3")
            if(this.state.SelectedMonth!=""&&this.state.SelectedDate!=""&&this.state.SelectedYear!=""){
              this.state.date_of_birth=this.state.Static_dob;
              const Formitteddatofbirth = moment(this.state.date_of_birth).format(
                "YYYY-MM-DD"
              );
              if(this.state.date_of_birth!=null){
                let url =localStorage.getItem('url') + "/mobile/MobileLogUser?user_id="+this.state.UserId
                +"&date_of_birth="+Formitteddatofbirth+"&is_dob_valid=1&verification_code=0";
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
                      window.location = "#/GetFacilitiesListData/";
                    }else{
                      alert(result.error)
                      if(this.state.val<10){
                        this.state.value2=this.state.val
                        console.log(this.state.value2)
                        this.state.SelectedDate=this.state.value2
                      }
                      this.state.date_of_birth=this.state.SelectedYear+"-"+this.state.SelectedMonth+"-"+this.state.SelectedDate
                    }
                  })
                  .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
                    "error"
                ));
              }
            }
        }else{
          this.handleOpenSnackbar(<span>Please select Year</span>,
            "info"
        );
        }
      }else{
        this.handleOpenSnackbar(<span>Please select Date</span>,
          "info"
      );
      }
      } else{
        this.handleOpenSnackbar(<span>Please select Month</span>,
          "info"
      );
      }
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
changeColor(myvalue,data) {
  console.log(data )
  this.setState({ selected: data });
  this.state.SelectedYear=data;
  this.state.Static_dob=this.state.selectMon+"-"+this.state.selectDate+"-"+this.state.SelectedYear
};
changeColor2(myvalue,data) {
  console.log(data )
  this.setState({ selected2: data });
  this.state.SelectedDate=data;
  this.state.val=data
  if(this.state.val<10){
    this.state.val2="0"+this.state.val
    console.log(this.state.val2)
    this.state.selectDate=this.state.val2
    this.state.SelectedDate=this.state.selectDate
  }else{
    this.state.val2=this.state.val
    console.log(this.state.val2)
    this.state.selectDate=this.state.val2
    this.state.SelectedDate=this.state.selectDate
  }
  this.state.Static_dob=this.state.selectMon+"-"+this.state.selectDate+"-"+this.state.SelectedYear

};
changeColor3(myvalue,data) {
  console.log(data )
  this.setState({ selected3: data });
  this.state.SelectedMonth=data;
  this.state.selectMon=data;
  if(this.state.selectMon=="January"){
    this.state.selectMon="01";
  }
  else if(this.state.selectMon=="February"){
    this.state.selectMon="02";
  }
  else if(this.state.selectMon=="March"){
    this.state.selectMon="03";
  }
  else if(this.state.selectMon=="April"){
    this.state.selectMon="04";
  }
  else if(this.state.selectMon=="May"){
    this.state.selectMon="05";
  }
  else if(this.state.selectMon=="June"){
    this.state.selectMon="06";
  }
  else if(this.state.selectMon=="July"){
    this.state.selectMon="07";
  }
  else if(this.state.selectMon=="August"){
    this.state.selectMon="08";
  }
  else if(this.state.selectMon=="September"){
    this.state.selectMon="09";
  }
  else if(this.state.selectMon=="October"){
    this.state.selectMon="10";
  }
  else if(this.state.selectMon=="November"){
    this.state.selectMon="11";
  }
  else if(this.state.selectMon=="December"){
    this.state.selectMon="12";
  }
  this.state.Static_dob=this.state.selectMon+"-"+this.state.selectDate+"-"+this.state.SelectedYear
};
  render() {
    const { classes } = this.props;
  
    return (
      <div className={classes.root}>
        <form>
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
              Date of Birth Verification
            </Typography>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
        <CustomizedSnackbar
                    isOpen={this.state.isOpenSnackbar}
                    message={this.state.snackbarMessage}
                    severity={this.state.snackbarSeverity}
                    handleCloseSnackbar={() => this.handleCloseSnackbar()}
                />
          <div
            style={{marginTop: "60px",
            marginBottom: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",}}
          >
            <Card style={{ width: "98%" }}>
              <CardContent>
                <Grid container spacing={8}>
                  <Grid item xs={12} sm={4}>
                  <Typography
              color="primary"
            >
              Please confirm your birth date to proceed.
            </Typography>
                  </Grid>
                  
                  
                  <Grid  container spacing={8} style={{marginTop:"0%",marginBottom:"4%"}}> 

                  <Grid container style={{marginLeft:"10%",marginRight:"10%" }}  >
             <Grid item xs={4}>
             <Card style={{height:"51px",backgroundColor:"#009688",textAlign:"center"}}>
                    <Typography
               variant="title"
              style={{
                marginTop:"10px",textAlign:"center",color:"white",fontFamily:"arial",fontSize:"15px"
              }}
            >
              Please select month from the list
        
              
            </Typography>
                    </Card>
          {this.state.DateMonth.map((data, index)=> 
                      <Fragment key={"Month"+index}>
                        {index ? <Divider variant="fullWidth" /> : ""}
                        <Card 
                        titleStyle={{
                          textAlign: 'center',
                        }}
                        >
                        <ListItem 
                          button
                          selected={this.state.SelectedMonth==data}
                          style={{backgroundColor: this.state.selected3 == data ? "teal" : ""}}
                          onClick={() => this.changeColor3(this.state.selected3,data)}
                        >
                          <span    style={{ fontSize:".9rem", padding:8}}>
                            <b style={{color:this.state.selected3 == data ? "white" :"#212121"}}>{data}</b>
                            
                          </span>
                        </ListItem>
                        </Card>
                      </Fragment>)}
            </Grid>
                  <Grid item xs={4}>

                  <Card style={{height:"51px",backgroundColor:"#009688",textAlign:"center"}}>
                    <Typography
               variant="title"
              style={{
                marginTop:"10px",textAlign:"center",color:"white",fontFamily:"arial",fontSize:"15px"
              }}
            >
              Please select day from the list
        
              
            </Typography>
                    </Card>
          {this.state.DateDay.map((data, index)=> 
                      <Fragment key={"Month"+index}>
                        {index ? <Divider variant="fullWidth" /> : ""}
                        <Card
                         titleStyle={{
                          textAlign: 'center',
                        }}
                        >
                        <ListItem 
                         button
                          selected={this.state.SelectedDate==data}
                          style={{backgroundColor: this.state.selected2 == data ? "teal" : ""}}
                          onClick={() => this.changeColor2(this.state.selected2,data)}
                        >
                          <span id="Days" style={{fontSize:".9rem", padding:8}}>
                            <b style={{color:this.state.selected2 == data ? "white" :"#212121"}}>{data}</b>
                            
                          </span>
                        </ListItem>
                        </Card>
                      </Fragment>)}
                 </Grid>
                 <Grid item xs={4}>
                 <Card style={{height:"51px",backgroundColor:"#009688",textAlign:"center"}}>
                    <Typography
               variant="title"
              style={{
                marginTop:"10px",textAlign:"center",color:"white",fontFamily:"arial",fontSize:"15px"
              }}
            >
              Please select year from the list
              
            </Typography>
                    </Card>
          {this.state.DateYear.map((data, index)=> 
                      <Fragment key={"Month"+index}>
                        {index ? <Divider variant="fullWidth" /> : ""}
                        <Card
                         titleStyle={{
                          textAlign: 'center',
                        }}
                        >
                        <ListItem 
                          button
                          selected={this.state.SelectedYear==data}
                          style={{backgroundColor: this.state.selected == data ? "teal" : ""}}
                          onClick={() => this.changeColor(this.state.selected,data)}
                        >
                          <span id="Year" style={{ fontSize:".9rem", padding:8}}>
                            <b style={{color:this.state.selected == data ? "white" :"#212121"}}>{data}</b>
                            
                          </span>
                        </ListItem>
                        </Card>
                      </Fragment>)}
                 </Grid> 
                 <Grid item xs={12} sm={4}></Grid>
                  <Grid item xs={12} sm={4}>
                  <Typography
              color="primary"
              style={{textAlign:"center",fontWeight:"bold",fontSize:"20px"}}
            >
              or you can enter birth date in text field below
            </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}></Grid>

                  <Grid item xs={12} sm={4} yle={{marginTop:"-18px"}}> 
                  <InputMask
               mask="99/99/9999"
               onChange={this.Static_dob}
               value={this.state.Static_dob}
                maskChar=""
              >
                {() =>
                  <TextField
                    name="Patient"
                    label="Birth Date"
                    style={{ width: "90%", height: "2%" }}
                    className={classes.textFieldCard}
                    placeholder="MM/DD/YYYY"
                      style={{
                        width: "100%",
                        marginTop: "5%",
                        marginbottom: "5%",
                      }}
                />}</InputMask>
                  </Grid>

            </Grid> 
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
            <div className={classes.grow} />
            {this.state.isSavedCalled?      <Loader type="TailSpin" color="#00BFFF" height={80} width={80}/>:
                        <Button  variant="contained" color="primary"
                        onClick={this.handleSubmit}
                      >
                        Continue
                        </Button>
            }
          </Toolbar>
        </AppBar>
        </form>
      </div>
    );
  }
}
export default withStyles(useStyles)(TwoFactorAuthentication);
