import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo1 from "./logo1.png";
import Card from "@material-ui/core/Card";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import twofactor from "./images/two-factor.jpg";
import download_ios from "./images/download-ios.png";
import download_android from "./images/download-android.png";
import { Link, List, ListItem, ListItemText } from "@material-ui/core";
import { connect } from "react-redux";
const styles = theme => ({
  root: {
    flexGrow: 1
  },

  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

let i = 0;
function TwoFactorSendCode(props) {
  i++;
  //alert("function call");

  fetch("/WaveEdu/TwoFactorSendCode", {
    method: "POST"
  })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(
      result => {
        if (result.success == 1) {
          props.setUserInformation(result.user_email, result.user_mobile_no);
        } else if (result.error == 1) {
          alert(result.error_message);
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      error => {
        alert(error);
      }
    );
}

function TwoFactorVerifyCode(event, props) {
  event.preventDefault();
  const data = new FormData(event.target);

  fetch("/WaveEdu/TwoFactorVerifyCode", {
    method: "POST",
    body: data
  })
    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(
      result => {
        if (result.success == 1) {
          props.setUserVerified(result.secret_key);
        } else if (result.error == 1) {
          alert(result.error_message);
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      error => {
        alert(error);
      }
    );
}

function VerifyUser(props) {
  if (i == 0) {
    TwoFactorSendCode(props);
  }
  return (
    <div className={props.classes.root}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="250"
        image={twofactor}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography variant="h6" color="primary">
          Use your phone as your second sign-in step
        </Typography>
        <Typography variant="body1">
          A 5 digit code has been sent to your mobile number and email.
        </Typography>
        <form
          onSubmit={event => TwoFactorVerifyCode(event, props)}
          autoComplete="off"
        >
          <table align="center" style={{ marginTop: "2%" }}>
            <tr>
              <td>
                <TextField
                  id="verification_code"
                  name="verification_code"
                  label="Verification Code"
                  margin="normal"
                  style={{ width: 300 }}
                />
              </td>
              <td>
                <Button
                  style={{ marginLeft: "1em", marginTop: "2em" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Verify
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="caption">
                    Not received? &nbsp;
                  </Typography>
                  <Link onClick={event => TwoFactorSendCode(props)}>
                    <Typography variant="caption" color="primary">
                      {" "}
                      Resend
                    </Typography>
                  </Link>
                </div>
              </td>
            </tr>
          </table>
        </form>
        <span />
        <span />
      </CardContent>
    </div>
  );
}

function DownloadGoogleApp(props) {
  return (
    <div className={props.classes.root}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="250"
        image={twofactor}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography variant="h6" color="primary">
          Use your phone as your second sign-in step
        </Typography>
        <Typography variant="body1">
          Please download <b>Google Authenticator</b> from one of the following
          links
        </Typography>
        <table align="center" style={{ marginTop: "2%" }}>
          <tr>
            <td>
              <img src={download_ios} width="100" />
            </td>
            <td>
              <img src={download_android} width="100" />
            </td>
          </tr>
        </table>
        <span />
        <span />
      </CardContent>
    </div>
  );
}

function DenseAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="Menu">
            <img src={logo1} width={40} />
          </IconButton>
          <Typography variant="h6" color="inherit">
            UCL School of Management Sciences
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function QRCode(props) {
  return (
    <div className={props.classes.root}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="250"
        image={twofactor}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography variant="h6" color="primary">
          Use your phone as your second sign-in step
        </Typography>

        <Typography variant="body1" >
          1. Open Google Authenticator (installed in step 1) on your Mobile
        </Typography>
        <Typography variant="body1" >
          2. Tap on Scan a barcode and scan the following code <b>OR</b> Tap on
          Enter a provided key and type the following key
        </Typography>

        <form
          onSubmit={event => TwoFactorVerifyCode(event, props)}
          autoComplete="off"
        >
          <table align="center" style={{ marginTop: "2%" }}>
            <tr>
              <td colspan="2" style={{ textAlign: "center" }}>
                <img
                  src={
                    "https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/WaveEdu?secret=" +
                    props.state.secret_key +
                    "&issuer=Example"
                  }
                ></img>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <TextField
                  id="secret_key"
                  name="secret_key"
                  margin="normal"
                  value={props.state.secret_key}
                  style={{ width: 300 }}
                />
              </td>
            </tr>
          </table>
        </form>
        <span />
        <span />
      </CardContent>
    </div>
  );
}

class SetupTwoFactor extends React.Component {
  state = {
    step: 1,
    is_user_verified: 0,
    user_email: "",
    user_mobile_no: "",
    secret_key: ""
  };
  handleNextClick = (event, index) => {
    if (index == 4) {
      this.props.history.push("/");
    } else {
      this.setState(state => ({
        step: index
      }));
    }
  };
  setUserInformation = (email, mobile) => {
    this.setState(state => ({
      user_email: email,
      user_mobile_no: mobile
    }));
    //alert(this.state.user_email);
  };
  setUserVerified = val => {
    this.setState(state => ({
      is_user_verified: 1,
      secret_key: val
    }));
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <DenseAppBar classes={classes} />
        <Grid>
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card
                className={classes.card}
                style={{ marginTop: "2%", width: "90vh" }}
              >
                {(() => {
                  if (this.state.step == 1) {
                    return <DownloadGoogleApp classes={classes} />;
                  } else if (this.state.step == 2) {
                    return (
                      <VerifyUser
                        setUserVerified={this.setUserVerified}
                        setUserInformation={this.setUserInformation}
                        state={this.state}
                        classes={classes}
                      />
                    );
                  } else if (this.state.step == 3) {
                    return (
                      <QRCode
                        setUserVerified={this.setUserVerified}
                        setUserInformation={this.setUserInformation}
                        state={this.state}
                        classes={classes}
                      />
                    );
                  }
                })()}

                <CardActions>
                  <div style={{ textAlign: "right", width: "100vh" }}>
                    <Button
                      disabled={
                        !this.state.is_user_verified && this.state.step == 2
                      }
                      variant="contained"
                      onClick={event =>
                        this.handleNextClick(event, this.state.step + 1)
                      }
                      size="small"
                      color="primary"
                    >
                      {this.state.step == 3 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SetupTwoFactor);
