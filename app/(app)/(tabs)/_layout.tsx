import { Tabs } from "expo-router";
import React from "react";

import { CustomTabBar } from "@/components/CustomTabBar";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const iconStyle = {
    width: 22,
    height: 22,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/icons/home.png")}
              tintColor={color}
              style={iconStyle}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/icons/transaction.png")}
              tintColor={color}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/icons/stats.png")}
              tintColor={color}
              style={iconStyle}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../../assets/icons/user.png")}
              tintColor={color}
              style={iconStyle}
            />
          ),
        }}
      />
    </Tabs>
  );
}
