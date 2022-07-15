import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD12 } from "@fortawesome/pro-light-svg-icons";

const DiceRollDisplay = ({
  value,
  onClick,
  bgColor = "#b02c2c",
  d12 = false,
  fontColor = "#fff",
}) => {
  if (value !== undefined)
    return (
      <Box
        onClick={onClick}
        sx={{
          borderRadius: "2px",
          cursor: "pointer",
          padding: "5px",
          marginBottom: ".5rem",
          backgroundColor: bgColor,
        }}
        variant="outlined"
      >
        <Typography color={fontColor} variant="h4" align="center">
          {d12 && <FontAwesomeIcon className="me-2" icon={faDiceD12} />}
          {value}
        </Typography>
      </Box>
    );
};

DiceRollDisplay.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
  bgColor: PropTypes.string,
  d12: PropTypes.bool,
  fontColor: PropTypes.string,
};

export default DiceRollDisplay;
