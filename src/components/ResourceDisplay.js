import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

const ResourceImage = ({ name }) => {
  if (name === "") return null;
  return (
    <img src={`./images/${name}.png`} alt={name} width="100px" height="auto" />
  );
};

ResourceImage.propTypes = { name: PropTypes.string.isRequired };

const ResourceDisplay = ({ resourceDescription = [] }) => {
  return (
    <Box
      mb={2}
      p={1}
      className="d-flex justify-content-center"
      style={{ backgroundColor: "#E6E1AA" }}
    >
      {resourceDescription.map((resource, index) => (
        <ResourceImage key={`${index}-${resource}`} name={resource} />
      ))}
    </Box>
  );
};

ResourceDisplay.propTypes = {
  resourceDescription: PropTypes.array,
};

export default ResourceDisplay;
