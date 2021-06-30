import React, { useState, useCallback } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/styles";
import { useDropzone } from "react-dropzone";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PrimaryAppBar from "../PrimaryAppBar";
import BottomBar from "../BottomBar";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';


const useStyles = theme => ({
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
});




class F02FormItemList extends React.Component {
  constructor(props) { 
    super(props);
   
    this.state = {
      count:3,
      selectedDateFrom: new Date(),
      qualification_framework: false,
      qualification_framework_error: "", 
      repository: false,
      repository_error: "",
      sub_repository: false,
      sub_repository_error: "",
      instructions: false,
      instructions_error: "",
      isValid: true,
      qualification_framework_val: [],
      repository_val: "",
      sub_repository_val: "",
      instructions_val: "",
      items: [],
      answerChoiceItems : [],
      answerChoiceItemsIndex : 1,
      difficulty_level:"",
      correct_answer: -1,
      sub_choice :[]
    };
  }


  

  render() {
    
    const { classes } = this.props;
    const { items } = this.state;

    return (
          <Grid direction="row" container style={{marginLeft:"30px"}}>
            <Grid item xs={12}>
              <br/>
            </Grid>
            <Grid item={true} xs={12}>
            <Grid item xs={12} sm={3}>
                  <Typography variant="title">
                      Pepsi
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      onKeyDown={this.StopEnter}
                      label="Price"
                      className={classes.textFieldCard}
                      onChange={this.label}
                      value={this.state.price}

                    />
                  </Grid>
            </Grid>
          </Grid>
             
    );
  }
}
export default withStyles(useStyles)(F02FormItemList);
