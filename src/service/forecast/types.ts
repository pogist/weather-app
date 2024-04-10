import type { LocationCoord } from '../../types';

export type ForecastRequest = {
  coord: LocationCoord;
};

export type ForecastResponse = {
  city: {
    name: string;
    sunrise: number;
    sunset: number;
  };
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min?: number;
      temp_max?: number;
      pressure: number;
      humidity: number;
    };
    weather: {
      main: string;
      description: string;
    }[];
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop?: number;
    rain?: {
      '3h': number;
    };
  }[];
};
