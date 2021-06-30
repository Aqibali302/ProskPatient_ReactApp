import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Avatar,
  Stepper,
  Step,
  StepButton
} from "@material-ui/core";
import AccountOpeningIcon from "../images/699313-icon-42-note-add-512.png";
import CashReceiptsIcon from "../images/cash-in-hand.png";
import GeneralLedgerIcon from "../images/cbr-financial-reporting-icon-01.png";
import ChartofAccountsIcon from "../images/021_120_layout_wireframe_grid_sitemap_structure_list_thread_2-512.png";
import CashPaymentsIcon from "../images/hand_cash_give_receive_money_payment_shop-512.png";
import GeneralJournalIcon from "../images/reports-icon.png";
import JournalVoucherIcon from "../images/icon_order-entry.png";
import BankReceiptsIcon from "../images/icon-home-direct-to-bank.png";
import TrialBalanceIcon from "../images/117980_math_512x512.png";
import RevenueCollectionIcon from "../images/380-3801594_once-we-have-created-steady-revenue-streams-and.png";
import BankPaymentsIcon from "../images/Cheque128px.png"; //Cheque128px.png
import StudentLedgerIcon from "../images/report_0.png";
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from "@material-ui/styles";
import PrimaryAppBar from "../PrimaryAppBar";
import BottomBar from "../BottomBar";
import StepLabel from '@material-ui/core/StepLabel';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { useDropzone } from "react-dropzone";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
  return ["Front ID Card", "Back ID Card"];
}

function D22Dashboard() {
  const classes = useStyles();
  function MyDropzone() {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  
    const files = acceptedFiles.map(file => (
      <Typography variant="caption" color="primary">
        
        {file.path} - {file.size} bytes
        <input type="hidden" name="file_name" id="file_name" value={file.path}></input>
      </Typography>
    ));
    let msg = files;
    if (files == "") {
      msg = "Front ID Card";
    }
    return (
      <div
        // style={{ textAlign: "center" }}
        {...getRootProps({ className: "dropzone" })}
      >
        <Card style={{ backgroundColor: "#c7c7c7" }}>
          <CardContent>
            <input name="contained-button-file" {...getInputProps()} />
            {msg}
          </CardContent>
        </Card>
      </div>
    );
  }
  function MyDropzone2() {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  
    const files = acceptedFiles.map(file => (
      <Typography variant="caption" color="primary">
        
        {file.path} - {file.size} bytes
        <input type="hidden" name="file_name" id="file_name" value={file.path}></input>
      </Typography>
    ));
    let msg = files;
    if (files == "") {
      msg = "Back ID Card";
    }
    return (
      <div
        // style={{ textAlign: "center" }}
        {...getRootProps({ className: "dropzone" })}
      >
        <Card style={{ backgroundColor: "#c7c7c7" }}>
          <CardContent>
            <input name="contained-button-file" {...getInputProps()} />
            {msg}
          </CardContent>
        </Card>
      </div>
    );
  }


  return (
    <div className={classes.root}>
      <PrimaryAppBar header_text={"University College Lahore"} />
      <div style={{ marginTop: "80px" }}>
        <Card style={{ marginLeft: "-0%", marginRight: "-0%", marginTop: "5%" }}>
        <List className={classes.root}>
      <ListItem>
      <MyDropzone/>
      </ListItem>
    </List>
        </Card>
        <Card style={{ marginLeft: "-0%", marginRight: "-0%", marginTop: "5%" }}>
        <List className={classes.root}>
      <ListItem>
      <MyDropzone2/>
      </ListItem>
    </List>
        </Card>
      </div>
       <BottomBar
          right_button_text="Save"
        /> 
    </div>
  );
}

export default D22Dashboard;
