import { NativeModules, PermissionsAndroid, Platform } from 'react-native';

import type { LocationCoord } from '../types';

const Location = NativeModules.Location;
const permission = PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;

async function getCurrent(): Promise<LocationCoord | null> {
  if (Platform.OS === 'android') {
    return Location.getCurrent();
  }
  if (Platform.OS === 'ios') {
    return new Promise((resolve, reject) => {
      Location.getCurrent(
        (error: Error | null, location: { lat: number; long: number }) => {
          if (error) {
            reject(error);
          } else {
            resolve(location);
          }
        },
      );
    });
  }
  return null;
}

async function isEnabled(): Promise<boolean> {
  if (Platform.OS === 'android') {
    return PermissionsAndroid.check(permission);
  }
  if (Platform.OS === 'ios') {
    return Location.isEnabled();
  }
  return false;
}

async function request(): Promise<boolean> {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(permission);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  if (Platform.OS === 'ios') {
    return new Promise((resolve, reject) => {
      Location.request((error: Error | null, granted: boolean) => {
        if (error) {
          reject(error);
        } else {
          resolve(granted);
        }
      });
    });
  }
  return false;
}

export default { getCurrent, isEnabled, request };
