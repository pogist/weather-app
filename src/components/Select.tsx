import React, { useCallback } from 'react';
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
  onSelectItem: (item: string) => void;
  renderItem: (info: SelectRenderItemInfo) => React.ReactElement;
  selectedItem: string;
};

export default function Select({
  containerStyle,
  contentContainerStyle,
  data,
  onSelectItem,
  renderItem: renderSelectItem,
  selectedItem,
}: SelectProps) {
  const renderItem = useCallback(
    ({ index, item }: ListRenderItemInfo<string>) => {
      const onPress = () => {
        onSelectItem(item);
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
    [selectedItem, onSelectItem, renderSelectItem],
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
