import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap-reboot.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap-utilities.css";
import _ from "lodash";
import update from "immutability-helper";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DiceChart from "./components/Chart";
import DiceInput from "./components/DiceInput";
import Settings from "./components/Settings";
import PlayerIcons from "./components/PlayerIcons";
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
import ResourceTracker from "./components/ResourceTracker";
import ResourceDisplay from "./components/ResourceDisplay";
import Footer from "./components/Footer";
import { logKey, nextPlayer, resetPlayers } from "./utils";
import About from "./components/About";

const ExpansionIconWrapper = styled.div`
@media only screen and (max-width: 576px) {
  div.hideForMobile {
    display: none;
  }
})`;

const blankResources = {
  2: { 1: "" },
  3: { 1: "", 2: "" },
  4: { 1: "", 2: "" },
  5: { 1: "", 2: "" },
  6: { 1: "", 2: "" },
  8: { 1: "", 2: "" },
  9: { 1: "", 2: "" },
  10: { 1: "", 2: "" },
  11: { 1: "", 2: "" },
  12: { 1: "" },
};

const defaultState = {
  players: [],
  rolls: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  log: [],
  resources: blankResources,
  activePlayer: 0,
  fullScreen: false,
  diceRolls: [],
  showDiceInput: true,
  showNumPadInput: true,
  showResourceLog: false,
  showDiceLog: true,
  displayHelpMenu: false,
  displayResourceTracker: false,
  displayAboutPage: false,
  lastPlayer: "",
  resourceDescription: [],
  resourceLog: [],
};

class App extends Component {
  constructor(props) {
    super(props);
    this.chartID = 1;
    this.state = defaultState;
    this.clearNames = 0;
  }

  handleReset = () => {
    this.chartID++;
    this.setState({
      rolls: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      log: [],
      activePlayer: 0,
      diceRolls: [],
      lastPlayer: "",
      resourceDescription: [],
      resources: {
        2: { 1: "" },
        3: { 1: "", 2: "" },
        4: { 1: "", 2: "" },
        5: { 1: "", 2: "" },
        6: { 1: "", 2: "" },
        8: { 1: "", 2: "" },
        9: { 1: "", 2: "" },
        10: { 1: "", 2: "" },
        11: { 1: "", 2: "" },
        12: { 1: "" },
      },
      resourceLog: [],
    });
  };

  handleClick = (e) => {
    const index = Number(e.target.id) - 2;
    const rolls = this.state.rolls;
    rolls[index]++;
    let log = update(this.state.log, { $unshift: [e.target.id] });
    this.setState({ rolls: rolls, log: log });
    this.setActivePlayer(null, "next");
    this.getResources(+e.target.id);
  };

  handlePress = (e) => {
    if (
      e.target.nodeName === "INPUT" ||
      e.target.nodeName === "LI" ||
      e.target.nodeName === "BUTTON" ||
      e.target.nodeName === "DIV"
    ) {
      return;
    } else {
      e.preventDefault();
      let n = logKey(e);
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
          this.setState({ diceRolls: [] });
          this.setRoll(n);
      }
    }
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

  handleMenuVisibility = (visible) => {
    this.setState({ displayHelpMenu: visible });
  };

  handleResourceTrackerVisibility = (visible) => {
    this.setState({ displayResourceTracker: visible });
  };

  handleAboutPageVisibility = (visible) => {
    this.setState({ displayAboutPage: visible });
  };

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

  setResource = (tileValue, count, value) => {
    const index = +tileValue;
    this.setState({
      resources: update(this.state.resources, {
        [index]: { [count]: { $set: value } },
      }),
    });
  };

  setRoll = (n) => {
    const index = Number(n) - 2;
    const rolls = this.state.rolls;
    rolls[index]++;
    let log = update(this.state.log, { $unshift: [n] });
    this.setState({ rolls: rolls, log: log });
    this.setActivePlayer(null, "next");
    this.getResources(+n);
  };

  setFullScreen = () => {
    this.setState({ fullScreen: !this.state.fullScreen });
  };

  getResources = (value) => {
    // get resources based on the dice roll
    const resources = this.state.resources;
    const obj = resources[value];
    let res = [];
    for (let key in obj) {
      if (obj[key] !== "") {
        res.push(obj[key]);
      }
    }
    this.setState({
      resourceDescription: res,
      resourceLog: [...res, ...this.state.resourceLog],
    });

    return res;
  };

  rollDie = async () => {
    let roll1 = chance.d6();
    let roll2 = chance.d6();
    this.setState({ diceRolls: [roll1, roll2] });
    this.handleRoll([roll1, roll2]);
  };

  componentDidMount() {
    window.document.addEventListener("keydown", this.handlePress);
  }

  componentWillUnmount() {
    window.document.addEventListener("keydown", this.handlePress);
  }

  render() {
    const log = this.state.log;
    const lastRoll = _.head(log);
    const diceProps = {
      undo: this.handleUndo,
      onClick: this.handleClick,
    };
    const chartProps = {
      chartID: this.chartID,
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
        resourceLog: this.state.showResourceLog,
        diceLog: this.state.showDiceLog,
      },
      handleSelect: this.handleSelect,
      onChange: this.setPlayerNames,
      handleDiceToggle: (option) => {
        this.setState({ showDiceInput: option });
      },
      handleNumPadToggle: (option) => {
        this.setState({ showNumPadInput: option });
      },
      handleResourceLogToggle: (option) => {
        this.setState({ showResourceLog: option });
      },
      handleDiceLogToggle: (option) => {
        this.setState({ showDiceLog: option });
      },
      handleAboutPageVisibility: this.handleAboutPageVisibility,
      handleResourceTrackerVisibility: this.handleResourceTrackerVisibility,
      handleMenuVisibility: this.handleMenuVisibility,
    };
    return (
      <>
        <CssBaseline />
        <CustomTheme>
          <SiteLayout
            fullScreen={this.state.fullScreen}
            left={
              <div>
                <About
                  open={this.state.displayAboutPage}
                  handleVisibility={this.handleAboutPageVisibility}
                />
                <HelpMenu
                  open={this.state.displayHelpMenu}
                  handleVisibility={this.handleMenuVisibility}
                />
                <ResourceTracker
                  resources={this.state.resources}
                  onChange={this.setResource}
                  open={this.state.displayResourceTracker}
                  handleVisibility={this.handleResourceTrackerVisibility}
                />
                {!this.state.fullScreen && (
                  <ExpansionIconWrapper>
                    <div className="hideForMobile">
                      <div className="d-flex justify-content-end">
                        <IconButton
                          id="expand-chart-button"
                          title="Expand Chart Area"
                          onClick={this.setFullScreen}
                          size="small"
                        >
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
                        {this.state.resourceDescription.length !== 0 && (
                          <ResourceDisplay
                            resourceDescription={this.state.resourceDescription}
                            icons={false}
                          />
                        )}
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
                        <PlayerIcons {...playerProps} />
                      </div>
                    )}
                  </div>
                </div>
                <DiceChart {...chartProps} />
                {this.state.showDiceLog && (
                  <LoggedRolls data={this.state.log} />
                )}
                {this.state.showResourceLog && (
                  <LoggedRolls
                    state={this}
                    resourceLog
                    data={this.state.resourceLog}
                    highlight={false}
                    totalText="Total Resource Pulls"
                    lastText="Last Resources"
                  />
                )}
              </div>
            }
            right={
              <div>
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
                  {this.state.resourceDescription.length !== 0 && (
                    <ResourceDisplay
                      icons={false}
                      resourceDescription={this.state.resourceDescription}
                    />
                  )}
                  {this.state.showDiceInput && (
                    <DiceRoller
                      key={this.chartID}
                      onClick={this.rollDie}
                      rolls={this.state.diceRolls}
                    />
                  )}
                </>
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
          <Footer onClick={() => this.handleAboutPageVisibility(true)} />
        </CustomTheme>
      </>
    );
  }
}
export default App;

// TODO: Remove extra props if component can get it from the state prop
