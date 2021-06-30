import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PrimaryAppBar from "../PrimaryAppBar";
import av4 from "../images/4.png";
import av5 from "../images/5.png";
import {
  Paper,
  Grid,
  ListSubheader,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Divider,
  CardActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  TextField,
  ListItemAvatar,
  Collapse
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import av3 from "../images/1.jpg";
const styles = theme => ({
  root: {
    flexGrow: 1
  }
});
function EmployeeTransfer(props) {
  const classes = props.classes;
  return (
    <Card className={classes.card}>
      <CardHeader
        title={<Typography color="primary">Employee Transfer</Typography>}
        subheader={"Danish Islam"}
        avatar={<Avatar className={classes.bigAvatar} src={av3} />}
      />

      <CardContent
        style={{
          display: "block",
          height: "62vh",
          marginTop: "-20px"
        }}
      >
        <FormGroup component="fieldset" className={classes.formControl}>
          <br />
          <Typography>Type of Transfer:</Typography>

          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            row
          >
            <FormControlLabel
              value="female"
              control={<Radio disabled />}
              label="Employee Request"
            />
            <FormControlLabel
              value="male"
              control={<Radio checked />}
              label="Career Progression"
            />
            <FormControlLabel
              value="other"
              control={<Radio disabled />}
              label="Business Requirement"
            />
            <FormControlLabel
              value="disabled"
              disabled
              control={<Radio />}
              label="Other"
            />
          </RadioGroup>
        </FormGroup>
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ width: "20%" }}>&nbsp;</td>
            <td>
              <Typography color="primary">From</Typography>
            </td>
            <td>
              <Typography color="primary">To</Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography color="primary">Department:</Typography>
            </td>
            <td>
              <TextField
                id="standard-read-only-input"
                defaultValue={"Information Technology"}
                className={classes.textField}
                InputProps={{
                  readOnly: true
                }}
              />
            </td>
            <td>
              <TextField
                id="standard-read-only-input"
                defaultValue={"Information Technology"}
                className={classes.textField}
                InputProps={{
                  readOnly: true
                }}
              />
            </td>
          </tr>

          <tr>
            <td>
              <Typography color="primary">Designation:</Typography>
            </td>
            <td>
              <TextField
                id="standard-read-only-input"
                defaultValue={"Software Developer"}
                className={classes.textField}
                InputProps={{
                  readOnly: true
                }}
              />
            </td>
            <td>
              <TextField
                id="standard-read-only-input"
                defaultValue={"Sr. Software Developer"}
                className={classes.textField}
                InputProps={{
                  readOnly: true
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Typography color="primary">window.location:</Typography>
            </td>
            <td>
              <TextField
                id="standard-read-only-input"
                defaultValue={"Head Office"}
                className={classes.textField}
                InputProps={{
                  readOnly: true
                }}
              />
            </td>
            <td>
              <TextField
                id="standard-read-only-input"
                defaultValue={"Main Campus"}
                className={classes.textField}
                InputProps={{
                  readOnly: true
                }}
              />
            </td>
          </tr>

          <tr>
            <td>
              <Typography color="primary">Salary:</Typography>
            </td>
            <td>
              <TextField
                id="standard-read-only-input"
                defaultValue={"60,000"}
                className={classes.textField}
                InputProps={{
                  readOnly: true
                }}
              />
            </td>
            <td>
              <TextField
                id="standard-read-only-input"
                defaultValue={"100,000"}
                className={classes.textField}
                InputProps={{
                  readOnly: true
                }}
              />
            </td>
          </tr>

          <tr>
            <td colSpan={3}>
              <br />
              <Typography color="primary">Approved By:</Typography>
              <List
                style={{
                  marginLeft: "-5px",
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={av4}
                      className={classes.smallAvatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        component="legend"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Muhammad Awais
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography variant="caption" >
                          Sr Software Developer
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={av5}
                      className={classes.smallAvatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        component="legend"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Muhammad Usman
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          variant="caption"
                          
                          style={{ paddingLeft: "2px" }}
                        >
                          IT Manager
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>

                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={av3}
                      className={classes.smallAvatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        component="legend"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Sohail Khan
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          variant="caption"
                          
                          style={{ paddingLeft: "2px" }}
                        >
                          Accounts Officer
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </td>
          </tr>
        </table>
      </CardContent>
      <Divider variant="middle" />
      <CardActions className={classes.actions}>
        <Button
          color={"primary"}
          style={{ marginLeft: "auto", textTransform: "none" }}
        >
          Approve
        </Button>
      </CardActions>
    </Card>
  );
}

function NewRequest(props) {
  const classes = props.classes;
  const state = props.state;
  const [selectedRequest, setState] = useState(1);
  function handleRequestClick(event, index) {
    setState(index);
  }
  return (
    <Paper
      style={{
        width: "100%",
        height: "85vh",
        maxHeight: "85vh",
        overflow: "auto",
        scrollbarWidth: "thin"
      }}
    >
      <List
        className={classes.root}
        subheader={<ListSubheader component="div">{props.title}</ListSubheader>}
      >
        <ListItem
          alignItems="flex-start"
          selected={selectedRequest === 1}
          onClick={event => handleRequestClick(event, 1)}
        >
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Employee Transfer
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

        <ListItem
          alignItems="flex-start"
          selected={selectedRequest === 3}
          onClick={event => handleRequestClick(event, 3)}
        >
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Student Transfer
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

        <ListItem
          alignItems="flex-start"
          selected={selectedRequest === 2}
          onClick={event => handleRequestClick(event, 2)}
        >
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Expense Claim
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Paper>
  );
}
function ActionAwaited(props) {
  const classes = props.classes;
  const state = props.state;
  const [selectedRequest, setState] = useState(1);
  function handleRequestClick(event, index) {
    setState(index);
  }
  return (
    <Paper
      style={{
        width: "100%",
        height: "85vh",
        maxHeight: "85vh",
        overflow: "auto",
        scrollbarWidth: "thin"
      }}
    >
      <List
        className={classes.root}
        subheader={<ListSubheader component="div">Requests</ListSubheader>}
      >
        <ListItem
          alignItems="flex-start"
          selected={selectedRequest === 1}
          onClick={event => handleRequestClick(event, 1)}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={av3} />
          </ListItemAvatar>
          <ListItemText
            primary="Danish Islam"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Employee Transfer
                </Typography>
                {" — Head Office to Main Campus"}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem
          alignItems="flex-start"
          selected={selectedRequest === 2}
          onClick={event => handleRequestClick(event, 2)}
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={av4} />
          </ListItemAvatar>
          <ListItemText
            primary="Awais Liaqat"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Expense Claim
                </Typography>
                {" — Fuel expense, Raiwind visit"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Paper>
  );
}
class InitialsScreen extends React.Component {
  state = {
    step: 0
    
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
    if (index === 2) {
      this.setState(state => ({
        InProgressOpen: !state.InProgressOpen
      }));
    }

    if (index === 1) {
      this.setState(state => ({
        ActionsOpen: !state.ActionsOpen,
        selectedDocument: index
      }));
    }
  };
  handleDocumentClick = (event, index) => {
    this.setState({ selectedDocument: index });
  };
  handleActionsClick = (event, index) => {
    this.setState(state => ({
      ActionsOpen: !state.ActionsOpen,
      selectedDocument: index
    }));
  };

  handleInProgressClick = (event, index) => {
    if (index === 2) {
      this.setState(state => ({
        InProgressOpen: !state.InProgressOpen
      }));
    }
    this.setState({ selectedIndex: index });
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PrimaryAppBar header_text={"University of Arts and Sciences"} />
        <div style={{ marginTop: "60px" }}>
          <Grid container>
            <Grid item={true} xs={6} sm={2} style={{ paddingLeft: "10px" }}>
              <Paper style={{ width: "100%", height: "85vh" }}>
                <List
                  component="nav"
                  subheader={
                    <ListSubheader component="div">Actions</ListSubheader>
                  }
                >
                  <ListItem
                    button
                    selected={this.state.selectedIndex === 0}
                    onClick={event => this.handleListItemClick(event, 0)}
                  >
                    <ListItemText
                      primary={<Typography>New Request</Typography>}
                    />
                  </ListItem>

                  <ListItem
                    button
                    selected={this.state.selectedIndex === 1}
                    onClick={event => this.handleListItemClick(event, 1)}
                  >
                    <ListItemText
                      primary={<Typography>Action Awaited</Typography>}
                    />

                    {this.state.ActionsOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse
                    in={this.state.ActionsOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="nav">
                      <ListItem
                        button
                        selected={this.state.selectedIndex === 4}
                        onClick={event => this.handleDocumentClick(event, 4)}
                      >
                        <ListItemText
                          inset
                          primary={<Typography>Employee Transfer</Typography>}
                        />
                      </ListItem>

                      <ListItem
                        button
                        selected={this.state.selectedIndex === 5}
                        onClick={event => this.handleDocumentClick(event, 5)}
                      >
                        <ListItemText
                          inset
                          primary={<Typography>Student Transfer</Typography>}
                        />
                      </ListItem>

                      <ListItem
                        button
                        selected={this.state.selectedIndex === 6}
                        onClick={event => this.handleDocumentClick(event, 6)}
                      >
                        <ListItemText
                          inset
                          primary={<Typography>Expense Claim</Typography>}
                        />
                      </ListItem>
                    </List>
                  </Collapse>

                  <ListItem
                    button
                    selected={this.state.selectedIndex === 2}
                    onClick={
                      (event => this.handleInProgressClick(event, 2),
                      event => this.handleListItemClick(event, 2))
                    }
                  >
                    <ListItemText
                      primary={<Typography>In Progress</Typography>}
                    />
                    {this.state.InProgressOpen ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItem>
                  <Collapse
                    in={this.state.InProgressOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="nav">
                      <ListItem
                        button
                        selected={this.state.selectedIndex === 4}
                        onClick={event => this.handleDocumentClick(event, 4)}
                      >
                        <ListItemText
                          inset
                          primary={<Typography>Employee Transfer</Typography>}
                        />
                      </ListItem>

                      <ListItem
                        button
                        selected={this.state.selectedIndex === 5}
                        onClick={event => this.handleDocumentClick(event, 5)}
                      >
                        <ListItemText
                          inset
                          primary={<Typography>Student Transfer</Typography>}
                        />
                      </ListItem>

                      <ListItem
                        button
                        selected={this.state.selectedIndex === 6}
                        onClick={event => this.handleDocumentClick(event, 6)}
                      >
                        <ListItemText
                          inset
                          primary={<Typography>Expense Claim</Typography>}
                        />
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
              </Paper>
            </Grid>
            <Grid item={true} xs={6} sm={3} style={{ paddingLeft: "10px" }}>
              {(() => {
                if (this.state.selectedIndex == 0) {
                  return (
                    <NewRequest
                      classes={classes}
                      state={this.state}
                      title={"New Request"}
                    />
                  );
                } else if (this.state.selectedIndex == 1) {
                  return (
                    <ActionAwaited
                      classes={classes}
                      state={this.state}
                      title={"Action Awaited"}
                    />
                  );
                }
              })()}
            </Grid>
            <Grid
              item={true}
              xs={12}
              sm={7}
              style={{ paddingLeft: "10px", paddingRight: "10px" }}
            >
              {this.state.selectedRequest == 1 ? (
                <EmployeeTransfer classes={classes} />
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

InitialsScreen.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InitialsScreen);
