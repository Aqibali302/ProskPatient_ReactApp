import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navigation from "./Navigation";
import * as serviceWorker from "./serviceWorker";
import {MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { ThemeProvider } from "@material-ui/styles";

import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import { lightBlue } from "@material-ui/core/colors";
const theme = createMuiTheme({ typography: { useNextVariants: true } ,
  palette: {
    primary: teal,
    secondary: lightBlue,
  },

});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Navigation />
  </MuiThemeProvider>,
   document.getElementById("root")
);

//ReactDOM.render(<Navigation />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
