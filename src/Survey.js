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
  CircularProgress,
} from "@material-ui/core";
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
import ProgressBar from "react-animated-progress-bar";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import DoneIcon from "@material-ui/icons/Done";
import { properties } from "./properties";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import prosk from "./images/Logo-02.png";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";
import CustomizedSnackbar from './customizesnackbar/CustomizedSnackbar.js'
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
class Survey extends React.Component {
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
      ProblemAreaId: localStorage.getItem("problem_area_id"),
      isSavedCalled:false,
    };
    localStorage.setItem("url", properties.url);
  }

  feet = (event) => {
    this.setState({
      feet: event.target.value,
    });
  };

  inches = (event) => {
    this.setState({
      inches: event.target.value,
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
  handleAnswerRadioChange = async (event, AnswerRadioValue, answer_id) => {
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
    //console.log("AppointmentID=" + localStorage.getItem("AppointmentID"));
    if (localStorage.getItem("AppointmentID") == null || localStorage.getItem("AppointmentID") == "" || localStorage.getItem("AppointmentID") == "null") {
      window.location = "#/";
    }
  }
  
  componentDidMount() {
    this.VerifyAppointment();
    this.state.percentages++;
    this.setState({
      QuestionList: [
        {
          question_no: "180",
          question_text: "In order to continue, you will need to know:",
          survey_type: "NewBackAndNeckPain",
          asset_name:
            "https://proskcloud.com/images/undraw_medical_care_movn.png",
          type_id: 7,
        },
      ],
      AnswerList: [
        {
          answer_value: "1",
          answer_choice: "-  Your weight in pounds.",
          id: "2548",
        },
        {
          answer_value: "2",
          answer_choice: " -  Your height in feet and inches.",
          id: "2683",
        },
        {
          answer_value: "3",
          answer_choice: "-  Your age.",
          id: "2684",
        },
        {
          answer_value: "4",
          answer_choice:
            "-  Whether you are considering a knee or hip joint replacement",
          id: "2685",
        },
      ],
    },()=>{
      if(localStorage.getItem("appointment_type_id")=="2"){
        this.ReturnSaveAnswer();
      }
    });

  }
  SkipForm(event) {
    if(localStorage.getItem("appointment_type_id")=="1"){
    event.preventDefault();
    this.state.QuestionIndex++;
    if (this.state.AnswerID == "") {
      this.setState({
        AnswerID: "-1",
        AnswerValue: "-1",
      });
    }
    this.setState({
      percentages: this.state.percentages + 2.1,
    });
    let url =
      localStorage.getItem("url") +
      "/MobileSaveSurveyAnswerv2?appointment_id=" +
      this.state.appointmentID +
      "&question_id=" +
      this.state.QuestionList[0]["question_no"].toString() +
      "&answer_id=" +
      this.state.AnswerID +
      "&answer_value=" +
      this.state.AnswerValue +
      "&survey_type=" +
      this.state.QuestionList[0]["survey_type"].toString() +
      "&type_id=" +
      this.state.QuestionList[0]["type_id"].toString() +
      "&kg=" +
      this.state.kg +
      "&feet=" +
      this.state.feet +
      "&inches=" +
      this.state.inches +
      "&meters=" +
      this.state.meters +
      "&pound=" +
      this.state.pounds+
      "&problem_area_id=" +
      this.state.ProblemAreaId;

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
            window.location = "#/SurveyScore/";
          } else {
            this.setState({
              AnswerID: "-1",
              AnswerValue: "-1",
              AnswerList: [],
              QuestionList: [
                {
                  question_no: result["next_question_id"],
                  question_text: result["question_text"],
                  survey_type: result["survey_type"],
                  type_id: result["type_id"],
                  asset_name: result["asset_name"],
                },
              ],
              feet: result["feet"].toString(),
              inches: result["inches"].toString(),
              meters: result["meters"].toString(),
              kg: result["kg"].toString(),
              pounds: result["pounds"].toString(),
              Title: result["module_name"].toString(),
            });

            var Answers = result["answer_data"];
            let MyAnswerList = [];
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
            },
            () => {
              for (var i = 0; i < this.state.AnswerList.length; i++) {
                if (result["selected_answer_id"] == this.state.AnswerList[i]["answer_id"]) {
                  this.setState({
                    AnswerID :this.state.AnswerList[i]["answer_id"],
                    AnswerValue: this.state.AnswerList[i]["answer_value"]
                  });
                  
                }
              }
            });

           // console.log(this.state.QuestionList);
          //  console.log(this.state.AnswerList);
          //  console.log(this.state.MyAnswerList);
          }
        } else {
          this.handleOpenSnackbar(result["error_message"],
          "error"
      )
        }
      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));}
    else if(localStorage.getItem("appointment_type_id")=="2"){
      event.preventDefault();
    this.state.QuestionIndex++;
    if (this.state.AnswerID == "") {
      this.setState({
        AnswerID: "-1",
        AnswerValue: "-1",
      });
    }
    this.setState({
      percentages: this.state.percentages + 2.1,
    });
    let url =
      localStorage.getItem("url") +
      "/MobileSaveSurveyAnswerv3?appointment_id=" +
      this.state.appointmentID +
      "&question_id=" +
      this.state.QuestionList[0]["question_no"].toString() +
      "&answer_id=" +
      this.state.AnswerID +
      "&answer_value=" +
      this.state.AnswerValue +
      "&survey_type=" +
      this.state.QuestionList[0]["survey_type"].toString() +
      "&type_id=" +
      this.state.QuestionList[0]["type_id"].toString() +
      "&kg=" +
      this.state.kg +
      "&feet=" +
      this.state.feet +
      "&inches=" +
      this.state.inches +
      "&meters=" +
      this.state.meters +
      "&pound=" +
      this.state.pounds+
      "&problem_area_id=" +
      this.state.ProblemAreaId;;

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
            window.location = "#/SurveyScore/";
          } else {
            this.setState({
              AnswerID: "-1",
              AnswerValue: "-1",
              AnswerList: [],
              QuestionList: [
                {
                  question_no: result["next_question_id"],
                  question_text: result["question_text"],
                  survey_type: result["survey_type"],
                  type_id: result["type_id"],
                  asset_name: result["asset_name"],
                },
              ],
            });

            var Answers = result["answer_data"];
            let MyAnswerList = [];
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
            },
            () => {
              for (var i = 0; i < this.state.AnswerList.length; i++) {
                if (result["selected_answer_id"] == this.state.AnswerList[i]["answer_id"]) {
                  this.setState({
                    AnswerID :this.state.AnswerList[i]["answer_id"],
                    AnswerValue: this.state.AnswerList[i]["answer_value"]
                  });
                  
                }
              }
            });

           // console.log(this.state.QuestionList);
          //  console.log(this.state.AnswerList);
          //  console.log(this.state.MyAnswerList);
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

  NextForm(event) {
    event.preventDefault();
    if(localStorage.getItem("appointment_type_id")=="1"){
    
    this.setState({
      isSavedCalled:true
    });
    if (
      this.state.AnswerID == "-1" &&
      (this.state.QuestionList[0]["type_id"] == 1 ||
        this.state.QuestionList[0]["type_id"] == 6)
    ) {
      this.handleOpenSnackbar(<span>Please select answer first</span>,
        "info"
    )
    this.setState({
      isSavedCalled:false
    });
    } else {
      
      this.setState({
        isSavedCalled:true
      });
      this.state.QuestionIndex++;
      this.state.percentages = "10";
      // this.setState({
      //   percentages: "10",
      // });
      let url =
        localStorage.getItem("url") +
        "/MobileSaveSurveyAnswerv2?appointment_id=" +
        this.state.appointmentID +
        "&question_id=" +
        this.state.QuestionList[0]["question_no"].toString() +
        "&answer_id=" +
        this.state.AnswerID +
        "&answer_value=" +
        this.state.AnswerValue +
        "&survey_type=" +
        this.state.QuestionList[0]["survey_type"].toString() +
        "&type_id=" +
        this.state.QuestionList[0]["type_id"].toString() +
        "&kg=" +
        this.state.kg +
        "&feet=" +
        this.state.feet +
        "&inches=" +
        this.state.inches +
        "&meters=" +
        this.state.meters +
        "&pound=" +
        this.state.pounds+
        "&problem_area_id=" +
        this.state.ProblemAreaId;

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
              window.location = "#/SurveyScore/";
            } else {
              this.setState({
                AnswerID: "-1",
                AnswerValue: "-1",
                AnswerList: [],
                QuestionList: [
                  {
                    question_no: result["next_question_id"],
                    question_text: result["question_text"],
                    survey_type: result["survey_type"],
                    type_id: result["type_id"],
                    asset_name: result["asset_name"],
                  },
                ],
                feet: result["feet"].toString(),
                inches: result["inches"].toString(),
                meters: result["meters"].toString(),
                kg: result["kg"].toString(),
                pounds: result["pounds"].toString(),
                Title: result["module_name"].toString(),
              });

              var Answers = result["answer_data"];
              let MyAnswerList = [];
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
              },
              () => {
                for (var i = 0; i < this.state.AnswerList.length; i++) {
                  if (result["selected_answer_id"] == this.state.AnswerList[i]["answer_id"]) {
                    this.setState({
                      AnswerID :this.state.AnswerList[i]["answer_id"],
                      AnswerValue: this.state.AnswerList[i]["answer_value"]
                    });
                    
                  }
                }
              }
             
              );
              
             // console.log(this.state.QuestionList);
            //  console.log(this.state.AnswerList);
           //   console.log(this.state.MyAnswerList);
            }
            this.setState({
              isSavedCalled:false
            });
          } else {
            this.setState({
              isSavedCalled:false
            });
            this.handleOpenSnackbar(result["error_message"],
              "error"
          )
          }
        })
        .catch((error) => {
          this.setState({
         isSavedCalled:false
       }); 
       this.handleOpenSnackbar(<span>An error occured:</span>,
         "error"
       )});
    }}else if(localStorage.getItem("appointment_type_id")=="2"){
      this.ReturnSaveAnswer();
    }
  }



  ReturnSaveAnswer=()=> {   
    if (
      this.state.AnswerID == "-1" &&
      (this.state.QuestionList[0]["type_id"] == 1 ||
        this.state.QuestionList[0]["type_id"] == 6)
    ) {
      this.handleOpenSnackbar(<span>Please select answer first</span>,
        "info"
    )
    }else { 
      this.state.QuestionIndex++;
      this.state.percentages = "10";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
       let url =
         localStorage.getItem("url") +
         "/MobileSaveSurveyAnswerv3?appointment_id=" +
         this.state.appointmentID +
         "&question_id=" +
         this.state.QuestionList[0]["question_no"].toString() +
         "&answer_id=" +
         this.state.AnswerID +
         "&answer_value=" +
         this.state.AnswerValue +
         "&survey_type=" +
         this.state.QuestionList[0]["survey_type"].toString() +
         "&type_id=" +
         this.state.QuestionList[0]["type_id"].toString() +
         "&kg=" +
         this.state.kg +
         "&feet=" +
         this.state.feet +
         "&inches=" +
         this.state.inches +
         "&meters=" +
         this.state.meters +
         "&pound=" +
         this.state.pounds+
         "&problem_area_id=" +
         this.state.ProblemAreaId;
         console.log(url)
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
           console.log(result)
           if (result["success"] == "1") {
             if (result["next_question_id"] == "0") {
               window.location = "#/SurveyScore/";
             } else {
               this.setState({
                AnswerID: "-1",
                AnswerValue: "-1",
                 AnswerList: [],
                 QuestionList: [
                   {
                     question_no: result["next_question_id"],
                     question_text: result["question_text"],
                     survey_type: result["survey_type"],
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
                 QuestionList:this.state.QuestionList,
                 AnswerList: this.state.AnswerList,
               },
               () => {
                 for (var i = 0; i < this.state.AnswerList.length; i++) {
                   if (result["selected_answer_id"] == this.state.AnswerList[i]["answer_id"]) {
                     this.setState({
                       AnswerID :this.state.AnswerList[i]["answer_id"],
                       AnswerValue: this.state.AnswerList[i]["answer_value"]
                     });
                     
                   }
                 }
               }
              
               );
             }
           } else {
             this.handleOpenSnackbar(result["error_message"],
               "error"
           )
           }
         })
         .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
           "error"
       ));}
   }


  BackForm(event) {
    if(localStorage.getItem("appointment_type_id")=="1"){
    event.preventDefault();
    if (this.state.AnswerID == "") {
      this.setState({
        AnswerID: "-1",
        AnswerValue: "-1",
      });
    }

    this.state.QuestionIndex--;
    this.setState({
      percentages: this.state.percentages - 2.1,
    });
    let url =
      localStorage.getItem("url") +
      "/MobileGetPreviousSurveyAnswer?appointment_id=" +
      this.state.appointmentID +
      "&question_id=" +
      this.state.QuestionList[0]["question_no"].toString()+
      "&problem_area_id=" +
      this.state.ProblemAreaId;

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
            window.location = "#/SurveyScore";
          } else {
            this.setState({
              AnswerID: "-1",
              AnswerValue: "-1",
              AnswerList: [],
              QuestionList: [
                {
                  question_no: result["next_question_id"],
                  question_text: result["question_text"],
                  survey_type: result["survey_type"],
                  type_id: result["type_id"],
                  asset_name: result["asset_name"],
                },
              ],
              feet: result["feet"] + "",
              inches: result["inches"] + "",
              meters: result["meters"] + "",
              kg: result["kg"] + "",
              pounds: result["pounds"] + "",
              Title: result["module_name"] + "",
            });

            var Answers = result["answer_data"];
            let MyAnswerList = [];
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
            },
            () => {
              for (var i = 0; i < this.state.AnswerList.length; i++) {
                if (result["selected_answer_id"] == this.state.AnswerList[i]["answer_id"]) {
                  this.setState({
                    AnswerID :this.state.AnswerList[i]["answer_id"],
                    AnswerValue: this.state.AnswerList[i]["answer_value"]
                  });
                  
                }
              }
            });

          //  console.log(this.state.QuestionList);
          //  console.log(this.state.AnswerList);
         //   console.log(this.state.MyAnswerList);
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
      }else if(localStorage.getItem("appointment_type_id")=="2"){
        event.preventDefault();
        if (this.state.AnswerID == "") {
          this.setState({
            AnswerID: "-1",
            AnswerValue: "-1",
          });
        }
    
        this.state.QuestionIndex--;
        this.setState({
          percentages: this.state.percentages - 2.1,
        });
        let url =
          localStorage.getItem("url") +
          "/MobileGetPreviousSurveyAnswerv2?appointment_id=" +
          this.state.appointmentID +
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
                window.location = "#/SurveyScore";
              } else {
                this.setState({
                  AnswerID: "-1",
                  AnswerValue: "-1",
                  AnswerList: [],
                  QuestionList: [
                    {
                      question_no: result["next_question_id"],
                      question_text: result["question_text"],
                      survey_type: result["survey_type"],
                      type_id: result["type_id"],
                      asset_name: result["asset_name"],
                    },
                  ],
                  feet: result["feet"] + "",
                  inches: result["inches"] + "",
                  meters: result["meters"] + "",
                  kg: result["kg"] + "",
                  pounds: result["pounds"] + "",
                  Title: result["module_name"] + "",
                });
    
                var Answers = result["answer_data"];
                let MyAnswerList = [];
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
                },
                () => {
                  for (var i = 0; i < this.state.AnswerList.length; i++) {
                    if (result["selected_answer_id"] == this.state.AnswerList[i]["answer_id"]) {
                      this.setState({
                        AnswerID :this.state.AnswerList[i]["answer_id"],
                        AnswerValue: this.state.AnswerList[i]["answer_value"]
                      });
                      
                    }
                  }
                });
    
              //  console.log(this.state.QuestionList);
              //  console.log(this.state.AnswerList);
             //   console.log(this.state.MyAnswerList);
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
    const myRef = document.querySelector(".scrollable-div");
    return (
      <div className={classes.root} classesName="scrollable-div">
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
                Questionnaire
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
                {this.state.QuestionList.map((QuestionLists, idx) => (
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
                      {QuestionLists.type_id == 7 ? (
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

                      {QuestionLists.type_id == 8 ? (
                        <Grid container>
                          {/* <Grid item xs={12} align="left">
                            <FormControl component="fieldset">
                              <FormLabel component="legend">
                                {" "}
                                My measurement is in:
                              </FormLabel>
                              <RadioGroup
                                row
                                aria-label="position"
                                name="position"
                                defaultValue="top"
                              >
                                <FormControlLabel
                                  value="Imperial"
                                  control={
                                    <Radio
                                      checked={
                                        this.state.selectedRadioValue ==
                                        "Imperial"
                                      }
                                      onChange={this.handleRadioChange}
                                      color="primary"
                                    />
                                  }
                                  label="Imperial"
                                />
                                <FormControlLabel
                                  value="Metric"
                                  control={
                                    <Radio
                                      checked={
                                        this.state.selectedRadioValue ==
                                        "Metric"
                                      }
                                      onChange={this.handleRadioChange}
                                      color="primary"
                                    />
                                  }
                                  label="Metric"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Grid> */}
                          {this.state.selectedRadioValue == "Imperial" ? (
                            <Grid container>
                              {" "}
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  // onKeyDown={this.StopEnter}
                                  //id="remarks"
                                  name="Feet"
                                  label="Feet"
                                  style={{ width: "95%", height: "5%" }}
                                  className={classes.textFieldCard}
                                  onChange={this.feet}
                                  // margin="normal"
                                  // error={this.state.remarks}
                                  value={this.state.feet}
                                  //helperText={this.state.remarks_error}
                                  required={
                                    this.state.selectedRadioValue == "Imperial"
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  // onKeyDown={this.StopEnter}
                                  //id="remarks"
                                  name="inches"
                                  label="Inches"
                                  // className={classes.textFieldCard}
                                  onChange={this.inches}
                                  // margin="normal"
                                  // error={this.state.remarks}
                                  value={this.state.inches}
                                  required={
                                    this.state.selectedRadioValue == "Imperial"
                                  }
                                  //helperText={this.state.remarks_error}
                                  // required
                                  style={{ width: "95%", height: "5%" }}
                                />
                              </Grid>
                            </Grid>
                          ) : (
                            <Grid item xs={12} sm={12}>
                              <TextField
                                // onKeyDown={this.StopEnter}
                                //id="remarks"
                                name="meters"
                                label="Meters"
                                // className={classes.textFieldCard}
                                onChange={this.meters}
                                // margin="normal"
                                // error={this.state.remarks}
                                value={this.state.meters}
                                required={
                                  this.state.selectedRadioValue == "Metric"
                                }
                                //helperText={this.state.remarks_error}
                                // required
                                style={{ width: "100%", height: "5%" }}
                              />
                            </Grid>
                          )}
                        </Grid>
                      ) : (
                        <Grid container></Grid>
                      )}

                      {QuestionLists.type_id == 9 ? (
                        <Grid container>
                          {/* <Grid item xs={12} align="left">
                            <FormControl component="fieldset">
                              <FormLabel component="legend">
                                {" "}
                                My measurement is in:
                              </FormLabel>
                              <RadioGroup
                                row
                                aria-label="position"
                                name="position"
                                defaultValue="top"
                              >
                                <FormControlLabel
                                  value="Metric"
                                  control={
                                    <Radio
                                      checked={
                                        this.state.selectedWeightRadioValue ==
                                        "Metric"
                                      }
                                      onChange={this.handleWeightRadioChange}
                                      color="primary"
                                    />
                                  }
                                  label="Metric"
                                />
                                <FormControlLabel
                                  value="Imperial"
                                  control={
                                    <Radio
                                      checked={
                                        this.state.selectedWeightRadioValue ==
                                        "Imperial"
                                      }
                                      onChange={this.handleWeightRadioChange}
                                      color="primary"
                                    />
                                  }
                                  label="Imperial"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Grid> */}
                          <Grid item xs={12} sm={12}>
                              <TextField
                                // onKeyDown={this.StopEnter}
                                //id="remarks"
                                name="pounds"
                                label="Pounds"
                                // className={classes.textFieldCard}
                                onChange={this.pounds}
                                // margin="normal"
                                // error={this.state.remarks}
                                value={this.state.pounds}
                                required={
                                  this.state.selectedWeightRadioValue ==
                                  "Imperial"
                                }
                                //helperText={this.state.remarks_error}
                                // required
                                style={{ width: "100%", height: "5%" }}
                              />
                            </Grid>
                        </Grid>
                      ) : (
                        <Grid container></Grid>
                      )}

                      {QuestionLists.type_id == 5 ? (
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
                                            this.state.AnswerValue ==
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
                      {QuestionLists.type_id == 6 ? (
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
                        <img
                          style={{ height: "250px" }}
                          src={QuestionLists.asset_name}
                        />
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
              {this.state.QuestionIndex !=0 ? (
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
                <Grid><Button
                variant="contained"
                color="default"
                onClick={(event) => this.handleMenu(event)}
                style={{ marginRight: "10px" }}
              >
                <SkipPreviousIcon style={{ marginRight: "1px" }} />
                Back
              </Button></Grid>
              )}

              <div className={classes.grow} />
              {/* {this.state.percentages == "10" ? (
                <ProgressBar
                  width="400px"
                  height="16px"
                  rect
                  fontColor="gray"
                  percentage="20"
                  rectPadding="1px"
                  rectBorderRadius="20px"
                  trackPathColor="transparent"
                  bgColor="primary"
                  trackBorderColor="grey"
                  defColor={{
                    fair: "teal",
                    good: "teal",
                    excellent: "teal",
                    poor: "teal",
                  }}
                  scrollArea={myRef}
                />
              ) : (
                <ProgressBar
                  width="400px"
                  height="16px"
                  rect
                  fontColor="gray"
                  percentage={this.state.percentages}
                  rectPadding="1px"
                  rectBorderRadius="20px"
                  trackPathColor="transparent"
                  bgColor="primary"
                  trackBorderColor="grey"
                  defColor={{
                    fair: "teal",
                    good: "teal",
                    excellent: "teal",
                    poor: "teal",
                  }}
                  scrollArea={myRef}
                />
              )} */}

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
                  type="submit"
                  variant="contained"
                  id="submit-button"
                  color="primary"
                  onClick={(event) => this.NextForm(event)}
                  disabled={this.state.isSavedCalled}
                >
                 
                 {this.state.isSavedCalled ? <CircularProgress size={24} />:  <DoneIcon style={{ marginRight: "1px" }} />}
                 {this.state.isSavedCalled ?  "":"Next" }
                </Button>
            </Toolbar>
          </AppBar>
        </form>
      </div>
    );
  }
}

export default withStyles(useStyles)(Survey);
