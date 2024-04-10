import Config from 'react-native-config';

import type { Forecast } from '../../types';
import applySpec from './applySpec';
import type { ForecastRequest, ForecastResponse } from './types';

async function get({
  coord: { lat, long },
}: ForecastRequest): Promise<Forecast> {
  const url = new URL(Config.FORECAST_API_URL);
  url.searchParams.append('lang', 'pt_br');
  url.searchParams.append('units', 'metric');
  url.searchParams.append('lat', lat.toString());
  url.searchParams.append('lon', long.toString());
  url.searchParams.append('appid', Config.OPEN_WEATHER_MAP_API_KEY);

  const res = await fetch(url.toString());
  const body = (await res.json()) as ForecastResponse;

  return applySpec(body);
}

export default { get };
