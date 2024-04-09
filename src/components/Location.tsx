import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { createStyles, spacing, useStyles } from '../styling';
import { capitalize } from '../util';

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
        <Text style={styles.city}>{capitalize(city)}</Text>
        <Text style={styles.date}>{format(date)}</Text>
      </View>
    </View>
  );
}

function format(dateString: string): string {
  return capitalize(formatter.format(new Date(dateString)));
}

const formatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

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
