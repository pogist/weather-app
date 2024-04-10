import { NativeModules } from 'react-native';

import type { LocationCoord } from '../types';

const Geocoding = NativeModules.Geocoding;

export type GeocodingModule = {
  getCoord: (name: string) => Promise<LocationCoord>;
};

export default {
  getCoord: async (name: string) => Geocoding.getLocation(name),
} as GeocodingModule;
