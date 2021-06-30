import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Avatar,
  Stepper,
  Step,
  StepButton,
  Button,
} from "@material-ui/core";
import prosk from "./images/Logo-02.png";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import ProgressBar from 'react-animated-progress-bar';
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import BottomBar from "./BottomBar";
import * as moment from "moment";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles, withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Progress from "react-progressbar";
import { Line, Circle } from "rc-progress";
import PercentBar from "./PercentBar.js";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import DoneIcon from "@material-ui/icons/Done";
import { properties } from "./properties";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CustomizedSnackbar from './customizesnackbar/CustomizedSnackbar.js'
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = (theme) => ({
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
  bigAvatar: {
    margin: 10,
  },
  inline: {
    display: "inline",
  },
  iconSmall: {
    fontSize: 20,
  },
  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
});

const classes = makeStyles((theme) => ({
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
  bigAvatar: {
    margin: 10,
  },

  inline: {
    display: "inline",
  },
  card: {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
}));
var percentage = "10";
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#009688',
  },
}))(LinearProgress);

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

class PMH extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      PatientID: localStorage.getItem("PID"),
      appointmentID: localStorage.getItem("AppointmentID"),
      QuestionIndex: 0,
      feet: "",
      inches: "",
      meters: "",
      kg: "",
      pounds: "",
      AnswerID: "-1",
      AnswerValue: "-1",
      selectedRadioValue: "Imperial",
      selectedWeightRadioValue: "Metric",
      Title: " ",
      QuestionList: [],
      AnswerList: [],
      percentages: "5",
      selectedAnswerRadioValue: "",
      isOpenSnackbar: false,
      snackbarMessage: "",
      snackbarSeverity: "",
      progressValue: 1
    };
    const interval = setInterval(() => {
      const next = parseInt(this.state.percentages) + 25;
      this.setUploadProgress(next);
    
      if (next >= 100) {
        clearInterval(interval);
      }
    }, 1000);
    localStorage.setItem("url", properties.url);
  }
  setUploadProgress = progress => {
   
    this.setState({ percentages: progress.toString() });
  };
  feet = (event) => {
    this.setState({
      feet: !this.state.check_mobile,
    });
  };

  inches = (event) => {
    this.setState({
      inches: !this.state.check_email,
    });
  };
  meters = (event) => {
    this.setState({
      meters: event.target.value,
    });
  };

  kg = (event) => {
    this.setState({
      kg: event.target.value,
    });
  };
  pounds = (event) => {
    this.setState({
      pounds: event.target.value,
    });
  };
  handleWeightRadioChange = (event) => {
    if (this.state.selectedWeightRadioValue == "Imperial") {
      this.setState({
        selectedWeightRadioValue: "Metric",
      });
    } else if (this.state.selectedWeightRadioValue == "Metric")
      this.setState({
        selectedWeightRadioValue: "Imperial",
      });
  };
  handleRadioChange = (event) => {
    if (this.state.selectedRadioValue == "Imperial") {
      this.setState({
        selectedRadioValue: "Metric",
      });
    } else if (this.state.selectedRadioValue == "Metric")
      this.setState({
        selectedRadioValue: "Imperial",
      });
  };
  handleAnswerCheckboxChange = (checked) => {
   // console.log(checked);
    checked = !checked;
   // console.log(checked);
  };

  toggleCheckbox(index) {
    const { AnswerList } = this.state;

    AnswerList[index].checked = !AnswerList[index].checked;

    this.setState({
      AnswerList,
    });
  }
  handleAnswerRadioChange = async (event, AnswerRadioValue, answer_id) => {
   // console.log(AnswerRadioValue);
    //console.log(answer_id);
   // console.log(AnswerRadioValue);
    this.setState(
      {
        selectedAnswerRadioValue: AnswerRadioValue,
        AnswerID: answer_id,
        AnswerValue: AnswerRadioValue,
      },
      () => {
        this.NextForm(event);
      }
    );
  };

  VerifyAppointment() {
   // console.log("AppointmentID=" + localStorage.getItem("AppointmentID"));
    if (localStorage.getItem("AppointmentID") == null || localStorage.getItem("AppointmentID") == "" || localStorage.getItem("AppointmentID") == "null") {
      window.location = "#/";
    }
  }
  
  componentDidMount=()=> {
    this.VerifyAppointment();
    this.setState({
      QuestionList: [
        {
          question_no: "221",
          question_text:
            "Medical history is key to an effective treatment. We'll ask quite a few questions to:",
          survey_type: "PMH",
          asset_name: "https://proskcloud.com/images/medicine.png",
          type_id: 6,
          
        },
      ],
      AnswerList: [
        {
          answer_value: "1",
          answer_choice: "-  Understand any pre-existing medical conditions.",
          id: "2718",
        },
        {
          answer_value: "2",
          answer_choice:
            " -  Understand risk factors associated with your care plan or surgery",
          id: "2719",
        },
        {
          answer_value: "3",
          answer_choice: "-  Review core functions of your body",
          id: "2720",
        },
      ],
    });
  }
  SkipForm(event) {
    event.preventDefault();
    this.state.QuestionIndex++;
    event.preventDefault();
    if (this.state.QuestionIndex == 1) {
      this.setState(
        {
          AnswerID: "-1",
          AnswerValue: "-1",
          AnswerList: [],
          QuestionList: [],
          survey: [],
        },
        () => {
          this.state.QuestionList.push({
            question_no: "222",
            question_text:
              "Which of the following medical conditions have you been diagnosed with?",
            survey_type: "PMH",
            type_id: 5,
          });
          this.state.AnswerList.push({
            answer_value: "",
            answer_choice: "Cardiovascular System",
            id: "2714",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "1",
            answer_choice: "High cholestrol",
            id: "2714",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "4",
            answer_choice: "High Blood Pressure",
            id: "2717",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "5",
            answer_choice: "Heart Disease",
            id: "2718",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "6",
            answer_choice: "Heart Murmur",
            id: "2719",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "7",
            answer_choice: "Blood Clots",
            id: "2720",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "8",
            answer_choice: "Aneurysm",
            id: "2721",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "",
            answer_choice: "Gastrointestinal System",
            id: "2714",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "18",
            answer_choice: "Gastroesophageal reflux disease",
            id: "2731",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "19",
            answer_choice: "Peptic ulcer disease",
            id: "2732",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "20",
            answer_choice: "Intestinal bleeding",
            id: "2733",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "21",
            answer_choice: "Crohns disease",
            id: "2734",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "22",
            answer_choice: "Diverticulitis",
            id: "2735",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "23",
            answer_choice: "Irritable bowel syndrome",
            id: "2736",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "24",
            answer_choice: "Abnormal liver function test",
            id: "2737",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "28",
            answer_choice: "Liver Disease",
            id: "2737",
            checked: false,
          });

          this.state.AnswerList.push({
            answer_value: "",
            answer_choice: "Respiratory System",
            id: "2714",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "13",
            answer_choice: "Ashthma",
            id: "2726",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "14",
            answer_choice: "COPD",
            id: "2727",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "15",
            answer_choice: "Emphysema",
            id: "2728",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "16",
            answer_choice: "Chronic bronchitis",
            id: "2729",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "17",
            answer_choice: "Sleep apnea",
            id: "2730",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "",
            answer_choice: "Other",
            id: "2714",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "2",
            answer_choice: "Borderline diabetes",
            id: "2715",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "3",
            answer_choice: "Diabetes",
            id: "2716",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "9",
            answer_choice: "Cancer in any part of your body",
            id: "2722",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "10",
            answer_choice: "Bleeding tendency",
            id: "2723",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "9",
            answer_choice: "Stroke",
            id: "2722",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "10",
            answer_choice: "Ministroke or TIA",
            id: "2723",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "11",
            answer_choice: "Paralysis",
            id: "2724",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "12",
            answer_choice: "Blindness",
            id: "2725",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "25",
            answer_choice: "Abnormal Kidney functions tests",
            id: "2738",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "26",
            answer_choice: "Kidney stones",
            id: "2739",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "27",
            answer_choice: "Decreased kidney function",
            id: "2740",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "27",
            answer_choice: "Kidney failure",
            id: "2740",
            checked: false,
          });
          this.setState({
            AnswerList: this.state.AnswerList,
          });

         // console.log(this.state.QuestionList);
        //  console.log(this.state.AnswerList);
        //  console.log(this.state.MyAnswerList);
        }
      );
    } else if (this.state.QuestionIndex == 2) {
      var percent = this.state.progressValue+2;
    this.setState({progressValue:percent});
      let AnswerIDList = "";
      let AnswerValueList = "";

      for (let j = 0; j < this.state.AnswerList.length; j++) {
        if (AnswerIDList == "") {
          if (this.state.AnswerList[j]["checked"] == true) {
            AnswerIDList += this.state.AnswerList[j]["id"].toString();
            AnswerValueList += this.state.AnswerList[j]["answer_value"].toString();
          }
        } else {
          if (this.state.AnswerList[j]["checked"] == true) {
            AnswerIDList += "," + this.state.AnswerList[j]["id"].toString();
            AnswerValueList += "," + this.state.AnswerList[j]["answer_value"].toString();
          }
        }
      }
 
      let url =
        localStorage.getItem("url") +
        "/MobileMakeMedicalHistory?appointment_id=" +
        this.state.appointmentID +
        "&answer_id_check=" +
        AnswerIDList +
        "&answer_value_check=" +
        AnswerValueList+
        "&question_id=" +
        this.state.QuestionList[0]["question_no"].toString();

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
            if (result["next_question_id"] == "0") {
              window.location = "#/home/";
            } else {
              this.setState({
                AnswerID: "-1",
                AnswerValue: "-1",
                AnswerList: [],
                QuestionList: [
                  {
                    question_no: result["question_id"],
                    question_text: result["question_text"],
                    min_medical_history_id: result[
                      "min_medical_history_id"
                    ].toString(),
                    medical_history_id: result["medical_history_id"],
                    type_id: result["type_id"],
                    asset_name: result["asset_name"],
                  },
                ],
              });

              var Answers = result["answer_data"];
              for (var i = 0; i < Answers.length; i++) {
                this.state.AnswerList.push({
                  answer_value: Answers[i]["answer_value"],
                  answer_choice: Answers[i]["answer_choice"],
                  asset_name: Answers[i]["asset_name"],
                  answer_id: Answers[i]["answer_id"],
                });
              }

              this.setState({
                AnswerList: this.state.AnswerList,
              });
            }
          } else {
            this.handleOpenSnackbar(result["error_message"],
              "error"
          )
          }
        })
        .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
          "error"
      ));
    } else {
      if (this.state.QuestionList[0]["question_no"].toString() == "277") {
        window.location = "#/home/";
      } else {
        var percent = this.state.progressValue+2;
    this.setState({progressValue:percent});
        let url =
          localStorage.getItem("url") +
          "/MobileSaveMedicalHistoryAnswer?appointment_id=" +
          this.state.appointmentID +
          "&question_id=" +
          this.state.QuestionList[0]["question_no"] +
          "&answer_id=" +
          this.state.AnswerID +
          "&answer_value=" +
          this.state.AnswerValue +
          "&next_question_id=" +
          this.state.QuestionList[0]["next_question_id"] +
          "&type_id=" +
          this.state.QuestionList[0]["type_id"] +
          "&medical_history_id=" +
          this.state.QuestionList[0]["medical_history_id"] +
          "&min_medical_history_id=" +
          this.state.QuestionList[0]["min_medical_history_id"];

        if (this.state.QuestionList[0]["type_id"] == 2) {
          var AnswerIDList = "";
          var AnswerValueList = "";

          for (let j = 0; j < this.state.AnswerList.length; j++) {
            if (AnswerIDList == "") {
              if (this.state.AnswerList[j]["checked"] == true) {
                AnswerIDList += this.state.AnswerList[j][
                  "answer_id"
                ].toString();
                AnswerValueList += this.state.AnswerList[j][
                  "answer_value"
                ].toString();
              }
            } else {
              if (this.state.AnswerList[j]["checked"] == true) {
                AnswerIDList +=
                  "," + this.state.AnswerList[j]["answer_id"].toString();
                AnswerValueList +=
                  "," + this.state.AnswerList[j]["answer_value"].toString();
              }
            }
          }
          url =
            localStorage.getItem("url") +
            "/MobileSaveMedicalHistoryAnswer?appointment_id=" +
            this.state.appointmentID +
            "&question_id=" +
            this.state.QuestionList[0]["question_no"] +
            "&answer_id_check=" +
            AnswerIDList +
            "&answer_value_check=" +
            AnswerValueList +
            "&next_question_id=" +
            this.state.QuestionList[0]["next_question_id"] +
            "&type_id=" +
            this.state.QuestionList[0]["type_id"] +
            "&medical_history_id=" +
            this.state.QuestionList[0]["medical_history_id"] +
            "&min_medical_history_id=" +
            this.state.QuestionList[0]["min_medical_history_id"];
        }

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
              if (result["next_question_id"] == "0") {
                window.location = "#/home/";
              } else {
                this.setState({
                  AnswerID: "-1",
                  AnswerValue: "-1",
                  AnswerList: [],
                  QuestionList: [
                    {
                      question_no: result["question_id"],
                      question_text: result["question_text"],
                      min_medical_history_id: result[
                        "min_medical_history_id"
                      ].toString(),
                      medical_history_id: result["medical_history_id"],
                      type_id: result["type_id"],
                      asset_name: result["asset_name"],
                    },
                  ],
                });

                var Answers = result["answer_data"];
                for (var i = 0; i < Answers.length; i++) {
                  this.state.AnswerList.push({
                    answer_value: Answers[i]["answer_value"],
                    answer_choice: Answers[i]["answer_choice"],
                    asset_name: Answers[i]["asset_name"],
                    answer_id: Answers[i]["answer_id"],
                  });
                }

                this.setState({
                  AnswerList: this.state.AnswerList,
                });
              }
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
    }
  }

  NextForm = (event)  => {
    this.state.QuestionIndex++;
    event.preventDefault();
    if (this.state.QuestionIndex == 1) {
      
    var percent = this.state.progressValue+2;
    this.setState({progressValue:percent});
      this.setState(
        {
          AnswerID: "-1",
          AnswerValue: "-1",
          AnswerList: [],
          QuestionList: [],
          survey: [],
        },
        () => {
        
          this.state.QuestionList.push({
            question_no: "222",
            question_text:
              "Which of the following medical conditions have you been diagnosed with?",
            survey_type: "PMH",
            type_id: 5,
          });
          this.state.AnswerList.push({
            answer_value: "",
            answer_choice: "Cardiovascular System",
            id: "2714",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "1",
            answer_choice: "High cholestrol",
            id: "2714",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "4",
            answer_choice: "High Blood Pressure",
            id: "2717",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "5",
            answer_choice: "Heart Disease",
            id: "2718",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "6",
            answer_choice: "Heart Murmur",
            id: "2719",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "7",
            answer_choice: "Blood Clots",
            id: "2720",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "8",
            answer_choice: "Aneurysm",
            id: "2721",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "",
            answer_choice: "Gastrointestinal System",
            id: "2714",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "18",
            answer_choice: "Gastroesophageal reflux disease",
            id: "2731",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "19",
            answer_choice: "Peptic ulcer disease",
            id: "2732",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "20",
            answer_choice: "Intestinal bleeding",
            id: "2733",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "21",
            answer_choice: "Crohns disease",
            id: "2734",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "22",
            answer_choice: "Diverticulitis",
            id: "2735",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "23",
            answer_choice: "Irritable bowel syndrome",
            id: "2736",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "24",
            answer_choice: "Abnormal liver function test",
            id: "2737",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "28",
            answer_choice: "Liver Disease",
            id: "2737",
            checked: false,
          });

          this.state.AnswerList.push({
            answer_value: "",
            answer_choice: "Respiratory System",
            id: "2714",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "13",
            answer_choice: "Asthma ",
            id: "2726",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "14",
            answer_choice: "COPD",
            id: "2727",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "15",
            answer_choice: "Emphysema",
            id: "2728",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "16",
            answer_choice: "Chronic bronchitis",
            id: "2729",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "17",
            answer_choice: "Sleep apnea",
            id: "2730",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "",
            answer_choice: "Other",
            id: "2714",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "2",
            answer_choice: "Borderline diabetes",
            id: "2715",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "3", 
            answer_choice: "Diabetes ",
            id: "2716",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "9",
            answer_choice: "Cancer in any part of your body",
            id: "2722",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "10",
            answer_choice: "Bleeding tendency",
            id: "2723",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "9",
            answer_choice: "Stroke",
            id: "2722",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "10",
            answer_choice: "Ministroke or TIA",
            id: "2723",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "11",
            answer_choice: "Paralysis",
            id: "2724",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "12",
            answer_choice: "Blindness",
            id: "2725",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "25",
            answer_choice: "Abnormal Kidney functions tests",
            id: "2738",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "26",
            answer_choice: "Kidney stones",
            id: "2739",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "27",
            answer_choice: "Decreased kidney function",
            id: "2740",
            checked: false,
          });
          this.state.AnswerList.push({
            answer_value: "27",
            answer_choice: "Kidney failure",
            id: "2740",
            checked: false,
          });
          this.setState({
            AnswerList: this.state.AnswerList,
          });

         // console.log(this.state.QuestionList);
         // console.log(this.state.AnswerList);
          //console.log(this.state.MyAnswerList);
        }
      );
    } else if (this.state.QuestionIndex == 2) {
      
    var percent = this.state.progressValue+2;
    this.setState({progressValue:percent});
      let AnswerIDList = "";
      let AnswerValueList = "";

      for (let j = 0; j < this.state.AnswerList.length; j++) {
        if (AnswerIDList == "") {
          if (this.state.AnswerList[j]["checked"] == true) {
            AnswerIDList += this.state.AnswerList[j]["id"].toString();
            AnswerValueList += this.state.AnswerList[j]["answer_value"].toString();
          }
        } else {
          if (this.state.AnswerList[j]["checked"] == true) {
            AnswerIDList += "," + this.state.AnswerList[j]["id"].toString();
            AnswerValueList += "," + this.state.AnswerList[j]["answer_value"].toString();
          }
        }
      }
 
      let url =
        localStorage.getItem("url") +
        "/MobileMakeMedicalHistory?appointment_id=" +
        this.state.appointmentID +
        "&answer_id_check=" +
        AnswerIDList +
        "&answer_value_check=" +
        AnswerValueList+
        "&question_id=" +
        this.state.QuestionList[0]["question_no"].toString();

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
            if (result["next_question_id"] == "0") {
              window.location = "#/home/";
            } else {
            
              this.setState({
                AnswerID: "-1",
                AnswerValue: "-1",
                AnswerList: [],
                QuestionList: [
                  {
                    question_no: result["question_id"],
                    question_text: result["question_text"],
                    min_medical_history_id: result[
                      "min_medical_history_id"
                    ].toString(),
                    medical_history_id: result["medical_history_id"],
                    type_id: result["type_id"],
                    asset_name: result["asset_name"],
                  },
                ],
              });
           
              var Answers = result["answer_data"];
              for (var i = 0; i < Answers.length; i++) {
                this.state.AnswerList.push({
                  answer_value: Answers[i]["answer_value"],
                  answer_choice: Answers[i]["answer_choice"],
                  asset_name: Answers[i]["asset_name"],
                  answer_id: Answers[i]["answer_id"],
                });
              }

              this.setState({
                AnswerList: this.state.AnswerList,
              });
            }
          } else {
            this.handleOpenSnackbar(result["error_message"],
              "error"
          )
          }
        })
        .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
          "error"
      ));
    } else {
      if (this.state.QuestionList[0]["question_no"].toString() == "277") {
        window.location = "#/home/";
      } else {
        if (
          this.state.AnswerID == "-1" &&
          (this.state.QuestionList[0]["type_id"] == 1 ||
            this.state.QuestionList[0]["type_id"] == 6)
        ) {
          this.handleOpenSnackbar(<span>Please select answer first</span>,
            "info"
        )
        } else {
          
    var percent = this.state.progressValue+2;
    this.setState({progressValue:percent});
          let url =
            localStorage.getItem("url") +
            "/MobileSaveMedicalHistoryAnswer?appointment_id=" +
            this.state.appointmentID +
            "&question_id=" +
            this.state.QuestionList[0]["question_no"] +
            "&answer_id=" +
            this.state.AnswerID +
            "&answer_value=" +
            this.state.AnswerValue +
            "&next_question_id=" +
            this.state.QuestionList[0]["next_question_id"] +
            "&type_id=" +
            this.state.QuestionList[0]["type_id"] +
            "&medical_history_id=" +
            this.state.QuestionList[0]["medical_history_id"] +
            "&min_medical_history_id=" +
            this.state.QuestionList[0]["min_medical_history_id"];

          if (this.state.QuestionList[0]["type_id"] == 2) {
            var AnswerIDList = "";
            var AnswerValueList = "";

            for (let j = 0; j < this.state.AnswerList.length; j++) {
              if (AnswerIDList == "") {
                if (this.state.AnswerList[j]["checked"] == true) {
                  AnswerIDList += this.state.AnswerList[j][
                    "answer_id"
                  ].toString();
                  AnswerValueList += this.state.AnswerList[j][
                    "answer_value"
                  ].toString();
                }
              } else {
                if (this.state.AnswerList[j]["checked"] == true) {
                  AnswerIDList +=
                    "," + this.state.AnswerList[j]["answer_id"].toString();
                  AnswerValueList +=
                    "," + this.state.AnswerList[j]["answer_value"].toString();
                }
              }
            }
            url =
              localStorage.getItem("url") +
              "/MobileSaveMedicalHistoryAnswer?appointment_id=" +
              this.state.appointmentID +
              "&question_id=" +
              this.state.QuestionList[0]["question_no"] +
              "&answer_id_check=" +
              AnswerIDList +
              "&answer_value_check=" +
              AnswerValueList +
              "&next_question_id=" +
              this.state.QuestionList[0]["next_question_id"] +
              "&type_id=" +
              this.state.QuestionList[0]["type_id"] +
              "&medical_history_id=" +
              this.state.QuestionList[0]["medical_history_id"] +
              "&min_medical_history_id=" +
              this.state.QuestionList[0]["min_medical_history_id"];
          }

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
                if (result["next_question_id"] == "0") {
                  window.location = "#/home/";
                } else {
                  this.setState({
                    AnswerID: "-1",
                    AnswerValue: "-1",
                    AnswerList: [],
                    selectedAnswerRadioValue: "",
                    QuestionList: [
                      {
                        question_no: result["question_id"],
                        question_text: result["question_text"],
                        min_medical_history_id: result[
                          "min_medical_history_id"
                        ].toString(),
                        medical_history_id: result["medical_history_id"],
                        type_id: result["type_id"],
                        asset_name: result["asset_name"],
                      },
                    ],
                  });
                  if( result["question_id"].toString() == "277") {
                
                    var percent = 100;
                    this.setState({progressValue:percent});
                              }
                  var Answers = result["answer_data"];
                  for (var i = 0; i < Answers.length; i++) {
                    this.state.AnswerList.push({
                      answer_value: Answers[i]["answer_value"],
                      answer_choice: Answers[i]["answer_choice"],
                      asset_name: Answers[i]["asset_name"],
                      answer_id: Answers[i]["answer_id"],
                    });
                  }

                  this.setState({
                    AnswerList: this.state.AnswerList,
                  });
                }
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
      }
    }
  }

  BackForm(event) {
    event.preventDefault();
    if (this.state.AnswerID == "") {
      this.setState({
        AnswerID: "-1",
        AnswerValue: "-1",
      });
    }

    this.state.QuestionIndex--;
    var percent = this.state.progressValue-2;
    this.setState({progressValue:percent});
    let url =
      localStorage.getItem("url") +
      "/MobileGetPreviousMedicalHistoryAnswer?appointment_id=" +
      this.state.appointmentID +
      "&question_id=" +
      this.state.QuestionList[0]["question_no"].toString() +
      "&min_medical_history_id=" +
      this.state.QuestionList[0]["min_medical_history_id"].toString() +
      "&answer_value=" +
      this.state.AnswerValue;

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
          this.setState({
            AnswerID: "-1",
            AnswerValue: "-1",
            AnswerList: [],
            selectedAnswerRadioValue: "",
            QuestionList: [
              {
                question_no: result["question_id"],
                question_text: result["question_text"],
                min_medical_history_id: result[
                  "min_medical_history_id"
                ].toString(),
                medical_history_id: result["medical_history_id"],
                type_id: result["type_id"],
                asset_name: result["asset_name"],
              },
            ],
          });

          var Answers = result["answer_data"];
          for (var i = 0; i < Answers.length; i++) {
            this.state.AnswerList.push({
              answer_value: Answers[i]["answer_value"],
              answer_choice: Answers[i]["answer_choice"],
              asset_name: Answers[i]["asset_name"],
              answer_id: Answers[i]["answer_id"],
            });
          }

          this.setState({
            AnswerList: this.state.AnswerList,
          });
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
  keyPress(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }
  StopEnter(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }
  handleMenu = (event) => {
    window.location = "#/home/";
  };
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
   // const { percentage } = this.props;
    
    return (
      <div className={classes.root} >
        <form
          onKeyPress={this.StopEnter}
          onSubmit={(event) => this.handleSubmit(event, this.state)}
          autoComplete="off"
        >
          {" "}
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
          <AppBar position="fixed">
            <Toolbar variant="dense">
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
                Medical History
              </Typography>
              <div className={classes.grow} />
              <div>
                <IconButton color="inherit" onClick={this.handleMenu}>
                  <HomeIcon />
                  <Typography color="inherit" noWrap>
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
          <div style={{ marginTop: "60px" }}>
            <Card style={{ width: "98%", margin: "auto" }}>
              <CardContent >
                
                {this.state.QuestionList.map((QuestionLists, idx,) => (
                  <React.Fragment key={idx}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} align="left" style={{
                            marginBottom: "10px",
                          }}>
                        <Typography
                          variant="title"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Arial",
                            fontWeight: "bolder",
                          }}
                        >
                          {QuestionLists.question_text}
                        </Typography>
                      </Grid>
                      {QuestionLists.type_id == 6 ? (
                        <Grid container>
                          {this.state.AnswerList.map((AnswerLists, idx) => (
                            <React.Fragment key={idx}>
                              <Grid item xs={12} align="left">
                                <Typography
                                  variant="title"
                                  style={{
                                    marginTop: "10px",
                                    fontSize: "18px",
                                    fontFamily: "Arial",
                                  }}
                                >
                                  {AnswerLists.answer_choice}
                                </Typography>
                              </Grid>
                            </React.Fragment>
                          ))}
                        </Grid>
                      ) : (
                        <Grid container></Grid>
                      )}

                      {QuestionLists.type_id == 3 ? (
                        <Grid container>
                          {this.state.AnswerList.map((AnswerLists, idx) => (
                            <React.Fragment key={idx}>
                              <Grid item xs={12} align="left">
                                <Typography
                                  variant="title"
                                  style={{
                                    marginTop: "10px",
                                    fontSize: "18px",
                                    fontFamily: "Arial",
                                  }}
                                >
                                  {AnswerLists.answer_choice}
                                </Typography>
                              </Grid>
                            </React.Fragment>
                          ))}
                        </Grid>
                      ) : (
                        <Grid container></Grid>
                      )}
                      {QuestionLists.type_id == 2 ? (
                        <Grid container>
                          {this.state.AnswerList.map((AnswerLists, idx) => (
                            <Grid container key={idx}>
                              <React.Fragment key={idx}>
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  style={{ marginLeft: "15px" }}
                                  align="left"
                                >
                                  <FormControl component="fieldset">
                                    <RadioGroup
                                      aria-label="position"
                                      name="position"
                                      defaultValue="top"
                                    >
                                      <FormControlLabel
                                        value={AnswerLists.answer_value}
                                        control={
                                          <Checkbox
                                            checked={AnswerLists.checked}
                                            name={AnswerLists.answer_choice}
                                            onChange={this.toggleCheckbox.bind(
                                              this,
                                              idx
                                            )}
                                            color="primary"
                                          />
                                        }
                                        label={AnswerLists.answer_choice}
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                </Grid>
                              </React.Fragment>
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        <Grid container></Grid>
                      )}
                      {QuestionLists.type_id == 5 ? (
                        <Grid container>
                          {this.state.AnswerList.map((AnswerLists, idx) => (
                            <Grid container key={idx}>
                              {AnswerLists.answer_value == "" ? (
                                <React.Fragment key={idx}>
                                  <Grid
                                    item
                                    xs={12}
                                    align="left"
                                    style={{ marginLeft: "5px" }}
                                  >
                                    <Typography
                                      variant="title"
                                      style={{
                                        fontSize: "20px",
                                        fontFamily: "Arial",
                                        fontWeight: "bolder",
                                      }}
                                    >
                                      {AnswerLists.answer_choice}
                                    </Typography>
                                  </Grid>
                                </React.Fragment>
                              ) : (
                                <React.Fragment key={idx}>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={3}
                                    style={{ marginLeft: "15px" }}
                                    align="left"
                                  >
                                    <FormControl component="fieldset">
                                      <RadioGroup
                                        aria-label="position"
                                        name="position"
                                        defaultValue="top"
                                      >
                                        <FormControlLabel
                                          value={AnswerLists.answer_value}
                                          control={
                                            <Checkbox
                                              checked={AnswerLists.checked}
                                              name={AnswerLists.answer_choice}
                                              onChange={this.toggleCheckbox.bind(
                                                this,
                                                idx
                                              )}
                                              color="primary"
                                            />
                                          }
                                          label={AnswerLists.answer_choice}
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </Grid>
                                </React.Fragment>
                              )}
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        <Grid container></Grid>
                      )}
                      {QuestionLists.type_id == 1 ? (
                        <Grid container>
                          {this.state.AnswerList.map((AnswerLists, idx) => (
                            <React.Fragment key={idx}>
                              <Grid item xs={12} align="left">
                                <FormControl component="fieldset">
                                  <RadioGroup
                                    aria-label="position"
                                    name="position"
                                    defaultValue="top"
                                  >
                                    <FormControlLabel
                                      value={AnswerLists.answer_value}
                                      control={
                                        <Radio
                                          checked={
                                            this.state
                                              .selectedAnswerRadioValue ==
                                            AnswerLists.answer_value
                                          }
                                          onChange={(event) =>
                                            this.handleAnswerRadioChange(
                                              event,
                                              AnswerLists.answer_value,
                                              AnswerLists.answer_id
                                            )
                                          }
                                          color="primary"
                                        />
                                      }
                                      label={AnswerLists.answer_choice}
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </Grid>
                            </React.Fragment>
                          ))}
                        </Grid>
                      ) : (
                        <Grid container></Grid>
                      )}
                      <Grid
                        item
                        xs={12}
                        align="center"
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                      >
                        {QuestionLists.asset_name!="null"? <img
                          style={{ height: "250px" }}
                          src={QuestionLists.asset_name}
                        />:<Grid container></Grid>}
                       
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ))}
 
                <Grid item xs={12} style={{ height: "60px" }}></Grid>

              </CardContent>
            </Card>
          </div>
          <AppBar
        position="fixed"
        style={{ top: "auto", bottom: 0 }}
        color="default"
      >
        <Toolbar variant="dense">
          {this.state.QuestionIndex == 0 ? (
               
               <Button
                variant="contained"
                color="default"
                onClick={(event) => this.handleMenu(event)}
                style={{ marginRight: "10px" }}
              >
                <SkipPreviousIcon style={{ marginRight: "1px" }} />
                Back
              </Button>
              ) : (
                <Grid></Grid>
              )}
                {this.state.QuestionIndex > 2 ? (
               
               <Button
                variant="contained"
                color="default"
                onClick={(event) => this.BackForm(event)}
                style={{ marginRight: "10px" }}
              >
                <SkipPreviousIcon style={{ marginRight: "1px" }} />
                Previous
              </Button>
              ) : (
                <Grid></Grid>
              )}
          <div className={classes.grow} />
          <BorderLinearProgress  style={{width:"30%",backgroundColor:"#8c97a0",height:"20px"}}    variant="determinate" value={this.state.progressValue} percentage={this.state.progressValue} >

          </BorderLinearProgress>
          <Typography style={{color:"#009688",fontSize:"19px",padding:"10px"}}> {this.state.progressValue}%</Typography>
          <div className={classes.grow} />
          <Button
                variant="contained"
                color="default"
                onClick={(event) => this.SkipForm(event)}
                style={{ marginRight: "10px" }}
              >
                <SkipNextIcon style={{ marginRight: "1px" }} />
                Skip
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => this.NextForm(event)}
              >
                <DoneIcon style={{ marginRight: "1px" }} />
                Next
              </Button>
        </Toolbar>
      </AppBar>

        </form>
      </div>
    );
  }
}

export default withStyles(useStyles)(PMH);
