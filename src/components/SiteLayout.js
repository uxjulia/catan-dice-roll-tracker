import React from "react";
import Header from "./Header";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const SiteLayout = ({ left, right, fullScreen = false }) => {
  return (
    <Box pt={1} pb={3}>
      {!fullScreen && <Header title="Dice Roll Tracker" />}
      <div className="container-fluid mt-2">
        <div className="row">
          {fullScreen && <div className="col-md-12">{left}</div>}
          {!fullScreen && (
            <>
              <div className="col-md-9">{left}</div>
              <div className="col-md-3">{right}</div>
            </>
          )}
        </div>
      </div>
    </Box>
  );
};

export default SiteLayout;

SiteLayout.propTypes = {
  left: PropTypes.element.isRequired,
  right: PropTypes.element.isRequired,
  fullScreen: PropTypes.bool,
};
