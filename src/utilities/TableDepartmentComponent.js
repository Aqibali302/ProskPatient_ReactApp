import React from "react";

import Paper from "@material-ui/core/Paper";
import * as PropTypes from "prop-types";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow
} from "@devexpress/dx-react-grid-material-ui";
import {
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
  DataTypeProvider
} from "@devexpress/dx-react-grid";
import {
  withStyles,
  Input,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
const styles = {
  numericInput: {
    textAlign: "right",
    width: "100%"
  }
};
class TableDepartmentComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    const CurrencyEditorBase = ({ value, onValueChange, classes }) => {
      const handleChange = event => {
        const { value: targetValue } = event.target;
        if (targetValue.trim() === "") {
          onValueChange();
          return;
        }
        onValueChange(parseInt(targetValue, 10));
      };
      return (
        <Input
          type="number"
          classes={{
            input: classes.numericInput
          }}
          fullWidth
          value={value === undefined ? "" : value}
          inputProps={{
            min: 0,
            placeholder: "Filter..."
          }}
          onChange={handleChange}
        />
      );
    };

    CurrencyEditorBase.propTypes = {
      value: PropTypes.number,
      onValueChange: PropTypes.func.isRequired,
      classes: PropTypes.object.isRequired
    };

    CurrencyEditorBase.defaultProps = {
      value: undefined
    };
    function ActionButton(props) {
      return (
        <div>
          <IconButton>
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
        </div>
      );
    }
    const CurrencyEditor = withStyles(styles)(CurrencyEditorBase);
    this.state = {
      columns: [
        { name: "ID", title: "ID" },
        { name: "DepartmentName", title: "Department Name" },
        { name: "ShortName", title: "Short Name" },
        { name: "DateofApproval", title: "Date of Approval" },
        { name: "ApprovedBy", title: "Approved By" },
        { name: "MinutesofMeeting", title: "Minutes of Meeting" },
        { name: "Action", title: "Action" }
      ],

      rows: [
        {
          ID: "1",
          DepartmentName: "Information Technology",
          ShortName: "IT",
          DateofApproval: "23-Aug-19",
          ApprovedBy: "A Lateef",
          MinutesofMeeting: "IT.docx",
          Action: <ActionButton />
        },
        {
          ID: "1",
          DepartmentName: "Human Resource",
          ShortName: "HR",
          DateofApproval: "23-Aug-19",
          ApprovedBy: "Awais Ali",
          MinutesofMeeting: "IT.docx",
          Action: <ActionButton />
        },
        {
          ID: "1",
          DepartmentName: "Academics",
          ShortName: "Academics",
          DateofApproval: "23-Aug-19",
          ApprovedBy: "Danish",
          MinutesofMeeting: "IT.docx",
          Action: <ActionButton />
        },
        {
          ID: "1",
          DepartmentName: "Administration",
          ShortName: "Admin",
          DateofApproval: "23-Aug-19",
          ApprovedBy: "Mudassar",
          MinutesofMeeting: "IT.docx",
          Action: <ActionButton />
        }
      ],
      currencyColumns: ["ID", "RollNumber"],
      currencyFilterOperations: [
        "equal",
        "notEqual",
        "greaterThan",
        "greaterThanOrEqual",
        "lessThan",
        "lessThanOrEqual"
      ]
    };
  }
  render() {
    const {
      rows,
      columns,
      currencyColumns,
      currencyFilterOperations,
      CurrencyEditor
    } = this.state;
    const showFilter = this.props.showFilter;

    return (
      <Paper>
        <Grid rows={rows} columns={columns}>
          <SortingState
            defaultSorting={[{ columnName: "RollNumber", direction: "asc" }]}
          />
          <DataTypeProvider
            for={currencyColumns}
            availableFilterOperations={currencyFilterOperations}
            editorComponent={CurrencyEditor}
          />
          <IntegratedSorting />

          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />
          <Table />

          <TableHeaderRow showSortingControls />
          {showFilter ? <TableFilterRow showFilterSelector /> : null}
        </Grid>
      </Paper>
    );
  }
}

export default TableDepartmentComponent;
