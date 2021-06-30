import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomizedSnackbar(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={props.isOpen}
        autoHideDuration={2000}
        onClose={() => props.handleCloseSnackbar()}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => props.handleCloseSnackbar()}
          severity={props.severity}
        >
          {props.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

CustomizedSnackbar.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseSnackbar: PropTypes.func,
  severity: PropTypes.string,
  message: PropTypes.string


}

CustomizedSnackbar.defaultProps = {
  isOpen: false,
  handleCloseSnackbar: fn => fn,
  severity: "",
  message: ""


}


export default CustomizedSnackbar;