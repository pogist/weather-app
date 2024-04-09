import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { createStyles, spacing, useStyles } from '../styling';

type LocationProps = {
  city: string;
  containerStyle?: StyleProp<ViewStyle>;
  currentLocation?: boolean;
  date: string;
};

export default function Location({
  city,
  containerStyle,
  currentLocation,
  date,
}: LocationProps) {
  const styles = useStyles(themedStyles);
  return (
    <View style={[styles.container, containerStyle ?? {}]}>
      {currentLocation && (
        <Text style={styles.currentLocationLabel}>Localização atual</Text>
      )}
      <View style={styles.cityContainer}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    container: {
      gap: spacing(3),
      alignItems: 'center',
    },
    currentLocationLabel: {
      color: theme.color.orange,
      fontSize: spacing(3),
      lineHeight: spacing(3),
      fontWeight: '500',
    },
    date: {
      color: theme.color.secondaryLabel,
      fontSize: spacing(3),
      lineHeight: spacing(3),
    },
    city: {
      color: theme.color.label,
      fontSize: spacing(11),
      lineHeight: spacing(11),
      fontWeight: '300',
    },
    cityContainer: {
      alignItems: 'center',
    },
  }),
);
