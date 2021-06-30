import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Avatar,
  Stepper,
  Step,
  StepButton,
  Divider,
} from "@material-ui/core";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import AccountOpeningIcon from "../images/699313-icon-42-note-add-512.png";
import BottomBar from "../BottomBar";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { green } from '@material-ui/core/colors';
import CashReceiptsIcon from "../images/cash-in-hand.png";
import GeneralLedgerIcon from "../images/cbr-financial-reporting-icon-01.png";
import ChartofAccountsIcon from "../images/021_120_layout_wireframe_grid_sitemap_structure_list_thread_2-512.png";
import CashPaymentsIcon from "../images/hand_cash_give_receive_money_payment_shop-512.png";
import GeneralJournalIcon from "../images/reports-icon.png";
import JournalVoucherIcon from "../images/icon_order-entry.png";
import BankReceiptsIcon from "../images/icon-home-direct-to-bank.png";
import TrialBalanceIcon from "../images/117980_math_512x512.png";
import RevenueCollectionIcon from "../images/380-3801594_once-we-have-created-steady-revenue-streams-and.png";
import BankPaymentsIcon from "../images/Cheque128px.png"; //Cheque128px.png
import StudentLedgerIcon from "../images/report_0.png";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Button } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, withStyles } from "@material-ui/styles";
import PrimaryAppBar from "../PrimaryAppBar";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
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
  },

  sectionDesktop: {
    display: "none",
  
  },
  sectionMobile: {
    display: "flex",

  },
  bigAvatar: {
    margin: 10
  },
  inline: {
    display: "inline"
  },
  iconSmall: {
    fontSize: 20
  },
  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px"
  }
}));

const classes = makeStyles(theme => ({
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

  inline: {
    display: "inline"
  },
  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px"
  }
}));
function getSteps() {
  return ["1", "2", "3","4","5","6","7","8"];
}

function ActionTile(props) {
  return (
    <Card
      className={classes.card}
      style={{
        margin: "0px 10px 10px 10px",
        cursor: "pointer",
        height: "100px"
      }}
      onClick={event => (window.location = props.form)}
    >
      <CardHeader
        title={<Typography color="primary">{props.title}</Typography>}
        subheader={props.subtitle}
        avatar={<Avatar className={classes.bigAvatar} src={props.icon} />}
      />
    </Card>
  );
}
function D22Dashboard() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [value, setValue] = React.useState(0);
  const steps = getSteps();
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="primary" {...props} />);
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  // handleDateChangeFrom = event => {
  //   this.setState({ selectedDateFrom: event });
  // };
  function totalSteps() {
    return steps.length;
  }

  function completedSteps() {
    return Object.keys(completed).length;
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  function allStepsCompleted() {
    return completedSteps() === totalSteps();
  }
  function NextForm(){
    window.location="#/retailer/common/F06Form";
  }
  function PrevisousForm(){
    window.location="#/retailer/common/F04Form";
  }
  function handleNext() {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  }
  
  const handleStep = step => () => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
            <PrimaryAppBar header_text={""} />
      {/* <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            width="100px"
            className={classes.center}
          >
            Medical Evaluation 
          </Typography>
          <div className={classes.grow} />
          <div>
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar> */}
      <div style={{ marginTop: "80px" }}>
        <Grid container>
          <Grid item sm={3}></Grid>
          <Grid item xs={12} sm={12}>
            <Stepper nonLinear orientation="horizontal"  activeStep={3}>
              {steps.map((label, index) => (
                <Step key={4}>
                  <StepButton onClick={handleStep(index)} >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item sm={3}></Grid>
        </Grid>
        <Card style={{ width: "100%",heigh:"300px" }}>
                <form
                // onKeyPress={this.StopEnter}
                // onSubmit={this.handleSubmit}
                autoComplete="off"
                >
              <CardContent>
                    <Grid  container spacing={8}>
                      <Grid item xs={12} align="center">
                        <Typography variant="title" color="primary">
                        </Typography>
                      </Grid>
                      <Grid item xs={12}   align="left">
                  <Typography variant="title"   style={{fontSize:"20px",fontFamily:"Arial",fontWeight:"bolder", }}>
                        Authorization for Medical Evaluation of an Adult Patient.
                    </Typography>
                  </Grid>   
                  <Grid item xs={12} sm={3}>
                    <TextField
                      // onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="FirstName"
                      label="First Name"
                      style={{ width: "90%",height:"2%" }}
                      className={classes.textFieldCard}
                      // onChange={this.label}
                      // margin="normal"
                      // error={this.state.remarks}
                      // value={this.state.label}
                      //helperText={this.state.remarks_error}
                      required
                    />

                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      // onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="LastName"
                      label="Last Name"
                      // className={classes.textFieldCard}
                      // onChange={this.description}
                      // margin="normal"
                      // error={this.state.remarks}
                      // value={this.state.description}
                      //helperText={this.state.remarks_error}
                      required

                      style={{ width: "90%",height:"2%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        keyboard
                        format={"dd/MM/yyyy"}
                        placeholder="18/10/2019"
                        label="Date Of Birth"
                        name="validFrom"
                        id="validFrom"
                        //margin="normal"
                        // error={this.state.date_valid_from}
                        // value={this.state.date_of_birth_val}
                        // helperText={this.state.date_valid_from_error}
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
                        style={{ width: "90%",height:"2%" }}
                        // onChange={this.handleDateChangeFrom}
                        // value={this.state.selectedDateFrom}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      // onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="Patient"
                      label="Patient's SSN (000-00-0000)"
                      // className={classes.textFieldCard}
                      // onChange={this.description}
                      // margin="normal"
                      // error={this.state.remarks}
                      // value={this.state.description}
                      //helperText={this.state.remarks_error}
                      required

                      style={{ width: "90%",height:"2%" }}
                    />
                  </Grid>
                  <Grid item xs={11} align="left">
                  <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            name="checkedI"
          />
        }
        label="Insurancce Card provided "
      />
                  </Grid>
                  <Grid item xs={11} align="left">
                  <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            name="checkedI"
          />
        }
        label="Policy Information provided below "
      />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      // onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="InsuranceCompany"
                      label="Insurance Company"
                      // className={classes.textFieldCard}
                      // onChange={this.description}
                      // margin="normal"
                      // error={this.state.remarks}
                      // value={this.state.description}
                      //helperText={this.state.remarks_error}
                      required

                      style={{ width: "90%",height:"2%"}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      // onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="PolicyIDNumber"
                      label="Policy ID Number"
                      // className={classes.textFieldCard}
                      // onChange={this.description}
                      // margin="normal"
                      // error={this.state.remarks}
                      // value={this.state.description}
                      //helperText={this.state.remarks_error}
                      required

                      style={{ width: "90%",height:"2%"}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      // onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="InsurancePlan/Group"
                      label="Insurance Plan/Group"
                      // className={classes.textFieldCard}
                      // onChange={this.description}
                      // margin="normal"
                      // error={this.state.remarks}
                      // value={this.state.description}
                      //helperText={this.state.remarks_error}
                      required

                      style={{ width: "90%",height:"2%"}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      // onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="NameofPolicyHolder"
                      label="Name of Policy Holder"
                      // className={classes.textFieldCard}
                      // onChange={this.description}
                      // margin="normal"
                      // error={this.state.remarks}
                      // value={this.state.description}
                      //helperText={this.state.remarks_error}
                      required

                      style={{ width: "90%",height:"2%"}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      // onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="RelationshiptoPatient"
                      label="Relationship to Patient"
                      // className={classes.textFieldCard}
                      // onChange={this.description}
                      // margin="normal"
                      // error={this.state.remarks}
                      // value={this.state.description}
                      //helperText={this.state.remarks_error}
                      required

                      style={{ width: "90%",height:"2%"}}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        keyboard
                        format={"dd/MM/yyyy"}
                        placeholder="18/10/2019"
                        label="Policy holder's Date Of Birth"
                        name="validFrom"
                        id="validFrom"
                        //margin="normal"
                        // error={this.state.date_valid_from}
                        // value={this.state.date_of_birth_val}
                        // helperText={this.state.date_valid_from_error}
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
                        style={{ width: "90%",height:"2%" }}
                        // onChange={this.handleDateChangeFrom}
                        // value={this.state.selectedDateFrom}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                  <FormControl className={classes.formControl}   style={{ width: "90%",height:"5%"}}>
                    <InputLabel id="demo-simple-select-label"
                    >Policy holder's Gender</InputLabel>
                    <Select
                     labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                     >
                        <MenuItem value={10}>Male</MenuItem>
                        <MenuItem value={20}>Female</MenuItem>
                        <MenuItem value={30}>other</MenuItem>
                        </Select>
                    </FormControl>
                  </Grid> 
                  <Grid item xs={12} sm={3}>
                    <TextField
                      // onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="PolicyHolder'sSocialSecurity"
                      label="Policy Holder's Social Security"
                      // className={classes.textFieldCard}
                      // onChange={this.description}
                      // margin="normal"
                      // error={this.state.remarks}
                      // value={this.state.description}
                      //helperText={this.state.remarks_error}
                      required

                      style={{ width: "90%",height:"2%"}}
                    />
                  </Grid>
                  <Grid item xs={12}   align="left">
                  <Typography variant="title"   style={{marginTop:"10px",fontSize:"20px",fontFamily:"Arial",fontWeight:"bolder", }}>
                        Authorization (Please read and mark each authorization below)
                    </Typography>
                  </Grid> 
                  <Grid item xs={12} align="left">
                  <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            name="checkedI"
          />
        }
        label="I authorize the submission of a claim for any services provided to me by CLINIC now, in the past, or in the future. I understand that this authorization shall remain valid without expiration unless expressly revoked by me in writing."
      />
                  </Grid>
                  <Grid item xs={12} align="left">
                  <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            name="checkedI"
          />
        }
        label="I authorize CLINIC to appeal payment denials or other adverse decisions on my behalf. I authorize and direct any holder of medical, insurance, billing or other relevant information about me to release such information to CLINIC and its billing agents, the Centers for Medicare and Medicaid Services, and/or any other payers or insurers, and their respective agents or contractors, as may be necessary to determine these or other benefits payable for any services provided to me."
      />
                  </Grid>
                  <Grid item xs={12} align="left">
                  <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            name="checkedI"
          />
        }
        label="I understand that some third-party payers may require that my medical information, including copies of treatment notes, be submitted along with requests for payment. I hereby authorize CLINIC to release all medical information necessary to secure payment of benefits from third-party payers. I understand that this information may include medical information related to drug and alcohol abuse, sexually transmitted diseases, HIV/AIDS and mental health. I authorize the use of this signature on all related submissions."
      />
                  </Grid>
                  <Grid item xs={12} align="left">
                  <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            name="checkedI"
          />
        }
        label="I authorize CLINIC to obtain medical, insurance, billing and other relevant information about me from any party, database or other source that maintains such information."
      />
                  </Grid>
                  <Grid item xs={12} align="left">
                  <Divider variant="middle" />
                  </Grid>
                </Grid>
              </CardContent>
            </form>
          </Card>
      </div>
      <BottomBar
          left_button_text="Back"
          right_button_text="Next"
          bottomRightButtonAction={NextForm}
          bottomLeftButtonAction={PrevisousForm}
        />
    </div>
  );
}

export default D22Dashboard;
