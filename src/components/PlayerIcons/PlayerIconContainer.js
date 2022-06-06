import Typography from "@mui/material/Typography";
import React from "react";
import PropTypes from "prop-types";
import PlayerIcon from "./PlayerIcon";

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
