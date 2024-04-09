export type ForecastRequest = {
  lat: number;
  long: number;
};

export type ForecastResponse = {
  city: {
    sunrise: number;
    sunset: number;
  };
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
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