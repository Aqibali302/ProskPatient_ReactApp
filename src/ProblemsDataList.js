import React, { useState, useEffect,Fragment } from "react";
import {
  Grid,
  Card,
  IconButton,
  CardHeader,
  Typography,
  CardContent,
  Avatar,
  Stepper,
  ListItemText,
  ListItemIcon,
  Step,
  Image,
  StepButton,
  CircularProgress,
  Divider,
  ListItem,
  
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import InputBase from '@material-ui/core/InputBase';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, withStyles } from "@material-ui/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormControl from "@material-ui/core/FormControl";

import { useDropzone } from "react-dropzone";

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
  divider: {
    // Theme Color, or use css color in quote
    background: "#009688",
},
divider2: {
    // Theme Color, or use css color in quote
    background: "#afafaf",
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
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  bigAvatar: {
    margin: 10,
  },

  inline: {
    display: "inline",
  },
  card: {
    marginLeft: "50%",
    marginRight: "50%",
    marginTop: "10px",
  },
}));
function getSteps() {
  return ["Front ID Card", "Back ID Card"];
}
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};


class ProblemsDataList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProviderId: localStorage.getItem("Provider_id"),
      ProblemAreaData:[],
      filter: "",

    };
  }
  MobileGetUserConsentData() {
    let url =localStorage.getItem('url') + "/GetProblemAreaFromProvider?provider_id="+this.state.ProviderId;
    console.log(url);
    
    fetch(url, {
      method: "POST",
      //  body: dataTomcat,
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        this.setState({
            ProblemAreaData:result["provider"],

        });
        console.log(this.state.ProblemAreaData)
      })
      .catch((error) => this.handleOpenSnackbar(<span>An error occured:</span>,
        "error"
    ));
  }
  ProblemAreaId(ProblemAreaId){
      console.log(ProblemAreaId)
      localStorage.setItem("problem_area_id", ProblemAreaId);
      window.location = "#/Home";
  }
  handleMenu = (event) => {
    window.location = "#/ProviderDataList";
  };

  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  componentDidMount() {
      this.MobileGetUserConsentData();
      this.nameInput.focus();

  }
  render() {
    const { classes } = this.props;
    const { filter, ProblemAreaData } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData= this.state.ProblemAreaData.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toLowerCase().includes(lowercasedFilter)
      );
    });
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton color="inherit" onClick={this.handleMenu}>
              <ArrowBackIcon /> <Typography
                color="inherit"
                noWrap
              >
                Back
            </Typography>
            </IconButton>
            <div className={classes.grow}> </div>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ textAlign: "center" }}
            >
             Problem Area
            </Typography>
            <div className={classes.grow}> </div>
          </Toolbar>
        </AppBar>
        <Grid
          container
          style={{ marginTop: "60px"}}
          direction="row"
          justify="center"
          alignItems="center"
        >
            <Grid  item xs={12} sm={12} style={{ marginBottom: "10px", }}>
                  <Typography variant="title" style={{ marginLeft: "15px",fontFamily: "Arial",fontWeight:"bold" }}>
                  Please select your problem area.
                  </Typography>
                  </Grid>
            <Card style={{ width: "98%" }}>
                <CardContent>
          <InputBase
              placeholder="Search Problem Area"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              endAdornment={<SearchIcon/>}
              ref={(input) => { this.nameInput = input; }} 
              value={this.state.filter}
               onChange={this.handleChange}
               style={{width:"99%"}}
            />
     <Divider classes={{root: classes.divider2}} />
                <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
                {filteredData!=""?filteredData.map((data,index)=>
                 <Fragment key={"doc_type"+index}>
                 {index ? <Divider variant="fullWidth" /> : ""}
                 <ListItem 
                  button
                    onClick={e=>this.ProblemAreaId(data.id)}
                 >
                      <img
                                className={classes.bigAvatar}
                                src={data.image_path}
                                style={{ height: "50px", width: "50px" }}
                              />
                      <ListItemText
                      primary={
                        <Typography
                        
                          style={{
                            fontSize: "25px",
                            fontFamily: "Arial",
                          }}
                        >
                          {data.label}
                        </Typography>
                      }  secondary={
                        <Typography
                        
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                          }}
                        >
                          {data.description}
                        </Typography>
                      } 
                      pri
                      />
                       <ListItemIcon
                       style={{color:"#009688"}}
                       >
                       <KeyboardArrowRightIcon />
                       </ListItemIcon>
                 </ListItem>
                 <Divider classes={{root: classes.divider}} />
               </Fragment>
                ):<div></div>}
            </Grid>
        </Grid>
                </CardContent>
            </Card>
        </Grid>

      </div>
    );
  }
}

export default withStyles(useStyles)(ProblemsDataList);
