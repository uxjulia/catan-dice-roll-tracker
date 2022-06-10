import Box from "@mui/material/Box";
import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { deviceType } from "detect-it";
import styled from "@emotion/styled";
import Dice from "./Dice";

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
      <Box role="button" onClick={onClick} sx={{ cursor: "pointer" }} py={1}>
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
            <Dice key={index} value={roll} size="3x" />
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
