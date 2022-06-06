import React from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

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
          <MenuItem value={0}>
            <Typography variant="body2" component="span">
              --- Select ---
            </Typography>
          </MenuItem>
          <MenuItem value={1}>
            <Typography variant="body2" component="span">
              1
            </Typography>
          </MenuItem>
          <MenuItem value={2}>
            <Typography variant="body2" component="span">
              2
            </Typography>
          </MenuItem>
          <MenuItem value={3}>
            <Typography variant="body2" component="span">
              3
            </Typography>
          </MenuItem>
          <MenuItem value={4}>
            <Typography variant="body2" component="span">
              4
            </Typography>
          </MenuItem>
          <MenuItem value={5}>
            <Typography variant="body2" component="span">
              5
            </Typography>
          </MenuItem>
          <MenuItem value={6}>
            <Typography variant="body2" component="span">
              6
            </Typography>
          </MenuItem>
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
