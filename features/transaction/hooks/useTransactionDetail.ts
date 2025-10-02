import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { getTransactionById } from "../";

export const useTransactionDetail = (id: string) => {
  const [transaction, setTransaction] = useState<TransactionType>();

  const fetchTransaction = useCallback(async () => {
    try {
      const data = await getTransactionById(id);
      setTransaction(data as TransactionType);
    } catch (err) {
      console.error("fetchTransaction error:", err);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchTransaction();
    }, [fetchTransaction])
  );

  return { transaction, setTransaction };
};
