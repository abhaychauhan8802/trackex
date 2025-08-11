import { Colors } from "@/constants/Colors";
import { Constants } from "@/constants/Constants";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";

type InputProps = React.ComponentProps<typeof TextInput> & {
  style?: StyleProp<ViewStyle>;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

const Input = ({ style, iconLeft, iconRight, ...props }: InputProps) => {
  const theme = useColorScheme() ?? "light";

  const [isFocus, setIsFocus] = useState(false);

  const styles = useStyle(theme, isFocus);

  return (
    <View style={styles.inputContainer}>
      {iconLeft && <View style={styles.icon}>{iconLeft}</View>}
      <TextInput
        style={[
          styles.input,
          props.multiline && {
            textAlignVertical: "top",
            minHeight: 100,
          },
        ]}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        placeholderTextColor={Colors[theme].textSecondary}
        {...props}
      />
      {iconRight && <View style={styles.icon}>{iconRight}</View>}
    </View>
  );
};

export default Input;

const useStyle = (theme: "light" | "dark", isFocus: boolean) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      backgroundColor: Colors[theme].surface,
      borderRadius: Constants.borderRadius,
      borderWidth: 1,
      borderColor: isFocus ? Colors[theme].primary : Colors[theme].border,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: Colors[theme].textPrimary,
      paddingVertical: 8,
      paddingHorizontal: 8,
    },
    icon: {
      alignSelf: "center",
      paddingHorizontal: 4,
    },
  });
