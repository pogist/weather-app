import React from 'react';
import {
  PlatformColor,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

type TableItem = {
  id: string;
  title: string;
  value: string;
};

type TableProps = {
  containerStyle?: StyleProp<ViewStyle>;
  data: TableItem[];
  headerTitle: string;
};

export default function Table({
  containerStyle,
  data,
  headerTitle,
}: TableProps) {
  return (
    <View style={containerStyle}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>
      <View style={styles.content}>
        {data.map((item, index) => (
          <View key={item.id}>
            {index > 0 && <View style={styles.separator} />}
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemValue}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    paddingLeft: 18,
  },
  headerTitle: {
    color: PlatformColor('label'),
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '700',
  },
  content: {
    borderRadius: 12,
    paddingVertical: 2,
    backgroundColor: PlatformColor('secondarySystemBackground'),
  },
  item: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    marginLeft: 8,
    color: PlatformColor('label'),
    fontSize: 16,
    lineHeight: 16,
  },
  itemValue: {
    color: PlatformColor('label'),
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '500',
    fontVariant: ['tabular-nums'],
  },
  separator: {
    marginLeft: 14,
    height: StyleSheet.hairlineWidth,
    backgroundColor: PlatformColor('separator'),
  },
});
