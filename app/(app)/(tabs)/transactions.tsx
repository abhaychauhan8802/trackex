import BalanceCard from "@/components/BalanceCard";
import TransactionsSection from "@/components/home/TransactionsSection";
import ScreenWrapper from "@/components/ScreenWrapper";
import TabsSwitcher from "@/components/ui/TabsSwitcher";
import { ThemedText } from "@/components/ui/ThemedText";
import axios from "@/config/axios";
import { Colors } from "@/constants/Colors";
import { timePeriod } from "@/utils/timePeriod";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Transactions = () => {
  const { currentMonth, currentWeek, currentYear } = timePeriod;
  const theme = useColorScheme() ?? "light";

  const [transactions, setTransactions] = useState<any>();
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(currentMonth);
  const [selectedTab, setSelectedTab] = useState<"week" | "year" | "month">(
    "week"
  );
  const [loading, setLoading] = useState(false);

  const getTransactions = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/transaction", selectedTimePeriod);
      setTransactions(res.data);
    } catch (error: AxiosError | any) {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message,
      });

      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const mapping: Record<string, any> = {
      week: currentWeek,
      month: currentMonth,
      year: currentYear,
    };
    setSelectedTimePeriod(mapping[selectedTab]);
  }, [selectedTab]);

  useEffect(() => {
    getTransactions();
  }, [selectedTimePeriod]);

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
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={30} color={Colors[theme].primary} />
        </View>
      ) : (
        <>
          <View style={styles.balanceCardContainer}>
            <BalanceCard
              title="Income"
              value={transactions?.totalIncome ?? 0}
              color={Colors[theme].success}
            />
            <BalanceCard
              title="Expense"
              value={transactions?.totalExpense ?? 0}
              color={Colors[theme].error}
            />
          </View>
          <ThemedText
            style={{ marginBottom: 8 }}
            type="sectionHeading"
            weight="bold"
          >
            Transactions
          </ThemedText>
          <TransactionsSection
            transactions={transactions?.transactions ?? []}
            theme={theme}
            selectedTab={selectedTab}
          />
        </>
      )}
    </ScreenWrapper>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  balanceCardContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
});
