import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const TileDot = styled.div(
  {
    width: "4px",
    height: "4px",
    marginRight: "2px",
    borderRadius: "50%",
  },
  (props) => ({
    backgroundColor: props.color,
  })
);

const NumberTile = ({
  width = "75px",
  value,
  color = "#333333",
  rarity = 1,
}) => {
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
    display: "inline-block",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px -1px 0px 3px inset, rgba(0, 0, 0, 0.3) 0px 0px 0px 1px",
  };
  return (
    <div
      style={style}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <Typography
        color={color}
        component="span"
        sx={{ fontSize: "1.3rem", fontWeight: "bold", fontFamily: "serif" }}
      >
        {value}
      </Typography>
      <div className="d-flex">
        {[...Array(rarity).keys()].map((i) => (
          <TileDot key={i} color={color} />
        ))}
      </div>
    </div>
  );
};

NumberTile.propTypes = {
  width: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
  rarity: PropTypes.number,
};

export default NumberTile;
