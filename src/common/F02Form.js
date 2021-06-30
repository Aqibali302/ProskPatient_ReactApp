import React, { useState, useCallback } from "react";
import deburr from "lodash/deburr";
import { withStyles } from "@material-ui/styles";

import InputMask from "react-input-mask";
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
//import Autocomplete from '@material-ui/lab/Autocomplete';
import F02FormItemList from './F02FormItemList'

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
let suggestions = [];

let course_code_data = [];
let course_account_data = [];
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


class F02Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      record_id: this.props.record_id,
      isValid: true,

      selectedDateFrom: new Date(),
      date_valid_from: "",
      label: "",


      name: "",
      ItemList: [],

    };

    localStorage.setItem("url", "http://ep.pbc.com.pk:8080");
  }

  submitForm(event) {
    document.getElementById("submit-button").click();

  }
  componentDidMount() {
    this.getItems();
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
  label = event => {
    this.setState({
      label: event.target.value
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
  getItems(){

   // let ItemsList = [];
    let url = localStorage.getItem('url') + "/retailer/common/C02CatalogProductsView";
    fetch(url, {
      method: "POST",
      headers: new Headers({

        'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzAxNzE4ODU0NiIsImV4cCI6MTYxNTI5OTY4OCwiaWF0IjoxNTgzODQ0NTczfQ.odlEWBk4DZnhossVNP4BvyLp9hoDVTwVh1llwMk3qiiSuRHkIOcHpnuYGFBqE8ilvZyJJbov5LtVFADcKmYjJg",
      })
    })
      .then(res => res.json())
      .then(
        (json) => {
          if (json.CODE === 1) {
            for (var i = 0; i < json.DATA.length; i++) {
              this.setState({
                ItemList: this.state.ItemList.concat([{ name: json.DATA[i].label,id: json.DATA[i].id }])
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
                      F02 -  Product Price List
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="label"
                      label="Label"
                      className={classes.textFieldCard}
                      onChange={this.label}
                      // margin="normal"
                      // error={this.state.remarks}
                      value={this.state.label}
                      //helperText={this.state.remarks_error}
                      // required

                      style={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        keyboard
                        format={"dd/MM/yyyy"}
                        placeholder="18/10/2019"
                        label="Valid From"
                        name="validFrom"
                        id="validFrom"
                        //margin="normal"
                        error={this.state.date_valid_from}
                        // value={this.state.date_of_birth_val}
                        helperText={this.state.date_valid_from_error}
                        required
                        mask={value =>
                          // handle clearing outside if value can be changed outside of the component
                          value
                            ? [
                              /\d/,
                              /\d/,
                              "/",
                              /\d/,
                              /\d/,
                              "/",
                              /\d/,
                              /\d/,
                              /\d/,
                              /\d/
                            ]
                            : []
                        }
                        disableOpenOnEnter
                        animateYearScrolling={false}
                        style={{ width: "100%" }}
                        onChange={this.handleDateChangeFrom}
                        value={this.state.selectedDateFrom}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>



                  {this.state.ItemList.map((ItemLists, idx) => (
          
          <React.Fragment key={idx}>
          <Grid item={true} sm={12} xs={12}>
            <Grid item xs={12} sm={12}>
              <Typography variant="title" 
                     >
              {ItemLists.name}
            </Typography>
            <TextField
                label="Price"
                name="productPrice"
                    defaultValue="0"
                style={{ width: "50%" }}
              />
              <TextField
                label="Gross Price"
                name="grossPrice"

                defaultValue="0"
                style={{ width: "50%" }}
              />
              <TextField
              type={'hidden'}
              value={ItemLists.id}
              name="productId"
            />
            </Grid>
            
          </Grid>
        </React.Fragment>
        ))}

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
export default withStyles(useStyles)(F02Form);
