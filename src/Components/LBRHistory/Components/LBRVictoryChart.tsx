import React from "react";
import { Box } from "@material-ui/core";
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryAxis,
  VictoryBar,
  VictoryLine,
  VictoryScatter
} from "victory";
import { LBHistoryLables } from "./index";
import { styles } from "./../styles";
import { DataProp } from "./../Interfaces";

interface LBRVictoryChartProp {
  data: DataProp;
}

const LBRVictoryChart: React.FC<LBRVictoryChartProp> = ({ data }) => {
  return (
    <VictoryChart
      domainPadding={{ x: [30, 30], y: 20 }}
      height={275}
      width={1400}
      padding={{ top: 40, bottom: 40, left: 70, right: 50 }}
      containerComponent={
        <VictoryVoronoiContainer labelComponent={<VictoryTooltip />} />
      }
    >
      <LBHistoryLables />
      <VictoryAxis
        standalone={false}
        style={styles.AxisVertical}
        orientation="left"
        domain={[0, 100]}
        tickFormat={(t) => `${t}%`}
        tickValues={[0, 20, 40, 60, 80, 100]}
        dependentAxis
      />
      <VictoryBar
        animate={{ duration: 20 }}
        standalone={false}
        style={styles.VictoryBarMPWR}
        data={data?.mpwr}
      />
      <VictoryLine
        animate={{ duration: 20 }}
        interpolation="natural"
        style={styles.VictoryLineLBR}
        standalone={false}
        data={data?.lbr}
      />
      <VictoryScatter
        animate={{ duration: 20 }}
        style={styles.VictoryScatterLBR}
        size={4}
        data={data?.lbr}
      />

      <VictoryLine
        animate={{ duration: 20 }}
        interpolation="natural"
        style={styles.VictoryLineEFF}
        standalone={false}
        data={data?.eff}
      />
      <VictoryScatter
        animate={{ duration: 20 }}
        style={styles.VictoryScatterEFF}
        size={4}
        data={data?.eff}
      />
      <VictoryAxis
        style={{
          ...styles.AxisHorizontal,
          ...(data?.axisBottom.length >= 30 && { tickLabels: { angle: -25 } })
        }}
        orientation="bottom"
        standalone={false}
        tickValues={data?.axisBottom}
      />
      <VictoryAxis
        standalone={false}
        style={styles.AxisVertical}
        orientation="right"
        dependentAxis
      />
    </VictoryChart>
  );
};

export default LBRVictoryChart;
