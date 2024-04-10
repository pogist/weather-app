import { useEffect, useState } from 'react';

import {
  forecast as forecastService,
  geocoding,
  location as locationService,
} from '../service';
import type { Forecast, LocationCoord } from '../types';

type UseForecast = [Forecast | null, (name: string | null) => void, boolean];
export default function useForecast(): UseForecast {
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  useEffect(() => {
    getForecast().then((result) => {
      setForecast(result);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    if (location) {
      setLoading(true);
      getForecast(location).then((result) => {
        setForecast(result);
        setLoading(false);
      });
    }
  }, [location]);
  return [forecast, setLocation, loading];
}

async function getForecast(location?: string): Promise<Forecast | null> {
  let coord: LocationCoord | null = null;
  if (!location) {
    if (await locationServicesAvailable()) {
      coord = await locationService.getCurrent();
    }
  } else {
    coord = await geocoding.getCoord(location);
  }
  return coord ? forecastService.get({ coord }) : null;
}

async function locationServicesAvailable(): Promise<boolean> {
  const enabled = await locationService.isEnabled();
  if (!enabled) {
    return locationService.request();
  }
  return true;
}
