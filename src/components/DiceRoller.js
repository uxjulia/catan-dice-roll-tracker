import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import rollADie from "roll-a-die";
import PropTypes from "prop-types";

const DiceRoller = ({ onClick, targetId }) => {
  const handleRoll = (array) => {
    let count = 0;
    for (let i = array.length; i--; ) {
      count += array[i];
    }
    onClick(count);
  };
  const rollDie = () => {
    return rollADie({
      delay: 10000,
      numberOfDice: 2,
      element: document.getElementById(targetId),
      callback: handleRoll,
    });
  };
  return (
    <Box>
      <Box id="dice-roll-container" sx={{ height: "150px", width: "auto" }} />
      <Button variant="outlined" size="small" onClick={rollDie}>
        Roll Dice
      </Button>
    </Box>
  );
};

export default DiceRoller;

DiceRoller.propTypes = {
  onClick: PropTypes.func,
  targetId: PropTypes.string,
};
