import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { createStyles, spacing, useStyles } from '../styling';
import { WeatherType } from '../types';
import WeatherIcon from './WeatherIcon';

type SummaryProps = {
  containerStyle?: StyleProp<ViewStyle>;
  sunriseTime: string;
  sunsetTime: string;
  temp: number;
  weather: WeatherType;
  weatherDesc: string;
};

export default function Summary({
  containerStyle,
  sunriseTime,
  sunsetTime,
  temp,
  weather,
  weatherDesc,
}: SummaryProps) {
  const styles = useStyles(themedStyles);
  return (
    <View style={[styles.container, containerStyle ?? {}]}>
      <View style={styles.weather}>
        <WeatherIcon type={weather} size={spacing(16)} />
        <Text style={styles.temp}>{temp}º</Text>
      </View>
      <Text style={styles.weatherDesc}>{weatherDesc}</Text>
      <View style={styles.solarActivities}>
        <View style={styles.solarActivity}>
          <Icon name="sunrise" style={styles.sunriseIcon} />
          <Text style={styles.solarActivityTime}>
            {formatter.format(new Date(sunriseTime))}h
          </Text>
        </View>
        <View style={styles.solarActivity}>
          <Icon name="sunset" style={styles.sunsetIcon} />
          <Text style={styles.solarActivityTime}>
            {formatter.format(new Date(sunsetTime))}h
          </Text>
        </View>
      </View>
    </View>
  );
}

const formatter = new Intl.DateTimeFormat('pt-BR', {
  hour: 'numeric',
  minute: 'numeric',
});

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    weather: {
      gap: spacing(5),
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'center',
    },
    weatherDesc: {
      color: theme.color.label,
      fontSize: spacing(5),
      fontWeight: '200',
    },
    temp: {
      color: theme.color.label,
      fontSize: spacing(18),
      lineHeight: spacing(18),
      fontWeight: '100',
    },
    solarActivities: {
      marginTop: spacing(10),
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'space-evenly',
    },
    solarActivity: {
      gap: spacing(2),
      alignItems: 'center',
    },
    solarActivityTime: {
      color: theme.color.label,
      fontSize: spacing(4),
      lineHeight: spacing(4),
      fontVariant: ['tabular-nums'],
      fontWeight: '300',
    },
    sunsetIcon: {
      color: theme.color.orange,
      fontSize: spacing(8),
    },
    sunriseIcon: {
      color: theme.color.yellow,
      fontSize: spacing(8),
    },
  }),
);
