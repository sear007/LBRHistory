import React from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import {
  addDays,
  endOfDay,
  startOfDay,
  addMonths,
  isSameDay,
  endOfMonth,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  eachMonthOfInterval,
  eachDayOfInterval,
  eachHourOfInterval,
  eachWeekOfInterval,
  format,
  getWeek,
  endOfWeek
} from "date-fns";
import moment from "moment";

const defineds = {
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  endOfTheMonth: endOfDay(endOfMonth(new Date())),
  startOf7DaysAgo: startOfDay(addDays(new Date(), -7)),
  startOf30DaysAgo: startOfDay(addDays(new Date(), -30))
};

const staticRangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    );
  }
};

const createStaticRanges = (ranges) => {
  return ranges.map((range) => ({ ...staticRangeHandler, ...range }));
};

const staticRanges = createStaticRanges([
  {
    label: "Last 24 hours",
    range: () => ({
      startDate: defineds.startOfToday,
      endDate: defineds.endOfToday
    })
  },
  {
    label: "Last 7 Days",
    range: () => ({
      startDate: defineds.startOf7DaysAgo,
      endDate: defineds.endOfToday
    })
  },
  {
    label: "Last 30 Days",
    range: () => ({
      startDate: defineds.startOf30DaysAgo,
      endDate: defineds.endOfToday
    })
  }
]);

const defaultState = {
  startDate: new Date(),
  endDate: addDays(new Date(), 30),
  key: "selection"
};

const handleDefinedRange = (date) => {
  return staticRanges.find((r: any) => {
    const range = r.range();
    return (
      isSameDay(range.startDate, date.startDate) &&
      isSameDay(range.endDate, date.endDate)
    );
  });
};

const handleSelectionFormat = (date) => {
  const FORMAT = "MMM DD YYYY";
  return `${moment(date.startDate).format(FORMAT)} - ${moment(
    date.endDate
  ).format(FORMAT)}`;
};

const dateRangeInterval = ({ startDate, endDate }) => {
  if (differenceInHours(endDate, startDate) <= 24) {
    return "hourly";
  }

  if (differenceInDays(endDate, startDate) <= 30) {
    return "daily";
  }

  if (differenceInWeeks(endDate, startDate) <= 30) {
    return "weekly";
  }

  return "monthly";
};

const eachInternal = ({ startDate, endDate }) => {
  const interval = dateRangeInterval({ startDate, endDate });
  switch (interval) {
    case "monthly":
      return eachMonthOfInterval({
        start: startDate,
        end: endDate
      }).map((d) => ({
        key: parseInt(format(d, "yyyyM")),
        label: format(d, "MMMM yyyy")
      }));
    case "daily":
      return eachDayOfInterval({
        start: startDate,
        end: endDate
      }).map((d) => ({
        key: parseInt(format(d, "d")),
        label: format(d, "MMMM dd")
      }));
    case "weekly":
      const now = new Date();
      const dates = eachWeekOfInterval({
        start: startDate,
        end: endDate
      });

      return dates.map((d, index) => {
        let sd = d;
        let ed = endOfWeek(d);
        if (index === 0) {
          sd = startDate;
        } else if (index === dates.length - 1) {
          ed = endDate;
        }

        return {
          key: differenceInWeeks(now, d),
          label: `Week ${getWeek(d)}`,
          dateRange: `Week ${getWeek(d)} (${format(
            sd,
            "MMM dd, yyyy"
          )} - ${format(ed, "MMM dd, yyyy")})`
        };
      });
    case "hourly":
      return eachHourOfInterval({
        start: startDate,
        end: endDate
      }).map((d) => ({
        key: parseInt(format(d, "H")),
        label: format(d, "HH:00")
      }));
    default:
      throw "error";
  }
};

const normalizeDataChart = (ticks: any) => {
  return {
    axisBottom: ticks.map(({ label }) => label),
    mpwr: ticks.map((__: any, key: number) => ({
      x: key + 1,
      y: Math.floor(Math.random() * 51) + 10
    })),
    eff: ticks.map((__: any, key: number) => ({
      x: key + 1,
      y: Math.floor(Math.random() * 51) + 10
    })),
    lbr: ticks.map((__: any, key: number) => ({
      x: key + 1,
      y: Math.floor(Math.random() * 51) + 10
    }))
  };
};

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

export {
  normalizeDataChart,
  dateRangeInterval,
  eachInternal,
  staticRanges,
  defaultState,
  handleDefinedRange,
  handleSelectionFormat,
  shiftOption,
  orderingOption,
  directionOption
};
