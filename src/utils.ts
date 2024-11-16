import { DateTime } from "luxon";
import { TimeFrame } from "./graphql/types";

export function isWeekend() {
  const today = DateTime.local().weekday;
  return today === 5 || today === 6 || today === 7;
}

function getNextMonday() {
  const today = DateTime.local();
  const daysUntilNextMonday = (8 - today.weekday) % 7;
  return today.plus({ days: daysUntilNextMonday });
}

function getNextFriday() {
  const today = DateTime.local();
  const daysUntilNextFriday = (12 - today.weekday) % 7;
  return today.plus({ days: daysUntilNextFriday });
}

export function getTimeRange(timeframe: TimeFrame): [DateTime, DateTime] {
  if (timeframe === TimeFrame.Week) {
    if (isWeekend()) {
      const nextMonday = getNextMonday();
      return [nextMonday, nextMonday.plus({ days: 4 })];
    }
    return [DateTime.local(), getNextFriday()];
  }

  if (timeframe === TimeFrame.Weekend) {
    if (isWeekend()) {
      return [DateTime.local(), getNextMonday().minus({ days: 1 })];
    }
    return [getNextFriday(), getNextFriday().plus({ days: 2 })];
  }

  if (isWeekend()) {
    return [getNextMonday().plus({ days: 4 }), getNextMonday().plus({ days: 6 })]
  }
  return [getNextFriday().plus({ days: 7 }), getNextFriday().plus({ days: 9 })]
}