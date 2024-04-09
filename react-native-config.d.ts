declare module 'react-native-config' {
  export interface NativeConfig {
    /**
     * OpenWeatherMap's '5 day / 3 hour' forecast API URL
     */
    FORECAST_API_URL: string;
    /**
     * OpenWeatherMap's API key
     */
    OPEN_WEATHER_MAP_API_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
