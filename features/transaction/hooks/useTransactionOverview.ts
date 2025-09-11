import { timePeriod } from "@/utils/timePeriod";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { getAllTransactions, getTotalAmount } from "../services";
import { TotalAmountsType, TransactionType } from "../types";

export function useTransactionOverview() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [totalAmounts, setTotalAmounts] = useState<TotalAmountsType>({
    expense: 0,
    income: 0,
  });

  const { start: monthStart, end: monthEnd } = timePeriod.currentMonth;

  const fetchTransactions = useCallback(async () => {
    try {
      const data = await getAllTransactions(5);
      setTransactions(data);

      const totals = await getTotalAmount({ start: monthStart, end: monthEnd });
      setTotalAmounts(totals as TotalAmountsType);
    } catch (err) {
      console.error("fetchTransaction error:", err);
    }
  }, [monthEnd, monthStart]);

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [fetchTransactions])
  );

  return {
    transactions,
    totalAmounts,
  };
}
