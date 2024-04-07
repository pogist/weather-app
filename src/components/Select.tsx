import React, { useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type SelectRenderItemInfo = {
  index: number;
  item: string;
  selected: boolean;
};

type SelectProps = {
  containerStyle?: StyleProp<ViewStyle>;
  data: string[];
  initial?: string;
  onSelect: (item: string) => void;
  renderItem: (info: SelectRenderItemInfo) => React.ReactElement;
};

export default function Select({
  containerStyle,
  data,
  initial,
  onSelect,
  renderItem: renderSelectItem,
}: SelectProps) {
  const [selectedItem, setSelectedItem] = useState(initial ?? data[0]);
  const renderItem = useCallback(
    ({ index, item }: ListRenderItemInfo<string>) => {
      const onPress = () => {
        if (item !== selectedItem) {
          setSelectedItem(item);
          onSelect(item);
        }
      };
      const pressedStyle = ({ pressed }: { pressed: boolean }) => {
        if (!pressed) {
          return {};
        }
        return { opacity: 0.7 };
      };
      const selected: boolean = item === selectedItem;
      return (
        <Pressable hitSlop={14} style={pressedStyle} onPress={onPress}>
          {renderSelectItem({ index, item, selected })}
        </Pressable>
      );
    },
    [selectedItem, onSelect, renderSelectItem],
  );
  const keyExtractor = useCallback((item: string) => item, []);
  return (
    <View style={containerStyle ?? {}}>
      <FlatList
        alwaysBounceHorizontal={false}
        contentContainerStyle={styles.listContent}
        data={data}
        horizontal
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
