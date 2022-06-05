import Typography from "@mui/material/Typography";
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
        <FontAwesomeIcon id={id} style={{ color: "#C53437" }} icon={faUser} />
      )}
      {!active && <FontAwesomeIcon id={id} icon={faUser} />}
    </IconButton>
  );
};

PlayerIcon.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

const PlayerIconContainer = ({ activePlayer, players, onClick }) => {
  return (
    <div className="mb-1">
      {players.length !== 0 && (
        <div className="d-flex justify-content-center">
          <div>
            <div className="d-flex justify-content-center">
              {players.map((player, index) => (
                <PlayerIcon
                  key={`player-${index}`}
                  active={activePlayer === index}
                  name={player}
                  id={index}
                  onClick={onClick}
                />
              ))}
            </div>
            <div>
              <Typography
                align="center"
                variant="body2"
                mb={1}
                color={(theme) => `${theme.palette.gray.main}`}
              >
                Next Player:
              </Typography>
              <Typography variant="h5" align="center">
                {players[activePlayer]}
              </Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PlayerIconContainer.propTypes = {
  activePlayer: PropTypes.number,
  players: PropTypes.array,
  onClick: PropTypes.func,
};

export default PlayerIconContainer;
