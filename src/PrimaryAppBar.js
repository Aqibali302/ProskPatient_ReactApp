import React from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import logo1 from "./logo1.png";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import Info from "@material-ui/icons/Info";
import Dashboard from "@material-ui/icons/Dashboard";
import Input from "@material-ui/icons/Input";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import classNames from "classnames";
import SettingsIcon from "@material-ui/icons/Settings";
import LockIcon from "@material-ui/icons/Lock";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {
  Drawer,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Collapse,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: "none",
  },
  leftIcon: {

  },
  rightIcon: {

  },
  iconSmall: {
    fontSize: 10
  }
}));

function NestedList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dashboard, setOpenDashboard] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function handleClickDashboard() {
    setOpenDashboard(!dashboard);
  }
  const menu1 = [
    { label: "Reset Verification Code", short_label: "F04", action: "#/common/F04Form/" },
   // { label: "Student List", short_label: "R101", action: "#/R101" }
  ];

  localStorage.setItem("features", JSON.stringify(menu1));
  const menu = JSON.parse(localStorage.getItem("features"));
  function openAction(props, action) {
    props.handleDrawerClose();
    window.location = action;
  }
  const items = menu.map(item => (
    <ListItem
    key={item.short_label}
      button
      className={classes.nested}
      onClick={event => openAction(props, item.action)}
      
    >
      <ListItemText
        inset
        key={item.short_label}
        primary={
          <Typography color="textPrimary" variant="body1">
            {item.short_label + " - " + item.label}
          </Typography>
        }
      />
    </ListItem>
  ));

  return (
    <div>
      <center>
        <TextField
          id="faculty_name"
          name="faculty_name"
          label="Search"
          margin="normal"
          style={{ textAlign: "center", width: "90%" }}
          type="search"
        />
      </center>
      <List
        style={{ width: 300 }}
        //subheader={Menu}
        className={classes.drawerMenu}
      >
        <ListItem button onClick={handleClickDashboard}>
          <ListItemText primary={"Dashboards"} />
          {dashboard ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={dashboard} timeout="auto" unmountOnExit>
          <List component="div">
            {/* <ListItem
              button
              className={classes.nested}
              onClick={event => openAction(props, "#SetupDashboard")}
            >
              <ListItemText
                inset
                key={1485}
                primary={
                  <Typography color="textPrimary" variant="body1">
                    D01 - Institution Setup
                  </Typography>
                }
              />
            </ListItem> */}

            {/* <ListItem
              button
              className={classes.nested}
              onClick={event => openAction(props, "#D22Dashboard")}
            >
              <ListItemText
                inset
                key={1485}
                primary={
                  <Typography color="textPrimary" variant="body1">
                    D22 - Academic Session
                  </Typography>
                }
              />
            </ListItem> */}
            {/* <ListItem
              button
              className={classes.nested}
              onClick={event => openAction(props, "#D33Dashboard")}
            >
              <ListItemText
                inset
                key={1485}
                primary={
                  <Typography color="textPrimary" variant="body1">
                    D33 - Accounts
                  </Typography>
                }
              />
            </ListItem> */}
          </List>
        </Collapse>
        <ListItem button onClick={handleClick}>
          <ListItemText primary={"Forms"} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">{items}</List>
        </Collapse>

        <ListItem button>
          <ListItemText primary={"Reports"} />
          <ExpandMore />
        </ListItem>
      </List>
    </div>
  );
}
function PrimaryAppBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  function home() {
    window.location = "#home";
  }
  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handlelogout(props) {
    localStorage.setItem("features", null);
    window.location = "/WaveEdu/app";
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }
  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      disableAutoFocusItem={true}
    >
      <MenuItem onClick={handleMenuClose}>
        <AccountCircle
          className={classNames(classes.leftIcon, classes.iconSmall)}
        />
        <Typography variant="subtitle2">Profile</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <SettingsIcon
          className={classNames(classes.leftIcon, classes.iconSmall)}
        />
        <Typography variant="subtitle2">Settings</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <LockIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        <Typography variant="subtitle2">Change Password</Typography>
      </MenuItem>

      <MenuItem onClick={handlelogout}>
        <LogoutIcon
          className={classNames(classes.leftIcon, classes.iconSmall)}
        />
        <Typography variant="subtitle2">Logout</Typography>
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Email</p>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Account</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {/* <IconButton color="inherit" aria-label="Menu">
            <img src={logo1} width={30} />
          </IconButton> */}
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            PROSK PATIENT
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton onClick={event => home()} color="inherit">
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-owns={isMenuOpen ? "material-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
            <IconButton
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        {/* <div className={classes.drawerHeader} astyle={{ position: "fixed" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div> */}
        <NestedList handleDrawerClose={handleDrawerClose} />
      </Drawer>
      {renderMenu}
      {renderMobileMenu}
    </div>
  );
}
export default PrimaryAppBar;
