import React from 'react';
import {
  PlatformColor,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import type { WeatherType } from '../types';
import WeatherIcon from './WeatherIcon';

type LocationProps = {
  city: string;
  containerStyle?: StyleProp<ViewStyle>;
  country: string;
  isCurrentLocation?: boolean;
  state: string;
  weather: WeatherType;
  weatherDesc: string;
  weatherTemp: number;
};

export default function Location({
  city,
  containerStyle,
  country,
  isCurrentLocation,
  state,
  weather,
  weatherDesc,
  weatherTemp,
}: LocationProps) {
  return (
    <View style={containerStyle}>
      {isCurrentLocation && (
        <View style={styles.currentLocation}>
          <Text style={styles.currentLocationText}>
            {isCurrentLocation ? 'Localização atual' : null}
          </Text>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.locationInfo}>
          <Text style={styles.cityTitle}>{city}</Text>
          <Text style={styles.citySubtitle}>
            {state}, {country}
          </Text>
        </View>
        <View style={styles.weatherInfo}>
          <View style={styles.weather}>
            <WeatherIcon size={28} type={weather} />
            <Text numberOfLines={2} style={styles.weatherDesc}>
              {weatherDesc}
            </Text>
          </View>
          <Text style={styles.weatherTemp}>{weatherTemp}º</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  locationInfo: {
    gap: 2,
    flex: 1,
  },
  weatherInfo: {
    gap: 4,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  weather: {
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
  weatherTemp: {
    color: PlatformColor('label'),
    fontSize: 32,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
  weatherDesc: {
    color: PlatformColor('secondaryLabel'),
    width: 82,
    fontSize: 11,
    lineHeight: 11,
    textAlign: 'center',
  },
});
