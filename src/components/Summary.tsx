import React from 'react';
import { PlatformColor, StyleSheet, Text, View } from 'react-native';

import type { WeatherType } from '../types';
import WeatherIcon from './WeatherIcon';

type SummaryProps = {
  city: string;
  country: string;
  description: string;
  isCurrentLocation?: boolean;
  state: string;
  temp: number;
  weatherType: WeatherType;
};

export default function Summary({
  city,
  country,
  description,
  isCurrentLocation,
  state,
  temp,
  weatherType,
}: SummaryProps) {
  return (
    <View style={styles.container}>
      {isCurrentLocation && (
        <View style={styles.currentLocation}>
          <Text style={styles.currentLocationText}>
            {isCurrentLocation ? 'Localização atual' : null}
          </Text>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.location}>
          <Text style={styles.city}>{city}</Text>
          <Text style={styles.cityDetails}>
            {state}, {country}
          </Text>
        </View>
        <View style={styles.weather}>
          <WeatherIcon
            containerStyle={styles.weatherIcon}
            description={description}
            size={32}
            type={weatherType}
          />
          <Text style={styles.temp}>{temp}º</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    marginHorizontal: 12,
  },
  content: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: PlatformColor('secondarySystemBackground'),
  },
  currentLocation: {
    marginLeft: 16,
    marginBottom: 4,
  },
  currentLocationText: {
    color: PlatformColor('systemOrange'),
    fontSize: 12,
    fontWeight: '500',
  },
  location: {
    gap: 4,
    flex: 1,
  },
  weatherIcon: {
    alignSelf: 'stretch',
  },
  weather: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  city: {
    color: PlatformColor('label'),
    fontSize: 28,
    fontWeight: '500',
  },
  cityDetails: {
    color: PlatformColor('secondaryLabel'),
    fontSize: 12,
  },
  temp: {
    color: PlatformColor('label'),
    fontSize: 32,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
});
