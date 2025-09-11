import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { formatINR } from "@/utils/formatAmount";
import { timePeriod } from "@/utils/timePeriod";
import AntDesign from "@expo/vector-icons/AntDesign";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function DebitCard({
  totalIncome,
  totalExpense,
}: {
  totalIncome: number;
  totalExpense: number;
}) {
  const theme = useColorScheme() ?? "light";
  const { start, end } = timePeriod.currentMonth;

  const remaining = (totalIncome - totalExpense).toFixed(2);

  return (
    <LinearGradient
      colors={["#A671FC", "#9DA1FB", "#B0B6FD", "#8fd6ffff"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.card}
    >
      <View style={{ marginBottom: 4 }}>
        <ThemedText type="bodySmall" weight="semibold" color="onPrimary">
          {format(start, "MMM dd")} - {format(end, "MMM dd")}
        </ThemedText>
      </View>
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
          {formatINR(Number(remaining))}
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
                color={Colors[theme].onPrimary}
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
              {formatINR(Number(totalIncome))}
            </ThemedText>
          </View>
        </View>

        <View style={styles.statItem}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.statIconContainer}>
              <AntDesign
                name="arrowup"
                size={16}
                color={Colors[theme].onPrimary}
              />
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
              {formatINR(Number(totalExpense))}
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
    minHeight: 180,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsContainer: {
    marginTop: 5,
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
