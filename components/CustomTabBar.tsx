import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "./ui/ThemedView";

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  const theme = useColorScheme() ?? "light";

  const styles = useStyle(theme, insets);

  return (
    <ThemedView style={[styles.container]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;
        const color = isFocused ? Colors[theme].primary : Colors[theme].icon;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (index === 2) {
          return (
            <React.Fragment key={"add-button"}>
              <TouchableOpacity
                key={"add-button"}
                activeOpacity={0.5}
                accessibilityRole="button"
                onPress={() => router.push("/add-transaction")}
                style={styles.addButton}
              >
                <MaterialIcons name="add" size={22} color={"#fff"} />
              </TouchableOpacity>
              <TouchableOpacity
                key={route.key}
                activeOpacity={0.5}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={onPress}
                style={styles.tab}
              >
                {options.tabBarIcon ? (
                  options.tabBarIcon({
                    focused: isFocused,
                    color,
                    size: 22,
                  })
                ) : (
                  <MaterialIcons
                    name={isFocused ? "error" : "error-outline"}
                    size={22}
                    color={color}
                  />
                )}
              </TouchableOpacity>
            </React.Fragment>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.5}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tab}
          >
            {options.tabBarIcon ? (
              options.tabBarIcon({
                focused: isFocused,
                color,
                size: 22,
              })
            ) : (
              <MaterialIcons
                name={isFocused ? "error" : "error-outline"}
                size={22}
                color={color}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </ThemedView>
  );
};

const useStyle = (theme: "light" | "dark", insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 14,
      paddingBottom: insets.bottom + 14,
    },
    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
    },
    addButton: {
      width: 50,
      height: 50,
      backgroundColor: Colors[theme].primary,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      marginHorizontal: 15,
    },
  });
