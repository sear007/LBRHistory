import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { OptionProp } from "./../Interfaces";

const LBRCustomRadio: React.FC<OptionProp> = ({
  data = [],
  defaultValue = null,
  key = "id",
  label = "name",
  onChange
}) => {
  const [selected, setSelected] = React.useState(null);
  const handleSelect = (value) => {
    setSelected(value);
  };

  React.useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  return (
    <RadioGroup style={{ marginLeft: "auto" }} row defaultValue="top">
      {data?.map((item) => (
        <FormControlLabel
          onChange={() => handleSelect(item[key])}
          checked={item[key] === selected}
          value={item[key]}
          control={<Radio color="primary" />}
          label={item[label]}
        />
      ))}
    </RadioGroup>
  );
};

export default LBRCustomRadio;
