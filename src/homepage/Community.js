import React from "react";
import ReactDOM from "react-dom";
import {
  Card,
  CardHeader,
  Divider,
  CardActions,
  Button,
  Typography,
  Avatar,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  withStyles,
  Tooltip,
  Badge
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ScheduleIcon from "@material-ui/icons/Schedule";
import av3 from "../images/3.jpg";
import Quiz from "../images/grade_book_quiz.png";
import Assignments from "../images/my_objectives_training.png";
import MidTerm from "../images/grade_book_mid_term.png";
import CommunityIcon from "../images/packing_list.png";
import ModuleIcon from "../images/my_objectives_module.png";
import av4 from "../images/4.png";
import av5 from "../images/5.png";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  smallAvatar: {
    width: 100,
    height: 100
  }
  
});
function Community(props) {
  const classes = props.classes;
  return (
    <Card style={{ marginLeft: "-290%", marginRight: "40px", marginTop: "65%" }}>
      {/* <CardHeader
        title={<Typography color="primary" style={{ fontSize:"25px", fontFamily:"initial"}}>Sign Consents</Typography>}
        avatar={<Avatar className={classes.bigAvatar} src={CommunityIcon}  />}
      />
      <CardActions style={{ textAlign: "center" }} className={classes.actions}>
        <div>

        </div>
      </CardActions> */}
    </Card>
  );
}
export default withStyles(styles)(Community);
