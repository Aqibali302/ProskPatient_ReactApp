import React, { useState, useCallback } from "react";
import deburr from "lodash/deburr";
import { withStyles } from "@material-ui/styles";

import {
  Grid,
  IconButton,
  Typography,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
//import Autocomplete from '@material-ui/lab/Autocomplete';

import PrimaryAppBar from "../PrimaryAppBar";
import BottomBar from "../BottomBar";
import PropTypes from "prop-types";

import PrintIcon from "@material-ui/icons/Print";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import PDFIcon from "mdi-material-ui/FilePdf";
import FilterIcon from "mdi-material-ui/FilterOutline";
import ExcelIcon from "mdi-material-ui/GoogleSpreadsheet";
import SearchIcon from "mdi-material-ui/FileSearchOutline";
import SearchBox from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import F01TableComponent from "./F01TableComponent";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useDropzone } from "react-dropzone";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LabelIcon from "@material-ui/icons/Label";
import EditIcon from "@material-ui/icons/Edit";
import Downshift from "downshift";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
let suggestions = [];

let course_code_data = [];
let course_account_data = [];
const useStyles = (theme) => ({
  downShift: {
    paddingTop: "18px !important",
  },
  textFieldCard: {
    paddingTop: "0px !important",
  },
  cardcontent: {
    paddingTop: "0px !important",
    paddingLeft: "4px",
    paddingRight: "4px",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  asdf: {
    margin: 1000,
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
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

  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  container: {
    marginTop: "100px",
  },
});

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      onKeyPress={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function CreateNewLevel(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function Save(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("label", document.getElementById("label").value);
    let url = localStorage.getItem("url") + "/hsa/common/" + props.api;
    fetch(url, {
      method: "POST",
      body: data,
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzAxNzE4ODU0NiIsImV4cCI6MTYxNTI5OTY4OCwiaWF0IjoxNTgzODQ0NTczfQ.odlEWBk4DZnhossVNP4BvyLp9hoDVTwVh1llwMk3qiiSuRHkIOcHpnuYGFBqE8ilvZyJJbov5LtVFADcKmYjJg",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((result) => {
        if (result.CODE === 1) {
          //alert(result.USER_MESSAGE);
          // alert(result.DATA[0].customerId);
          if (this.state.record_id != 0) {
            //window.location = "#F01Reports";
          } else {
            window.location.reload();
          }
        } else if (result.CODE == 2) {
          alert(result.CODE + ":" + result.USER_MESSAGE);
        } else if (result.CODE == 3) {
          alert(result.CODE + ":" + result.USER_MESSAGE);
        } else if (result.error == 1) {
          alert(result.error_message);
        } else if (result.success == 0 && result.redirect_url != "") {
          window.location = result.redirect_url;
        }
      })
      .catch((error) => {
        if (error.status == 401) {
          // alert("Invalid/Expired token, Please login again to continue");
          window.location = "#/";
        } else {
          //alert('An error occured: '+error.status);
          window.location.reload();
        }
      });
    //      .catch(error => error.status==401?alert("Invalid/Expired token, Please login again to continue"):alert('An error occured: '+error.status));
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <Typography variant="caption" color="primary">
            {props.action_text}
          </Typography>
        </DialogTitle>
        <DialogContent style={{ width: "400px" }}>
          <input type="hidden" value={props.record_id} name="id"></input>
          <input
            type="hidden"
            value={props.is_group}
            id="is_group"
            name="is_group"
          ></input>
          <TextField
            margin="dense"
            id={props.id}
            name={props.name}
            label={props.label}
            //placeholder={props.placeholder}
            //api={props.api}
            type="text"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={Save} type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton
        style={{ width: "100%", paddingLeft: "1px" }}
        onClick={handleClickOpen}
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

function MyDropzone() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <Typography variant="caption" color="primary">
      {file.path} - {file.size} bytes
      <input
        type="hidden"
        name="file_name"
        id="file_name"
        value={file.path}
      ></input>
    </Typography>
  ));
  let msg = files;
  if (files == "") {
    msg = "Drag and Drop file here";
  }
  return (
    <div
      style={{ textAlign: "center" }}
      {...getRootProps({ className: "dropzone" })}
    >
      <Card style={{ backgroundColor: "#c7c7c7" }}>
        <CardContent>
          <input name="contained-button-file" {...getInputProps()} />
          {msg}
        </CardContent>
      </Card>
    </div>
  );
}

class F01Form extends React.Component {
  constructor(props) {
    super(props);

    this.AddRow = this.AddRow.bind(this);
    this.state = {
      record_id: this.props.record_id,
      isValid: true,

      //info
      label: "",
      short_label: "",
      description: "",

      rowid: 1,
      rows: [],
      detail_rows: [],
      category: false,
      category_val: 1,
      category_label: "",
      category_dropdown: [],

      sub_category: false,
      sub_category_val: 1,
      sub_category_label: "",

      sub_category_dropdown: [],

      brand: false,
      brand_val: 1,
      brand_label: "",

      brand_dropdown: [],

      company: false,
      company_val: 1,
      company_label: "",

      company_dropdown: [],

      type: false,
      type_val: 1,
      type_label: "",

      type_dropdown: [],

      group: false,
      group_val: 1,
      group_label: "",

      group_dropdown: [],

      packing: false,
      packing_val: 1,
      packing_label: "",

      packing_dropdown: [],

      active: false,

      external_product: false,
      external_product_val: 1,
      external_product_label: "",

      external_product_dropdown: [],

      image_type: false,
      image_type_val: 1,
      image_type_label: "",

      image_type_dropdown: [],

      image_path: "",
    };

    localStorage.setItem("url", "http://ep.pbc.com.pk:8080");
  }

  componentDidMount() {
    this.LoadTransactionCategoryDropdown();
    this.LoadTransactionImageTypeDropdown();
    this.LoadTransactionBrandDropdown();
    this.LoadTransactionSubCategoryDropdown();
    this.LoadTransactionCompanyDropdown();
    this.LoadTransactionTypeDropdown();
    this.LoadTransactionGroupDropdown();
    this.LoadTransactionPackingDropdown();
  }
  submitForm(event) {
    document.getElementById("submit-button").click();
  }
  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    let url = localStorage.getItem("url") + "/common/C01CatalogProductsSave";
    fetch(url, {
      method: "POST",
      body: data,
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzAxNzE4ODU0NiIsImV4cCI6MTYxNTI5OTY4OCwiaWF0IjoxNTgzODQ0NTczfQ.odlEWBk4DZnhossVNP4BvyLp9hoDVTwVh1llwMk3qiiSuRHkIOcHpnuYGFBqE8ilvZyJJbov5LtVFADcKmYjJg",
      }),
      //body: data
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.CODE === 1) {
          alert("saved");
          window.location.reload();
        } else if (result.CODE == 2) {
          alert(result.CODE + ":" + result.USER_MESSAGE);
        } else if (result.CODE == 3) {
          alert(result.CODE + ":" + result.USER_MESSAGE);
        } else if (result.error == 1) {
          alert(result.error_message);
        } else if (result.success == 0 && result.redirect_url != "") {
          window.location = result.redirect_url;
        }
        // alert(result.CODE);
        //console.log(result);
      })
      .catch((error) => {
        if (error.status == 401) {
          alert("Invalid/Expired token, Please login again to continue");
          window.location = "#/";
        } else {
          alert("An error occured: " + error.status);
          window.location.reload();
        }
      });
  }
  label = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  short_label = (event) => {
    this.setState({
      short_label: event.target.value,
    });
  };

  description = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleDateChangeFrom = (event) => {
    this.setState({ selectedDateFrom: event });
  };

  validateremarks() {
    var remarks = document.getElementById("remarks").value;
    var remarks_v = document.getElementById("remarks").value;
    var result = true;
    if (remarks.length < 1) {
      document.getElementById("remarks").focus();
      this.setState({
        remarks: true,
        remarks_val: remarks_v,
        //urgent_fee_error: "Please enter at least 5 characters"
      });
      result = false;
    } else {
      this.setState({
        remarks: false,
        remarks_error: "",
        remarks_val: remarks_v,
      });
    }

    return result;
  }

  validateFirstName() {
    var remarks = document.getElementById("remarks").value;
    var remarks_v = document.getElementById("remarks").value;
    var result = true;
    if (remarks.length < 1) {
      document.getElementById("remarks").focus();
      this.setState({
        remarks: true,
        remarks_val: remarks_v,
        //urgent_fee_error: "Please enter at least 5 characters"
      });
      result = false;
    } else {
      this.setState({
        remarks: false,
        remarks_error: "",
        remarks_val: remarks_v,
      });
    }

    return result;
  }

  handleDownshiftChange = (event) => {
    // alert(event.target.value);
    //this.setState({ semester_value: event.target.value });
  };
  keyPress(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      this.AddRow();
      //document.getElementById("downshift-simple1-input").focus();
      // console.log("value", e.target.value);
      // put the login here
    }
  }
  StopEnter(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }
  category = (event) => {
    this.setState({ category_val: event.target.value });
  };
  sub_category = (event) => {
    this.setState({ sub_category_val: event.target.value });
  };
  brand = (event) => {
    this.setState({ brand_val: event.target.value });
  };
  company = (event) => {
    this.setState({ company_val: event.target.value });
  };
  type = (event) => {
    this.setState({ type_val: event.target.value });
  };
  group = (event) => {
    this.setState({ group_val: event.target.value });
  };
  packing = (event) => {
    this.setState({ packing_val: event.target.value });
  };

  image_type = (event) => {
    this.setState({ image_type_val: event.target.value });
  };
  external_product = (event) => {
    this.setState({ external_product_val: event.target.value });
  };
  AddRow(event) {
    //alert("addrow");

    const nextRows = this.state.detail_rows.slice();
    //var temp_array = this.state.detail_rows1;
    nextRows.push({
      rowid: this.state.rowid,
      type: this.state.image_type_val,
      image: document.getElementById("file_name").value,
      Action: (
        <IconButton color="primary">
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    });

    this.state.rowid++;

    this.setState({
      rows: nextRows,
      detail_rows: nextRows,
    });
  }
  LoadTransactionCategoryDropdown() {
    let url = localStorage.getItem("url") + "";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzAxNzE4ODU0NiIsImV4cCI6MTYxNTI5OTY4OCwiaWF0IjoxNTgzODQ0NTczfQ.odlEWBk4DZnhossVNP4BvyLp9hoDVTwVh1llwMk3qiiSuRHkIOcHpnuYGFBqE8ilvZyJJbov5LtVFADcKmYjJg",
      }),
      //body: data
    })
      .then((res) => res.json())
      .then(
        (json) => {
          if (json.CODE === 1) {
            this.setState({
              isLoaded: true,
              category_dropdown: json.DATA,
            });
          } else {
            //  alert(json.SYSTEM_MESSAGE)
          }
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // (error) => {
        //   this.setState({
        //     isLoaded: true,
        //     error
        //   });
        // }
      );
  }

  LoadTransactionSubCategoryDropdown() {
    let url = localStorage.getItem("url") + "";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzI0MDAxMDA0MSIsImV4cCI6MTYxNTI5OTY4OCwiaWF0IjoxNTgzNzc0MTMzfQ.xtJAvPI3WO6C8cyWNYgXKbiCFlgcjNELVWZ8wDOBrz4_l2lcOzET32YLSGeg7-TJa2Y5fccXnp8NGKZ0gF9xzg",
      }),
      //body: data
    })
      .then((res) => res.json())
      .then(
        (json) => {
          if (json.CODE === 1) {
            this.setState({
              isLoaded: true,
              sub_category_dropdown: json.DATA,
            });
          } else {
            //  alert(json.SYSTEM_MESSAGE)
          }
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // (error) => {
        //   this.setState({
        //     isLoaded: true,
        //     error
        //   });
        // }
      );
  }

  LoadTransactionBrandDropdown() {
    let url = localStorage.getItem("url") + "";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzI0MDAxMDA0MSIsImV4cCI6MTYxNTI5OTY4OCwiaWF0IjoxNTgzNzc0MTMzfQ.xtJAvPI3WO6C8cyWNYgXKbiCFlgcjNELVWZ8wDOBrz4_l2lcOzET32YLSGeg7-TJa2Y5fccXnp8NGKZ0gF9xzg",
      }),
      //body: data
    })
      .then((res) => res.json())
      .then(
        (json) => {
          if (json.CODE === 1) {
            this.setState({
              isLoaded: true,
              brand_dropdown: json.DATA,
            });
          } else {
            //  alert(json.SYSTEM_MESSAGE)
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  LoadTransactionCompanyDropdown() {
    let url = localStorage.getItem("url") + "";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzI0MDAxMDA0MSIsImV4cCI6MTYxNTI5OTY4OCwiaWF0IjoxNTgzNzc0MTMzfQ.xtJAvPI3WO6C8cyWNYgXKbiCFlgcjNELVWZ8wDOBrz4_l2lcOzET32YLSGeg7-TJa2Y5fccXnp8NGKZ0gF9xzg",
      }),
      //body: data
    })
      .then((res) => res.json())
      .then(
        (json) => {
          if (json.CODE === 1) {
            this.setState({
              isLoaded: true,
              company_dropdown: json.DATA,
            });
          } else {
            //  alert(json.SYSTEM_MESSAGE)
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  LoadTransactionTypeDropdown() {
    let url = localStorage.getItem("url") + "";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzI0MDAxMDA0MSIsImV4cCI6MTYxNTI5OTY4OCwiaWF0IjoxNTgzNzc0MTMzfQ.xtJAvPI3WO6C8cyWNYgXKbiCFlgcjNELVWZ8wDOBrz4_l2lcOzET32YLSGeg7-TJa2Y5fccXnp8NGKZ0gF9xzg",
      }),
      //body: data
    })
      .then((res) => res.json())
      .then(
        (json) => {
          if (json.CODE === 1) {
            this.setState({
              isLoaded: true,
              type_dropdown: json.DATA,
            });
          } else {
            //  alert(json.SYSTEM_MESSAGE)
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  LoadTransactionGroupDropdown() {
    let url = localStorage.getItem("url") + "";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzI0MDAxMDA0MSIsImV4cCI6MTYxNTI5OTY4OCwiaWF0IjoxNTgzNzc0MTMzfQ.xtJAvPI3WO6C8cyWNYgXKbiCFlgcjNELVWZ8wDOBrz4_l2lcOzET32YLSGeg7-TJa2Y5fccXnp8NGKZ0gF9xzg",
      }),
      //body: data
    })
      .then((res) => res.json())
      .then(
        (json) => {
          if (json.CODE === 1) {
            this.setState({
              isLoaded: true,
              group_dropdown: json.DATA,
            });
          } else {
            //  alert(json.SYSTEM_MESSAGE)
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  LoadTransactionPackingDropdown() {
    let url = localStorage.getItem("url") + "";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzI0MDAxMDA0MSIsImV4cCI6MTYxNTI5OTY4OCwiaWF0IjoxNTgzNzc0MTMzfQ.xtJAvPI3WO6C8cyWNYgXKbiCFlgcjNELVWZ8wDOBrz4_l2lcOzET32YLSGeg7-TJa2Y5fccXnp8NGKZ0gF9xzg",
      }),
      //body: data
    })
      .then((res) => res.json())
      .then(
        (json) => {
          if (json.CODE === 1) {
            this.setState({
              isLoaded: true,
              packing_dropdown: json.DATA,
            });
          } else {
            //  alert(json.SYSTEM_MESSAGE)
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  LoadTransactionImageTypeDropdown() {
    let url = localStorage.getItem("url") + "";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwMzI0MDAxMDA0MSIsImV4cCI6MTYxNTI5OTY4OCwiaWF0IjoxNTgzNzc0MTMzfQ.xtJAvPI3WO6C8cyWNYgXKbiCFlgcjNELVWZ8wDOBrz4_l2lcOzET32YLSGeg7-TJa2Y5fccXnp8NGKZ0gF9xzg",
      }),
      //body: data
    })
      .then((res) => res.json())
      .then(
        (json) => {
          if (json.CODE === 1) {
            this.setState({
              isLoaded: true,
              image_type_dropdown: json.DATA,
            });
          } else {
            //  alert(json.SYSTEM_MESSAGE)
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  renderCategoryOptions() {
    return this.state.category_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }
  renderSubCategoryOptions() {
    return this.state.sub_category_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }
  renderBrandOptions() {
    return this.state.brand_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }
  renderCompanyOptions() {
    return this.state.company_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }
  renderTypeOptions() {
    return this.state.type_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }
  renderGroupOptions() {
    return this.state.group_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }
  renderPackingOptions() {
    return this.state.packing_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }
  renderActiveOptions() {
    return this.state.active_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }
  renderImageTypeOptions() {
    return this.state.image_type_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }
  renderExternalProductOptions() {
    return this.state.external_product_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <PrimaryAppBar header_text={"PBC"} />
        <div
          style={{
            marginTop: "60px",
            marginBottom: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card style={{ width: "98%" }}>
            <form
              onKeyPress={this.StopEnter}
              onSubmit={this.handleSubmit}
              autoComplete="off"
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                id="submit-button"
                className={classes.button}
                style={{ display: "none" }}
              >
                submit
              </Button>
              <CardContent>
                <Grid container spacing={8}>
                  <Grid item xs={1} align="left">
                    <IconButton
                      style={{ width: "-10px" }}
                      onClick={(event) => window.history.back()}
                    >
                      <ArrowBackIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item xs={11} align="center">
                    <Typography variant="title" color="primary"></Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="FirstName"
                      label="First Name*"
                      style={{ width: "90%" }}
                      className={classes.textFieldCard}
                      onChange={this.label}
                      // margin="normal"
                      // error={this.state.remarks}
                      value={this.state.label}
                      //helperText={this.state.remarks_error}
                      // required
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="LastName"
                      label="Last Name*"
                      className={classes.textFieldCard}
                      onChange={this.short_label}
                      // margin="normal"
                      // error={this.state.remarks}
                      value={this.state.short_label}
                      //helperText={this.state.remarks_error}
                      // required

                      style={{ width: "90%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="phoneNumber"
                      label="Phone Number*"
                      className={classes.textFieldCard}
                      onChange={this.description}
                      // margin="normal"
                      // error={this.state.remarks}
                      value={this.state.description}
                      //helperText={this.state.remarks_error}
                      // required

                      style={{ width: "90%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      onKeyDown={this.StopEnter}
                      //id="remarks"
                      name="EMAIL"
                      label="Email*"
                      className={classes.textFieldCard}
                      onChange={this.description}
                      // margin="normal"
                      // error={this.state.remarks}
                      value={this.state.description}
                      //helperText={this.state.remarks_error}
                      // required

                      style={{ width: "90%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="date"
                      label="Birthday"
                      type="date"
                      // defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      style={{ width: "90%" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      style={{ width: "90%" }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="category">Category*</InputLabel>
                      <Select
                        IconComponent="false"
                        style={{ width: "100%" }}
                        value={this.state.category_val}
                        onChange={this.category}
                        error={this.state.category_error}
                        //helperText={this.state.facility_type_error}
                        autoWidth
                        required
                        inputProps={{
                          name: "categoryId",
                          id: "categoryId",
                        }}
                      >
                        {this.renderCategoryOptions()}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl
                      style={{ width: "90%" }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="sub_category">
                        Sub Category*
                      </InputLabel>
                      <Select
                        IconComponent="false"
                        style={{ width: "100%" }}
                        value={this.state.sub_category_val}
                        onChange={this.sub_category}
                        error={this.state.sub_category_error}
                        //helperText={this.state.facility_type_error}
                        autoWidth
                        required
                        inputProps={{
                          name: "subcategoryId",
                          id: "subcategoryId",
                        }}
                      >
                        {this.renderSubCategoryOptions()}
                      </Select>
                    </FormControl>
                    <IconButton color="primary" style={{ width: "10%" }}>
                      <CreateNewLevel
                        action_text="Add Sub Category"
                        // name="label"
                        // id="label"
                        // api="C03CommonItemsCategoryTypesSave"
                        label="Sub Category "
                        state={this.state}
                        is_group={"0"}
                        LoadSubCategoriesDropdown={
                          this.LoadSubCategoriesDropdown
                        }
                      />
                    </IconButton>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl
                      style={{ width: "90%" }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="brand">Brand*</InputLabel>
                      <Select
                        IconComponent="false"
                        style={{ width: "100%" }}
                        value={this.state.brand_val}
                        onChange={this.brand}
                        error={this.state.brand_error}
                        //helperText={this.state.facility_type_error}
                        autoWidth
                        required
                        inputProps={{
                          name: "brandId",
                          id: "brandId",
                        }}
                      >
                        {this.renderBrandOptions()}
                      </Select>
                    </FormControl>
                    <IconButton color="primary" style={{ width: "10%" }}>
                      <CreateNewLevel
                        // action_text="Add Search Category"
                        // name="label"
                        // id="label"
                        // api="C03CommonItemsCategoryTypesSave"
                        label="Brand"
                        state={this.state}
                        is_group={"0"}
                        LoadSubCategoriesDropdown={
                          this.LoadSubCategoriesDropdown
                        }
                      />
                    </IconButton>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl
                      style={{ width: "90%" }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="company">Company*</InputLabel>
                      <Select
                        IconComponent="false"
                        style={{ width: "100%" }}
                        value={this.state.company_val}
                        onChange={this.company}
                        error={this.state.company_error}
                        //helperText={this.state.facility_type_error}
                        autoWidth
                        required
                        inputProps={{
                          name: "companyId",
                          id: "companyId",
                        }}
                      >
                        {this.renderCompanyOptions()}
                      </Select>
                    </FormControl>
                    <IconButton color="primary" style={{ width: "10%" }}>
                      <CreateNewLevel
                        action_text="Add Company"
                        // name="label"
                        // id="label"
                        // api="C03CommonItemsCategoryTypesSave"
                        label="Company"
                        state={this.state}
                        is_group={"0"}
                        LoadSubCategoriesDropdown={
                          this.LoadSubCategoriesDropdown
                        }
                      />
                    </IconButton>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl
                      style={{ width: "90%" }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="type">Type*</InputLabel>
                      <Select
                        IconComponent="false"
                        style={{ width: "100%" }}
                        value={this.state.type_val}
                        onChange={this.type}
                        error={this.state.type_error}
                        //helperText={this.state.facility_type_error}
                        autoWidth
                        required
                        inputProps={{
                          name: "typeId",
                          id: "typeId",
                        }}
                      >
                        {this.renderTypeOptions()}
                      </Select>
                    </FormControl>
                    <IconButton color="primary" style={{ width: "10%" }}>
                      <CreateNewLevel
                        action_text="Add Type"
                        // name="label"
                        // id="label"
                        // api="C03CommonItemsCategoryTypesSave"
                        label="Type"
                        state={this.state}
                        is_group={"0"}
                        LoadSubCategoriesDropdown={
                          this.LoadSubCategoriesDropdown
                        }
                      />
                    </IconButton>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl
                      style={{ width: "90%" }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="group">Group*</InputLabel>
                      <Select
                        IconComponent="false"
                        style={{ width: "100%" }}
                        value={this.state.group_val}
                        onChange={this.group}
                        error={this.state.group_error}
                        //helperText={this.state.facility_type_error}
                        autoWidth
                        required
                        inputProps={{
                          name: "groupId",
                          id: "groupId",
                        }}
                      >
                        {this.renderGroupOptions()}
                      </Select>
                    </FormControl>
                    <IconButton color="primary" style={{ width: "10%" }}>
                      <CreateNewLevel
                        action_text="Add Group"
                        // name="label"
                        // id="label"
                        // api="C03CommonItemsCategoryTypesSave"
                        label="Group"
                        state={this.state}
                        is_group={"0"}
                        LoadSubCategoriesDropdown={
                          this.LoadSubCategoriesDropdown
                        }
                      />
                    </IconButton>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl
                      style={{ width: "90%" }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="packing">Packing*</InputLabel>
                      <Select
                        IconComponent="false"
                        style={{ width: "100%" }}
                        value={this.state.packing_val}
                        onChange={this.packing}
                        error={this.state.packing_error}
                        //helperText={this.state.facility_type_error}
                        autoWidth
                        required
                        inputProps={{
                          name: "packingId",
                          id: "packingId",
                        }}
                      >
                        {this.renderPackingOptions()}
                      </Select>
                    </FormControl>
                    <IconButton color="primary" style={{ width: "10%" }}>
                      <CreateNewLevel
                        action_text="Add Packing"
                        // name="label"
                        // id="label"
                        // api="C03CommonItemsCategoryTypesSave"
                        label="packing"
                        state={this.state}
                        is_group={"0"}
                        LoadSubCategoriesDropdown={
                          this.LoadSubCategoriesDropdown
                        }
                      />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      style={{ width: "100%" }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="externalProduct">
                        External Product*
                      </InputLabel>
                      <Select
                        IconComponent="false"
                        style={{ width: "100%" }}
                        value={this.state.external_product_val}
                        onChange={this.external_product}
                        error={this.state.external_product_error}
                        //helperText={this.state.facility_type_error}
                        autoWidth
                        required
                        inputProps={{
                          name: "externalProductId",
                          id: "externalProductId",
                        }}
                      >
                        {this.renderExternalProductOptions()}
                      </Select>
                    </FormControl>
                    <IconButton
                      color="primary"
                      style={{ width: "10%" }}
                    ></IconButton>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography component="div">
                      <Grid
                        component="label"
                        container
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item>
                          <Switch color={"primary"} value={1} name="isActive" />
                        </Grid>
                        <Grid item>Activate this product</Grid>
                      </Grid>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={4}></Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography color={"primary"}>Images</Typography>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="image_type">Image Type</InputLabel>
                      <Select
                        style={{ width: "100%" }}
                        value={this.state.image_type_val}
                        onChange={this.image_type}
                        error={this.state.image_type_error}
                        autoWidth
                        required
                        inputProps={{
                          name: "imageTypeId",
                          id: "imageTypeId",
                        }}
                      >
                        {this.renderImageTypeOptions()}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl}>
                      <MyDropzone />
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={12} sm={4}>

                    <Button
                      variant="contained"
                      color="primary"
                      
                      style={{ marginTop:"2.5%" }}
                      onClick={this.AddRow
                      }
                    >
                      Add Image
                   </Button>
                  </Grid> */}
                </Grid>
                <button
                  type="submit"
                  id="form1"
                  style={{ display: "none" }}
                ></button>
              </CardContent>
            </form>
          </Card>
        </div>
        <BottomBar
          // left_button_text="View"
          right_button_text="Save"
          // bottomRightButtonAction={this.submitForm}
        />
      </div>
    );
  }
}
export default withStyles(useStyles)(F01Form);
