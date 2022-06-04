import { Typography } from "@mui/material";
import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { faUser } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Player(name, id) {
  this.id = id;
  this.name = name;
}

function players(arr) {
  if (arr) {
    let i = [];
    _.each(arr, function (name, index) {
      i.push(new Player(name, index));
    });
    return i;
  } else {
    return console.log("No players");
  }
}

function ActiveIcon(props) {
  const style = { color: "#C53437" };
  return <FontAwesomeIcon id={props.id} style={style} icon={faUser} />;
}

ActiveIcon.propTypes = {
  id: PropTypes.any,
};

function InactiveIcon(props) {
  return <FontAwesomeIcon id={props.id} icon={faUser} />;
}

InactiveIcon.propTypes = {
  id: PropTypes.any,
};

function PlayerIcon({ onClick, player: { id, name }, active, ...props }) {
  const style = {
    cursor: "pointer",
    margin: "4px",
  };
  const handleClick = (e) => {
    onClick(e);
  };
  return (
    <span id={id} style={style} title={name} onClick={handleClick}>
      {active && <ActiveIcon {...props} />}
      {!active && <InactiveIcon {...props} />}
    </span>
  );
}

PlayerIcon.propTypes = {
  onClick: PropTypes.func,
  player: PropTypes.object,
  active: PropTypes.bool,
};

class PlayerData extends Component {
  constructor(props) {
    super(props);
    this.state = { players: {}, uiRender: [] };
  }

  makePlayer = (arr) => {
    const obj = players(arr);
    this.setState({ players: obj });
  };

  makeIcons = (arr) => {
    const playerI = [];
    const handleClick = this.props.onClick;
    _.each(arr, (i) => {
      if (i.id === this.props.activePlayer) {
        playerI.push(
          <PlayerIcon active key={i.id} player={i} onClick={handleClick} />
        );
      } else {
        playerI.push(
          <PlayerIcon key={i.id} player={i} onClick={handleClick} />
        );
      }
    });
    return playerI;
  };

  componentDidUpdate(nextProps) {
    if (nextProps !== this.props) this.makePlayer(this.props.players);
  }

  componentDidMount() {
    this.makePlayer(this.props.players);
  }

  render() {
    const players = this.makeIcons(this.state.players);
    const activePlayer = this.props.activePlayer;
    const nextPlayerName = this.props.players[activePlayer];
    return (
      <div key={activePlayer} className="mb-1">
        {players.length !== 0 && (
          <div className="d-flex justify-content-center">
            <div>
              <div className="d-flex justify-content-center">{players}</div>
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
                  {nextPlayerName}
                </Typography>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PlayerData;

PlayerData.propTypes = {
  players: PropTypes.array,
  activePlayer: PropTypes.number,
  onClick: PropTypes.func,
};
