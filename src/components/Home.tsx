import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useForecast } from '../hooks';
import { createStyles, spacing, useStyles } from '../styling';
import { WeatherType } from '../types';
import Loading from './Loading';
import Location from './Location';
import Search from './Search';
import SelectDate from './SelectDate';
import SelectPeriod from './SelectPeriod';
import Summary from './Summary';
import Table from './Table';

type Item = {
  id: string;
  title: string;
};

const suggestionItems: Item[] = [];
for (let i = 0; i < 25; i++) {
  suggestionItems.push({
    id: `${i}`,
    title: `item_${i}`,
  });
}

const dates: string[] = [
  '2024-04-07 12:00:00',
  '2024-04-08 12:00:00',
  '2024-04-09 12:00:00',
  '2024-04-10 12:00:00',
  '2024-04-11 12:00:00',
];

type Period = {
  time: string;
  temp: number;
  weather: WeatherType;
};

const forecastPeriods: Period[] = [
  {
    time: '2024-04-07 12:00:00',
    temp: 28,
    weather: 'rain',
  },
  {
    time: '2024-04-07 13:00:00',
    temp: 29,
    weather: 'drizzle',
  },
  {
    time: '2024-04-07 14:00:00',
    temp: 24,
    weather: 'thunderstorm',
  },
  {
    time: '2024-04-07 15:00:00',
    temp: 26,
    weather: 'rain',
  },
  {
    time: '2024-04-07 16:00:00',
    temp: 12,
    weather: 'snow',
  },
  {
    time: '2024-04-07 17:00:00',
    temp: 30,
    weather: 'clear',
  },
  {
    time: '2024-04-07 18:00:00',
    temp: 28,
    weather: 'clouds',
  },
  {
    time: '2024-04-07 19:00:00',
    temp: 27,
    weather: 'atmosphere',
  },
];

const tempTable = [
  { id: 'temp', title: 'Atual', value: '31ºC' },
  { id: 'temp_min', title: 'Mínima', value: '28ºC' },
  { id: 'temp_max', title: 'Máxima', value: '31ºC' },
  { id: 'feels_like', title: 'Sensação térmica', value: '32ºC' },
];

const atmTable = [
  { id: 'humidity', title: 'Umidade relativa', value: '70%' },
  { id: 'visibility', title: 'Visibilidade', value: '+10km' },
  { id: 'pressure', title: 'Pressão', value: '1011hPa' },
];

const rainTable = [
  { id: 'rain', title: 'Volume nas últimas 3h', value: '0.33mm' },
  { id: 'pop', title: 'Chance de precipitação', value: '51%' },
];

const windTable = [
  { id: 'deg', title: 'Direção', value: '111º' },
  { id: 'speed', title: 'Velocidade', value: '3.77 m/seg' },
  { id: 'gust', title: 'Rajada', value: '4.41 m/seg' },
];

export default function Home() {
  const styles = useStyles(themedStyles);
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const [forecast, loading] = useForecast();

  const onSelectDate = (date: string) => {
    if (date !== selectedDate) {
      setSelectedDate(date);
    }
  };

  const render = () => {
    return (
      <>
        <Location
          city={forecast!.city}
          containerStyle={styles.location}
          date={forecast!.timestamp}
        />
        <Summary
          containerStyle={styles.summary}
          sunriseTime={forecast!.sunrise}
          sunsetTime={forecast!.sunset}
          temp={forecast!.periods[0].temp.value}
          weather={forecast!.periods[0].weather.type}
          weatherDesc={forecast!.periods[0].weather.description}
        />
        <SelectDate
          containerStyle={styles.selectDate}
          data={dates}
          onSelect={onSelectDate}
          selected={selectedDate}
        />
        <SelectPeriod
          containerStyle={styles.selectPeriod}
          data={forecastPeriods}
          onSelect={(period) => onSelectDate(period.time)}
          selected={selectedDate}
        />
        <Table
          containerStyle={styles.table}
          data={tempTable}
          headerTitle="Temperatura"
        />
        <Table
          containerStyle={styles.table}
          data={rainTable}
          headerTitle="Chuva"
        />
        <Table
          containerStyle={styles.table}
          data={atmTable}
          headerTitle="Atmosfera"
        />
        <Table
          containerStyle={styles.table}
          data={windTable}
          headerTitle="Vento"
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <Search
          loading={loading}
          style={styles.search}
          placeholder="Buscar cidade"
          suggestions={suggestionItems}
        />
        {loading ? (
          <Loading
            containerStyle={styles.loading}
            message="Carregando cidade"
            size="large"
          />
        ) : forecast ? (
          render()
        ) : (
          <EmptyState />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function EmptyState() {
  const styles = useStyles(themedStyles);
  return (
    <View style={styles.emptyState}>
      <Text numberOfLines={2} style={styles.emptyStateText}>
        Digite o nome de alguma cidade na barra acima para começar
      </Text>
    </View>
  );
}

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    emptyState: {
      backgroundColor: theme.color.background,
      paddingHorizontal: spacing(8),
      flex: 0.3,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    emptyStateText: {
      color: theme.color.secondaryLabel,
      fontSize: spacing(5),
      textAlign: 'center',
    },
    loading: {
      flex: 0.3,
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: theme.color.background,
      flex: 1,
    },
    home: {
      color: theme.color.label,
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    search: {
      margin: spacing(5),
    },
    location: {
      marginVertical: spacing(4),
      marginHorizontal: spacing(5),
    },
    summary: {
      margin: spacing(5),
      marginVertical: spacing(10),
    },
    selectDate: {
      margin: spacing(5),
    },
    selectPeriod: {
      marginVertical: spacing(5),
    },
    table: {
      marginVertical: spacing(3),
      marginHorizontal: spacing(5),
    },
  }),
);
