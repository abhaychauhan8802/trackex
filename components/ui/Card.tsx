import { Colors } from "@/constants/Colors";
import { Constants } from "@/constants/Constants";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";

const Card = ({
  children,
  backgroundColor,
  style,
}: {
  children: React.ReactNode;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: backgroundColor ?? Colors[theme].surface },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: Constants.borderRadius,
    shadowColor: "#00000063",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
});
