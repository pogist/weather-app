import { useMemo, useContext } from 'react';
import { StyleSheet } from 'react-native';

import type { Theme } from './types';
import ThemeContext from './ThemeContext';

export default function useStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(
  createStyles: (
    theme: Theme,
  ) => T | StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
) {
  const theme = useContext(ThemeContext);
  return useMemo(() => createStyles(theme), [createStyles, theme]);
}
