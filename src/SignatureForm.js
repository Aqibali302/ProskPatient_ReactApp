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
  Button
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import BottomBar from "./BottomBar";
import { green } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { Line, Circle } from 'rc-progress';
import ProgressBar from 'react-animated-progress-bar';
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
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
}));

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
  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
}));
function getSteps() {
  return ["1", "2", "3", "4", "5", "6", "7", "8"];
}

function ActionTile(props) {
  return (
    <Card
      className={classes.card}
      style={{
        margin: "0px 10px 10px 10px",
        cursor: "pointer",
        height: "100px",
      }}
      onClick={(event) => (window.location = props.form)}
    >
      <CardHeader
        title={<Typography color="primary">{props.title}</Typography>}
        subheader={props.subtitle}
        avatar={<Avatar className={classes.bigAvatar} src={props.icon} />}
      />
    </Card>
  );
}
function SignatureFoem() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [value, setValue] = React.useState(0);
  const steps = getSteps();
  const classes = useStyles();
  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      "&$checked": {
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
  function NextForm() {
    window.location = "#/Consent4";
  }
  function SkipForm() {
    window.location = "#/Consent4";
  }
  function PrevisousForm() {
    window.location = "#/Consent2";
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

  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const handleMenu = (event) => {
    window.location = "#/retailer/home/";
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          {/* <IconButton color="inherit" aria-label="Menu">
            <img src={logo1} width={30} />
          </IconButton> */}
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"center"}}
          >
            Prosk™
          </Typography>
          <div className={classes.grow}/>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            style={{textAlign:"center"}}
          >
            Medicare Medicaid
          </Typography>
          <div className={classes.grow}/>
          <div>
            <IconButton color="inherit" onClick={handleMenu}>
              <HomeIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "30px" }}>
        <Card style={{ width: "100%", heigh: "10%" }}>
          <form
            // onKeyPress={this.StopEnter}
            // onSubmit={this.handleSubmit}
            autoComplete="off"
          >
            <CardContent>
              <Grid container spacing={8}>
                <Grid item xs={12} align="center">
                  <Typography variant="title" color="primary"></Typography>
                </Grid>
                <Grid item xs={12} align="left">
                  <Typography
                    variant="title"
                    style={{
                      marginTop: "10px",
                      fontSize: "20px",
                      fontFamily: "Arial",
                      fontWeight: "bolder",
                    }}
                  >
                    This authorization allow Summit Orthopaedics to submit assigned and
                    non-assigned claims on the beneficiary's behalf.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // onKeyDown={this.StopEnter}
                    //id="remarks"
                    name="NameofBeneficiary"
                    label="Name of Beneficiary"
                    style={{ width: "90%", height: "5%" }}
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
                    name="MidicareMedicalId"
                    label="Medical or Medicaid ID"
                    // className={classes.textFieldCard}
                    // onChange={this.description}
                    // margin="normal"
                    // error={this.state.remarks}
                    // value={this.state.description}
                    //helperText={this.state.remarks_error}
                    required
                    style={{ width: "90%", height: "5%" }}
                  />
                </Grid>
                <Grid item xs={12} align="left">
                  <Typography
                    variant="title"
                    style={{
                      marginTop: "10px",
                      fontSize: "18px",
                      fontFamily: "Arial",
                    }}
                  >
                    <p>
                      • I request that program of authorizes Medicare Benefits
                      be made either to me or on my behalf to the name of
                      provider of services and (or) supplier for any services
                      furnished to me by that provider of services and (or)
                      supplier.I authorizes any holder of Medical information
                      about me to release to the Center for Medicare AND
                      Medicaid Services and its agents any information needed to
                      determine these benefits or the benefits payable for
                      related services.
                    </p>
                  </Typography>
                </Grid>
                <Grid item xs={12} align="left">
                  <Divider variant="middle" />
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </div>

      <AppBar
        position="fixed"
        style={{ top: "auto", bottom: 0 }}
        color="default"
      >
        <Toolbar variant="dense">
          <Button
            variant="contained"
            color="default"
            onClick={PrevisousForm}
          >
            Back
          </Button>
          <div className={classes.grow} />
        <ProgressBar
        width="400px"
        height="16px"
        rect
        fontColor="gray"
        percentage="30"
        rectPadding="1px"
        rectBorderRadius="20px"
        trackPathColor="transparent"
        bgColor="primary"
        trackBorderColor="grey"
        defColor={{
          fair: 'teal',
          good: 'teal',
          excellent: 'teal',
          poor: 'teal',
        }}
      />
          <div className={classes.grow} />
          <Button
            variant="contained"
            color="defualt"
            onClick={SkipForm}
            style={{marginRight:"10px"}}
          >
            Skip
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={NextForm}
          >
            Next
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default SignatureFoem;
