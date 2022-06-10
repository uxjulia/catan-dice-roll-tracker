import IconButton from "@mui/material/IconButton";
import React from "react";
import PropTypes from "prop-types";
import { faUser } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayerIcon = ({ active, id, name, onClick }) => {
  const handleClick = () => {
    let e = { target: { id } };
    return onClick(e);
  };
  return (
    <IconButton id={id} title={name} onClick={handleClick}>
      {active && (
        <FontAwesomeIcon
          id={id}
          style={{ color: "#C53437" }}
          icon={faUser}
          size="xs"
        />
      )}
      {!active && <FontAwesomeIcon id={id} icon={faUser} size="xs" />}
    </IconButton>
  );
};

PlayerIcon.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

export default PlayerIcon;
