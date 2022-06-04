import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap-reboot.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap-utilities.css";
import update from "immutability-helper";
import _ from "lodash";
import ChartController from "./controllers/ChartController";
import DiceInput from "./components/DiceInput";
import Settings from "./components/Settings";
import PlayerData from "./controllers/PlayerData";
import IconButton from "@mui/material/IconButton";
import LoggedRolls from "./components/LoggedRolls";
import SiteLayout from "./components/SiteLayout";
import styled from "@emotion/styled";
import CustomTheme from "./theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
} from "@fortawesome/pro-regular-svg-icons";
import DiceRoller from "./components/DiceRoller";
import DiceRollDisplay from "./components/DiceRollDisplay";
import Chance from "chance";
let chance = new Chance();
const ExpansionIconWrapper = styled.div`
@media only screen and (max-width: 576px) {
  div.hideForMobile {
    display: none;
  }
})`;

function testLog(n) {
  if (n === "roll") {
    return true;
  } else {
    const x = Number(n);
    return x >= 2 && x <= 13 ? true : false;
  }
}

function keyCode(x) {
  let n;
  switch (x) {
    case "1":
      n = "11";
      break;
    case "0":
      n = "10";
      break;
    case "-":
      n = "11";
      break;
    case "=":
      n = "12";
      break;
    case " ":
      n = "roll";
      break;
    default:
      n = x;
      break;
  }
  if (testLog(n) === true) {
    return n;
  } else {
    return false;
  }
}

function logKey(event) {
  if (event) {
    if (event.which) {
      return keyCode(String.fromCharCode(event.keyCode)); // IE
    } else if (event.which !== 0 && event.charCode !== 0) {
      // return keyCode(String.fromCharCode(event.which)); // All other browsers
      return keyCode(event.key);
    } else {
      return null; // Special Key
    }
  }
}

function nextPlayer(activePlayer, option) {
  let x = null;
  switch (option) {
    case "next":
      x = activePlayer + 1;
      break;
    case "back":
      x = activePlayer - 1;
      break;
    default:
      x = activePlayer + 1;
  }
  return x;
}

function resetPlayers(oldTotal, newTotal, playerArr) {
  const diff = oldTotal - newTotal;
  if (newTotal < oldTotal) {
    playerArr.splice(newTotal, diff);
  }
  if (newTotal > oldTotal) {
    let x = playerArr.length;
    while (x < newTotal) {
      x++;
      playerArr.push("Player " + x);
    }
  }
  if (newTotal === oldTotal) {
    let x = 0;
    while (x < newTotal) {
      playerArr[x] = "Player " + (x + 1);
      x++;
    }
  }
  return playerArr;
}

const defaultState = {
  players: [],
  rolls: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  log: [],
  activePlayer: 0,
  fullScreen: false,
  diceRolls: [],
};

class App extends Component {
  constructor(props) {
    super(props);
    this.chartID = 1;
    this.state = defaultState;
    this.clearNames = 0;
  }
  setPlayerNames = (e) => {
    const data = this.state.players;
    const x = Number(e.target.id);
    data[x] = e.target.value;
    this.setState({ players: data });
  };
  setActivePlayer = (e, option) => {
    if (e) {
      this.setState({ activePlayer: Number(e.target.id) });
    } else {
      const activePlayer = this.state.activePlayer;
      const totalPlayers = this.state.players.length;
      const next = nextPlayer(activePlayer, option);
      if (next === totalPlayers) {
        this.setState({ activePlayer: 0 });
      } else if (next === -1) {
        this.setState({ activePlayer: totalPlayers - 1 });
      } else {
        this.setState({ activePlayer: next });
      }
    }
  };
  handleClick = (e) => {
    const index = Number(e.target.id) - 2;
    const rolls = this.state.rolls;
    rolls[index]++;
    let log = update(this.state.log, { $unshift: [e.target.id] });
    this.setState({ rolls: rolls, log: log });
    this.setActivePlayer(null, "next");
  };

  handlePress = (e) => {
    if (e.target.nodeName === "BODY") {
      let n = logKey(e);
      if (n === "roll") {
        this.rollDie();
      } else if (n !== false) {
        this.setRoll(n);
      }
    }
  };

  setRoll = (n) => {
    const index = Number(n) - 2;
    const rolls = this.state.rolls;
    rolls[index]++;
    let log = update(this.state.log, { $unshift: [n] });
    this.setState({ rolls: rolls, log: log });
    this.setActivePlayer(null, "next");
  };

  handleUndo = () => {
    const log = this.state.log;
    const lastRoll = _.head(log) - 2;
    const rolls = this.state.rolls;
    this.setActivePlayer(null, "back");
    if (rolls[lastRoll] !== 0) {
      rolls[lastRoll]--;
    }
    log.shift();
    this.setState({ rolls: rolls, log: log });
  };

  handleReset = () => {
    this.chartID++;
    this.setState({
      rolls: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      log: [],
      activePlayer: 0,
      diceRolls: [],
    });
  };

  clearPlayerNames = () => {
    const total = this.state.players.length;
    const players = this.state.players;
    const newPlayerArr = resetPlayers(total, total, players);
    const newPlayers = update(players, { $set: newPlayerArr });
    this.setState({ players: newPlayers, clearNames: this.clearNames++ });
  };
  handleSelect = (e) => {
    const oldTotal = this.state.players.length;
    let newTotal =
      e.target.value === "Clear" ? oldTotal : Number(e.target.value);
    const players = this.state.players;
    const newPlayerArr = resetPlayers(oldTotal, newTotal, players);
    const newPlayers = update(players, { $set: newPlayerArr });
    this.setState({ players: newPlayers, activePlayer: 0 });
  };

  handleRoll = (array) => {
    let count = 0;
    for (let i = array.length; i--; ) {
      count += array[i];
    }
    this.setRoll(count);
  };

  rollDie = async () => {
    let roll1 = chance.d6();
    let roll2 = chance.d6();
    this.setState({ diceRolls: [roll1, roll2] });
    this.handleRoll([roll1, roll2]);
  };

  setFullScreen = () => {
    this.setState({ fullScreen: !this.state.fullScreen });
  };

  componentDidMount() {
    window.addEventListener("keypress", this.handlePress);
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handlePress);
  }

  render() {
    const log = this.state.log;
    const lastRoll = _.head(log);
    const diceProps = {
      undo: this.handleUndo,
      onReset: this.handleReset,
      onClick: this.handleClick,
      log: log,
    };
    const chartProps = {
      key: this.chartID,
      lastRoll: lastRoll,
      data: this.state.rolls,
    };
    const playerProps = {
      players: this.state.players,
      activePlayer: this.state.activePlayer,
      onClick: this.setActivePlayer,
    };
    const settingsProps = {
      players: this.state.players,
      handleSelect: this.handleSelect,
      onChange: this.setPlayerNames,
      handleReset: this.handleReset,
      clearNames: this.clearNames,
    };
    return (
      <CustomTheme>
        <SiteLayout
          fullScreen={this.state.fullScreen}
          left={
            <div className="mt-2">
              <PlayerData {...playerProps} />
              {!this.state.fullScreen && (
                <ExpansionIconWrapper>
                  <div className="hideForMobile">
                    <div className="d-flex justify-content-end">
                      <IconButton onClick={this.setFullScreen} size="small">
                        <FontAwesomeIcon
                          icon={faUpRightAndDownLeftFromCenter}
                          size="sm"
                        />
                      </IconButton>
                    </div>
                  </div>
                </ExpansionIconWrapper>
              )}
              {this.state.fullScreen && (
                <div className="d-flex justify-content-end">
                  <IconButton onClick={this.setFullScreen} size="small">
                    <FontAwesomeIcon
                      icon={faDownLeftAndUpRightToCenter}
                      size="sm"
                    />
                  </IconButton>
                </div>
              )}
              <ChartController {...chartProps} />
              <LoggedRolls data={this.state.log} />
            </div>
          }
          right={
            <div>
              <DiceRollDisplay value={lastRoll} onClick={this.rollDie} />
              <DiceRoller
                key={this.chartID}
                onClick={this.rollDie}
                rolls={this.state.diceRolls}
              />
              <DiceInput {...diceProps} />
              <Settings {...settingsProps} />
            </div>
          }
        />
      </CustomTheme>
    );
  }
}
export default App;
