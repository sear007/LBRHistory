import React from "react";
import { DateRangePicker } from "react-date-range";
import { Box, Button, Fade, Paper, Popper } from "@material-ui/core";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import { LBRContainer } from "./../styles";
import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";
import {
  staticRanges,
  defaultState,
  handleDefinedRange,
  handleSelectionFormat,
  eachInternal,
  dateRangeInterval
} from "./../helpers";

interface StateType {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface LBRDateRangeProp {
  onChange?: (data: StateType) => void;
}

const LBRDateRange: React.FC<LBRDateRangeProp> = ({ onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [state, setState] = React.useState<StateType[]>([defaultState]);
  const open = Boolean(anchorEl);
  const id = open ? "transitions-popper" : undefined;
  const [display, setDisplay] = React.useState<String>(
    handleSelectionFormat(defaultState)
  );
  const handleDisplay = (date: StateType) => {
    const selectionFormat = handleSelectionFormat(date);
    const definedRange = handleDefinedRange(date);
    setDisplay(
      definedRange
        ? `${definedRange.label} (${selectionFormat})`
        : selectionFormat
    );
  };

  const handleSelected = ({ selection }: any) => {
    const dateSelected = {
      ...selection,
      interval: dateRangeInterval(selection),
      ticks: eachInternal(selection)
    };
    onChange(dateSelected);
    setState([dateSelected]);
    handleDisplay(dateSelected);
    setAnchorEl(null);
  };

  React.useEffect(() => {
    handleSelected({
      selection: defaultState
    });
  }, []);

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={(event) => setAnchorEl(anchorEl ? null : event.currentTarget)}
        endIcon={<CalendarTodayOutlinedIcon />}
      >
        {display}
      </Button>
      <Popper
        style={{ zIndex: 9999 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <DateRangePicker
                onChange={handleSelected}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={state}
                inputRanges={[]}
                direction="horizontal"
                staticRanges={staticRanges.map((range) => ({
                  ...range,
                  label: range.label
                }))}
              />
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default LBRDateRange;
