import type { Forecast, ForecastPeriod, WeatherType } from '../../types';
import { capitalize } from '../../util';
import type { ForecastResponse } from './types';

export default function applySpec(raw: ForecastResponse): Forecast {
  const periods: ForecastPeriod[] = [];
  for (const item of raw.list) {
    const { dt, main, pop, rain, visibility, weather, wind } = item;
    const { feels_like, humidity, pressure, temp, temp_max, temp_min } = main;
    periods.push({
      timestamp: timestamp(dt),
      atmosphere: { humidity, pressure, visibility },
      rain: { precipitation: pop, volume: rain?.['3h'] },
      temp: {
        feelsLike: Math.round(feels_like),
        max: temp_max ? Math.round(temp_max) : undefined,
        min: temp_min ? Math.round(temp_min) : undefined,
        value: Math.round(temp),
      },
      weather: {
        description: capitalize(weather[0].description),
        type: weather[0].main.toLowerCase() as WeatherType,
      },
      wind: { direction: wind.deg, gust: wind.gust, speed: wind.speed },
    });
  }
  return {
    periods,
    city: raw.city.name,
    sunrise: timestamp(raw.city.sunrise),
    sunset: timestamp(raw.city.sunset),
    timestamp: timestamp(raw.list[0].dt),
  };
}

function timestamp(utcTime: number): string {
  return new Date(utcTime * 1000).toISOString();
}
