import { NativeModules } from 'react-native';

const Geocoding = NativeModules.Geocoding;

type LatLong = { lat: number; long: number };

export type GeocodingModule = {
  getLocation: (name: string) => Promise<LatLong>;
};

export default {
  getLocation: async (name: string) => Geocoding.getLocation(name),
} as GeocodingModule;
