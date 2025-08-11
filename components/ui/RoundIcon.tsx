import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleProp, useColorScheme, View, ViewStyle } from "react-native";

const RoundIcon = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={[
        {
          padding: 14,
          backgroundColor: Colors[theme].background,
          borderRadius: 50,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default RoundIcon;
