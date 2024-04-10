import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { createStyles, spacing, useStyles } from '../styling';

export type TableItem = {
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
  const styles = useStyles(themedStyles);
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

const themedStyles = createStyles((theme) =>
  StyleSheet.create({
    header: {
      padding: spacing(2),
      paddingLeft: spacing(5),
    },
    headerTitle: {
      color: theme.color.label,
      fontSize: spacing(4),
      lineHeight: spacing(4),
      fontWeight: '700',
    },
    content: {
      backgroundColor: theme.color.secondaryBackground,
      borderRadius: spacing(3),
      paddingVertical: spacing(1),
    },
    item: {
      padding: spacing(3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemTitle: {
      color: theme.color.label,
      marginLeft: spacing(2),
      fontSize: spacing(4),
      lineHeight: spacing(4),
    },
    itemValue: {
      color: theme.color.label,
      fontSize: spacing(4),
      lineHeight: spacing(4),
      fontWeight: '500',
      fontVariant: ['tabular-nums'],
    },
    separator: {
      backgroundColor: theme.color.separator,
      marginLeft: spacing(4),
      height: StyleSheet.hairlineWidth,
    },
  }),
);
