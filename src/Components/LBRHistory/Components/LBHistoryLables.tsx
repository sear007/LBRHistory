import React from "react";
import { VictoryLabel } from "victory";

interface LBHistoryLablesProp {
  LeftLabel?: String;
  RightLabel?: String;
}

const LBHistoryLables: React.FC<LBHistoryLablesProp> = ({
  LeftLabel = "LBR / EFF",
  RightLabel = "MPWR"
}) => {
  const style = {
    color: "#595959",
    fontWeight: "bold",
    fontSize: 14
  };

  return (
    <React.Fragment>
      <VictoryLabel style={style} angle={-90} x={10} y={150} text={LeftLabel} />
      <VictoryLabel style={style} x={1350} y={20} text={RightLabel} />
    </React.Fragment>
  );
};

export default LBHistoryLables;
