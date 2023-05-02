import React from "react";
import { MenuList, MenuItem, Box, Popover } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { LBRCustomSelectButton } from "./../styles";
import { OptionProp } from "./../Interfaces";

const LBRCustomSelect: React.FC<OptionProp> = ({
  label = "name",
  key = "id",
  defaultValue = null,
  data = []
}) => {
  const [selected, setSelected] = React.useState(null);
  const [display, setDisplay] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelect = (value: string) => {
    const selected = data.find((item) => item[key] === value);
    setDisplay(selected[label] || null);
    setSelected(selected[key]);
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  React.useEffect(() => {
    if (defaultValue) {
      const selected = data.find((item) => item[key] === defaultValue);
      setDisplay(selected[label] || null);
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Box>
      <LBRCustomSelectButton
        endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
      >
        {display || "Choose Option"}
      </LBRCustomSelectButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: -5,
          horizontal: "right"
        }}
      >
        <MenuList
          style={{ minWidth: 150 }}
          id="menu-list-grow"
          onKeyDown={() => {}}
        >
          {data.map((item) => (
            <MenuItem
              selected={selected === item[key]}
              key={item[key]}
              onClick={() => handleSelect(item[key])}
            >
              {item[label]}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </Box>
  );
};

export default LBRCustomSelect;
