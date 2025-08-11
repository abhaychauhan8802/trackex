import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { Constants } from "@/constants/Constants";
import { useEffect } from "react";
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

const TABS = ["expense", "income"] as const;
const TAB_WIDTH = (Dimensions.get("window").width - 32 - 8) / 2;

const TransactionTabs = ({
  selectedTab,
  onChangeTab,
}: {
  selectedTab: "expense" | "income";
  onChangeTab: (type: "income" | "expense") => void;
}) => {
  const theme = useColorScheme() ?? "light";
  const translateX = useSharedValue(TABS.indexOf(selectedTab) * TAB_WIDTH);

  useEffect(() => {
    translateX.value = withTiming(TABS.indexOf(selectedTab) * TAB_WIDTH, {
      duration: 200,
    });
  }, [selectedTab]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.tab, { backgroundColor: Colors[theme].surface }]}>
      <Animated.View
        style={[
          styles.indicator,
          {
            backgroundColor: Colors[theme].background,
          },
          animatedStyle,
        ]}
      />
      {TABS.map((type) => (
        <TouchableOpacity
          key={type}
          style={styles.tabItem}
          onPress={() => onChangeTab(type)}
        >
          <ThemedText type="label" weight="semibold">
            {type === "income" ? "Income" : "Expense"}
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
    width: TAB_WIDTH,
    borderRadius: Constants.borderRadius,
    zIndex: 0,
  },
});

export default TransactionTabs;
