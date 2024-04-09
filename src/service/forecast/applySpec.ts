import type { Forecast, ForecastPeriod, WeatherType } from '../../types';
import { capitalize } from '../../util';
import type { ForecastResponse } from './types';

export default function applySpec(raw: ForecastResponse): Forecast {
  const periods: ForecastPeriod[] = [];
  for (const item of raw.list) {
    periods.push({
      timestamp: timestamp(item.dt),
      data: {
        atmosphere: {
          humidity: item.main.humidity,
          pressure: item.main.pressure,
          visibility: item.visibility,
        },
        rain: {
          precipitation: item.pop,
          volume: item.rain?.['3h'],
        },
        temp: {
          feelsLike: item.main.feels_like,
          max: item.main.temp_max,
          min: item.main.temp_min,
          value: item.main.temp,
        },
        weather: {
          description: capitalize(item.weather[0].description),
          type: item.weather[0].main.toLowerCase() as WeatherType,
        },
        wind: {
          direction: item.wind.deg,
          gust: item.wind.gust,
          speed: item.wind.speed,
        },
      },
    });
  }
  return {
    periods,
    sunrise: timestamp(raw.city.sunrise),
    sunset: timestamp(raw.city.sunset),
    timestamp: timestamp(raw.list[0].dt),
  };
}

function timestamp(utcTime: number): string {
  return new Date(utcTime * 1000).toISOString();
}
