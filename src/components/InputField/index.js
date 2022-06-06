import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const InputField = (props) => {
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

export default InputField;
