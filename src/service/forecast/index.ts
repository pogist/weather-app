import Config from 'react-native-config';

import type { Forecast } from '../../types';
import applySpec from './applySpec';
import type { ForecastRequest, ForecastResponse } from './types';

async function get(request: ForecastRequest): Promise<Forecast> {
  const url = new URL(Config.FORECAST_API_URL);
  url.searchParams.append('lang', 'pt_br');
  url.searchParams.append('lat', request.lat.toString());
  url.searchParams.append('lon', request.long.toString());
  url.searchParams.append('appid', Config.OPEN_WEATHER_MAP_API_KEY);

  const res = await fetch(url.toString());
  const body = (await res.json()) as ForecastResponse;

  return applySpec(body);
}

export default { get };
