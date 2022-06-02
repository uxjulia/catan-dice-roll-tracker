import React from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
// Select the number of players
const PlayerSelect = ({ playerCount, onChange }) => {
  return (
    <Box className="mb-4">
      <FormControl fullWidth size="small">
        <InputLabel id="number-of-players">Total Players</InputLabel>
        <Select
          labelId="number-of-players"
          id="total-players"
          label="Total Players"
          value={playerCount}
          onChange={onChange}
        >
          <MenuItem value={0}>--- Select ---</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

PlayerSelect.propTypes = {
  playerCount: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PlayerSelect;
