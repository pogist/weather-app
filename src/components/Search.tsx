import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import {
  AutocompleteDropdown,
  AutocompleteDropdownRef,
} from 'react-native-autocomplete-dropdown';
import Icon from 'react-native-vector-icons/Feather';

type SearchSuggestion = {
  id: string;
  title: string;
};

type SearchProps = {
  style?: StyleProp<ViewStyle>;
  debounce?: number;
  loading?: boolean;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  onChangeText?: (text: string) => void;
  onSelectSuggestion?: (suggestion: SearchSuggestion) => void;
};

export type SearchRef = {
  dismiss: () => void;
};

const Search = React.forwardRef<SearchRef, SearchProps>((props, ref) => {
  const dropdown = React.useRef<AutocompleteDropdownRef | null>(null);
  React.useImperativeHandle(ref, () => {
    return {
      dismiss() {
        dropdown.current?.close();
      },
    };
  });
  return (
    <View style={[styles.container, props.style]}>
      <AutocompleteDropdown
        controller={(controller) => {
          dropdown.current = controller;
        }}
        inputHeight={36}
        clearOnFocus={false}
        dataSet={props.suggestions}
        debounce={props.debounce}
        loading={props.loading}
        useFilter={false}
        inputContainerStyle={styles.inputContainer}
        rightButtonsContainerStyle={styles.rightButtonsContainer}
        textInputProps={{
          style: styles.input,
          placeholder: props.placeholder,
        }}
        LeftComponent={
          <View style={styles.centered}>
            <Icon name="search" size={18} />
          </View>
        }
        ClearIconComponent={<Icon name="x-circle" size={16} />}
        ChevronIconComponent={<Icon name="chevron-down" size={16} />}
      />
    </View>
  );
});

export default Search;

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
