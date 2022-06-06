import React from "react";
import PropTypes from "prop-types";
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

export default Dice;
