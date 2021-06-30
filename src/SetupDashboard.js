import React from "react";
import ItemsCarousel from "react-items-carousel";
import range from "lodash/range";
import LeaveStatus from "./homepage/Profile";
import {
  Grid,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Avatar,
  LinearProgress,
  CardActions,
  Tooltip,
  Badge,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepButton
} from "@material-ui/core";
import PrimaryAppBar from "./PrimaryAppBar";
import LeavesIcon from "./images/leaves.png";
import InstitutionSetupIcon from "./images/institution_setup.png";
import CampusFacilityIcon from "./images/campus_facility.png";
import FacultyIcon from "./images/faculty_school.png";
import DegreeProgramsIcon from "./images/degree_programs.png";
import QualificationFrameworkIcon from "./images/qualification_framework.png";
import SemesterSetupIcon from "./images/semester_setup.png";
import ProgramDurationIcon from "./images/program_duration.png";
import CourseDisciplinesIcon from "./images/course_discipline.png";
import DepartmentsIcon from "./images/departments.png";

import { makeStyles, withStyles } from "@material-ui/styles";

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
  return ["Core Definitions", "Academic Definitions", "Qualification Setup"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <Grid container>
          <Grid item xs={12} sm={12} container style={{ alignItems: "center" }}>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F01Form/0"
                view="#F01Reports"
                title="Institution Setup"
                subtitle="Details of Institution"
                icon={InstitutionSetupIcon}
                introduction="Enter the details of your institution like name, short name, logo and
                others. Details provided in that form will be used globally in the
                whole application."
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F02Form/0"
                view="#F02Reports"
                title="Campus Facility"
                subtitle="Define campus facilities"
                icon={CampusFacilityIcon}
                introduction="Define campus facilities like Head Office, Campus or playground etc. Enter the name, address and GPS coordinates of facility."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F03Form/0"
                view="#F03Reports"
                title="Faculty / School"
                subtitle="Define faculty / school"
                icon={FacultyIcon}
                introduction="Add faculty/schools with their respective date of approval, approved by and attach meeting minutes."
              />
            </Grid>
          </Grid>
        </Grid>
      );
    case 1:
      return (
        <Grid container>
          <Grid item xs={12} sm={12} container style={{ alignItems: "center" }}>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F04Form/0"
                view="#F04Reports"
                title="Departments"
                subtitle="Add departments"
                icon={LeavesIcon}
                introduction="Add departments with their respective date of approval, approved by and attach meeting minutes."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F05Form/0"
                view="#F05Reports"
                title="Degree Duration"
                subtitle="Define degree program duration"
                icon={LeavesIcon}
                introduction="Define degree programs with duration."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F06Form/0"
                view="#F06Reports"
                title="Degree Semesters"
                subtitle="Define degree program semesters"
                icon={LeavesIcon}
                introduction="Define number of semesters of degree programs"
              />
            </Grid>
          </Grid>
        </Grid>
      );
    case 2:
      return (
        <Grid container>
          <Grid item xs={12} sm={12} container style={{ alignItems: "center" }}>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F07Form/0"
                view="#F07Reports"
                title="Qualification Framework"
                subtitle="Define qualification framework"
                icon={LeavesIcon}
                introduction="Enter qualification frameworks. Provide level number, name, short name, equivalance and degree type."
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F08Form/0"
                view="#F08Reports"
                title="Degree Programs"
                subtitle="Define degree programs"
                icon={DegreeProgramsIcon}
                introduction="Define degree programs. Enter degree name, short name, date of approval, approved by and upload meeting minutes."
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F09Form/0"
                view="#F09Reports"
                title="Course Discipline"
                subtitle="Define course discipline"
                icon={LeavesIcon}
                introduction="Enter course discplines. Provide each discipline's name and short name."
              />
            </Grid>
          </Grid>
        </Grid>
      );
    default:
      return "Unknown step";
  }
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

      {/** 
      <CardActions style={{ textAlign: "center" }} className={classes.actions}>
        <Button
          color="inherit"
          avariant="contained"
          onClick={event => (window.location = props.view)}
        >
          View
        </Button>
        <Button
          color="primary"
          avariant="contained"
          onClick={event => (window.location = props.form)}
        >
          Add
        </Button>
      </CardActions>
      */}
    </Card>
  );
}
function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();
  const classes = useStyles();
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
      <PrimaryAppBar header_text={"University College Lahore"} />
      <div style={{ marginTop: "80px" }}>
        <Grid container>
          <Grid item sm={3}></Grid>
          <Grid item xs={12} sm={12}>
            <Stepper nonLinear orientation="horizontal">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton onClick={handleStep(index)} active={true}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item sm={3}></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} container style={{ alignItems: "center" }}>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F01Form/0"
                view="#F01Reports"
                title="Institution"
                subtitle="Provide name, introduction and logo of the institution to personalize views throughout the application."
                icon={InstitutionSetupIcon}
                introduction=""
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F05Form/0"
                view="#F05Reports"
                title="Degree Program Duration"
                subtitle="List all approved durations of degree programs being offered."
                icon={ProgramDurationIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F03Form/0"
                view="#F03Reports"
                title="Faculty and Schools"
                subtitle="Define faculties or schools under which degree programs are being offered."
                icon={FacultyIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F02Form/0"
                view="#F02Reports"
                title="Campus and Facilities"
                subtitle="Define campus and facilities (e.g. Head Office, City Campus) with address and GPS coordinates."
                icon={CampusFacilityIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F06Form/0"
                view="#F06Reports"
                title="Semester Setup"
                subtitle="List approved number of semesters in the degree programs being offered."
                icon={SemesterSetupIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F08Form/0"
                view="#F08Reports"
                title="Degree Programs"
                subtitle="Define approved degree programs in every faculty / school"
                icon={DegreeProgramsIcon}
                introduction=""
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F04Form/0"
                view="#F04Reports"
                title="Departments"
                subtitle="List academic departments. Do not list administrative departments (e.g. HR, Accounts)"
                icon={DepartmentsIcon}
                introduction=""
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F09Form/0"
                view="#F09Reports"
                title="Course Disciplines"
                subtitle="Course discplines are associated with each course in a study scheme and it helps categorize courses."
                icon={CourseDisciplinesIcon}
                introduction=""
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                form="#F07Form/0"
                view="#F07Reports"
                title="Qualification Framework"
                subtitle="HEC qualification frameworks applicable on degree programs being offered."
                icon={QualificationFrameworkIcon}
                introduction=""
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

{
  /**
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
  }
}));
function ActionTile(props) {
  return (
    <Card
      className={classes.card}
      style={{
        margin: "0px 10px 10px 10px"
      }}
    >
      <CardHeader
        title={<Typography color="primary">{props.title}</Typography>}
        subheader={props.subtitle}
        avatar={<Avatar className={classes.bigAvatar} src={props.icon} />}
      />

      <CardContent
        style={{
          display: "block",
          height: "100px"
        }}
      >
        <Typography color="textPrimary">{props.introduction}</Typography>
      </CardContent>
      <Divider variant="middle" />

      <CardActions style={{ textAlign: "center" }} className={classes.actions}>
        <Button color="inherit" avariant="contained">
          View
        </Button>
        <Button color="primary" avariant="contained">
          Add
        </Button>
      </CardActions>
    </Card>
  );
}
function HomePage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PrimaryAppBar header_text={"University College Lahore"} />
      <div style={{ marginTop: "80px" }}>
        <Grid container>
          <Grid item xs={12} sm={12} container style={{ alignItems: "center" }}>
            <Grid item xs={12} sm={4}>
              <ActionTile
                title="Institution Setup"
                subtitle="Details of Institution"
                icon={LeavesIcon}
                introduction="Enter the details of your institution like name, short name, logo and
                others. Details provided in that form will be used globally in the
                whole application."
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                title="Campus Facility"
                subtitle="Define campus facilities"
                icon={LeavesIcon}
                introduction="Define campus facilities like Head Office, Campus or playground etc. Enter the name, address and GPS coordinates of facility."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                title="Faculty / School"
                subtitle="Define faculty / school"
                icon={LeavesIcon}
                introduction="Add faculty/schools with their respective date of approval, approved by and attach meeting minutes."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                title="Departments"
                subtitle="Add departments"
                icon={LeavesIcon}
                introduction="Add departments with their respective date of approval, approved by and attach meeting minutes."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                title="Degree Duration"
                subtitle="Define degree program duration"
                icon={LeavesIcon}
                introduction="Define degree programs with duration."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ActionTile
                title="Degree Semesters"
                subtitle="Define degree program semesters"
                icon={LeavesIcon}
                introduction="Define number of semesters of degree programs"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                title="Qualification Framework"
                subtitle="Define qualification framework"
                icon={LeavesIcon}
                introduction="Enter qualification frameworks. Provide level number, name, short name, equivalance and degree type."
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                title="Degree Programs"
                subtitle="Define degree programs"
                icon={LeavesIcon}
                introduction="Define degree programs. Enter degree name, short name, date of approval, approved by and upload meeting minutes."
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <ActionTile
                title="Course Discipline"
                subtitle="Define course discipline"
                icon={LeavesIcon}
                introduction="Enter course discplines. Provide each discipline's name and short name."
              />
            </Grid>
          </Grid>
        </Grid>
        <br />
      </div>
    </div>
  );
}
 */
}
export default HorizontalNonLinearStepper;
