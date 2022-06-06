import React from "react";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { faAngleDown } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import PlayerSelect from "./PlayerSelect";
import InputField from "./InputField";

const Settings = ({
  handleResourceTrackerVisibility,
  state,
  onChange,
  handleSelect,
  handleDiceToggle,
  handleNumPadToggle,
  handleMenuVisibility,
  toggles,
}) => {
  const showResourceTracker = false;
  return (
    <Box mb={1}>
      <Accordion
        disableGutters
        defaultExpanded
        square={true}
        variant="outlined"
      >
        <AccordionSummary expandIcon={<FontAwesomeIcon icon={faAngleDown} />}>
          <Typography variant="button">Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider>
            <Chip label="Players" size="small" />
          </Divider>
          <Box my={2}>
            <PlayerSelect
              playerCount={state.players.length}
              onChange={handleSelect}
            />
            {state.players.length > 0 && (
              <InputField
                fullWidth
                size="small"
                value={state.players[0]}
                id="0"
                label="Player Name"
                onChange={onChange}
              />
            )}
            {state.players.length > 1 && (
              <InputField
                fullWidth
                size="small"
                value={state.players[1]}
                id="1"
                label="Player Name"
                onChange={onChange}
              />
            )}
            {state.players.length > 2 && (
              <InputField
                fullWidth
                size="small"
                value={state.players[2]}
                id="2"
                label="Player Name"
                onChange={onChange}
              />
            )}
            {state.players.length > 3 && (
              <InputField
                fullWidth
                size="small"
                value={state.players[3]}
                id="3"
                label="Player Name"
                onChange={onChange}
              />
            )}
            {state.players.length > 4 && (
              <InputField
                fullWidth
                size="small"
                value={state.players[4]}
                id="4"
                label="Player Name"
                onChange={onChange}
              />
            )}
            {state.players.length > 5 && (
              <InputField
                fullWidth
                size="small"
                value={state.players[5]}
                id="5"
                label="Player Name"
                onChange={onChange}
              />
            )}
          </Box>
          <Divider>
            <Chip label="Options" size="small" />
          </Divider>
          <Box my={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={toggles.diceInput}
                  onChange={(e) => handleDiceToggle(e.target.checked)}
                />
              }
              label={<Typography variant="body2">Show Virtual Dice</Typography>}
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={toggles.numPadInput}
                  onChange={(e) => handleNumPadToggle(e.target.checked)}
                />
              }
              label={<Typography variant="body2">Show Number Input</Typography>}
              labelPlacement="end"
            />
          </Box>
          <Box mt={2}>
            <Button
              id="keyboard-shortcuts"
              title="View keyboard shortcuts"
              variant="text"
              size="small"
              onClick={() => handleMenuVisibility(true)}
            >
              View Keyboard Shortcuts
            </Button>
          </Box>
          {showResourceTracker && (
            <Box mt={2}>
              <Button
                id="keyboard-shortcuts"
                title="View keyboard shortcuts"
                variant="text"
                size="small"
                onClick={() => handleResourceTrackerVisibility(true)}
              >
                Enter Resources
              </Button>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default Settings;

Settings.propTypes = {
  state: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleDiceToggle: PropTypes.func.isRequired,
  handleNumPadToggle: PropTypes.func.isRequired,
  handleMenuVisibility: PropTypes.func.isRequired,
  handleResourceTrackerVisibility: PropTypes.func.isRequired,
  toggles: PropTypes.shape({
    numPadInput: PropTypes.bool,
    diceInput: PropTypes.bool,
  }).isRequired,
};
