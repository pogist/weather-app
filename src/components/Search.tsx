import React, { useCallback, useContext } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInputSubmitEditingEventData,
  View,
  ViewStyle,
} from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Icon from 'react-native-vector-icons/Feather';

import { ThemeContext, createStyles, spacing, useStyles } from '../styling';

type SearchProps = {
  debounce?: number;
  loading?: boolean;
  onChangeText?: (text: string) => void;
  onSubmit?: (searchTerm: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
};

export default function Search({
  debounce,
  loading,
  onChangeText,
  onSubmit,
  placeholder,
  style,
}: SearchProps) {
  const theme = useContext(ThemeContext);
  const styles = useStyles(themedStyles);
  const onSubmitInput = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      onSubmit?.(e.nativeEvent.text);
    },
    [onSubmit],
  );
  return (
    <View style={[styles.container, style ?? {}]}>
      <AutocompleteDropdown
        inputHeight={spacing(10)}
        clearOnFocus={false}
        debounce={debounce}
        loading={loading}
        useFilter={false}
        closeOnSubmit
        onChangeText={onChangeText}
        onSubmit={onSubmitInput}
        showChevron={false}
        inputContainerStyle={styles.inputContainer}
        rightButtonsContainerStyle={styles.rightButtonsContainer}
        suggestionsListContainerStyle={styles.suggestion}
        suggestionsListTextStyle={styles.suggestionTitle}
        ItemSeparatorComponent={<View style={styles.separator} />}
        textInputProps={{
          style: styles.input,
          returnKeyType: 'search',
          placeholder: placeholder,
          placeholderTextColor: theme.color.placeholder,
        }}
        LeftComponent={
          <View style={styles.centered}>
            <Icon style={styles.icon} name="search" size={18} />
          </View>
        }
        ClearIconComponent={
          <Icon style={styles.icon} name="x-circle" size={16} />
        }
      />
    </View>
  );
}

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    icon: {
      color: theme.color.gray1,
    },
    centered: {
      justifyContent: 'center',
    },
    container: {
      alignSelf: 'stretch',
    },
    input: {
      color: theme.color.label,
      paddingHorizontal: 0,
    },
    inputContainer: {
      backgroundColor: theme.color.secondaryBackground,
      gap: spacing(2),
      borderRadius: spacing(3),
      paddingHorizontal: spacing(2),
    },
    rightButtonsContainer: {
      right: 0,
    },
    suggestion: {
      backgroundColor: theme.color.secondaryBackground,
      borderRadius: spacing(3),
    },
    suggestionTitle: {
      color: theme.color.label,
    },
    separator: {
      backgroundColor: theme.color.separator,
      height: StyleSheet.hairlineWidth,
    },
  }),
);
