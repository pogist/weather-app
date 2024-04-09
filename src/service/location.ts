import { NativeModules, PermissionsAndroid, Platform } from 'react-native';

const Location = NativeModules.Location;
const permission = PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;

async function isEnabled(): Promise<boolean> {
  if (Platform.OS === 'android') {
    return PermissionsAndroid.check(permission);
  }
  return false;
}

async function request(): Promise<boolean> {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(permission);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return false;
}

async function getCurrent(): Promise<{ lat: number; long: number }> {
  return Location.getCurrent();
}

export default { getCurrent, isEnabled, request };
