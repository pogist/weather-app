import React, { useContext } from 'react';
import { ColorValue, StyleProp, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import type { IconProps } from 'react-native-vector-icons/Icon';

import { ThemeContext } from '../styling';
import type { Theme } from '../styling/types';
import type { WeatherType } from '../types';

type Distribute<Union> = Union extends string ? Union : never;

type WeatherIconSet = {
  [K in Distribute<WeatherType>]: {
    name: IconProps['name'];
    color?: ColorValue;
  };
};

const weatherIconSet = (theme: Theme): WeatherIconSet => ({
  thunderstorm: {
    name: 'cloud-lightning',
    color: theme.color.blue2,
  },
  drizzle: {
    name: 'cloud-drizzle',
    color: theme.color.gray2,
  },
  rain: {
    name: 'cloud-rain',
    color: theme.color.blue1,
  },
  snow: {
    name: 'cloud-snow',
    color: theme.color.gray2,
  },
  atmosphere: {
    name: 'wind',
    color: theme.color.blue3,
  },
  clear: {
    name: 'sun',
    color: theme.color.yellow,
  },
  clouds: {
    name: 'cloud',
    color: theme.color.gray2,
  },
});

type WeatherIconProps = {
  size: number;
  style?: StyleProp<TextStyle>;
  type: WeatherType;
};

export default function WeatherIcon({ size, style, type }: WeatherIconProps) {
  const theme = useContext(ThemeContext);
  return <Icon {...weatherIconSet(theme)[type]} style={style} size={size} />;
}
