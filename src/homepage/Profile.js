import React from "react";
import ReactDOM from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  Card,
  CardHeader,
  Button,
  Typography,
  Avatar,
  CardContent,
  Grid,
  LinearProgress,
  Divider,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Link,
  ListItemAvatar,
  ListItemSecondaryAction
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import av from "../images/1.jpg";
import av2 from "../images/2.jpg";
import av3 from "../images/3.jpg";
import av4 from "../images/4.png";
import av5 from "../images/5.png";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
const styles = theme => ({

 
  // Reproduce the Facebook spinners.

});

// Create the chart
const options = {

};
function ChartExample(props) {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
function LeaveStatus(props) {
  const classes = props.classes;

  return null;
}
export default withStyles(styles)(LeaveStatus);
