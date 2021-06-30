import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  Typography,
  Avatar,
  Stepper,
  Step,
  StepButton
} from "@material-ui/core";
import LeavesIcon from "../images/cost_sheet.png";
import InstitutionSetupIcon from "../images/institution_setup.png";
import CampusFacilityIcon from "../images/campus_facility.png";
import FacultyIcon from "../images/faculty_school.png";
import DegreeProgramsIcon from "../images/degree_programs.png";
import QualificationFrameworkIcon from "../images/qualification_framework.png";
import SemesterSetupIcon from "../images/semester_setup.png";
import ProgramDurationIcon from "../images/program_duration.png";
import CourseDisciplinesIcon from "../images/course_discipline.png";
import DepartmentsIcon from "../images/departments.png";
import FeeStructureIcon from "../images/fee_structure.png";
import EligibleIcon from "../images/eligible_icon.png";
import ActivateSessionIcon from "../images/activate_session.png";
import ServiceFeeIcon from "../images/service_fee.png";
import SchemeOfStudyIcon from "../images/scheme_of_study.png";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from "@material-ui/styles";
import PrimaryAppBar from "../PrimaryAppBar";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import BottomBar from "../BottomBar";
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
  },
  column: {
    flexBasis: '33.33%',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  }
}));
function getSteps() {
  return ["Core Definitions", "Degree Programs", "Session Activation"];
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
  const classes = useStyles();
  const [currency, setCurrency] = React.useState('EUR');
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const currencies = [
    {
      value: 'USD',
      label: 'Male',
    },
    {
      value: 'EUR',
      label: 'Female',
    },
  ];


  return (
    <div className={classes.root}>
      <PrimaryAppBar header_text={"University College Lahore"} />
    <div style={{ marginTop: "80px" }}>
    <div>
      <div className={classes.margin}>
        <div container>
        <Card style={{ marginLeft: "0%", marginRight: "0%", marginTop: "5%",marginBottom:"20%" }}>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item>
          {<Avatar className={classes.bigAvatar} src={LeavesIcon} />}
          </Grid>
          <Grid item >
            <TextField id="input-with-icon-grid" label="First Name" style={{ marginLeft: "0%", marginRight: "0%", marginTop: "5%",marginBottom:"5%" }} />
          </Grid>
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item>
          {<Avatar className={classes.bigAvatar} src={LeavesIcon} />}
          </Grid>
          <Grid item >
            <TextField id="input-with-icon-grid" label="Last  Name" style={{ marginLeft: "0%", marginRight: "0%", marginTop: "5%",marginBottom:"5%" }} />
          </Grid>
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item>
          {<Avatar className={classes.bigAvatar} src={LeavesIcon} />}
          </Grid>
          <Grid item >
            <TextField id="Number" type="Phone Number" label="Phone#" style={{ marginLeft: "0%", marginRight: "0%", marginTop: "5%",marginBottom:"5%" }} />
          </Grid>
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item>
          {<Avatar className={classes.bigAvatar} src={LeavesIcon} />}
          </Grid>
          <Grid item >
            <TextField id="Email" label="Email" style={{ marginLeft: "0%", marginRight: "0%", marginTop: "5%",marginBottom:"5%" }} />
          </Grid>
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item>
          {<Avatar className={classes.bigAvatar} src={LeavesIcon} />}
          </Grid>
          <Grid item >
            <TextField     id="date"
    label="Birthday"
    type="date"
    // defaultValue="2017-05-24"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }} style={{ marginLeft: "0%", marginRight: "0%", marginTop: "5%",marginBottom:"5%" }} />
          </Grid>
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item>
          {<Avatar className={classes.bigAvatar} src={LeavesIcon} />}
          </Grid>
          <Grid item >
          <TextField
          id="standard-select-currency"
          select
          label="Gender"
          value={currency}
          onChange={handleChange}
          style={{ marginLeft: "0%", marginRight: "0%", marginTop: "5%",marginBottom:"5%" }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>          </Grid>
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item>
          </Grid>
          <Grid item >
        <div className={classes.column}>
            <Typography className={classes.secondaryHeading} style={{ fontSize:"25px", fontFamily:"fantasy",textAlign:"center",marginLeft:"700px"}}>Referring Physician</Typography>
          </div>          </Grid>
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item>
          {<Avatar className={classes.bigAvatar} src={LeavesIcon} />}
          </Grid>
          <Grid item >
            <TextField id="input-with-icon-grid" label="First Name" style={{ marginLeft: "0%", marginRight: "0%", marginTop: "5%",marginBottom:"5%" }} />
          </Grid>
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item>
          {<Avatar className={classes.bigAvatar} src={LeavesIcon} />}
          </Grid>
          <Grid item >
            <TextField id="input-with-icon-grid" label="Degree" style={{ marginLeft: "0%", marginRight: "0%", marginTop: "5%",marginBottom:"5%" }} />
          </Grid>
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item>
          {<Avatar className={classes.bigAvatar} src={LeavesIcon} />}
          </Grid>
          <Grid item >
            <TextField id="Number" type="Phone Number" label="TelePhone#" style={{ marginLeft: "0%", marginRight: "0%", marginTop: "5%",marginBottom:"5%" }} />
          </Grid>
        </Grid>
        </Card>
        </div>
      </div>
    </div>
    </div>
    <BottomBar
          right_button_text="Save"
        /> 
    </div>
  );
}

export default D22Dashboard;
