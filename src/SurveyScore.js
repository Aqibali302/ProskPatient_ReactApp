import React, { useState, useCallback } from "react";
import { withStyles } from "@material-ui/styles";
import Medicine from "./images/thankyou.png";
import GaugeChart from 'react-gauge-chart'
import TextField from "@material-ui/core/TextField";
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
  colors,
  Button,
} from "@material-ui/core";
//import Autocomplete from '@material-ui/lab/Autocomplete';
import * as moment from "moment";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import DoneIcon from "@material-ui/icons/Done";

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
          <div className={classes.grow} />
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
class SurveyScore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appointment_id: localStorage.getItem("AppointmentID"),
      ProblemAreaId: localStorage.getItem("problem_area_id"),
      pain: "",
      pain_value:"",
      pain_score_string: "",
      Physical_function: "",
      Physical_function_value:"",
      Physical_function_score_string: "",
      Depression: "",
      Depression_value:"",
      Depression_score_string: "",
      Hip_Score: "",
      Hip_Score_Value: "",
      hip_score_string: "",
      Knee_Score: "",
      Knee_Score_Value: "",
      Knee_score_string: "",
      mental_Score:"",
      mental_Score_value:"",
      mental_score_string: "",
      Physical_score:"",
      Physical_score_value:"",
      Physica_score_string: "",
    };
  }
  handleMenu = (event) => {
    window.location = "#/Home/";
  };
  ServeyScoring = () => {
    let url = localStorage.getItem('url') + "/MobileGetQuestionMarks?appointment_id=" + this.state.appointment_id;
    fetch(url, {
      method: "GET",
      //body: data
    })
      .then(res => res.json())
      .then(
        (json) => {
          console.log(url);
          if (json.success === "1") {
            var Promis10PhysicalValue=(parseInt(json.promis_phsical_value)-16)/(67-16)*100;
            var Promis10MentalValue=(parseInt(json.promis_mental_value)-16)/(67-16)*100;
            var PhysicalFunctionValue=(parseInt(json.Physical_value)-22)/(56-21)*100;
            var PainInterfaceValue=(parseInt(json.pain_value)-41)/(75-41)*100;
            var DepressionValue=(parseInt(json.depression_value)-41)/(79-41)*100;
            var KneeScore=(parseInt(json.koos_value)-0)/(100-0)*100;
            var HipScore=(parseInt(json.hoos_value)-0)/(100-0)*100;
            console.log("Haseeb");
            console.log(Promis10PhysicalValue);
            this.setState({
              pain: parseInt(json.pain_value),
              pain_value: ((PainInterfaceValue=='100'?"1": parseFloat("0." + PainInterfaceValue))),
              pain_score_string: json.pain_value,
              Physical_function: parseInt(json.Physical_value),
              Physical_function_value: ((PhysicalFunctionValue=='100'?"1": parseFloat("0." + PhysicalFunctionValue))),
              Physical_function_score_string: json.Physical_value,
              Depression: parseInt(json.depression_value),
              Depression_value: ((DepressionValue=='100'?"1":parseFloat("0." + DepressionValue))),
              Depression_score_string: json.depression_value,
              Hip_Score: parseInt(json.hoos_value),
              Hip_Score_Value: ((HipScore=='100'?"1": parseFloat("0." + HipScore))),
              hip_score_string: json.hoos_value,
              Knee_Score: ((json.koos_value==""?"0":parseInt(json.koos_value))),
              Knee_Score_Value: ((KneeScore=='100'?"1": parseFloat("0." + KneeScore))),
              Knee_score_string:json.koos_value,
              mental_Score: parseInt(json.promis_mental_value),
              mental_Score_value: ((Promis10MentalValue=='100'?"1": parseFloat("0." + Promis10MentalValue))),
              mental_score_string: json.promis_mental_value,
              Physical_score: parseInt( json.promis_phsical_value),
              Physical_score_value: ((Promis10PhysicalValue=='100'?"1": parseFloat("0." + Promis10PhysicalValue))),
              Physica_score_string: json.promis_phsical_value,


            })


            console.log(parseInt(json.depression_value))
            console.log(this.state.Knee_score_string)
          }
          else {
            alert(json.SYSTEM_MESSAGE)
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        }
      )
  }
  componentDidMount() {

    this.ServeyScoring();
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form>
          <AppBar position="fixed">
            <Toolbar variant="dense">
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                style={{ textAlign: "center" }}
              >
                Prosk™
            </Typography>
              <div className={classes.grow} />
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                style={{ textAlign: "center" }}
              >
                Survey Score
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
                <Grid spacing={8}>
                  {/* ------------------------------------------------------------------------------------------ */}
                  {localStorage.getItem("appointment_type_id") == "2" ? <div></div> : <Grid>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}s
                      >
                        Pain Interface
          </Typography>
                    </Grid>


                    <Grid item xs={4} sm={4}></Grid>
                    <Grid item xs={4} sm={4}>
                      
                    <GaugeChart id="gauge-chart5"
                        textColor={"black"}
                        nrOfLevels={400}
                        arcsLength={[0.2, 0.5, 0.2]}
                        colors={['#5BE12C', '#F5CD19', '#EA4228']}
                        percent={this.state.pain_value}
                        hideText={true}
                        arcPadding={0.03}
                        style={{ marginTop: "-12px" }}
                      />
                      <span > 
                  <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial",fontWeight:"bold",marginLeft:"40px",marginTop:"-35px" }}
                      >
                        41
          </Typography>
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginTop: "-23px",fontWeight:"bold",marginLeft:"191px",fontSize :"32px"}}
                      >
                       {this.state.pain}
          </Typography>
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "right", fontFamily: "Arial", marginTop: "-65px",fontWeight:"bold",marginRight:"40px"  }}
                      >
                        75
          </Typography>
                    </span>
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                    </Grid>
                    {this.state.pain_score_string ==="" ? <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left",font:"bold 18px Arial",color:"#999"}}
                      >
                        Not Answered
          </Typography>
                    </Grid>
                    </Grid>:<div></div>}
                  </Grid>}
                  
                {/* ------------------------------------------------------------------------------------------ */}
                  
                  {localStorage.getItem("appointment_type_id") == "2" ? <div></div> : <Grid>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}
                      >
                        Physical Function
          </Typography>
                    </Grid>


                    <Grid item xs={4} sm={4}></Grid>
                    <Grid item xs={4} sm={4}>
                      <GaugeChart id="gauge-chart11"
                        textColor={"black"}
                        nrOfLevels={400}
                        arcsLength={[0.2, 0.5, 0.2]}
                        colors={['#EA4228','#F5CD19', '#5BE12C']}
                        percent={this.state.Physical_function_value}
                        hideText={true}
                        arcPadding={0.03}
                        style={{ marginTop: "-12px" }}
                      />
                       <span > 
                  <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial",fontWeight:"bold",marginLeft:"40px",marginTop:"-35px" }}
                      >
                        22
          </Typography>
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginTop: "-23px",fontWeight:"bold",marginLeft:"191px",fontSize :"32px"}}
                      >
                       {this.state.Physical_function}
          </Typography>
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "right", fontFamily: "Arial", marginTop: "-65px",fontWeight:"bold",marginRight:"40px"  }}
                      >
                        56
          </Typography>
                    </span>
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                    </Grid>
                    <Grid container spacing={2}>
                    {this.state.Physica_score_string ==="" ? <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left",font:"bold 18px Arial",color:"#999"}}
                      >
                        Not Answered
          </Typography>
                    </Grid>
                    </Grid>:<div></div>}
                      </Grid>
                  </Grid>}

                  {localStorage.getItem("appointment_type_id") == "2" ? <div></div> : <Grid>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}
                      >
                        Depression
          </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4}></Grid>

                    <Grid item xs={4} sm={4}>
                      <GaugeChart id="gauge-chart10"
                        textColor={"black"}
                        nrOfLevels={400}
                        arcsLength={[0.2, 0.5, 0.2]}
                        colors={['#5BE12C', '#F5CD19', '#EA4228']}
                        percent={this.state.Depression_value}
                        hideText={true}
                        arcPadding={0.03}
                        style={{ marginTop: "-12px" }}
                      />
                       <span > 
                  <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial",fontWeight:"bold",marginLeft:"40px",marginTop:"-35px" }}
                      >
                        41
          </Typography>
          
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginTop: "-23px",fontWeight:"bold",marginLeft:"191px",fontSize :"32px"}}
                      >
                       {this.state.Depression}
          </Typography>
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "right", fontFamily: "Arial", marginTop: "-65px",fontWeight:"bold",marginRight:"40px"  }}
                      >
                        79
          </Typography>
                    </span>
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                    </Grid>
                    <Grid container spacing={2}>
 
                    {this.state.Depression_score_string ==="" ? <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left",font:"bold 18px Arial",color:"#999"}}
                      >
                        Not Answered
          </Typography>
                    </Grid>
                    </Grid>:<div></div>}
                      </Grid>
                  </Grid>}
                  
                  {this.state.ProblemAreaId=="3" || this.state.ProblemAreaId=="2" ?<div></div>:<Grid>
                   <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}
                      >
                        Hip Score
          </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4}></Grid>

                    <Grid item xs={4} sm={4}>
                      <GaugeChart id="gauge-chart9"
                        textColor={"black"}
                        nrOfLevels={400}
                        arcsLength={[0.2, 0.5, 0.2]}
                        colors={['#5BE12C', '#F5CD19', '#EA4228']}
                        percent={this.state.Hip_Score_Value}
                        hideText={true}
                        arcPadding={0.03}
                        style={{ marginTop: "-12px" }}
                      />
                       <span > 
                  <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial",fontWeight:"bold",marginLeft:"40px",marginTop:"-35px" }}
                      >
                        0
          </Typography>
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginTop: "-23px",fontWeight:"bold",marginLeft:"191px",fontSize :"32px"}}
                      >
                       {this.state.Hip_Score}
          </Typography>
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "right", fontFamily: "Arial", marginTop: "-65px",fontWeight:"bold",marginRight:"40px"  }}
                      >
                        100
          </Typography>
                    </span>
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                  </Grid>
                  {this.state.hip_score_string ==="" ? <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left",font:"bold 18px Arial",color:"#999"}}
                      >
                        Not Answered
          </Typography>
                    </Grid>
                    </Grid>:<div></div>}
                    </Grid>}
                  
                  {this.state.ProblemAreaId=="3" || this.state.ProblemAreaId=="1"?<div></div>:
                  <Grid>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}
                      >
                        Knee Score
          </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                    <Grid item xs={4} sm={4}>
                      <GaugeChart id="gauge-chart8"
                        textColor={"black"}
                        nrOfLevels={400}
                        arcsLength={[0.2, 0.5, 0.2]}
                        colors={['#5BE12C', '#F5CD19', '#EA4228']}
                        percent={this.state.Knee_Score_Value}
                        hideText={true}
                        arcPadding={0.03}
                        style={{ marginTop: "-12px" }}
                      />
                       <span > 
                  <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial",fontWeight:"bold",marginLeft:"40px",marginTop:"-35px" }}
                      >
                        0
          </Typography>
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginTop: "-23px",fontWeight:"bold",marginLeft:"191px",fontSize :"32px"}}
                      >
                        {this.state.Knee_Score}
          </Typography>
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "right", fontFamily: "Arial", marginTop: "-65px",fontWeight:"bold",marginRight:"40px"  }}
                      >
                        100
          </Typography>
                    </span>
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                    {this.state.Knee_score_string ==="" ? <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left",font:"bold 18px Arial",color:"#999"}}
                      >
                        Not Answered
          </Typography>
                    </Grid>
                    </Grid>:<div></div>}
                  </Grid>
                    </Grid>}
                  
                  {/*---------------------------------------------------------------------------------------  */}
                  <Grid container spacing={2} >
                   <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}s
                      >
                       PROMIS Mental Score
          </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4}></Grid>
                    <Grid item xs={4} sm={4}>
                      <GaugeChart id="gauge-chart13"
                        textColor={"black"}
                        nrOfLevels={400}
                        arcsLength={[0.2, 0.5, 0.2]}
                        colors={['#EA4228','#F5CD19','#5BE12C']}
                        percent={this.state.mental_Score_value}
                        hideText={true}
                        arcPadding={0.03}
                        style={{ marginTop: "-12px" }}
                      />
                       <span > 
                  <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial",fontWeight:"bold",marginLeft:"40px",marginTop:"-35px" }}
                      >
                        16
          </Typography>
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginTop: "-23px",fontWeight:"bold",marginLeft:"191px",fontSize :"32px"}}
                      >
                       {this.state.mental_Score}
          </Typography>
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "right", fontFamily: "Arial", marginTop: "-65px",fontWeight:"bold",marginRight:"40px"  }}
                      >
                        67
          </Typography>
                    </span>
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>

                   </Grid>
                   {this.state.mental_score_string ==="" ? <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left",font:"bold 18px Arial",color:"#999"}}
                      >
                        Not Answered
          </Typography>
                    </Grid>
                    </Grid>:<div></div>}

                    {/*------------------------------------------------------------------------------------  */}
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginBottom: "-18px" }}
                      >
                        PROMIS Physical Score
          </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4}></Grid>
                    <Grid item xs={4} sm={4}>
                      <GaugeChart id="gauge-chart14"
                        textColor={"black"}
                        nrOfLevels={400}
                        arcsLength={[0.2, 0.5, 0.2]}
                        colors={['#EA4228','#F5CD19','#5BE12C']}
                        percent={this.state.Physical_score_value}
                        hideText={true}
                        arcPadding={0.03}
                        style={{ marginTop: "-12px" }}
                      />
                       <span > 
                  <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial",fontWeight:"bold",marginLeft:"40px",marginTop:"-35px" }}
                      >
                        16
          </Typography>
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left", fontFamily: "Arial", marginTop: "-23px",fontWeight:"bold",marginLeft:"191px",fontSize :"32px"}}
                      >
                       {this.state.Physical_score}
          </Typography>
          <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "right", fontFamily: "Arial", marginTop: "-65px",fontWeight:"bold",marginRight:"40px"  }}
                      >
                        67
          </Typography>
                    </span>
                    </Grid>
                    <Grid item xs={4} sm={4}></Grid>
                    </Grid>
                    {this.state.Physica_score_string ==="" ? <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ textAlign: "left",font:"bold 18px Arial",color:"#999"}}
                      >
                        Not Answered
          </Typography>
                    </Grid>
                    </Grid>:<div></div>}
                </Grid>
              </CardContent>
            </Card>
            
            
            <AppBar
              position="fixed"
              style={{ top: "auto", bottom: 0 }}
              color="default"
            >
              <Toolbar variant="dense">

                <div className={classes.grow} />
                <div className={classes.grow} />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => this.handleMenu(event)}
                >
                  <DoneIcon style={{ marginRight: "1px" }} />
                Finish
              </Button>
              </Toolbar>
            </AppBar>
          </div>
        </form>
      </div>
    );
  }
}
export default withStyles(useStyles)(SurveyScore);
