import { Colors } from "@/constants/Colors";
import { Constants } from "@/constants/Constants";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { Dropdown as DropdownElement } from "react-native-element-dropdown";

export type DropdownOption = {
  label: string;
  value: string | number | any;
};

type DropdownProps = {
  data: DropdownOption[];
  placeholder?: string;
  value: string | number | any | null;
  onChange: (value: string | number | any) => void;
  search?: boolean;
  maxHeight?: number;
  containerStyle?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  activeColor?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  data,
  placeholder = "Select item",
  value,
  onChange,
  search = false,
  maxHeight = 300,
  containerStyle,
  dropdownStyle,
  textStyle,
  itemTextStyle,
  activeColor,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const theme = useColorScheme() ?? "light";
  const styles = useStyle(theme);

  return (
    <DropdownElement
      style={[
        styles.dropdown,
        dropdownStyle,
        isFocus && { borderColor: Colors[theme].primary },
      ]}
      placeholderStyle={[styles.textStyle, textStyle]}
      selectedTextStyle={[styles.textStyle, textStyle]}
      iconStyle={styles.iconStyle}
      containerStyle={[styles.containerStyle, containerStyle]}
      itemContainerStyle={styles.itemContainerStyle}
      itemTextStyle={[styles.itemTextStyle, itemTextStyle]}
      activeColor={activeColor ?? Colors[theme].primaryFade}
      data={data}
      search={search}
      maxHeight={maxHeight}
      autoScroll={false}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        onChange(item.value);
        setIsFocus(false);
      }}
    />
  );
};

export default Dropdown;

const useStyle = (theme: "light" | "dark") =>
  StyleSheet.create({
    dropdown: {
      height: 50,
      backgroundColor: Colors[theme].surface,
      borderRadius: Constants.borderRadius,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: Colors[theme].border,
    },
    containerStyle: {
      borderRadius: Constants.borderRadius,
      overflow: "hidden",
      marginTop: 5,
      backgroundColor: Colors[theme].surface,
      borderWidth: 0,
    },
    itemContainerStyle: {
      backgroundColor: Colors[theme].surface,
    },
    itemTextStyle: {
      color: Colors[theme].textPrimary,
    },
    icon: {
      marginRight: 10,
      color: Colors[theme].textPrimary,
    },
    textStyle: {
      fontSize: 16,
      color: Colors[theme].textPrimary,
    },
    iconStyle: {
      width: 25,
      height: 25,
    },
  });
