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
import {
  faAngleDown,
  faTrees,
  faKeyboard,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import PlayerSelect from "./PlayerSelect";
import InputField from "./InputField";
import { styled } from "@mui/material/styles";

const CheckSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const Settings = ({
  handleResourceTrackerVisibility,
  state,
  onChange,
  handleSelect,
  handleDiceToggle,
  handleNumPadToggle,
  handleMenuVisibility,
  handleResourceLogToggle,
  handleDiceLogToggle,
  toggles,
}) => {
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
            <Box mt={2} mb={2}>
              <Button
                fullWidth
                id="enter-resources"
                title="Enter Resources"
                variant="contained"
                size="small"
                color="success"
                onClick={() => handleResourceTrackerVisibility(true)}
              >
                <FontAwesomeIcon icon={faTrees} className="me-2" /> Track
                Resources
              </Button>
            </Box>
            <FormControlLabel
              control={
                <CheckSwitch
                  checked={toggles.numPadInput}
                  onChange={(e) => handleNumPadToggle(e.target.checked)}
                />
              }
              label={<Typography variant="body2">Number Pad</Typography>}
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <CheckSwitch
                  checked={toggles.diceInput}
                  onChange={(e) => handleDiceToggle(e.target.checked)}
                />
              }
              label={<Typography variant="body2">Virtual Dice</Typography>}
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <CheckSwitch
                  checked={toggles.diceLog}
                  onChange={(e) => handleDiceLogToggle(e.target.checked)}
                />
              }
              label={<Typography variant="body2">Dice Log</Typography>}
              labelPlacement="end"
            />
            <FormControlLabel
              control={
                <CheckSwitch
                  checked={toggles.resourceLog}
                  onChange={(e) => handleResourceLogToggle(e.target.checked)}
                />
              }
              label={<Typography variant="body2">Resource Log</Typography>}
              labelPlacement="end"
            />
          </Box>
          <Divider>
            <Chip label="Help" size="small" />
          </Divider>
          <Box mt={2}>
            <Button
              id="keyboard-shortcuts"
              title="View keyboard shortcuts"
              variant="text"
              size="small"
              onClick={() => handleMenuVisibility(true)}
            >
              <FontAwesomeIcon icon={faKeyboard} className="me-2" /> Keyboard
              Shortcuts
            </Button>
          </Box>
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
  handleResourceLogToggle: PropTypes.func.isRequired,
  handleDiceLogToggle: PropTypes.func.isRequired,
  toggles: PropTypes.shape({
    numPadInput: PropTypes.bool,
    diceInput: PropTypes.bool,
    resourceLog: PropTypes.bool,
    diceLog: PropTypes.bool,
  }).isRequired,
};
