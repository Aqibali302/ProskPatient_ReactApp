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
import { withStyles, Input } from "@material-ui/core";

const styles = {
  numericInput: {
    textAlign: "right",
    width: "100%"
  }
};
class TableComponent extends React.PureComponent {
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

    const CurrencyEditor = withStyles(styles)(CurrencyEditorBase);
    this.state = {
      columns: [
        { name: "ID", title: "ID" },
        { name: "RollNumber", title: "Roll Number" },
        { name: "FirstName", title: "First Name" },
        { name: "LastName", title: "Last Name" },
        { name: "FatherName", title: "Father's Name" },
        { name: "RegistrationNo", title: "Registration No" },
        { name: "CNIC", title: "CNIC" },
        { name: "Subject", title: "Subject" },
        { name: "Semester", title: "Semester" },
        { name: "Session", title: "Session" }
      ],

      rows: [
        {
          ID: "1",
          RollNumber: "142",
          FirstName: "Danish",
          LastName: "Islam",
          FatherName: "A Lateef",
          RegistrationNo: "BSIT-264",
          CNIC: "36502-9128123-3",
          Subject: "INFORMATION TECHNOLOGY",
          Semester: "7th",
          Session: "2015-2019"
        },
        {
          ID: "2",
          RollNumber: "142",
          FirstName: "Mehran",
          LastName: "Shafqat",
          FatherName: "A Lateef",
          RegistrationNo: "BSIT-264",
          CNIC: "36502-9128123-3",
          Subject: "INFORMATION TECHNOLOGY",
          Semester: "7th",
          Session: "2015-2019"
        },
        {
          ID: "3",
          RollNumber: "142",
          FirstName: "Imran",
          LastName: "Khan",
          FatherName: "A Lateef",
          RegistrationNo: "BSIT-264",
          CNIC: "36502-9128123-3",
          Subject: "INFORMATION TECHNOLOGY",
          Semester: "7th",
          Session: "2015-2019"
        },
        {
          ID: "4",
          RollNumber: "142",
          FirstName: "Sajid",
          LastName: "Saghla",
          FatherName: "A Lateef",
          RegistrationNo: "BSIT-264",
          CNIC: "36502-9128123-3",
          Subject: "INFORMATION TECHNOLOGY",
          Semester: "7th",
          Session: "2015-2019"
        },
        {
          ID: "5",
          RollNumber: "142",
          FirstName: "Sufian",
          LastName: "Irshad",
          FatherName: "A Lateef",
          RegistrationNo: "BSIT-264",
          CNIC: "36502-9128123-3",
          Subject: "INFORMATION TECHNOLOGY",
          Semester: "7th",
          Session: "2015-2019"
        },
        {
          ID: "6",
          RollNumber: "142",
          FirstName: "Danish",
          LastName: "Islam",
          FatherName: "A Lateef",
          RegistrationNo: "BSIT-264",
          CNIC: "36502-9128123-3",
          Subject: "INFORMATION TECHNOLOGY",
          Semester: "7th",
          Session: "2015-2019"
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

export default TableComponent;
