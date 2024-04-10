import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useForecast, useGroupedPeriods, usePeriodTables } from '../hooks';
import { createStyles, spacing, useStyles } from '../styling';

import Loading from './Loading';
import Location from './Location';
import Search from './Search';
import SelectDate from './SelectDate';
import SelectPeriod from './SelectPeriod';
import Summary from './Summary';
import Table from './Table';

export default function Home() {
  const styles = useStyles(themedStyles);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [forecast, setLocation, loading] = useForecast();
  const groupedPeriods = useGroupedPeriods(forecast);

  useEffect(() => {
    if (groupedPeriods) {
      const firstDate = Object.keys(groupedPeriods)[0];
      const firstPeriod = groupedPeriods[firstDate][0];
      setSelectedDate(firstDate);
      if (firstPeriod) {
        setSelectedPeriod(firstPeriod.timestamp);
      }
    }
  }, [groupedPeriods]);

  const dates = groupedPeriods ? Object.keys(groupedPeriods) : [];
  const periods =
    groupedPeriods && selectedDate ? groupedPeriods[selectedDate] : [];

  const period = periods.find((p) => p.timestamp === selectedPeriod) ?? null;
  const tables = usePeriodTables(period);

  const onSubmit = useCallback(
    (searchTerm: string) => {
      setLocation(searchTerm);
    },
    [setLocation],
  );

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
          onSelect={(date) => {
            setSelectedDate(date);
            if (groupedPeriods) {
              setSelectedPeriod(groupedPeriods[date][0].timestamp);
            }
          }}
          selected={selectedDate!}
        />
        <SelectPeriod
          containerStyle={styles.selectPeriod}
          data={periods}
          onSelect={(p) => setSelectedPeriod(p.timestamp)}
          selected={selectedPeriod!}
        />
        <Table
          containerStyle={styles.table}
          data={tables.temp}
          headerTitle="Temperatura"
        />
        <Table
          containerStyle={styles.table}
          data={tables.rain}
          headerTitle="Chuva"
        />
        <Table
          containerStyle={styles.table}
          data={tables.atmo}
          headerTitle="Atmosfera"
        />
        <Table
          containerStyle={styles.table}
          data={tables.wind}
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
          onSubmit={onSubmit}
          placeholder="Buscar cidade"
          style={styles.search}
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
