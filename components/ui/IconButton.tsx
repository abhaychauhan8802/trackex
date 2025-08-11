import React from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";

type IconButtonType = {
  icon: React.ReactNode;
  type?: "default" | "secondary" | "ghost";
  rounded?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  props?: React.ComponentProps<typeof TouchableOpacity>;
};

const IconButton = ({
  icon,
  type = "default",
  rounded = false,
  onPress,
  style,
  ...props
}: IconButtonType) => {
  const buttonTypeStyle = {
    default: {
      backgroundColor: "#1976D2",
    },
    secondary: {
      backgroundColor: "#E5E5EA",
    },
    ghost: {
      backgroundColor: "transparent",
    },
  }[type];

  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <View
        style={[
          {
            height: 40,
            width: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: rounded ? 100 : 0,
          },
          buttonTypeStyle,
          style,
        ]}
      >
        {icon}
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;
