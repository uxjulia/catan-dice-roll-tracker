import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { faCupTogo } from "@fortawesome/pro-duotone-svg-icons";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Wrapper = styled.div`
@media only screen and (min-width: 576px) {
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
})`;

const Footer = ({ onClick }) => {
  return (
    <Wrapper>
      <Box
        component={"footer"}
        sx={{
          borderTop: "1px solid #e0e0e0",
          paddingTop: ".5rem",
          backgroundColor: "#fff",
        }}
        pb={1}
        onClick={onClick}
      >
        <Typography align="center" variant="body2" sx={{ cursor: "pointer" }}>
          Made with{" "}
          <FontAwesomeIcon icon={faHeart} style={{ color: "#C53437" }} /> and{" "}
          <FontAwesomeIcon icon={faCupTogo} style={{ color: "#763b23" }} /> by
          uxjulia
        </Typography>
      </Box>
    </Wrapper>
  );
};

Footer.propTypes = {
  onClick: PropTypes.func,
};

export default Footer;
