import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { Constants } from "@/constants/Constants";
import { useEffect, useMemo } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type TabOption<T> = {
  key: T;
  label: string;
};

interface TabsSwitcherProps<T extends string> {
  options: TabOption<T>[];
  selected: T;
  onChange: (value: T) => void;
}

const TabsSwitcher = <T extends string>({
  options,
  selected,
  onChange,
}: TabsSwitcherProps<T>) => {
  const theme = useColorScheme() ?? "light";
  const tabWidth = useMemo(
    () => (Dimensions.get("window").width - 32 - 8) / options.length,
    [options.length]
  );

  const translateX = useSharedValue(
    options.findIndex((opt) => opt.key === selected) * tabWidth
  );

  useEffect(() => {
    translateX.value = withTiming(
      options.findIndex((opt) => opt.key === selected) * tabWidth,
      { duration: 200 }
    );
  }, [options, selected, tabWidth, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.tab, { backgroundColor: Colors[theme].surface }]}>
      <Animated.View
        style={[
          styles.indicator,
          {
            backgroundColor: Colors[theme].primary,
            width: tabWidth,
          },
          animatedStyle,
        ]}
      />
      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={styles.tabItem}
          onPress={() => onChange(option.key)}
        >
          <ThemedText
            type="label"
            weight="semibold"
            color={
              theme === "light" && option.key === selected
                ? "onPrimary"
                : "textPrimary"
            }
          >
            {option.label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    borderRadius: Constants.borderRadius,
    height: 50,
    marginBottom: 12,
    overflow: "hidden",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  indicator: {
    position: "absolute",
    top: 4,
    left: 4,
    bottom: 4,
    borderRadius: Constants.borderRadius - 4,
    zIndex: 0,
  },
});

export default TabsSwitcher;
