import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import VectorIcon from 'react-native-vector-icons/Feather';
import type { IconProps as VectorIconProps } from 'react-native-vector-icons/Icon';

type IconProps = VectorIconProps & {
  containerStyle?: StyleProp<ViewStyle>;
};

export default function Icon(props: IconProps) {
  return (
    <View style={props.containerStyle ?? {}}>
      <VectorIcon {...props} />
    </View>
  );
}
