import React from 'react';
import { StyleSheet } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

import Icon from './Icon';

type SearchSuggestion = {
  id: string;
  title: string;
};

type SearchProps = {
  debounce?: number;
  loading?: boolean;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  onChangeText?: (text: string) => void;
  onSelectSuggestion?: (suggestion: SearchSuggestion) => void;
};

export default function Search({
  debounce,
  loading,
  placeholder,
  suggestions,
}: SearchProps) {
  return (
    <AutocompleteDropdown
      inputHeight={36}
      clearOnFocus={false}
      dataSet={suggestions}
      debounce={debounce}
      loading={loading}
      useFilter={false}
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      rightButtonsContainerStyle={styles.rightButtonsContainer}
      textInputProps={{
        style: styles.input,
        placeholder,
      }}
      LeftComponent={
        <Icon containerStyle={styles.centered} name="search" size={18} />
      }
      ClearIconComponent={<Icon name="x-circle" size={16} />}
      ChevronIconComponent={<Icon name="chevron-down" size={16} />}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
  },
  container: {
    alignSelf: 'stretch',
  },
  input: {
    paddingHorizontal: 0,
  },
  inputContainer: {
    gap: 6,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  rightButtonsContainer: {
    right: 0,
  },
});
