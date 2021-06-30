import React from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/styles";

import {
  Grid,
  IconButton,
  Typography,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PDFIcon from "mdi-material-ui/FilePdf";
import FilterIcon from "mdi-material-ui/FilterOutline";
import ExcelIcon from "mdi-material-ui/GoogleSpreadsheet";
import SearchIcon from "mdi-material-ui/FileSearchOutline";
import SearchBoxIcon from "@material-ui/icons/Search";
import PrimaryAppBar from "../PrimaryAppBar";
import TableComponent from "./TableComponent";
import MoreIcon from "@material-ui/icons/MoreVert";

import ReportsFilters from "./ReportsFilters";
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
}));

function ReportsHeader() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [showFilter, setFilter] = React.useState(false);
  const [showTableFilter, setTableFilter] = React.useState(false);
  const anchorEl = React.useRef(null);
  const anchorE2 = React.useRef(null);
  function handleToggle() {
    setOpen(!open);
  }

  function handleTableFilter() {
    setTableFilter(!showTableFilter);
  }
  function handleFilter() {
    setFilter(!showFilter);
  }
  function handleClose(event) {
    if (anchorEl.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  const renderFilters = (
    <Popper
      open={showFilter}
      anchorEl={anchorE2.current}
      transition
      disablePortal
      style={{ width: "70%" }}
    >
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps} id="menu-list-grow1">
          <div>
            <Paper
              style={{
                paddingTop: "1%",
                paddingBottom: "1%",
                paddingLeft: "1%",
                paddingRight: "1%"
              }}
            >
              <Grid xs={12} item={true}>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td style={{ width: "33%" }}>&nbsp;</td>
                      <td style={{ width: "33%", textAlign: "center" }}>
                        <Typography inline={true} variant="subtitle1">
                          Filters
                        </Typography>
                      </td>
                      <td style={{ width: "33%", textAlign: "right" }}>
                        <IconButton onClick={handleFilter}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Grid>

              <ReportsFilters />
            </Paper>
          </div>
        </Grow>
      )}
    </Popper>
  );
  const renderMobileMenu = (
    <Popper open={open} anchorEl={anchorEl.current} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          id="menu-list-grow"
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom"
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <List>
                <ListItem button onClick={handleClose}>
                  <ListItemIcon>
                    <PDFIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography varian="caption">PDF</Typography>}
                  />
                </ListItem>

                <ListItem button onClick={handleClose}>
                  <ListItemIcon>
                    <ExcelIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography varian="caption">Excel</Typography>}
                  />
                </ListItem>
              </List>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
  return (
    <div className={classes.root}>
      <PrimaryAppBar header_text={"University of Arts and Sciences"} />

      <div style={{ marginTop: "50px" }}>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ width: "30%" }}>
                <IconButton>
                  <ArrowBackIcon fontSize="small" />
                </IconButton>

                <IconButton style={{ marginLeft: "-10px" }}>
                  <PDFIcon fontSize="small" />
                </IconButton>
                <IconButton style={{ marginLeft: "-10px" }}>
                  <ExcelIcon fontSize="small" />
                </IconButton>
              </td>
              <td style={{ textAlign: "center", width: "40%" }}>
                <Typography variant="subheading">
                  R101 - Student List
                </Typography>
              </td>
              <td style={{ textAlign: "right", width: "30%" }}>
                <IconButton onClick={handleFilter} buttonRef={anchorE2}>
                  <FilterIcon fontSize="small" />
                </IconButton>
                <IconButton
                  style={{ marginLeft: "-10px" }}
                  onClick={handleTableFilter}
                  buttonRef={anchorE2}
                >
                  <SearchIcon fontSize="small" />
                </IconButton>
                <IconButton
                  buttonRef={anchorEl}
                  aria-owns={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  style={{ display: "none" }}
                >
                  <MoreIcon fontSize="small" />
                </IconButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <TableComponent
        showFilter={showTableFilter}
        style={{ marginTop: "-20px" }}
      />
      {renderMobileMenu}
      {renderFilters}
    </div>
  );
}
export default ReportsHeader;
