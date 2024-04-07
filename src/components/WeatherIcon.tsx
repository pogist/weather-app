import React from 'react';
import {
  ColorValue,
  PlatformColor,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import type { IconProps } from 'react-native-vector-icons/Icon';

import type { WeatherType } from '../types';

type Distribute<Union> = Union extends string ? Union : never;

type WeatherIconSet = {
  [K in Distribute<WeatherType>]: {
    name: IconProps['name'];
    color?: ColorValue;
  };
};

const weatherIconSet: WeatherIconSet = {
  thunderstorm: {
    name: 'cloud-lightning',
    color: PlatformColor('systemBlue'),
  },
  drizzle: {
    name: 'cloud-drizzle',
    color: PlatformColor('systemBlue'),
  },
  rain: {
    name: 'cloud-rain',
    color: PlatformColor('systemBlue'),
  },
  snow: {
    name: 'cloud-snow',
    color: PlatformColor('systemBlue'),
  },
  atmosphere: {
    name: 'wind',
    color: PlatformColor('systemGray2'),
  },
  clear: {
    name: 'sun',
    color: PlatformColor('systemOrange'),
  },
  clouds: {
    name: 'cloud',
    color: 'lightblue',
  },
};

type WeatherIconProps = {
  containerStyle?: StyleProp<ViewStyle>;
  description: string;
  size: number;
  style?: StyleProp<TextStyle>;
  type: WeatherType;
};

export default function WeatherIcon({
  containerStyle,
  description,
  size,
  style,
  type,
}: WeatherIconProps) {
  const props = weatherIconSet[type];
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon {...props} style={style} size={size} />
      <Text numberOfLines={2} style={styles.description}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    alignItems: 'center',
  },
  description: {
    color: PlatformColor('secondaryLabel'),
    width: 86,
    fontSize: 10,
    textAlign: 'center',
  },
});
