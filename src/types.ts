export type WeatherType =
  | 'thunderstorm'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'atmosphere'
  | 'clear'
  | 'clouds';

export type Forecast = {
  city: string;
  periods: ForecastPeriod[];
  sunrise: string;
  sunset: string;
  timestamp: string;
};

export type ForecastPeriod = {
  atmosphere: {
    humidity: number;
    pressure: number;
    visibility: number;
  };
  rain: {
    precipitation?: number;
    volume?: number;
  };
  temp: {
    feelsLike: number;
    max?: number;
    min?: number;
    value: number;
  };
  weather: {
    description: string;
    type: WeatherType;
  };
  wind: {
    direction: number;
    gust: number;
    speed: number;
  };
  timestamp: string;
};
