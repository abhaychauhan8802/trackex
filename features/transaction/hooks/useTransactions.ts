import { timePeriod, TimeType } from "@/utils/timePeriod";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getAllTransactions } from "../services";
import { TransactionType } from "../types";

export function useTransactions() {
  const { currentMonth, currentWeek, currentYear } = timePeriod;

  const [allTransactions, setAllTransactions] = useState<TransactionType[]>([]);
  const [selectedTab, setSelectedTab] = useState<"week" | "year" | "month">(
    "week"
  );

  const getTransactions = useCallback(async (payload: TimeType) => {
    try {
      const data = await getAllTransactions(20, payload.start, payload.end);
      setAllTransactions(data);
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const mapping: Record<string, any> = {
        week: currentWeek,
        month: currentMonth,
        year: currentYear,
      };

      getTransactions(mapping[selectedTab]);
    }, [getTransactions, selectedTab])
  );

  return {
    allTransactions,
    selectedTab,
    setSelectedTab,
  };
}
