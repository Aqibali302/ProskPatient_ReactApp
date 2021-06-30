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


class F03Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      record_id: this.props.record_id,
      isValid: true,

      selectedDateFrom: new Date(),
      date_valid_from: "",
      MobileNumber: "",
      BarcodeNumber: "",


      name: "",
      ItemList: [],

    };

    localStorage.setItem("url", "http://ep.pbc.com.pk:8080");
  }

  submitForm(event) {
    document.getElementById("submit-button").click();

  }
 
  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
console.log(data);
    let url = localStorage.getItem('url') + "/retailer/common/C02CatalogProductsSellersPricesSave";
    fetch(url, {
      method: "POST",
      body: data,
      headers: new Headers({

        'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzAxNzE4ODU0NiIsImV4cCI6MTYxNTI5OTY4OCwiaWF0IjoxNTgzODQ0NTczfQ.odlEWBk4DZnhossVNP4BvyLp9hoDVTwVh1llwMk3qiiSuRHkIOcHpnuYGFBqE8ilvZyJJbov5LtVFADcKmYjJg",
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
          alert(result.CODE);
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
  MobileNumber = event => {
    this.setState({
      MobileNumber: event.target.value
    });
  };
  BarcodeNumber = event => {
    this.setState({
        BarcodeNumber: event.target.value
    });
  };

  handleDateChangeFrom = event => {
    this.setState({ selectedDateFrom: event });
  };

  handleDownshiftChange = event => {
    alert(event.target.value);
    //this.setState({ semester_value: event.target.value });
  };
  
  

  handleDateChangeFrom = event => {
    this.setState({ selectedDateFrom: event });
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
                      F03 -  Invoice Verification
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="MobileNumber"
                      label="Mobile#"
                      className={classes.textFieldCard}
                      onChange={this.MobileNumber}
                      // margin="normal"
                      // error={this.state.remarks}
                      value={this.state.MobileNumber}
                      //helperText={this.state.remarks_error}
                      // required

                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                      onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="BarcodeNumber"
                      label="Barcode#"
                      className={classes.textFieldCard}
                      onChange={this.BarcodeNumber}
                      // margin="normal"
                      // error={this.state.remarks}
                      value={this.state.BarcodeNumber}
                      //helperText={this.state.remarks_error}
                      // required

                      style={{ width: "100%" }}
                    />
                  </Grid>



                </Grid>
              </CardContent>
            </form>
          </Card>

        </div>

        <BottomBar
          left_button_text="View"
          right_button_text="Save"
          bottomRightButtonAction={this.submitForm}
        />
      </div>
    );
  }
}
export default withStyles(useStyles)(F03Form);
