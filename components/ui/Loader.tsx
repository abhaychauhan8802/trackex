import { Colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";

const Loader = () => {
  const theme = useColorScheme() ?? "light";
  return <ActivityIndicator size={30} color={Colors[theme].primary} />;
};

export default Loader;

const styles = StyleSheet.create({});
