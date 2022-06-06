import React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const KeyboardKey = ({
  width = "50px",
  top,
  bottom,
  value,
  single = false,
}) => {
  const style = {
    minWidth: width,
    maxWidth: "50px",
    minHeight: "50px",
    maxHeight: "50px",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "5px",
    padding: "5px",
    fontSize: ".75rem",
    margin: "5px",
    display: "inline-block",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px -1px 0px 3px inset, rgba(0, 0, 0, 0.3) 0px 0px 0px 1px",
  };
  return (
    <div
      style={{ minWidth: "90px", margin: "5px" }}
      className="d-flex align-items-center justify-content-between"
    >
      <div
        style={style}
        className={`d-flex align-items-center ${
          single ? "justify-content-center" : "justify-content-between"
        } ${!single && "flex-column"}`}
      >
        {!single && (
          <>
            <span>{top}</span>
            <span>{bottom}</span>
          </>
        )}
        {single && <span>{top}</span>}
      </div>
      <Typography color="#b02c2c" variant="body2">{`${value}`}</Typography>
    </div>
  );
};

KeyboardKey.propTypes = {
  single: PropTypes.bool,
  width: PropTypes.string,
  top: PropTypes.string,
  bottom: PropTypes.string,
  value: PropTypes.string,
};

export default KeyboardKey;
