import React, { useContext } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { ThemeContext, createStyles, spacing, useStyles } from '../styling';

type LoadingProps = {
  containerStyle?: StyleProp<ViewStyle>;
  message?: string;
  size: 'large' | 'small';
};

export default function Loading({
  containerStyle,
  message,
  size,
}: LoadingProps) {
  const theme = useContext(ThemeContext);
  const styles = useStyles(themedStyles);
  return (
    <View style={[styles.container, containerStyle ?? {}]}>
      <ActivityIndicator size={size} color={theme.color.secondaryLabel} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.color.background,
      gap: spacing(5),
      alignItems: 'center',
    },
    message: {
      color: theme.color.label,
      fontSize: spacing(5),
      fontWeight: '300',
    },
  }),
);
