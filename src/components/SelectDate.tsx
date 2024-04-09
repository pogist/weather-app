import React, { useCallback } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { useWeekDay } from '../hooks';
import { createStyles, spacing, useStyles } from '../styling';
import Select, { type SelectRenderItemInfo } from './Select';

type SelectDateProps = {
  containerStyle?: StyleProp<ViewStyle>;
  data: string[];
  onSelect: (date: string) => void;
  selected: string;
};

export default function SelectDate({
  containerStyle,
  data,
  onSelect,
  selected,
}: SelectDateProps) {
  const styles = useStyles(themedStyles);
  const renderItem = useCallback(
    (info: SelectRenderItemInfo) => {
      const style: StyleProp<TextStyle>[] = [styles.item];
      if (info.selected) {
        style.push(styles.selectedItem);
      }
      return <SelectDateItem date={info.item} style={style} />;
    },
    [styles],
  );
  return (
    <Select
      containerStyle={containerStyle ?? {}}
      contentContainerStyle={styles.content}
      data={data}
      onSelectItem={onSelect}
      renderItem={renderItem}
      selectedItem={selected}
    />
  );
}

type SelectDateItemProps = {
  date: string;
  style?: StyleProp<TextStyle>;
};

function SelectDateItem({ date: dateString, style }: SelectDateItemProps) {
  const date = new Date(dateString);
  const weekDay = useWeekDay('short', date);
  return (
    <Text style={style}>{isToday(date) ? 'Hoje' : capitalize(weekDay)}</Text>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function isToday(date: Date) {
  const now = new Date();
  const equalDays = now.getDate() === date.getDate();
  const equalMonths = now.getMonth() === date.getMonth();
  const equalYears = now.getFullYear() === date.getFullYear();
  return equalDays && equalMonths && equalYears;
}

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    content: {
      flex: 1,
      justifyContent: 'space-around',
    },
    item: {
      color: theme.color.label,
      fontSize: spacing(4),
      lineHeight: spacing(4),
      fontWeight: '500',
    },
    selectedItem: {
      color: theme.color.orange,
    },
  }),
);
