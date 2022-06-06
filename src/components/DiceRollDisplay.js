import React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const DiceRollDisplay = ({ value, onClick }) => {
  if (value !== undefined)
    return (
      <Paper
        onClick={onClick}
        sx={{
          cursor: "pointer",
          padding: "5px",
          marginBottom: ".5rem",
          backgroundColor: "#b02c2c",
        }}
        variant="outlined"
      >
        <Typography color="#ffffff" variant="h4" align="center">
          {value}
        </Typography>
      </Paper>
    );
};

DiceRollDisplay.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
};

export default DiceRollDisplay;
