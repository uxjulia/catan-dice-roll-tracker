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
import KeyboardKey from "./KeyboardKey";

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
              Keyboard Shortcuts
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

export default HelpMenu;

HelpMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  handleVisibility: PropTypes.func.isRequired,
};
