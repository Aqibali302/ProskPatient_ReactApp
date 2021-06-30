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
import HelpIcon from "../images/contract.png";
import CreateIcon from "@material-ui/icons/Create";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ScheduleIcon from "@material-ui/icons/Schedule";

import av4 from "../images/4.png";
import av5 from "../images/5.png";
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
function WorkflowsApproval(props) {
  const classes = props.classes;

  return (
    <Card style={{ marginLeft: "-90%", marginRight: "-190%", marginTop: "35%"}}>
      {/* <CardHeader
        title={<Typography color="primary" style={{ fontSize:"25px", fontFamily:"initial"}} >Provide Insurance Card</Typography>}
        avatar={<Avatar className={classes.bigAvatar} src={HelpIcon} style={{height:"50px",width:"50px"}} />}
      />
      <CardActions style={{ textAlign: "center" }} className={classes.actions}>
        <div>
        </div>
      </CardActions> */}
    </Card>
  );
}
export default withStyles(styles)(WorkflowsApproval);
