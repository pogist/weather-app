import { useEffect, useState } from 'react';

import {
  forecast as forecastService,
  location as locationService,
} from '../service';
import { Forecast } from '../types';

export default function useForecast(): [Forecast | null, boolean] {
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  useEffect(() => {
    locationService
      .isEnabled()
      .then((enabled) => {
        if (!enabled) {
          return locationService.request();
        }
        return true;
      })
      .then((granted) => {
        if (!granted) {
          setLoading(false);
          return null;
        }
        return locationService.getCurrent();
      })
      .then((location) => {
        if (!location) {
          return null;
        }
        return forecastService.get(location);
      })
      .then((result) => {
        setForecast(result);
        setLoading(false);
      });
  }, []);
  return [forecast, loading];
}
