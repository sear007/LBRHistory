import React from "react";
import {
  LBRCustomSelect,
  LBRDateRange,
  LBRVictoryChart,
  LBRCustomRadio
} from "./Components";
import {
  LBRChartContainer,
  LBRFilterContainer,
  LBRDialog,
  LBRDialogHeader,
  LBRCloseButton
} from "./styles";
import { normalizeDataChart } from "./helpers";
import { DataProp, SelectedDateProp } from "./Interfaces";
import { Typography, DialogContent } from "@material-ui/core";
import { Box } from "@material-ui/core";

const LBRHistory: React.FC = () => {
  const [data, setData] = React.useState<DataProp>();
  const [selectedDate, setSelectedDate] = React.useState<SelectedDateProp>();

  const handleGetData = React.useCallback(() => {
    if (!selectedDate) return;
    const { ticks } = selectedDate;
    setData(normalizeDataChart(ticks));
  }, [selectedDate]);

  React.useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const shiftOption = [
    { id: 1, name: "Day Shift" },
    { id: 2, name: "Night Shift" }
  ];

  const orderingOption = [
    { id: 1, name: "Best LBR" },
    { id: 2, name: "Worst LBR" }
  ];

  const directionOption = [
    { id: 1, name: "MPWR" },
    { id: 2, name: "OUTPUT" }
  ];

  return (
    <LBRDialog maxWidth="xl" fullWidth keepMounted open={true}>
      <LBRDialogHeader>
        <LBRCloseButton onClick={() => alert("close")} />
      </LBRDialogHeader>
      <DialogContent>
        <LBRChartContainer boxShadow={3}>
          <LBRFilterContainer>
            <Typography variant="h5">LBR History</Typography>
            <LBRDateRange onChange={setSelectedDate} />
            <LBRCustomSelect
              defaultValue={1}
              onChange={console.log}
              data={shiftOption}
            />
            <LBRCustomSelect
              defaultValue={1}
              onChange={console.log}
              data={orderingOption}
            />
            <LBRCustomRadio
              onChange={console.log}
              defaultValue={1}
              data={directionOption}
            />
          </LBRFilterContainer>
          <LBRVictoryChart data={data} />
        </LBRChartContainer>
      </DialogContent>
    </LBRDialog>
  );
};

export default LBRHistory;
