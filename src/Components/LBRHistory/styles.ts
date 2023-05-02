import { Box, Button, Dialog, DialogTitle } from "@material-ui/core";
import { styled } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

const styles = {
  AxisVertical: {
    grid: {
      stroke: ({ tick }) => (tick === -10 ? "transparent" : "#888"),
      strokeWidth: 0.2,
      strokeDasharray: "1, 5"
    },
    axis: { stroke: "#ccc", strokeWidth: 1 },
    ticks: { strokeWidth: 0 },
    tickLabels: { fill: "#595959", fontSize: 13, fontWeight: "bold" }
  },
  AxisHorizontal: {
    axis: { stroke: "#ccc", strokeWidth: 1 },
    tickLabels: { fill: "#595959", fontSize: 13, fontWeight: "bold" }
  },
  VictoryBarMPWR: { data: { fill: "#DED564", width: "30" } },
  VictoryLineLBR: {
    data: { stroke: "#096F0D" }
  },
  VictoryScatterLBR: {
    data: { fill: "#fff", stroke: "#096F0D", strokeWidth: 2 }
  },
  VictoryLineEFF: {
    data: { stroke: "#C74D00" }
  },
  VictoryScatterEFF: {
    data: { fill: "#fff", stroke: "#C74D00", strokeWidth: 2 }
  }
};

const LBRChartContainer = styled(Box)({
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  marginBottom: 20
});

const LBRFilterContainer = styled(Box)({
  display: "flex",
  gap: 20,
  alignItems: "center",
  "& div::last-child": {
    marginLeft: "auto"
  }
});

const LBRDialog = styled(Dialog)({
  "& ::-webkit-scrollbar": {
    display: "block",
    width: "5px",
    height: "5px"
  },
  "& ::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    background: "#888"
  }
});

const LBRDialogHeader = styled(DialogTitle)({
  alignSelf: "flex-end",
  padding: "20px 20px 0px 20px"
});

const LBRCloseButton = styled(CancelIcon)({
  color: "red",
  cursor: "pointer",
  width: "2.5rem",
  height: "2.5rem"
});

const LBRCustomSelectButton = styled(Button)({
  minWidth: 150,
  display: "flex",
  justifyContent: "space-between"
});

export {
  LBRCustomSelectButton,
  LBRChartContainer,
  LBRFilterContainer,
  LBRDialogHeader,
  LBRDialog,
  LBRCloseButton,
  styles
};
