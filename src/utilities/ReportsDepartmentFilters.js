import React, { useState } from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import { Grid, Typography, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";

const suggestions = [
  { label: "Computer Science" },
  { label: "Mathematics" },
  { label: "Botany" },
  { label: "Physics" },
  { label: "Chemistry" },
  { label: "Statistics" },
  { label: "Management" },
  { label: "English Litrature" }
];
const students = [
  { label: "Islam Danish" },
  { label: "Mehran Shafqat" },
  { label: "Asif Shaikh" },
  { label: "Sufian Irshad" },
  { label: "Mubashar Mughal" },
  { label: "Talal Khan" },
  { label: "Adeel Rana" },
  { label: "Imran Khan" },
  { label: "Hafiz Usman" },
  { label: "Amir Shahzad" },
  { label: "Haseeb Liaqat" },
  { label: "Awais Liaqat" },
  { label: "Adnan Shafiq" }
];
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  },
  divider: {
    height: theme.spacing.unit * 2
  }
}));
function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderStudent({
  students,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(students.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={students.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {students.label}
    </MenuItem>
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 500
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}
function getStudents(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : students.filter(students => {
        const keep =
          count < 5 &&
          students.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function DownshiftMultiple(props) {
  const { classes } = props;
  const [inputValue, setInputValue] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState([]);

  function handleKeyDown(event) {
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleChange(item) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    setSelectedItem(newSelectedItem);
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  return (
    <div>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                  />
                )),
                onChange: handleInputChange,
                onKeyDown: handleKeyDown,
                placeholder: "Department"
              })
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem: selectedItem2
                  })
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    </div>
  );
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired
};

let popperNode;

function IntegrationDownshift() {
  const classes = useStyles();
  function handleDateTimeChange() {}
  const [selectedDateFrom, handleDateChangeFrom] = useState(new Date());
  const [selectedDateTo, handleDateChangeTo] = useState(new Date());
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid xs={12} item={true}>
          <DownshiftMultiple classes={classes} />
        </Grid>
        <Grid xs={12} style={{ paddingTop: "1%" }} item={true}>
          <Downshift id="downshift-simple">
            {({
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              selectedItem
            }) => (
              <div className={classes.container}>
                {renderInput({
                  fullWidth: true,
                  classes,
                  InputProps: getInputProps({
                    placeholder: "Student"
                  })
                })}
                <div {...getMenuProps()}>
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {getStudents(inputValue).map((students, index) =>
                        renderStudent({
                          students,
                          index,
                          itemProps: getItemProps({ item: students.label }),
                          highlightedIndex,
                          selectedItem
                        })
                      )}
                    </Paper>
                  ) : null}
                </div>
              </div>
            )}
          </Downshift>
        </Grid>

        <Grid xs={6} style={{ paddingTop: "1%" }} item={true}>
          <Typography inline={true} color="primary">
            From
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              keyboard
              format={"dd/MM/yyyy"}
              placeholder="18/10/2019"
              label="Date"
              margin="normal"
              mask={value =>
                // handle clearing outside if value can be changed outside of the component
                value
                  ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                  : []
              }
              disableOpenOnEnter
              animateYearScrolling={false}
              style={{ width: "97%" }}
              onChange={handleDateChangeFrom}
              value={selectedDateFrom}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid xs={6} style={{ paddingTop: "1%" }} item={true}>
          <Typography inline={true}>&nbsp; </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              keyboard
              margin="normal"
              label="Time"
              value={selectedDateFrom}
              style={{ width: "100%" }}
              mask={value =>
                // handle clearing outside if value can be changed outside of the component
                value ? [/\d/, /\d/, ":", /\d/, /\d/, " ", /\w/, /\w/] : []
              }
              onChange={handleDateChangeFrom}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid xs={6} style={{ paddingTop: "1%" }} item={true}>
          <Typography inline={true} color="primary">
            To
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              keyboard
              format={"dd/MM/yyyy"}
              placeholder="18/10/2019"
              label="Date"
              margin="normal"
              mask={value =>
                // handle clearing outside if value can be changed outside of the component
                value
                  ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                  : []
              }
              value={selectedDateTo}
              disableOpenOnEnter
              animateYearScrolling={false}
              style={{ width: "97%" }}
              onChange={handleDateChangeTo}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid xs={6} style={{ paddingTop: "1%" }} item={true}>
          <Typography inline={true} color="primary">
            &nbsp;
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              keyboard
              margin="normal"
              label="Time"
              value={selectedDateTo}
              style={{ width: "100%" }}
              mask={value =>
                // handle clearing outside if value can be changed outside of the component
                value ? [/\d/, /\d/, ":", /\d/, /\d/, " ", /\w/, /\w/] : []
              }
              onChange={handleDateChangeTo}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid
          xs={12}
          style={{ textAlign: "right", paddingTop: "1%" }}
          item={true}
        >
          <Button color="primary">Reset</Button>
          <Button color="primary">Proceed</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default IntegrationDownshift;
