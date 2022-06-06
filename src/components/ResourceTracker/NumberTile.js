import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const NumberTile = ({ width = "75px", value, color = "#333333" }) => {
  const style = {
    minWidth: width,
    maxWidth: width,
    minHeight: width,
    maxHeight: width,
    border: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "rgba(162,152,114,0.30)",
    borderRadius: "50%",
    padding: "5px",
    marginRight: "15px",
    fontSize: "1.2rem",
    display: "inline-block",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px -1px 0px 3px inset, rgba(0, 0, 0, 0.3) 0px 0px 0px 1px",
  };
  return (
    <div
      style={style}
      className="d-flex align-items-center justify-content-center"
    >
      <Typography color={color} component="span" sx={{ fontWeight: "bold" }}>
        {value}
      </Typography>
    </div>
  );
};

NumberTile.propTypes = {
  width: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
};

export default NumberTile;
