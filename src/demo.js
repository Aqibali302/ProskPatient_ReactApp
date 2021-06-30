import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { makeStyles, useTheme, withStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import StarBorder from "@material-ui/icons/StarBorder";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HelpIcon from "./images/helpdesk.png";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Grid,
  Avatar,
  ListItemAvatar,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Paper,
  Badge
} from "@material-ui/core";
import av from "./images/1.jpg";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: "calc(100% - ${drawerWidth}px)",
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  nested: {
    marginLeft: theme.spacing.unit * 4
  },
  drawerMenu: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },

  bigAvatar: {
    margin: 10
  },
  badgeMargin: {
    margin: theme.spacing.unit * 2
  },
  inline: {
    display: "inline"
  }
}));

var colors = Highcharts.getOptions().colors,
  categories = ["Casual", "Annual", "Sick"],
  data = [
    {
      y: 15,
      color: colors[2],
      drilldown: {
        name: "Casual",
        categories: ["Available", "Taken"],
        data: [7, 8]
      }
    },
    {
      y: 24,
      color: colors[1],
      drilldown: {
        name: "Sick",
        categories: ["Available", "Taken"],
        data: [10, 14]
      }
    },
    {
      y: 15,
      color: colors[0],
      drilldown: {
        name: "Annual",
        categories: ["Available", "Taken"],
        data: [7, 8]
      }
    }
  ],
  browserData = [],
  versionsData = [],
  i,
  j,
  dataLen = data.length,
  drillDataLen,
  brightness;

// Build the data arrays
for (i = 0; i < dataLen; i += 1) {
  // add browser data
  browserData.push({
    name: categories[i],
    y: data[i].y,
    color: data[i].color
  });

  // add version data
  drillDataLen = data[i].drilldown.data.length;
  for (j = 0; j < drillDataLen; j += 1) {
    brightness = 0.2 - j / drillDataLen / 5;
    versionsData.push({
      name: data[i].drilldown.categories[j],
      y: data[i].drilldown.data[j],
      color: Highcharts.Color(data[i].color)
        .brighten(brightness)
        .get()
    });
  }
}

// Create the chart
const options = {
  chart: {
    type: "pie"
  },
  title: {
    text: "Time Off"
  },
  subtitle: {
    text: "Taken vs Available"
  },
  plotOptions: {
    pie: {
      shadow: false,
      center: ["50%", "50%"]
    }
  },
  tooltip: {
    valueSuffix: " Days"
  },
  series: [
    {
      name: "Total",
      data: browserData,
      size: "80%",
      dataLabels: {
        formatter: function() {
          return this.point.name;
        },
        color: "#ffffff",
        distance: -30
      }
    },
    {
      name: "Breakup",
      data: versionsData,
      size: "100%",
      innerSize: "80%",
      dataLabels: {
        formatter: function() {
          return "<b>" + this.point.name + ":</b> " + this.y + " Days";
        }
      },
      id: "versions"
    }
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 400
        },
        chartOptions: {
          series: [
            {
              id: "versions",
              dataLabels: {
                enabled: false
              }
            }
          ]
        }
      }
    ]
  }
};
function ChartExample(props) {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

function HelpDesk(props) {
  const classes = props.classes;
  return (
    <Card className={classes.card}>
      <CardHeader
        title={"Help Desk"}
        subheader={"Raise or Serve Requests"}
        avatar={<Avatar className={classes.bigAvatar} src={HelpIcon} />}
      />

      <CardContent
        style={{ display: "block", height: "300px", marginTop: "-20px" }}
      >
        <List>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={av} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Keyboard Issue
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Ali Connors
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={av} />
            </ListItemAvatar>
            <ListItemText
              primary="Visit Report"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Jennifer
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </CardContent>
      <Divider variant="middle" />
      <CardActions
        style={{ textAlign: "right" }}
        className={classes.actions}
        disableActionSpacing
      >
        <Button
          style={{ textTransform: "none" }}
          variant="flat"
          color="primary"
        >
          Raise Requests
        </Button>
        <Badge color="primary" badgeContent={4}>
          <Button
            style={{ textTransform: "none" }}
            variant="flat"
            color="primary"
          >
            Check Status
          </Button>
        </Badge>
      </CardActions>
    </Card>
  );
}
function CommunityFeed(props) {
  const classes = props.classes;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar className={classes.bigAvatar} src={av} />}
        title={props.employee_name}
        action={<Typography variant="caption">{props.requested_on}</Typography>}
        subheader={props.employee_designation}
      />

      <CardContent
        style={{ display: "block", height: "78px", marginTop: "-20px" }}
      >
        <Typography>{props.approval_content}</Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardActions
        style={{ textAlign: "right" }}
        className={classes.actions}
        disableActionSpacing
      >
        <Button
          style={{ textTransform: "none" }}
          variant="flat"
          color="primary"
        >
          Approve
        </Button>
        <Button
          style={{ textTransform: "none" }}
          variant="flat"
          color="primary"
        >
          Decline
        </Button>
        <Button
          style={{ textTransform: "none" }}
          variant="flat"
          color="primary"
        >
          Comment
        </Button>
      </CardActions>
    </Card>
  );
}
function ApprovalComponent(props) {
  const classes = props.classes;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar className={classes.bigAvatar} src={av} />}
        title={props.employee_name}
        action={<Typography variant="caption">{props.requested_on}</Typography>}
        subheader={props.employee_designation}
      />

      <CardContent
        style={{ display: "block", height: "78px", marginTop: "-20px" }}
      >
        <Typography>{props.approval_content}</Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardActions
        style={{ textAlign: "right" }}
        className={classes.actions}
        disableActionSpacing
      >
        <Button
          style={{ textTransform: "none" }}
          variant="flat"
          color="primary"
        >
          Approve
        </Button>
        <Button
          style={{ textTransform: "none" }}
          variant="flat"
          color="primary"
        >
          Decline
        </Button>
        <Button
          style={{ textTransform: "none" }}
          variant="flat"
          color="primary"
        >
          Comment
        </Button>
      </CardActions>
    </Card>
  );
}
function Leaves(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar aria-label="Recipe" src={av} />}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title="Danish Islam"
        subheader="Software Developer"
      />

      <CardContent>
        <ChartExample />
        <Grid xs="12" style={{ textAlign: "right" }}>
          <br />
          <Button variant="flat" color="primary">
            Request Time Off
          </Button>

          <br />
        </Grid>

        <Grid xs="12" style={{ textAlign: "left" }}>
          <Typography variant="subtitle1">
            <b>Who's Out</b>
          </Typography>
          <Typography variant="caption">
            Today
            <Grid container justify="center" alignItems="center">
              <Avatar src={av} className={classes.bigAvatar} />
              <Avatar src={av} className={classes.bigAvatar} />
              <Avatar src={av} className={classes.bigAvatar} />
            </Grid>
          </Typography>

          <Typography variant="caption">
            Tomorrow
            <Grid container justify="center" alignItems="center">
              <Avatar src={av} className={classes.bigAvatar} />
              <Avatar src={av} className={classes.bigAvatar} />
              <Avatar src={av} className={classes.bigAvatar} />
              <Avatar src={av} className={classes.bigAvatar} />
              <Avatar src={av} className={classes.bigAvatar} />
            </Grid>
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <List
      component="nav"
      subheader={<ListSubheader component="div">Menu</ListSubheader>}
      className={classes.drawerMenu}
    >
      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText inset primary="Dashboards" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText inset primary="Reports" />
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText inset primary="Starred" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary="Forms" />
      </ListItem>

      <Collapse in={false} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText inset primary="Starred" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  function handleClick() {
    setOpen(!open);
  }
  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar variant="dense" disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            University of Arts and Sciences
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <NestedList />
        <Divider />
      </Drawer>
    </div>
  );
}
function LandingDashboard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PersistentDrawerLeft />
      <main className={classes.content}>
        <div className={classes.drawerHeader} />
        <Grid container>
          <Grid xs="3">
            <Leaves />
          </Grid>

          <Grid xs="3" style={{ paddingLeft: "2%" }}>
            <HelpDesk classes={classes} />
          </Grid>
          <Grid xs="3" style={{ paddingLeft: "2%" }}>
            <ApprovalComponent
              classes={classes}
              employee_name="Muhammad Zeeshan"
              employee_designation="IT Support Engineer"
              approval_content="Annual Leave: 10/04/2019 - 17/04/2019"
              requested_on="2d"
            />
            <br />
            <ApprovalComponent
              classes={classes}
              employee_name="Haseeb Liaqat"
              employee_designation="Software Developer"
              approval_content="Sick Leave: 10/04/2019 - 14/04/2019"
              requested_on="2d"
            />
          </Grid>
          <Grid xs="3" style={{ paddingLeft: "2%" }}>
            <CommunityFeed classes={classes} />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
export default LandingDashboard;
