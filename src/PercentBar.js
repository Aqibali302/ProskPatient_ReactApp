import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "react-animated-progress-bar";

const propTypes = {
  percent: PropTypes.number.isRequired,
};

const PercentBar = ({ percent, ...props }) => (
  // spread extra props first to prohibit overriding prop values
  <ProgressBar 
  width="400px" 
  height="16px"
  rect {...props}
  fontColor="gray"
  percentage={percent}
  label={percent}
  rectPadding="1px"
  rectBorderRadius="20px"
  trackPathColor="transparent"
  bgColor="#333333"
  trackBorderColor="grey" now={percent} />
  
);


PercentBar.propTypes = propTypes;

export default PercentBar;