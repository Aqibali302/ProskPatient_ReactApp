import React, { useState, useCallback } from "react";
import deburr from "lodash/deburr";
import { withStyles } from "@material-ui/styles";

import {
  Grid,
  IconButton,
  Typography,
  Paper,
  Card,
  Button,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem
} from "@material-ui/core";

import { properties } from "../properties.js";
import PrimaryAppBar from "../PrimaryAppBar";
import BottomBar from "../BottomBar";
import TextField from "@material-ui/core/TextField";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
const useStyles = theme => ({
  downShift: {
    paddingTop: "18px !important"
  },
  textFieldCard: {
    paddingTop: "0px !important"
  },
  cardcontent: {
    paddingTop: "0px !important",
    paddingLeft: "4px",
    paddingRight: "4px",
    "&:last-child": {
      paddingBottom: 0
    }
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
    fontSize: "2px !important",
    padding: "8px !important"
  },
  asdf: {
    margin: 1000
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  bigAvatar: {
    margin: 10
  },
  hidden: { display:"none" },
  badgeMargin: {
    margin: theme.spacing.unit * 2
  },
  inline: {
    display: "inline"
  },
  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px"
  },
  formControl: {
    minWidth: 120,
    width: "100%"
  },
  container: {
    marginTop: "100px"
  }
});

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      onKeyPress={e => {
        if (e.key === "Enter") e.preventDefault();
      }}
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}


class F04Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      record_id: this.props.record_id,
      isValid: true,

      mobileNo: "",
      verificationCode: "",


      name: "",
      ItemList: [],
      shouldHide:false
    };

    localStorage.setItem("url", properties.url);
  }

  submitForm(event) {
    document.getElementById("submit-button").click();

  }
  getItems(){
    const data = { "mobileNo":this.state.mobileNo}
     let url = localStorage.getItem('url') + "/retailer/common/C05RetailerMobileVerificationResetCodeView";
     fetch(url, {
       method: "POST",
       
      body: JSON.stringify(data),
       headers: new Headers({
 
         'Authorization': "Bearer "+localStorage.getItem('jwttoken'),
       })
     })
       .then(res => res.json())
       .then(
         (json) => {
           console.log(json);
           if (json.CODE === 1) {
             for (var i = 0; i < json.DATA.length; i++) {
              this.setState({
                shouldHide: true,
              });
               this.setState({
                 ItemList: this.state.ItemList.concat([{ id: json.DATA[i].id,createOn: json.DATA[i].createOn,verifiedOn: json.DATA[i].verifiedOn }])
               });
               
               // ItemsList.push(
               //   <React.Fragment key={i}>
               //     <Grid item={true} xs={12}>
               //       <Grid item xs={12} sm={3}>
               //         <Typography variant="title">
               //           Pepsi
               //       </Typography>
               //       </Grid>
               //       <Grid item xs={12} sm={3}>
               //         <TextField
               //           label="Price"
 
               //         />
               //       </Grid>
               //     </Grid>
               //   </React.Fragment>
               // )
             }
 
           }
           else {
             alert(json.SYSTEM_MESSAGE)
           }
         },
         // Note: it's important to handle errors here
         // instead of a catch() block so that we don't swallow
         // exceptions from actual bugs in components.
         (error) => {
           this.setState({
             isLoaded: true,
             error
           });
         }
       )
   //  return ItemsList;
   }
  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
console.log(data);
    let url = localStorage.getItem('url') + "/retailer/common/C05RetailerMobileVerificationResetCode";
    fetch(url, {
      method: "POST",
      body: data,
      headers: new Headers({

        'Authorization': "Bearer "+localStorage.getItem('jwttoken'),
      })
      //body: data
    })
      .then(res => res.json())
      .then(
        result => {
          if (result.CODE === 1) {
            alert("saved");
            window.location.reload();

          } else if (result.CODE == 2) {
            alert(result.CODE + ":" + result.USER_MESSAGE);
          } else if (result.CODE == 3) {
            alert(result.CODE + ":" + result.USER_MESSAGE);
          } else if (result.error == 1) {
            alert(result.error_message);
          } else if (result.success == 0 && result.redirect_url != "") {
            window.location = result.redirect_url;
          }
          console.log(result);
        },

      )
      .catch(error => {
        if (error.status == 401) {
          alert("Invalid/Expired token, Please login again to continue");
          window.location = "#/"
        } else {
          alert('An error occured: ' + error.status);
          window.location.reload();
        }
      });
  }
  mobileNo = event => {
    this.setState({
      mobileNo: event.target.value
    });
  };
  verificationCode = event => {
    this.setState({
      verificationCode: event.target.value
    });
  };


  handleDownshiftChange = event => {
    alert(event.target.value);
    //this.setState({ semester_value: event.target.value });
  };
  
  

 
  submitForm(event) {
    document.getElementById("submit-button").click();
 
}
  render() {
    const { classes } = this.props;
    
    return (
      
      <div className={classes.root}>

        <PrimaryAppBar header_text={"PBC"} />
        <div
          style={{
            marginTop: "60px",
            marginBottom: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Card style={{ width: "98%" }}>
            <form
              id="myform"
              onKeyPress={this.StopEnter}
              onSubmit={this.handleSubmit}
              autoComplete="off"
            >
            <Button
          type="submit"
          variant="contained"
          color="primary"
          id="submit-button"
          className={classes.button}
          style={{ display: "none" }}
        >
          submit
        </Button>
              <CardContent>
                <Grid container spacing={16}>
                  <Grid item xs={1} align="left">
                    <IconButton
                      style={{ marginTop: "-10px" }}
                      onClick={event => window.history.back()}
                    >
                      <ArrowBackIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={11} align="center">
                    <Typography variant="title" color="primary">
                      F04 -  Reset Verification Code
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="mobileNo"
                      label="Mobile#"
                      className={classes.textFieldCard}
                      onChange={this.mobileNo}
                      // margin="normal"
                      // error={this.state.remarks}
                      value={this.state.mobileNo}
                      //helperText={this.state.remarks_error}
                      // required

                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                  <Button 
                  
                  onClick={event => this.getItems()}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{ marginTop: "2%", marginLeft: "2%" }}
                  >
                    Search
                  </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                  <TextField
                      onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="verificationCode"
                      label="Veification#"
                      className={classes.textFieldCard}
                      onChange={this.verificationCode}
                      // margin="normal"
                      // error={this.state.remarks}
                      value={this.state.verificationCode}
                      //helperText={this.state.remarks_error}
                      // required

                      style={this.state.shouldHide ? {width: "100%"} : { display: 'none' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                  <Button
                  style={this.state.shouldHide ? {marginTop: "2%", marginLeft: "2%" } : { display: 'none' }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Submit
                  </Button>
                  </Grid>
       
        
             
         
                </Grid>
              </CardContent>
            </form>
          </Card>
          
        </div>
        <div style={this.state.shouldHide ? {} : { display: 'none' }}
          style={{
            marginTop: "60px",
            marginBottom: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
        <Card style={{ width: "98%" }} style={this.state.shouldHide ? {} : { display: 'none' }}> 
            
            <CardContent>
              <Grid container spacing={16}>
                
        
          <Grid item xs={12} sm={4}>
          <Typography 
                   >
            ID
          </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
          <Typography 
                   >
            Created on
          </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Typography
                   >
            verified On
          </Typography>

          
        </Grid>
      
                {this.state.ItemList.map((ItemLists, idx) => (
        
      
        <React.Fragment key={idx}>
          <Grid item xs={12} sm={4}>
          <Typography
                   >
            {ItemLists.id}
          </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
          <Typography 
                   >
            {ItemLists.createOn}
          </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Typography
                   >
            {ItemLists.verifiedOn}
          </Typography>
           
            
          
          
          
          
          
        </Grid>
      </React.Fragment>
      
      ))}
       
              </Grid>
            </CardContent>
        </Card>
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(F04Form);
