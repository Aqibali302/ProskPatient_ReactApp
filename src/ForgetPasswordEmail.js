import React from "react";
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
import { async } from "q";
const styles = theme => ({
  root: {
    flexGrow: 1
  },

  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

function DenseAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="Menu">
            <img src={logo1} width={40} />
          </IconButton>
          <Typography variant="h6" color="inherit">
            University College Lahore
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function Email(props){
  const classes=props.classes;
  return(
    <div className={classes.root}>
         
          <Grid>
            <Grid item xs={12}>
              <form onSubmit={event=>sendCode(event,props)} autoComplete="off">
                <Grid
                  style={{ textAlign: "center", marginTop: "7%" }}
                  item
                  xs={12}
                >
                  
                  <Typography
                        color="primary"
                        style={{ textAlign: "left" }}
                        variant="subtitle1"
                        style={{ marginBottom: "-1%" }}
                      >
                        To reset your password, please provide your registered email.
                      </Typography>
              
              <div style={{display:"flex",alignItems:"center"}}>
              <Grid
                  style={{ textAlign: "center", marginTop: "2%" }}
                  item
                  xs={12}
                >
                  <TextField autoFocus 
                    id="email"
                    name="email"
                    label="Email"
                    className={classes.textField}
                    margin="normal"
                    style={{ width: 350 }}
                  />
                  
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{marginTop:"2%",marginLeft:"2%"}}
                  >
                    Next
                  </Button>
                  {
                    props.state.invalid_email==1?
                  <Typography
                        color="error"
                        variant="subtitle1"
                        
                      >
                        Email id not found, please try again.
                   </Typography>:""
                  }
                  
                </Grid>
                  </div>
                  
                  
                  
    
                  <br />
                  
                  
                </Grid>
              </form>
            </Grid>
          </Grid>
        </div>
            );
}



function Password(props){
  const classes=props.classes;
  return(
    <div className={classes.root}>
         <Grid>
        <Grid item xs={12}>
          <form onSubmit={event=>resetPassword(event,props)} autoComplete="off">
            <Grid
              style={{ textAlign: "center", marginTop: "10%" }}
              item
              xs={12}
            >
              <Grid container>
                <Grid xs={4} />
                <Grid xs={4} style={{ textAlign: "center" }}>
                <Typography
                        color="primary"
                        style={{ textAlign: "left" }}
                        variant="subtitle1"
                        style={{ marginBottom: "-1%" }}
                      >
                        Please provide your new password.
                      </Typography>
                </Grid>
              </Grid>

              <TextField autoFocus 
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    className={classes.textField}
                    margin="normal"
                    style={{ width: 300 }}
                  />
              <br />
              <TextField  
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirm Password"
                    className={classes.textField}
                    type="password"
                    margin="normal"
                    style={{ width: 300 }}
                  />
              <br />
              <br />

              <Button
                style={{ marginLeft: "16em" }}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
               
              >
                Login
              </Button>

              <br />
              
              
            </Grid>
          </form>
        </Grid>
      </Grid>
          
        </div>
            );
}


function VerifyUser(props){
  const classes=props.classes;
  return(
    <div className={classes.root}>
         
          <Grid>
            <Grid item xs={12}>
              <form onSubmit={event=>verifyCode(event,props)}  autoComplete="off">
                <Grid
                  style={{ textAlign: "center", marginTop: "7%" }}
                  item
                  xs={12}
                >
                  
                  <Typography
                        color="primary"
                        style={{ textAlign: "left" }}
                        variant="subtitle1"
                        style={{ marginBottom: "-1%" }}
                      >
                        A code has been sent on your email address, please type it here and click verify.
                      </Typography>
              
              <div style={{display:"flex",alignItems:"center"}}>
              <Grid
                  style={{ textAlign: "center", marginTop: "2%" }}
                  item
                  xs={12}
                >
                  <TextField autoFocus 
                    id="verification_code"
                    name="verification_code"
                    label="Verification Code"
                    className={classes.textField}
                    margin="normal"
                    style={{ width: 350 }}
                  />
                  
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{marginTop:"2%",marginLeft:"2%"}}
                  >
                    Next
                  </Button>
                </Grid>
                  </div>
                  <br />
                </Grid>
              </form>
            </Grid>
          </Grid>
        </div>
            );
}

function resetPassword(event,props) {
  event.preventDefault();
  const data = new FormData(event.target);
  
  
   fetch('/WaveEdu/ResetPasswordExecute', {
     method: 'POST',          
     body: data,
   })
   .then(res => {
    if(!res.ok){
      throw res;
    }
    return res.json()
   
   })
        .then(
          (result) => {
            if(result.success==1){
              alert("Your password has been reset. Please use new password to login.");
              window.location="/WaveEdu/app";
            }else if(result.error==1){
              
              alert(result.error_message);
            }
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            alert(error)
          }
        );
        
}

 function verifyCode(event,props) {
  event.preventDefault();
  const data = new FormData(event.target);
   fetch('/WaveEdu/ResetPasswordVerifyCode', {
     method: 'POST',          
     body: data,
   })
   .then(res => {
    if(!res.ok){
      throw res;
    }
    return res.json()
   
   })
        .then(
          (result) => {
            if(result.success==1){
              props.handleNextClick(event,3);
            }else if(result.error==1){
              alert(result.error_message);
            }
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            alert(error)
          }
        );
 
}

 function sendCode(event,props) {
  event.preventDefault();
  const data = new FormData(event.target);
  
  
   fetch('/WaveEdu/ResetPasswordSendCode', {
     method: 'POST',          
     body: data,
   })
   .then(res => {
    if(!res.ok){
      throw res;
    }
    return res.json()
   
   })
        .then(
          (result) => {
            if(result.success==1){
              props.handleNextClick(event,2);
            }else if(result.error==1){
              
              if(result.invalid_email==1){
                    props.updateState(event,1);
              }else{
                alert(result.error_message);
              }
              
            }
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            alert(error)
          }
        );
        
}
class ForgetPassword extends React.Component{
  state={
    step:1,
    is_user_verified:0,
    user_email:"",
    user_mobile_no:"",
    invalid_email:0,
}

updateState = (event) => {
        
  this.setState(state => ({
    invalid_email: 1
  }));
  
};

handleNextClick = (event, index) => {
  if(index==4){
    this.props.history.push("/");
  }else{
        
  this.setState(state => ({
    step: index
  }));
  }
};
    render(){
      const { classes } = this.props;
      return(
<div className={classes.root}>
      <DenseAppBar classes={classes} />
      {(() => {
                  
                  if (this.state.step == 1) {
                    return (
                      <Email updateState={this.updateState} handleNextClick={this.handleNextClick} state={this.state} classes={classes} />
                    );
                  } else if (this.state.step == 2) {
                    return (
                      <VerifyUser handleNextClick={this.handleNextClick}  state={this.state} classes={classes} />
                    );
                  } else if (this.state.step == 3) {
                    return (
                      <Password  handleNextClick={this.handleNextClick} state={this.state} classes={classes} />
                    );
                  }
                })()}
                  
    </div>
        );
      
    };
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(ForgetPassword);
