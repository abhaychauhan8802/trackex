import { ThemedText } from "@/components/ui/ThemedText";
import React from "react";
import { TextProps, View, ViewProps } from "react-native";

const EmptyMessage = ({
  message,
  image,
  view,
  text,
}: {
  message: string;
  image?: React.ReactElement;
  view?: ViewProps;
  text?: TextProps;
}) => {
  return (
    <View {...view}>
      <ThemedText {...text}>{message}</ThemedText>
    </View>
  );
};

export default EmptyMessage;
