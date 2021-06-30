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
import Quiz from "../images/grade_book_quiz.png";
import Assignments from "../images/grade_book_assignments.png";
import MidTerm from "../images/grade_book_mid_term.png";
import GradeBookIcon from "../images/delivery_order.png";
import HelpIcon from "../images/workfellows.png";
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  smallAvatar: {
    width: 27,
    height: 27
  },
  inline: {}
});
function GradeBook(props) {
  const classes = props.classes;

  return (
    <Card style={{ marginLeft: "-90%", marginRight: "-190%", marginTop: "10px" }}>
      {/* <CardHeader
        title={<Typography color="primary" style={{ fontSize:"25px", fontFamily:"initial"}}>Take Questionnaire</Typography>}
        avatar={<Avatar className={classes.bigAvatar} src={GradeBookIcon} />}
      />
      <CardActions style={{ textAlign: "center" }} className={classes.actions}>
        <div>
        </div>
      </CardActions> */}
    </Card>
  );
}
export default withStyles(styles)(GradeBook);
