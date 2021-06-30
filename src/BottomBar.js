import React from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

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
import {
  Drawer,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
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

}));

function BottomBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);

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

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }
  function handleDrawerOpen() {
    setOpen(true);
  }
  function bottomRightButtonAction(props) {
    props.bottomRightButtonAction();
  }

  function bottomLeftButtonAction(props) {
    props.bottomLeftButtonAction();
  }
  return (
    <div>
      <AppBar
        position="fixed"
        style={{ top: "auto", bottom: 0 }}
        color="default"
      >
        <Toolbar variant="dense">
          <Button
            variant="contained"
            color="default"
            onClick={event => bottomLeftButtonAction(props)}
          >
            {props.left_button_text}
          </Button>

          <div className={classes.grow} />

          <Button
            variant="contained"
            color="primary"
            onClick={event => bottomRightButtonAction(props)}
          >
            {props.right_button_text}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default BottomBar;
