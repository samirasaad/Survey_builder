import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const InputField = ({
  autoComplete,
  id,
  label,
  type,
  variant,
  defaultValue,
  handleChange,
}) => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete={autoComplete}
    >
      <TextField
        id={id}
        label={label}
        type={type}
        variant={variant}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
    </Box>
  );
};

export default InputField;
