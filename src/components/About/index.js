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
import DonateCard from "./DonateCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const About = ({ open = false, handleVisibility }) => {
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={() => handleVisibility(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "fixed", top: "0", left: "0", right: "0" }}>
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
              Donate
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          className="container-sm mb-2"
          style={{ marginTop: "60px", backgroundColor: "#f9f9f9" }}
        >
          <div className="row">
            <div className="col-sm-12">
              <Typography sx={{ mt: 3, mb: 2 }} align="center">
                If you have found this tool useful and would like to support the
                continued development, please consider buying me a coffee{" "}
                <span role="img" aria-label="smiley">
                  😊
                </span>
              </Typography>
              <DonateCard />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default About;

About.propTypes = {
  open: PropTypes.bool.isRequired,
  handleVisibility: PropTypes.func.isRequired,
};
