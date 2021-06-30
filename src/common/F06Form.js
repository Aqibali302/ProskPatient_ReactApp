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
import { spacing } from '@material-ui/system';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import AccountOpeningIcon from "../images/699313-icon-42-note-add-512.png";
import BottomBar from "../BottomBar";
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
import Box from '@material-ui/core/Box';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
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
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
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
    window.location="#/retailer/common/F05Form";
  }
  function PrevisousForm(){
    window.location="#/retailer/common/F05Form";
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
            Authorization
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
            <Stepper nonLinear orientation="horizontal"  activeStep={4}>
              {steps.map((label, index) => (
                <Step key={5}>
                  <StepButton onClick={handleStep(index)} >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item sm={3}></Grid>
        </Grid>
        <Card style={{ width: "100%",heigh:"10%" }}>
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
                  <Typography variant="title"   style={{marginTop:"10px",fontSize:"20px",fontFamily:"Arial",fontWeight:"bolder", }}>
                  Authorization to Obtain Protected Health Information (permission to obtain medical records.
                    </Typography>
                  </Grid>   
                  <Grid item xs={12}   align="left">
                    <Typography variant="title"   style={{marginTop:"10px",fontSize:"18px",fontFamily:"Arial" }}>
                    1. Authorization to Obtain Protected Health Information (permission to obtain medical records).
                    </Typography>
                  </Grid>
                  <Grid item xs={12}   align="center">
                    <Typography variant="title"   style={{marginTop:"10px",fontSize:"18px",fontFamily:"Arial" }}>
                    [ADDRESS]           
                    </Typography>
                  </Grid>
                  <Grid item xs={12}   align="left">
                    <Typography variant="title"   style={{marginTop:"10px",fontSize:"18px",fontFamily:"Arial" }}>
                    This medical information may be used by [CLINIC] for medical evaluation, treatment, consultation, billing claims or payment, or other purposes as I may direct.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}   align="left">
                    <Typography variant="title"   style={{marginTop:"10px",fontSize:"18px",fontFamily:"Arial" }}>
                    COVERING PERIOD: This Release of Information covers the period of health care from
                    </Typography>
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
        label="All past, present and future periods "
      />
                  </Grid>
                  <Grid item xs={12}   align="left">
                    <Typography variant="title"   style={{marginTop:"10px",fontSize:"18px",fontFamily:"Arial" }}>
                    or
                    </Typography>
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
        label="Past months and future months "
      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      // onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="PastMonths"
                      label="Past Months"
                      style={{ width: "90%",height:"5%" }}
                      className={classes.textFieldCard}
                      // onChange={this.label}
                      // margin="normal"
                      // error={this.state.remarks}
                      // value={this.state.label}
                      //helperText={this.state.remarks_error}
                      required
                    />

                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      // onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="FutureMonths"
                      label="Future Months"
                      style={{ width: "90%",height:"5%" }}
                      className={classes.textFieldCard}
                      // onChange={this.label}
                      // margin="normal"
                      // error={this.state.remarks}
                      // value={this.state.label}
                      //helperText={this.state.remarks_error}
                      required
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </form>
          </Card>
          <Grid item xs={12}   align="left">
                    <Typography variant="title"   style={{marginTop:"10px",fontSize:"18px",fontFamily:"initial",fontWeight:"bolder", }}>
                    Note: HIPAA Authority for Right of Access: 45 C.F.R. ยง 164.524
                    </Typography>
                  </Grid>
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
