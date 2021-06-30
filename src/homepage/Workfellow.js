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
  Badge,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  withStyles,
  Tooltip
} from "@material-ui/core";
import av2 from "../images/2.jpg";
import av3 from "../images/3.jpg";
import HelpIcon from "../images/documents.png";
import CreateIcon from "@material-ui/icons/Create";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ScheduleIcon from "@material-ui/icons/Schedule";
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
  }
});
function HelpDesk(props) {
  const classes = props.classes;

  return (
    <Card style={{ marginLeft: "-290%", marginRight: "10%", marginTop: "60%" }}>
      {/* <CardHeader
        title={<Typography color="primary"style={{ fontSize:"25px", fontFamily:"initial"}}>Allergies</Typography>}
        avatar={<Avatar className={classes.bigAvatar} src={HelpIcon} />}
      />
      <CardActions style={{ textAlign: "center" }} className={classes.actions}>
        <div>
        </div>
      </CardActions> */}
    </Card>
  );
}
export default withStyles(styles)(HelpDesk);
