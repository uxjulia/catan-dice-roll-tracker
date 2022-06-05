import React from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HelpMenu = ({ open = false, handleVisibility }) => {
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={() => handleVisibility(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleVisibility(false)}
              aria-label="close"
            >
              <FontAwesomeIcon icon={faXmark} />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Keyboard Usage
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="container-sm my-2">
          <div className="row">
            <div className="col-sm-12">
              <div className="d-flex align-items-center justify-content-between">
                <KeyboardKey top="!" bottom="1" value="= 1" />
                <KeyboardKey top="@" bottom="2" value="= 2" />
                <KeyboardKey top="#" bottom="3" value="= 3" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="d-flex align-items-center justify-content-between">
                <KeyboardKey top="$" bottom="4" value="= 4" />
                <KeyboardKey top="%" bottom="5" value="= 5" />
                <KeyboardKey top="^" bottom="6" value="= 6" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="d-flex align-items-center justify-content-between">
                <KeyboardKey top="&" bottom="7" value="= 7" />
                <KeyboardKey top="*" bottom="8" value="= 8" />
                <KeyboardKey top="(" bottom="9" value="= 9" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="d-flex align-items-center justify-content-between">
                <KeyboardKey top=")" bottom="0" value="= 10" />
                <KeyboardKey top="_" bottom="-" value="= 11" />
                <KeyboardKey top="+" bottom="=" value="= 12" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="d-flex align-items-center justify-content-between">
                <KeyboardKey top="N" value={`New Game`} single />
                <KeyboardKey top="Z" value={`Undo`} single />
                <span style={{ width: "140px" }}></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="d-flex align-items-center justify-content-between">
                <KeyboardKey
                  width="175px"
                  top="Space Bar"
                  value="Roll Virtual Dice"
                  single
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

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

export default HelpMenu;

HelpMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  handleVisibility: PropTypes.func.isRequired,
};
