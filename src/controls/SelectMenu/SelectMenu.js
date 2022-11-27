import React from "react";
import Select from "react-select";

const SelectMenu = ({ options, value, defaultValue, handleOptionChange }) => {
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onChange={handleOptionChange}
      options={options}
    />
  );
};
export default SelectMenu;
