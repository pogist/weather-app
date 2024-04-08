import { StyleSheet } from 'react-native';

import type { Theme } from './types';

export default function createStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(
  createFn: (
    theme: Theme,
  ) => T | StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
) {
  return createFn;
}
