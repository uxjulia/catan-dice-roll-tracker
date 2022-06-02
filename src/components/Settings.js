import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { faTrashCan } from "@fortawesome/pro-duotone-svg-icons";
import { faAngleDown } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import PlayerSelect from "./PlayerSelect";

const PlayerInputAutoSelect = (props) => {
  const inputEl = React.useRef(null);
  const handleFocus = () => {
    inputEl.current.select();
  };
  return (
    <Box className="mt-3 mb-4">
      <TextField inputRef={inputEl} onFocus={handleFocus} {...props} />
    </Box>
  );
};

// Settings Panel
const Settings = ({ onChange, handleSelect }) => {
  const [totalPlayers, setTotalPlayers] = React.useState(0);
  const [player1, setPlayer1] = React.useState("Player 1");
  const [player2, setPlayer2] = React.useState("Player 2");
  const [player3, setPlayer3] = React.useState("Player 3");
  const [player4, setPlayer4] = React.useState("Player 4");
  const [player5, setPlayer5] = React.useState("Player 5");
  const [player6, setPlayer6] = React.useState("Player 6");
  const handleInput = (e) => {
    const value = e.target.value === "Clear" ? totalPlayers : e.target.value;
    setTotalPlayers(value);
    handleSelect(e);
  };

  const handleNameChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    switch (id) {
      case "0":
        setPlayer1(value);
        break;
      case "1":
        setPlayer2(value);
        break;
      case "2":
        setPlayer3(value);
        break;
      case "3":
        setPlayer4(value);
        break;
      case "4":
        setPlayer5(value);
        break;
      case "5":
        setPlayer6(value);
        break;
      default:
        break;
    }
    onChange(e);
  };

  const resetPlayers = (e) => {
    setPlayer1("Player 1");
    setPlayer2("Player 2");
    setPlayer3("Player 3");
    setPlayer4("Player 4");
    setPlayer5("Player 5");
    setPlayer6("Player 6");
    handleSelect(e);
  };

  return (
    <Accordion disableGutters defaultExpanded square={true} variant="outlined">
      <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} />}>
        <Typography variant="button">Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <PlayerSelect playerCount={totalPlayers} onChange={handleInput} />
        {totalPlayers > 0 && (
          <PlayerInputAutoSelect
            fullWidth
            size="small"
            value={player1}
            id="0"
            label="Player Name"
            onChange={handleNameChange}
          />
        )}
        {totalPlayers > 1 && (
          <PlayerInputAutoSelect
            fullWidth
            size="small"
            value={player2}
            id="1"
            label="Player Name"
            onChange={handleNameChange}
          />
        )}
        {totalPlayers > 2 && (
          <PlayerInputAutoSelect
            fullWidth
            size="small"
            value={player3}
            id="2"
            label="Player Name"
            onChange={handleNameChange}
          />
        )}
        {totalPlayers > 3 && (
          <PlayerInputAutoSelect
            fullWidth
            size="small"
            value={player4}
            id="3"
            label="Player Name"
            onChange={handleNameChange}
          />
        )}
        {totalPlayers > 4 && (
          <PlayerInputAutoSelect
            fullWidth
            size="small"
            value={player5}
            id="4"
            label="Player Name"
            onChange={handleNameChange}
          />
        )}
        {totalPlayers > 5 && (
          <PlayerInputAutoSelect
            fullWidth
            size="small"
            value={player6}
            id="5"
            label="Player Name"
            onChange={handleNameChange}
          />
        )}
        <div className="d-flex justify-content-end">
          <Button
            fullWidth
            variant="outlined"
            onClick={resetPlayers}
            type="reset"
            value="Clear"
            size="small"
          >
            Clear Names <FontAwesomeIcon icon={faTrashCan} className="ms-2" />
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
export default Settings;

Settings.propTypes = {
  onChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
};
