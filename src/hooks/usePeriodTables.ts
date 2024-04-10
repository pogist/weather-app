import { useMemo } from 'react';

import type { TableItem } from '../components/Table';
import type { ForecastPeriod } from '../types';

type PeriodTables = {
  temp: TableItem[];
  rain: TableItem[];
  atmo: TableItem[];
  wind: TableItem[];
};

export default function usePeriodTables(
  period: ForecastPeriod | null,
): PeriodTables {
  const temp = useMemo(() => createTemp(period?.temp), [period?.temp]);
  const rain = useMemo(() => createRain(period?.rain), [period?.rain]);
  const atmo = useMemo(
    () => createAtmo(period?.atmosphere),
    [period?.atmosphere],
  );
  const wind = useMemo(() => createWind(period?.wind), [period?.wind]);
  return { temp, rain, atmo, wind };
}

function createTemp(temp?: ForecastPeriod['temp']): TableItem[] {
  if (!temp) {
    return [];
  }
  return [
    { id: 'temp', title: 'Atual', value: `${temp.value}ºC` },
    { id: 'temp_min', title: 'Mínima', value: `${temp.min}ºC` },
    { id: 'temp_max', title: 'Máxima', value: `${temp.max}ºC` },
    {
      id: 'feels_like',
      title: 'Sensação térmica',
      value: `${temp.feelsLike}ºC`,
    },
  ];
}

function createRain(rain?: ForecastPeriod['rain']): TableItem[] {
  if (!rain) {
    return [];
  }
  return [
    {
      id: 'rain',
      title: 'Volume nas últimas 3h',
      value: rain.volume ? `${rain.volume}mm` : '--',
    },
    {
      id: 'pop',
      title: 'Chance de precipitação',
      value: rain.precipitation ? `${rain.precipitation}%` : '--',
    },
  ];
}

function createAtmo(atmo?: ForecastPeriod['atmosphere']): TableItem[] {
  if (!atmo) {
    return [];
  }
  return [
    { id: 'humidity', title: 'Umidade relativa', value: `${atmo.humidity}%` },
    { id: 'visibility', title: 'Visibilidade', value: `${atmo.visibility}m` },
    { id: 'pressure', title: 'Pressão', value: `${atmo.pressure}hPa` },
  ];
}

function createWind(wind?: ForecastPeriod['wind']): TableItem[] {
  if (!wind) {
    return [];
  }
  return [
    { id: 'deg', title: 'Direção', value: `${wind.direction}º` },
    { id: 'speed', title: 'Velocidade', value: `${wind.speed} m/seg` },
    { id: 'gust', title: 'Rajada', value: `${wind.gust} m/seg` },
  ];
}
