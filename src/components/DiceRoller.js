import Box from "@mui/material/Box";
import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { deviceType } from "detect-it";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/pro-solid-svg-icons";

const Dice = ({ value, size }) => {
  switch (value) {
    case 1:
      return (
        <FontAwesomeIcon className="dice-1" size={size} icon={faDiceOne} />
      );
    case 2:
      return (
        <FontAwesomeIcon className="dice-2" size={size} icon={faDiceTwo} />
      );
    case 3:
      return (
        <FontAwesomeIcon className="dice-3" size={size} icon={faDiceThree} />
      );
    case 4:
      return (
        <FontAwesomeIcon className="dice-4" size={size} icon={faDiceFour} />
      );
    case 5:
      return (
        <FontAwesomeIcon className="dice-5" size={size} icon={faDiceFive} />
      );
    case 6:
      return (
        <FontAwesomeIcon className="dice-6" size={size} icon={faDiceSix} />
      );
  }
};

Dice.propTypes = {
  value: PropTypes.number,
  size: PropTypes.oneOf([
    "xs",
    "lg",
    "sm",
    "1x",
    "2x",
    "3x",
    "4x",
    "5x",
    "6x",
    "7x",
    "8x",
    "9x",
    "10x",
  ]),
};

const Wrapper = styled.div`
  margin-bottom: 1rem;
  .dice-1 {
    color: #78909c;
  }
  .dice-2 {
    color: #5d4037;
  }
  .dice-3 {
    color: #f57f17;
  }
  .dice-4 {
    color: #004d40;
  }
  .dice-5 {
    color: #164da6;
  }
  .dice-6 {
    color: #b71c1c;
  }
`;

const DiceRoller = ({ onClick, rolls = [] }) => {
  const isMobile = deviceType === "touchOnly";
  const isDesktop = deviceType === "mouseOnly";
  const hybrid = deviceType === "hybrid";
  return (
    <Wrapper>
      <Box onClick={onClick} sx={{ cursor: "pointer" }} py={2}>
        {rolls.length === 0 && (
          <Typography
            align="center"
            pb={1}
            variant="body2"
            className="text-muted"
          >
            {isMobile && "Tap here to roll virtual dice"}
            {isDesktop && "Click here to roll virtual dice"}
            {hybrid && "Tap or click here to roll virtual dice"}
          </Typography>
        )}
        <Box className="d-flex justify-content-evenly">
          {rolls.map((roll, index) => (
            <Dice key={index} value={roll} size="4x" />
          ))}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default DiceRoller;

DiceRoller.propTypes = {
  onClick: PropTypes.func,
  rolls: PropTypes.array,
};
