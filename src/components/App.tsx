import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

import { ThemeProvider, darkTheme, lightTheme } from '../styling';
import Home from './Home';

export default function App() {
  const scheme = useColorScheme() ?? 'light';
  return (
    <>
      <StatusBar
        barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
      />
      <ThemeProvider value={scheme === 'light' ? lightTheme : darkTheme}>
        <AutocompleteDropdownContextProvider>
          <Home />
        </AutocompleteDropdownContextProvider>
      </ThemeProvider>
    </>
  );
}
