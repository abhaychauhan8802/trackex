import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "../ui/ThemedText";

export default function DebitCard({
  totalIncome,
  totalExpense,
}: {
  totalIncome: number;
  totalExpense: number;
}) {
  const theme = useColorScheme() ?? "light";

  const remaining = (totalIncome - totalExpense).toFixed(2);

  return (
    <LinearGradient
      colors={["#8B5CF6", "#EC4899", "#F97316"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <ThemedText type="label" weight="semibold" color="onPrimary">
              Remain Balance
            </ThemedText>
          </View>
        </View>

        {/* Balance Amount */}
        <ThemedText type="headline" weight="bold" color="onPrimary">
          ₹{remaining}
        </ThemedText>
      </View>

      {/* Income and Expenses */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.statIconContainer}>
              <AntDesign
                name="arrowdown"
                size={16}
                color={Colors[theme].success}
              />
            </View>
            <ThemedText type="label" weight="semibold" color="onPrimary">
              Income
            </ThemedText>
          </View>
          <View>
            <ThemedText
              type="body"
              weight="semibold"
              style={styles.amount}
              color="onPrimary"
            >
              ₹{totalIncome}
            </ThemedText>
          </View>
        </View>

        <View style={styles.statItem}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.statIconContainer}>
              <AntDesign name="arrowup" size={16} color="#ff0000ff" />
            </View>
            <ThemedText type="label" weight="semibold" color="onPrimary">
              Expenses
            </ThemedText>
          </View>
          <View>
            <ThemedText
              type="body"
              weight="semibold"
              style={styles.amount}
              color="onPrimary"
            >
              ₹{totalExpense}
            </ThemedText>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    minHeight: 180,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    gap: 2,
  },
  statIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  amount: {
    marginLeft: 5,
  },
});
