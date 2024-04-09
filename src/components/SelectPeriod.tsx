import React, { useCallback } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { createStyles, spacing, useStyles } from '../styling';
import { WeatherType } from '../types';
import Select, { type SelectRenderItemInfo } from './Select';
import WeatherIcon from './WeatherIcon';

type Period = {
  temp: number;
  time: string;
  weather: WeatherType;
};

type SelectPeriodProps = {
  containerStyle?: StyleProp<ViewStyle>;
  data: Period[];
  onSelect: (period: Period) => void;
  selected: string;
};

export default function SelectPeriod({
  containerStyle,
  data,
  onSelect,
  selected,
}: SelectPeriodProps) {
  const styles = useStyles(themedStyles);
  const renderItem = useCallback(
    (info: SelectRenderItemInfo) => (
      <SelectPeriodItem period={data[info.index]} selected={info.selected} />
    ),
    [data],
  );
  const onSelectItem = useCallback(
    (item: string) => {
      const selectedPeriod = data.find((period) => period.time === item);
      if (selectedPeriod) {
        onSelect(selectedPeriod);
      }
    },
    [data, onSelect],
  );
  const timeData = data.map((period) => period.time);
  return (
    <Select
      containerStyle={containerStyle ?? {}}
      contentContainerStyle={styles.content}
      data={timeData}
      onSelectItem={onSelectItem}
      renderItem={renderItem}
      selectedItem={selected}
    />
  );
}

type SelectPeriodItemProps = {
  period: Period;
  selected: boolean;
};

function SelectPeriodItem({ period, selected }: SelectPeriodItemProps) {
  const styles = useStyles(themedStyles);
  const itemStyle: StyleProp<ViewStyle>[] = [styles.item];
  const textStyle: StyleProp<TextStyle>[] = [styles.itemText];
  if (selected) {
    itemStyle.push(styles.selectedItem);
    textStyle.push(styles.selectedItemText);
  }
  return (
    <View style={itemStyle}>
      <Text style={textStyle}>{new Date(period.time).getHours()}h</Text>
      <WeatherIcon type={period.weather} size={spacing(6)} />
      <Text style={[textStyle, styles.tempText]}>{period.temp}º</Text>
    </View>
  );
}

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    content: {
      paddingLeft: spacing(4),
    },
    item: {
      gap: spacing(4),
      width: spacing(16),
      marginRight: spacing(4),
      paddingVertical: spacing(4),
      borderWidth: 1,
      borderRadius: spacing(3),
      borderColor: theme.color.secondaryBackground,
      backgroundColor: theme.color.secondaryBackground,
      alignItems: 'center',
    },
    selectedItem: {
      borderColor: theme.color.orange,
    },
    itemText: {
      color: theme.color.label,
      fontSize: spacing(4),
      lineHeight: spacing(4),
    },
    selectedItemText: {
      color: theme.color.orange,
    },
    tempText: {
      fontSize: spacing(5),
      lineHeight: spacing(5),
      fontWeight: '500',
      fontVariant: ['tabular-nums'],
    },
  }),
);
