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

export default function LocationInfo({
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
          <Text style={styles.cityTitle}>{city}</Text>
          <Text style={styles.citySubtitle}>
            {state}, {country}
          </Text>
        </View>
        <View style={styles.weather}>
          <View style={styles.weatherCondition}>
            <WeatherIcon size={28} type={weatherType} />
            <Text numberOfLines={2} style={styles.description}>
              {description}
            </Text>
          </View>
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
    gap: 2,
    flex: 1,
  },
  weather: {
    gap: 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  weatherCondition: {
    gap: 4,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  cityTitle: {
    color: PlatformColor('label'),
    fontSize: 28,
    fontWeight: '500',
  },
  citySubtitle: {
    color: PlatformColor('secondaryLabel'),
    fontSize: 12,
  },
  temp: {
    color: PlatformColor('label'),
    fontSize: 32,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
  description: {
    color: PlatformColor('secondaryLabel'),
    width: 82,
    fontSize: 11,
    lineHeight: 11,
    textAlign: 'center',
  },
});
