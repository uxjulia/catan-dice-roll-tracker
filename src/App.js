import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap-reboot.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap-utilities.css";
import CssBaseline from "@mui/material/CssBaseline";
import update from "immutability-helper";
import _ from "lodash";
import ChartController from "./controllers/ChartController";
import DiceInput from "./components/DiceInput";
import Settings from "./components/Settings";
import PlayerData from "./controllers/PlayerData";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
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
import HelpMenu from "./components/HelpMenu";
import { Typography } from "@mui/material";

const ExpansionIconWrapper = styled.div`
@media only screen and (max-width: 576px) {
  div.hideForMobile {
    display: none;
  }
})`;

function testLog(n) {
  console.log("testing n", n);
  let x = n.toUpperCase();
  if (x === "ROLL" || x === "UNDO" || x === "NEW") {
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
      n = "ROLL";
      break;
    case "z":
    case "Z":
      n = "UNDO";
      break;
    case "n":
    case "N":
      n = "NEW";
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
      x = activePlayer;
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
  showDiceInput: true,
  showNumPadInput: true,
  displayHelpMenu: false,
  lastPlayer: "",
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

  setLastPlayer = () => {
    if (this.state.log.length === 0) {
      this.setState({ lastPlayer: this.state.players[0] });
    } else {
      let lastPlayer = this.state.activePlayer;
      this.setState({ lastPlayer: this.state.players[lastPlayer] });
    }
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
    if (this.state.players.length) this.setLastPlayer();
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
    console.log(e.target.nodeName, e);
    if (e.target.nodeName === "INPUT") {
      return;
    } else {
      e.preventDefault();
      let n = logKey(e);
      console.log("handleKeyPress", n);
      if (n === false) return;
      switch (n) {
        case "ROLL":
          this.rollDie();
          break;
        case "UNDO":
          this.handleUndo();
          break;
        case "NEW":
          this.handleReset();
          break;
        default:
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
    if (this.state.log.length === 0) return;
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
      lastPlayer: "",
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

  handleMenuVisibility = (visible) => {
    this.setState({ displayHelpMenu: visible });
  };

  componentDidMount() {
    console.log("Adding event listener");
    window.document.addEventListener("keydown", this.handlePress);
    // window.addEventListener("keypress", this.handlePress);
  }

  componentWillUnmount() {
    console.log("Removing event listener");
    window.document.addEventListener("keydown", this.handlePress);
    // window.removeEventListener("keypress", this.handlePress);
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
      state: this.state,
      players: this.state.players,
      activePlayer: this.state.activePlayer,
      onClick: this.setActivePlayer,
    };
    const settingsProps = {
      state: this.state,
      toggles: {
        diceInput: this.state.showDiceInput,
        numPadInput: this.state.showNumPadInput,
      },
      handleSelect: this.handleSelect,
      onChange: this.setPlayerNames,
      handleDiceToggle: (option) => {
        this.setState({ showDiceInput: option });
      },
      handleNumPadToggle: (option) => {
        this.setState({ showNumPadInput: option });
      },
      handleMenuVisibility: this.handleMenuVisibility,
    };
    return (
      <>
        <CssBaseline />
        <CustomTheme>
          <SiteLayout
            fullScreen={this.state.fullScreen}
            left={
              <div className="mt-2">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <HelpMenu
                        open={this.state.displayHelpMenu}
                        handleVisibility={this.handleMenuVisibility}
                      />
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    {this.state.fullScreen && (
                      <div className="col">
                        {this.state.lastPlayer !== "" && (
                          <Typography
                            color="primary"
                            align="center"
                            sx={{ marginBottom: ".5rem" }}
                          >
                            {this.state.lastPlayer} rolled
                          </Typography>
                        )}
                        <DiceRollDisplay
                          value={lastRoll}
                          onClick={this.rollDie}
                        />
                        {this.state.showDiceInput && (
                          <DiceRoller
                            key={this.chartID}
                            onClick={this.rollDie}
                            rolls={this.state.diceRolls}
                          />
                        )}
                      </div>
                    )}
                    {this.state.players.length > 0 && (
                      <div className="col d-flex flex-column justify-content-center">
                        <PlayerData {...playerProps} />
                      </div>
                    )}
                  </div>
                </div>

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
                {this.state.showDiceInput && (
                  <>
                    {this.state.lastPlayer !== "" && (
                      <Typography
                        color="primary"
                        align="center"
                        sx={{ marginBottom: ".5rem" }}
                      >
                        {this.state.lastPlayer} rolled a
                      </Typography>
                    )}
                    <DiceRollDisplay value={lastRoll} onClick={this.rollDie} />
                    <DiceRoller
                      key={this.chartID}
                      onClick={this.rollDie}
                      rolls={this.state.diceRolls}
                    />
                  </>
                )}
                {this.state.showNumPadInput && <DiceInput {...diceProps} />}
                <Button
                  className="mt-2 mb-3 px-2"
                  variant="contained"
                  fullWidth
                  onClick={this.handleReset}
                  key="reset"
                  id="reset"
                >
                  Start New Game
                </Button>
                <Settings {...settingsProps} />
              </div>
            }
          />
        </CustomTheme>
      </>
    );
  }
}
export default App;

// TODO: Remove extra props if component can get it from the state prop
