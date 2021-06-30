import React from "react";
import ReactDOM from "react-dom";
import {
  Card,
  ListGroup,
  CardHeader,
  Divider,
  CardActions,
  Typography,
  Avatar,
  CardContent,
  Badge,
  IconButton,
  withStyles,
  Tooltip,
  LinearProgress,
  ListItemText,
  List,
  ListItem,
  ListItemAvatar,
} from "@material-ui/core";
import HelpIcon from "../images/contract.png";
import CommunityIcon from "../images/packing_list.png";
import GradeBookIcon from "../images/delivery_order.png";
import MyObjectivesIcon from "../images/invoice.png";
import LeavesIcon from "../images/cost_sheet.png";
import CreateIcon from "@material-ui/icons/Create";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ScheduleIcon from "@material-ui/icons/Schedule";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import av from "../images/1.jpg";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: "#00695c",
  },
  linearColorPrimary: {
    backgroundColor: "#b2dfdb",
  },
  linearBarColorPrimary: {
    backgroundColor: "#00695c",
  },
  // Reproduce the Facebook spinners.

  facebook1: {
    color: "#eef3fd",
  },
  facebook2: {
    color: "#6798e5",
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  smallAvatar: {
    width: 27,
    height: 27,
  },
});
function LeavesApproval(props) {
  const classes = props.classes;
  const [completed, setCompleted] = React.useState(50);
  const [buffer, setBuffer] = React.useState(100);
  const handleListItemClick = (event) => {
    window.location = "#/retailer/D33Dashboard";
  };
  const handleListItemClick2 = (event) => {
    window.location = "#/retailer/common/F01Form";
  };
  return (
    <Card
      style={{ marginLeft: "-190%", marginRight: "-90%", marginTop: "15%" }}
    >
      <List className={classes.root}>
        <Card
          style={{ marginLeft: "0%", marginRight: "-10%", marginTop: "15px" }}
        >
          <ListItem button onClick={(event) => handleListItemClick(event)}>
            <ListItemText>
              <CardHeader
                title={
                  <Typography
                    color="primary"
                    style={{ fontSize: "25px", fontFamily: "initial" }}
                  >
                    Provide ID Card
                  </Typography>
                }
                avatar={
                  <Avatar className={classes.bigAvatar} src={LeavesIcon} />
                }
              />
            </ListItemText>
          </ListItem>
        </Card>
        <Card
          style={{ marginLeft: "0%", marginRight: "-10%", marginTop: "15px" }}
        >
          <ListItem button onClick={(event) => handleListItemClick2(event)}>
            <ListItemText>
              <CardHeader
                title={
                  <Typography
                    color="primary"
                    style={{ fontSize: "25px", fontFamily: "initial" }}
                  >
                    Provide Insurance Card
                  </Typography>
                }
                avatar={
                  <Avatar
                    className={classes.bigAvatar}
                    src={HelpIcon}
                    style={{ height: "50px", width: "50px" }}
                  />
                }
              />
            </ListItemText>
          </ListItem>
        </Card>
        <Card
          style={{ marginLeft: "0%", marginRight: "-10%", marginTop: "15px" }}
        >
          <ListItem
          // button
          // onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText>
              <CardHeader
                title={
                  <Typography
                    color="primary"
                    style={{ fontSize: "25px", fontFamily: "initial" }}
                  >
                    Sign Consents
                  </Typography>
                }
                avatar={
                  <Avatar className={classes.bigAvatar} src={CommunityIcon} />
                }
              />
            </ListItemText>
          </ListItem>
        </Card>
        <Card
          style={{ marginLeft: "0%", marginRight: "-10%", marginTop: "15px" }}
        >
          <ListItem
          // button
          // onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText>
              <CardHeader
                title={
                  <Typography
                    color="primary"
                    style={{ fontSize: "25px", fontFamily: "initial" }}
                  >
                    Take Questionnaire
                  </Typography>
                }
                avatar={
                  <Avatar className={classes.bigAvatar} src={GradeBookIcon} />
                }
              />
            </ListItemText>
          </ListItem>
        </Card>
        <Card
          style={{ marginLeft: "0%", marginRight: "-10%", marginTop: "15px" }}
        >
          <ListItem
          // button
          // onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemText>
              <CardHeader
                title={
                  <Typography
                    color="primary"
                    style={{ fontSize: "25px", fontFamily: "initial" }}
                  >
                    Medical History
                  </Typography>
                }
                avatar={
                  <Avatar
                    className={classes.bigAvatar}
                    src={MyObjectivesIcon}
                  />
                }
              />
            </ListItemText>
          </ListItem>
        </Card>
        <Card
          style={{ marginLeft: "0%", marginRight: "-10%", marginTop: "15px" }}
        >
          <ListItem
          // button
          // onClick={(event) => handleListItemClick(event, 5)}
          >
            <ListItemText>
              <CardHeader
                title={
                  <Typography
                    color="primary"
                    style={{ fontSize: "25px", fontFamily: "initial" }}
                  >
                    Medications
                  </Typography>
                }
                avatar={
                  <Avatar
                    className={classes.bigAvatar}
                    src={MyObjectivesIcon}
                  />
                }
              />
            </ListItemText>
          </ListItem>
        </Card>
        <Card
          style={{ marginLeft: "0%", marginRight: "-10%", marginTop: "15px" }}
        >
          <ListItem
          // button
          // onClick={(event) => handleListItemClick(event, 6)}
          >
            <ListItemText>
              <CardHeader
                title={
                  <Typography
                    color="primary"
                    style={{ fontSize: "25px", fontFamily: "initial" }}
                  >
                    Allergies
                  </Typography>
                }
                avatar={<Avatar className={classes.bigAvatar} src={HelpIcon} />}
              />
            </ListItemText>
          </ListItem>
        </Card>
      </List>
    </Card>
    // <Card style={{ marginLeft: "-190%", marginRight: "-90%", marginTop: "8%" }}>
    //   <CardHeader
    //     title={<Typography color="primary" style={{ fontSize:"25px", fontFamily:"initial"}}>Provide ID Card</Typography>}
    //     avatar={<Avatar className={classes.bigAvatar} src={LeavesIcon} />}
    //   />

    //   <CardActions style={{ textAlign: "center" }} className={classes.actions}>
    //     <div>
    //     </div>
    //   </CardActions>
    // </Card>
  );
}
export default withStyles(styles)(LeavesApproval);
