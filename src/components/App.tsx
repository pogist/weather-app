import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

import Search from './Search';

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
  return (
    <AutocompleteDropdownContextProvider>
      <View style={styles.container}>
        <Search
          placeholder="Buscar localização"
          suggestions={suggestionItems}
        />
      </View>
    </AutocompleteDropdownContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 32,
    alignItems: 'center',
  },
});
