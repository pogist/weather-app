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
import { capitalize, dateEqual } from '../util';
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
      compare={dateEqual}
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
    <Text style={style}>
      {dateEqual(date, new Date()) ? 'Hoje' : capitalize(weekDay)}
    </Text>
  );
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
