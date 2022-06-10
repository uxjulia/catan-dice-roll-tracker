import React from "react";
import PropTypes from "prop-types";
import NumberTile from "./NumberTile";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const options = [
  "Clay / Brick",
  "Hay / Grain",
  "Wood / Lumber",
  "Ore",
  "Sheep / Wool",
];
const resourceMap = {
  "Clay / Brick": "brick",
  "Hay / Grain": "grain",
  "Wood / Lumber": "lumber",
  Ore: "ore",
  "Sheep / Wool": "wool",
  brick: "brick",
  grain: "grain",
  lumber: "lumber",
  wool: "wool",
};

const ResourceInput = ({
  rarity,
  dataId,
  tileValue,
  color,
  onChange,
  value = "--- Select ---",
}) => {
  return (
    <Box className="d-flex align-items-center" mt={2} mb={2}>
      <NumberTile rarity={rarity} color={color} value={tileValue} />
      <FormControl fullWidth margin="normal" size="small">
        <InputLabel>Resource</InputLabel>
        <Select
          id={tileValue}
          value={resourceMap[value] || value}
          label="Resource"
          onChange={(e) => {
            onChange(+tileValue, dataId, e.target.value);
          }}
        >
          {options.map((val) => (
            <MenuItem key={val} value={resourceMap[val]}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

ResourceInput.propTypes = {
  dataId: PropTypes.string.isRequired,
  tileValue: PropTypes.string.isRequired,
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  resources: PropTypes.array,
  value: PropTypes.string,
  rarity: PropTypes.number,
};

export default ResourceInput;
