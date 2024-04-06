import React from 'react';
import {
  Keyboard,
  KeyboardEventName,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

import Search, { type SearchRef } from './Search';

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
  const search = React.useRef<SearchRef>(null);
  React.useEffect(() => {
    const event = Platform.select<KeyboardEventName>({
      ios: 'keyboardWillHide',
      default: 'keyboardDidHide',
    });
    const sub = Keyboard.addListener(event, () => {
      search.current?.dismiss();
    });
    return () => {
      sub.remove();
    };
  }, []);
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
          </ScrollView>
        </SafeAreaView>
      </AutocompleteDropdownContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    marginHorizontal: 12,
  },
});
