import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBlockBrick,
  faSheep,
  faTrees,
  faWheat,
  faHillRockslide,
  faSkull,
} from "@fortawesome/pro-solid-svg-icons";

const ResourceIconMap = {
  lumber: faTrees,
  brick: faBlockBrick,
  wool: faSheep,
  grain: faWheat,
  ore: faHillRockslide,
  robber: faSkull,
};

const ResourceIcon = ({ name }) => {
  if (name === "") return null;
  let icon = ResourceIconMap[name];
  return <FontAwesomeIcon icon={icon} size="3x" style={{ margin: "5px" }} />;
};

ResourceIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

const ResourceImage = ({ name }) => {
  if (name === "" || name === "robber") return null;
  let img;
  switch (name) {
    case "lumber":
    case "wood":
      img = "lumber";
      break;
    case "brick":
    case "clay":
      img = "brick";
      break;
    case "wool":
    case "sheep":
      img = "wool";
      break;
    case "grain":
    case "hay":
      img = "grain";
      break;
    case "ore":
      img = "ore";
      break;
  }

  return (
    <img
      src={`./images/${img}.png`}
      alt={img}
      width="100px"
      height="auto"
      style={{ margin: "5px" }}
    />
  );
};

ResourceImage.propTypes = { name: PropTypes.string.isRequired };

const ResourceDisplay = ({ resourceDescription = [], icons = false }) => {
  return (
    <Box
      mb={2}
      p={1}
      className="d-flex justify-content-center"
      style={{ backgroundColor: "#E6E1AA" }}
    >
      {resourceDescription.map((resource, index) => {
        return icons ? (
          <ResourceIcon name={resource} key={index} />
        ) : (
          <ResourceImage name={resource} key={index} />
        );
      })}
    </Box>
  );
};

ResourceDisplay.propTypes = {
  resourceDescription: PropTypes.array,
  icons: PropTypes.bool,
};

export default ResourceDisplay;
