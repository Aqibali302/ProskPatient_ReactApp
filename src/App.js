import React from "react";
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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import { Link } from "@material-ui/core";
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

function LoginArea(props) {
  const { classes } = props;
  const [state, setState] = React.useState({
    checkedB: true
  });
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let url="/WaveEdu/IndexExecute";
    //let url="http://localhost/cms/authentication/C40Authenticate";
    //alert(JSON.stringify(data));
    fetch(url, {
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
            if (result.secret_key == 0) {
              props.history.push("/SetupTwoFactor/");
            } else {
              props.history.push("/MobileVerification/");
            }
          } else if (result.error == 1) {
            alert(result.error_message);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          alert(error.message);
        }
      );
  }
  function ResetPassword() {
    props.history.push("/ResetPassword/");
  }
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <DenseAppBar classes={classes} />
      <Grid>
        <Grid item xs={12}>
          <form
            onSubmit={handleSubmit}
            encType="application/json"
            
          >
            <Grid
              style={{ textAlign: "center", marginTop: "10%" }}
              item
              xs={12}
            >
              <Grid container>
                <Grid xs={5} />
                <Grid xs={2} style={{ textAlign: "center" }}>
                  <Typography
                    color="primary"
                    style={{ textAlign: "center" }}
                    variant="title"
                    style={{ marginBottom: "-1%" }}
                  >
                    Log in to <b>HSA</b>
                  </Typography>
                </Grid>
              </Grid>

              <TextField
                id="user_id"
                name="username"
                label="User ID"
                className={classes.textField}
                margin="normal"
                style={{ width: 300 }}
              />
              <br />
              <TextField
                id="password"
                name="password"
                label="Password"
                className={classes.textField}
                type="password"
                margin="normal"
                style={{ width: 300 }}
              />
              <br />
              <br />

              <Button
                style={{ marginLeft: "16em" }}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Login
              </Button>

              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleChange("checkedB")}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <br />
              <Grid container>
                <Grid xs={5} />
                <Grid xs={2}>
                  <Divider variant="middle" />
                </Grid>
              </Grid>
              <Link to={"ForgetPassword"}>
                <Button
                  color="primary"
                  variant="text"
                  style={{ textTransform: "none" }}
                  onClick={ResetPassword}
                >
                  Forgot ID or password?
                </Button>
              </Link>
              <br />
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

LoginArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginArea);
