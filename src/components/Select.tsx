import React, { useCallback, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

export type SelectRenderItemInfo = {
  index: number;
  item: string;
  selected: boolean;
};

type SelectProps = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  data: string[];
  initial?: string;
  onSelect: (item: string) => void;
  renderItem: (info: SelectRenderItemInfo) => React.ReactElement;
};

export default function Select({
  containerStyle,
  contentContainerStyle,
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
        contentContainerStyle={contentContainerStyle ?? {}}
        data={data}
        horizontal
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
