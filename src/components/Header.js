import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/pro-solid-svg-icons";

const Wrapper = styled.div`
@media only screen and (max-width: 767px) {
  div.hideForMobile {
    display: none;
  }
})`;

const Header = ({ title }) => {
  return (
    <Wrapper>
      <div className="hideForMobile">
        <header className="site-header d-flex align-items-center ps-2">
          <Typography component="span" color="primary">
            <FontAwesomeIcon icon={faDice} size="2x" className="me-2" />
          </Typography>
          <div className="wrapper">
            <Typography variant="h5">{title}</Typography>
          </div>
        </header>
      </div>
    </Wrapper>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
