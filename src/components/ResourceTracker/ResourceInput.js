import React from "react";
import PropTypes from "prop-types";
import NumberTile from "./NumberTile";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const filterOptions = createFilterOptions({
  trim: true,
});

const options = [
  "--- Select ---",
  "Brick",
  "Clay",
  "Lumber",
  "Wood",
  "Wheat",
  "Hay",
  "Grain",
  "Wool",
  "Sheep",
  "Ore",
];

const ResourceInput = ({
  tileValue,
  color,
  onChange,
  value = "--- Select ---",
}) => {
  return (
    <Box className="d-flex align-items-center" mt={2} mb={2}>
      <NumberTile color={color} value={tileValue} />
      <FormControl fullWidth margin="normal">
        <Autocomplete
          id={tileValue}
          autoHighlight
          autoSelect
          filterOptions={filterOptions}
          autoComplete={false}
          size="small"
          options={options}
          value={value}
          onChange={(event, newValue) => {
            onChange(+tileValue, newValue);
          }}
          renderInput={(params) => (
            <TextField
              size="small"
              {...params}
              label={`Resource ${tileValue}`}
            />
          )}
        />
      </FormControl>
    </Box>
  );
};

ResourceInput.propTypes = {
  tileValue: PropTypes.string.isRequired,
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  resources: PropTypes.array,
  value: PropTypes.string,
};

export default ResourceInput;
