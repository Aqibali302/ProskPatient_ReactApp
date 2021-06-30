import React from "react";

import Paper from "@material-ui/core/Paper";
import * as PropTypes from "prop-types";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  TableBandHeader
} from "@devexpress/dx-react-grid-material-ui";
import {
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
  DataTypeProvider,
  TableColumnResizing
} from "@devexpress/dx-react-grid";
import {
  withStyles,
  Input,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  CircularProgress
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CallToActionIcon from '@material-ui/icons/CallToAction';
import ImageIcon from '@material-ui/icons/Image';
import { color } from "highcharts";
const styles = {
  numericInput: {
    textAlign: "right",
    width: "100%"
  }
};


class MedicationFormTable extends React.PureComponent {
  constructor(props) {
    super(props);


    this.state = {
      columns: [
        {
        name: "ID",
        title: "ID",
      },
        {
          name: "medication",
          title: "Medication",
        },
        {
          name: "dosage",
          title: "Dosage",

        },
       
        {
            name: "DosageForm",
            title: "Dosage Form",
  
          },
        { name: "Action", 
          title: "Action",
           
      }  
      ],
    };
  } 
  componentDidMount() {
    // this.handleNextClick("test");
  }

  render() {
    const {
      columns,
    } = this.state;
    const showFilter = this.props.showFilter;

    return (
      <Paper>
        <Grid rows={this.props.rows} columns={columns}>
          <Table />
          
          <TableHeaderRow  />
          
        </Grid>
      </Paper>
    );
  }
}

export default MedicationFormTable;
