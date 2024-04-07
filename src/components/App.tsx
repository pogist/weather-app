import React, { useCallback, useRef } from 'react';
import {
  Platform,
  PlatformColor,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

import { useKeyboardEffect } from '../hooks';
import LocationInfo from './LocationInfo';
import Search, { type SearchRef } from './Search';
import Table from './Table';
import WeatherIcon from './WeatherIcon';

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

export default function App() {
  const scheme = useColorScheme() ?? 'light';
  const search = useRef<SearchRef>(null);
  useKeyboardEffect(
    Platform.select({
      ios: 'keyboardWillHide',
      default: 'keyboardDidHide',
    }),
    useCallback(() => {
      search.current?.dismiss();
    }, []),
  );
  return (
    <>
      <StatusBar
        barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
      />
      <AutocompleteDropdownContextProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView
            nestedScrollEnabled
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}>
            <Search
              ref={search}
              style={styles.search}
              placeholder="Buscar localização"
              suggestions={suggestionItems}
            />
            <LocationInfo
              city="Fortaleza"
              containerStyle={styles.locationInfo}
              country="Brasil"
              description="Chuva com trovoadas"
              isCurrentLocation
              state="Ceará"
              temp={31}
              weatherType="thunderstorm"
            />
            <View style={styles.forecastHeader}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateTitle}>Hoje</Text>
                <Text style={styles.dateSubtitle}>04 de Abril (9h às 12h)</Text>
              </View>
              <View style={styles.weatherContainer}>
                <WeatherIcon type="thunderstorm" size={28} />
                <Text numberOfLines={2} style={styles.weatherDescription}>
                  Chuva com trovoadas
                </Text>
              </View>
            </View>
            <Table
              containerStyle={styles.table}
              data={[
                { id: '0', title: 'Atual', value: '31º C' },
                { id: '1', title: 'Mínima', value: '28º C' },
                { id: '2', title: 'Máxima', value: '31º C' },
                { id: '3', title: 'Sensação térmica', value: '32º C' },
              ]}
              headerTitle="Temperatura"
            />
            <Table
              containerStyle={styles.table}
              data={[
                { id: '0', title: 'Umidade relativa', value: '78%' },
                { id: '1', title: 'Chance de precipitação', value: '0,5%' },
                { id: '2', title: 'Volume nas últimas 3h', value: '14mm' },
              ]}
              headerTitle="Umidade e Precipitação"
            />
          </ScrollView>
        </SafeAreaView>
      </AutocompleteDropdownContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PlatformColor('systemBackground'),
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  search: {
    padding: 12,
  },
  locationInfo: {
    marginBottom: 12,
    marginHorizontal: 12,
  },
  forecastHeader: {
    margin: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateContainer: {
    gap: 8,
    alignItems: 'center',
  },
  dateTitle: {
    color: PlatformColor('label'),
    fontSize: 28,
    lineHeight: 28,
    fontWeight: '500',
  },
  dateSubtitle: {
    color: PlatformColor('secondaryLabel'),
    fontSize: 12,
    lineHeight: 12,
  },
  weatherContainer: {
    gap: 8,
    alignItems: 'center',
  },
  weatherDescription: {
    color: PlatformColor('label'),
    fontSize: 12,
    lineHeight: 12,
  },
  table: {
    margin: 20,
  },
});
