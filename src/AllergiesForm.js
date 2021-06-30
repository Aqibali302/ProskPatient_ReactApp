import React, { useState, useCallback } from "react";
import deburr from "lodash/deburr";
import { withStyles } from "@material-ui/styles";
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import Medicine from "./images/medican.png";
import prosk from "./images/Logo-02.png";
import { properties } from "./properties";
// import Autocomplete from "./Autocomplete";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ListSubheader from '@material-ui/core/ListSubheader';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { VariableSizeList } from 'react-window';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomizedSnackbar from './customizesnackbar/CustomizedSnackbar.js'
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
import AppBar from "@material-ui/core/AppBar";
import TextInput from 'react-autocomplete-input';
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuItem from "@material-ui/core/MenuItem";
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import AllergiesFormTable from "./AllergiesFormTable";
import { useDropzone } from "react-dropzone";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Loader from 'react-loader-spinner'
import EditIcon from '@material-ui/icons/Edit';
import { compose } from "redux";
import { id } from "date-fns/locale";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = theme => ({
  downShift: {
    paddingTop: "18px !important"
  },
  textFieldCard: {
    paddingTop: "0px !important"
  },
  cardcontent: {
    paddingTop: "0px !important",
    paddingLeft: "4px",
    paddingRight: "4px",
    "&:last-child": {
      paddingBottom: 0
    }
  },
  asdf: {
    margin: 1000
  },
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

  inline: {
    display: "inline"
  },
  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px"
  },
  formControl: {
    minWidth: 120,
    width: "100%"
  },
  container: {
    marginTop: "100px"
  }

});
const OPTIONS = [];

const renderGroup = (params) => [

  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});
const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}
const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}
class AllergiesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.AddRow = this.AddRow.bind(this);
    this.state = {
      record_id: this.props.record_id,
      isValid: true,
      dosage_val: "",
      dosage_form:"",
      rowid: 1,
      rows: [],
      Dosage_Form_dropdown: [
        { Id: "Gel", Label: "Gel" },
        { Id: "Tablet", Label: "Tablet" },
        { Id: "Injection", Label: "Injection" },
      ],
      detail_rows: [],
      dosage_dropdown: [],
      MedicationData: [],
      Medication_Id: [],
      isTableShow: false,
      isLoadershow: false,
      nextRows: [],
      appointment_id: localStorage.getItem("AppointmentID"),
      selected_medicine_label: "",
      selected_medicine_id: "",
       newArray : JSON.parse(sessionStorage.getItem("medicine")),
       newArray1 : JSON.parse(localStorage.getItem("medicine1")),
       isSavedCalled:false,
       isOpenSnackbar: false,
       snackbarMessage: "",
       snackbarSeverity: "",
    };

    localStorage.setItem("url", properties.url);
  }

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
  Dosage = event => {
    this.setState({ dosage_val: event.target.value });
  };
  dosageForm = (event) => {
    
    this.setState({
      dosage_form: event.target.value,
    });
  };


  deleteRows = (a) => {
   
    var array = this.state.rows.slice(); // make a separate copy of the array
    var index = a;
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ nextRows: array, rows: array });
    }
  }

  AddRow = (event) => {
    this.isTableShow();
    var y = this.state.detail_rows.slice();
    this.handleOpenSnackbar(<span>Row Added</span>,
      "success"
  );
    //  this.state.nextRows = this.state.detail_rows.slice();
    //var temp_array = this.state.detail_rows1;
    // this.state.nextRows.push({
      console.log(this.state.selected_medicine_label);
      if(this.state.selected_medicine_label!=""){
        if(this.state.dosage_val!=""){
    y.push({
      ID: this.state.selected_medicine_id,
      medication: this.state.selected_medicine_label,
      dosage: this.state.dosage_val,
      DosageForm: this.state.dosage_form,
      Action: <IconButton
        color="primary"
      >
        <DeleteIcon fontSize="small"
          onClick={() => this.deleteRows(0)}
        />
      </IconButton>
    });
    this.state.rowid++;
    this.setState({
      rows: y,
      detail_rows: y,
      selected_medicine_id:"",
      selected_medicine_label:"",
      dosage_val:"",
     dosage_form:"",
    }, () => {
  
      console.log("Rows", this.state.rows);
      console.log("Details", this.state.detail_rows);
  });
  }else{
    this.handleOpenSnackbar(<span>Please Select dosage</span>,
      "info"
  );
  }
  }else{
    this.handleOpenSnackbar(<span>Please Select medicine</span>,
      "info"
  )
  }
    
  }
  LoadDosageForm () {
let url = localStorage.getItem('url') + "/MobileGetMedicationsDosage?selected_medicine_id="+this.state.selected_medicine_id;
    fetch(url, {
      method: "GET",
      //body: data
    })
      .then(res => res.json())
      .then(
        (json) => {
          console.log(json);
          if (json.success === "1") {
            this.setState({
              dosage_dropdown: json.medicine_data
            })
          }
          else {
            this.handleOpenSnackbar(json.SYSTEM_MESSAGE,
              "error"
          )
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  LoadDosageDropdown () {

    for (var i = 0; i < this.state.newArray.length; i++) {
      if ((this.state.newArray[i]["proprietary_name"] +" - "+this.state.newArray[i]["non_proprietary_name"])==(this.state.selected_medicine_label)) {
        console.log((this.state.newArray[i]["proprietary_name"] +" - "+this.state.newArray[i]["non_proprietary_name"])+"=="+(this.state.selected_medicine_label));
        this.setState({
          selected_medicine_id:this.state.newArray[i]["id"]
        }, () => {
          this.LoadDosageForm();
    console.log(this.state.selected_medicine_id);
      });
      }
    }
    for (var i = 0; i < this.state.newArray1.length; i++) {
      
      if ((this.state.newArray1[i]["proprietary_name"] +" - "+this.state.newArray1[i]["non_proprietary_name"])==(this.state.selected_medicine_label)) {
        console.log((this.state.newArray1[i]["proprietary_name"] +" - "+this.state.newArray1[i]["non_proprietary_name"])+"=="+(this.state.selected_medicine_label));
        this.setState({
          selected_medicine_id:this.state.newArray1[i]["id"]
        }, () => {
          this.LoadDosageForm();
    console.log(this.state.selected_medicine_id)
      });
      }
      
    }
    
  };
  renderDosageFormOptions() {
    return this.state.Dosage_Form_dropdown.map((dt, i) => {
      console.log(this.state.Dosage_Form_dropdown);
      return (
        <MenuItem key={i} value={dt.Id}>
          {dt.Label}
        </MenuItem>
      );
    });
  }
  renderDosageOptions() {
    return this.state.dosage_dropdown.map((dt, i) => {
      return (
        <MenuItem key={i} value={dt}>
          {dt}
        </MenuItem>
      );
    });
  }
  isloder = () => {
    this.setState({ isLoadershow: false });
  }
  isTableShow = () => {
    this.setState({ isTableShow: true });
    console.log(this.state.detail_rows);
  }
  handleMenu = (event) => {
    window.location = "#/retailer/home/";
  };
  StopEnter(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }
  handleSubmit = (event, state) => {
    this.setState({
      isSavedCalled:true
    });
    let JSONMedicineIDList = "";
    let JSONDosageList = "";
    let JSONDosageFormList = "";
    for (var j = 0; j < this.state.detail_rows.length; j++) {

      if (JSONMedicineIDList.isEmpty) {
        JSONMedicineIDList += this.state.detail_rows[j]["ID"];
        JSONDosageList += this.state.detail_rows[j]["dosage"];
        JSONDosageFormList += this.detail_rows[j]["DosageForm"];
      } else {
        JSONMedicineIDList += "," + this.state.detail_rows[j]["ID"];
        JSONDosageList += "," + this.state.detail_rows[j]["dosage"];
        JSONDosageFormList += "," + this.state.detail_rows[j]["DosageForm"];
      }
    }

    let url =
      localStorage.getItem("url") +
      "/MobileSaveAllegies?appointment_id=" +
      this.state.appointment_id +
      "&medicine_id_list=" +
      JSONMedicineIDList +
      "&medicine_dosage_list=" +
      JSONDosageList +
      "&medicine_dosage_form_list=" +
      JSONDosageFormList
    console.log(url);
    fetch(url, {
      method: "POST",
      // body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((result) => {
        if (result["success"] == "1") {
          window.location = "#/home/";
        } else {
          this.handleOpenSnackbar(result["error_message"],
            "error"
        )
        }
      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  }

  getMedication = () => {

    //var newArray = JSON.parse(sessionStorage.getItem("medicine"))
   
    //  console.log(newArray['medication'][0]["proprietary_name"],newArray['medication'][0]["non_proprietary_name"],newArray['medication'][0]["id"]);

    for (var i = 0; i < this.state.newArray.length; i++) {
      if (this.state.newArray[i]["proprietary_name"] != null && this.state.newArray[i]["non_proprietary_name"] != null && this.state.newArray[i]["id"] != null) {
        OPTIONS.push(
          this.state.newArray[i]["proprietary_name"] + " - " + this.state.newArray[i]["non_proprietary_name"],

        );
      }
    }

  }
  getMedication2 = () => {


    
    console.log(this.state.newArray1[0]["proprietary_name"], this.state.newArray1[0]["non_proprietary_name"], this.state.newArray1[0]["id"]);
    console.log(this.state.newArray1);
    for (var i = 0; i < this.state.newArray1.length; i++) {
      if (this.state.newArray1[i]["proprietary_name"] != null && this.state.newArray1[i]["non_proprietary_name"] != null && this.state.newArray1[i]["id"] != null) {
        OPTIONS.push(
          this.state.newArray1[i]["proprietary_name"] + " - " + this.state.newArray1[i]["non_proprietary_name"],

        );
      }
    }
    console.log(OPTIONS);

  }
  Dosage = event => {
    this.setState({ dosage_val: event.target.value });
  };
  VerifyAppointment() {
    console.log("AppointmentID=" + localStorage.getItem("AppointmentID"));
    if (localStorage.getItem("AppointmentID") == null || localStorage.getItem("AppointmentID") == "" || localStorage.getItem("AppointmentID") == "null") {
      window.location = "#/";
    }else{

      this.getMedication();
      this.getMedication2();
    }
  }
  
  componentDidMount() {

    this.VerifyAppointment();
  }
  handleOpenSnackbar = (msg, severity) => {
    this.setState({
        isOpenSnackbar: true,
        snackbarMessage: msg,
        snackbarSeverity: severity,
    });
};
  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }
    this.setState({
        isOpenSnackbar: false,
    });
};

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>

        <form
          onKeyPress={this.StopEnter}
          onSubmit={(event) => this.handleSubmit(event, this.state)}
          autoComplete="off"
        ><Button
          type="submit"
          variant="contained"
          color="primary"
          id="submit-button"
          className={classes.button}
          style={{ display: "none" }}
        >
            submit
      </Button>

          <AppBar position="fixed">
            <Toolbar variant="dense">
              {/* <IconButton color="inherit" aria-label="Menu">
            <img src={logo1} width={30} />
          </IconButton> */}
            <img src={prosk} width={80} height={30} />
              {/* <Typography
                variant="h6"
                color="inherit"
                noWrap
                style={{ textAlign: "center" }}
              >
                Prosk™
          </Typography> */}
              <div className={classes.grow} />
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                style={{ textAlign: "center" }}
              >
                Allergies
          </Typography>
              <div className={classes.grow} />
              <div>
                <IconButton color="inherit" onClick={this.handleMenu}>
                  <HomeIcon /><Typography
                    color="inherit"
                    noWrap
                  >
                    Home
            </Typography>
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>

          <CustomizedSnackbar
                    isOpen={this.state.isOpenSnackbar}
                    message={this.state.snackbarMessage}
                    severity={this.state.snackbarSeverity}
                    handleCloseSnackbar={() => this.handleCloseSnackbar()}
                />
          <div
            style={{
              marginBottom: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
 
            {this.state.isLoadershow ? (<Card style={{ width: "98%", marginTop: "15px" }}>

              <CardContent>
                <center>

                  <CircularProgress style={{ marginTop: "10px" }} />
                </center>
              </CardContent></Card>
            ) :
              <Card style={{ width: "98%", marginTop: "4%" }}>
                <form
                  onKeyPress={this.StopEnter}
                  onSubmit={this.handleSubmit}
                  autoComplete="off"
                >
                  <CardContent>
                    <Grid container spacing={8}>
                      <Grid item xs={1} align="left">
                      </Grid>
                      <Grid item xs={11} align="center">
                        <Typography variant="title" color="primary">
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Autocomplete
                          id="virtualize-demo"
                          style={{ width: "98%" }}
                          disableListWrap
                          classes={classes}
                          ListboxComponent={ListboxComponent}
                          renderGroup={renderGroup}
                          options={OPTIONS}
                          onChange={(event, newValue) => {
                            console.log(newValue);
                            if (newValue) {
                              console.log(newValue);
                              this.setState({
                                selected_medicine_label: newValue
                              }, () => {
                                this.LoadDosageDropdown();
                            });
                            }


                          }}
                          renderInput={(params) => <TextField {...params}  label="Medicine" />}
                          renderOption={(option) => <Typography noWrap>{option}</Typography>}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl
                          style={{ width: "90%" }} className={classes.formControl}>
                          <InputLabel htmlFor="dosageId">Select Dosage</InputLabel>
                          <Select
                            IconComponent="false"
                            style={{ width: "100%" }}
                            value={this.state.dosage_val}
                            onChange={this.Dosage}
                           // error={this.state.brand_error}
                            //helperText={this.state.facility_type_error}
                            autoWidth
                            required
                            inputProps={{
                              name: "dosageId",
                              id: "dosageId"
                            }}
                          >
                            {this.renderDosageOptions()} 
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                    <FormControl
                      style={{ width: "90%", marginTop: "1%" }}
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="gender">DosageForm</InputLabel>
                      <Select
                        IconComponent="false"
                        style={{ width: "100%" }}
                        value={this.state.dosage_form}
                        onChange={this.dosageForm}
                        // error={this.state.remarks}
                        //helperText={this.state.facility_type_error}
                        autoWidth
                        required
                        inputProps={{
                          name: "DosageForm",
                          id: "Dosage Form",
                        }}
                      >
                        {this.renderDosageFormOptions()}
                      </Select>
                    </FormControl>
                  </Grid>
                      {/* <Grid item xs={12} sm={4}>
                        <TextField
                          // onKeyDown={this.StopEnter}
                          //id="remarks"
                          name="DosageForm"
                          label="Dosage Form"
                          // className={classes.textFieldCard}
                          onChange={this.dosage_form}
                          // margin="normal"
                          // error={this.state.remarks}
                          value={this.state.dosage_form}
                          //helperText={this.state.remarks_error}
                          
                          style={{ width: "90%", height: "5%" }}
                        />
                     </Grid> */}
                      <Grid item xs={12} align="right">
                        <Typography
                          variant="title"
                          style={{
                            marginTop: "10px",
                            fontSize: "20px",
                            fontFamily: "Arial",
                            fontWeight: "bolder",
                            marginRight: "3%"
                          }}
                        >
                          
                                                    <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.AddRow}
                                                    value={this.state.detail_rows}
                                                  >
                                                    <AddIcon style={{ marginRight: "1px" }} />  Add
                                  </Button>
                          
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </form>
              </Card>
            }
          </div>

          <div
            style={{
              //marginTop: "60px",
              marginBottom: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {this.state.isTableShow ? (
              <Card style={{ width: "98%" }}>
                <CardContent>
                  <Grid item xs={12} sm={12}>

                    <AllergiesFormTable
                      style={{ marginTop: "-20px" }}
                      rows={this.state.rows}
                      detail_rows={this.state.detail_rows}
                    />
                  </Grid>
                </CardContent>
              </Card>
            ) : <img src={Medicine} height="300px" width="300px" />
            }

          </div>
          <AppBar
            position="fixed"
            style={{ top: "auto", bottom: 0 }}
            color="default"
          >
            <Toolbar variant="dense">


              <div className={classes.grow} />
              {this.state.isSavedCalled?      <Loader type="TailSpin" color="#00BFFF" height={50} width={50}/>:
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                          >
                            <SaveIcon style={{ marginRight: "1px" }} />Save
                      </Button>
              }
            </Toolbar>
          </AppBar>
        </form>
      </div>
    );
  }
}
export default withStyles(useStyles)(AllergiesForm);
