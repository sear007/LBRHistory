interface SelectedDateProp {
  startDate: Date;
  endDate: Date;
  key: String;
  ticks?: [];
  interval?: String;
}

interface DataProp {
  axisBottom?: [];
  dataBar?: [];
  mpwr?: [];
  lbr?: [];
  eff?: [];
}

interface OptionProp {
  data: any[];
  defaultValue?: number | string;
  key?: string;
  label?: string;
  onChange: (value: string) => void;
}
export type { OptionProp, SelectedDateProp, DataProp };
