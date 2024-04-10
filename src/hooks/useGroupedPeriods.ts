import { useMemo } from 'react';

import { dateEqual } from '../util';
import type { Forecast, ForecastPeriod } from '../types';

type GroupedPeriods = {
  [date: string]: ForecastPeriod[];
};

function groupByDate(periods: ForecastPeriod[]): GroupedPeriods {
  const grouped: GroupedPeriods = {};
  const length = periods.length;
  let i = 0;
  while (i < length) {
    let j = i + 1;
    while (
      j < length &&
      dateEqual(periods[j - 1].timestamp, periods[j].timestamp)
    ) {
      j += 1;
    }
    grouped[periods[i].timestamp] = periods.slice(i, j);
    i = j;
  }
  return grouped;
}

export default function useGroupedPeriods(
  forecast: Forecast | null,
): GroupedPeriods | null {
  return useMemo(
    () => (forecast ? groupByDate(forecast.periods) : null),
    [forecast],
  );
}
