import ScreenWrapper from "@/components/ScreenWrapper";
import TabsSwitcher from "@/components/ui/TabsSwitcher";
import { ThemedText } from "@/components/ui/ThemedText";
import TransactionsSection from "@/features/transaction/components/TransactionSection";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { useTransactions } from "../hooks";

const AllTransactions = () => {
  const theme = useColorScheme() ?? "light";
  const { allTransactions, selectedTab, setSelectedTab } = useTransactions();

  return (
    <ScreenWrapper
      headerTitle="Transactions"
      headerTitleStyle={{ fontSize: 26 }}
    >
      <TabsSwitcher
        selected={selectedTab}
        onChange={setSelectedTab}
        options={[
          { key: "week", label: "Week" },
          { key: "month", label: "Month" },
          { key: "year", label: "Year" },
        ]}
      />
      {/* <View style={styles.balanceCardContainer}>
        <BalanceCard
          title="Income"
          value={allTransactions?.totalIncome ?? 0}
          color={Colors[theme].success}
        />
        <BalanceCard
          title="Expense"
          value={allTransactions?.totalExpense ?? 0}
          color={Colors[theme].error}
        />
      </View> */}
      <ThemedText
        style={{ marginBottom: 8 }}
        type="sectionHeading"
        weight="bold"
      >
        Transactions
      </ThemedText>
      <TransactionsSection
        transactions={allTransactions ?? []}
        theme={theme}
        selectedTab={selectedTab}
      />
    </ScreenWrapper>
  );
};

export default AllTransactions;

const styles = StyleSheet.create({
  balanceCardContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
});
