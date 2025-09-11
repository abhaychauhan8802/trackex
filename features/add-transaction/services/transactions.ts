import db from "@/config/database";
import { formatDate } from "@/utils/formatDate";
import { TransactionFormState } from "../types";

export const addTransaction = async (data: TransactionFormState) => {
  const { amount, category, note, paymentMethod, date } = data;

  const result = await db.runAsync(
    `INSERT INTO transactions (amount, category_id, note, payment_method, date) 
     VALUES (?, ?, ?, ?, ?);`,
    [amount, category, note, paymentMethod, date ?? formatDate(new Date())]
  );

  return { success: true, id: result.lastInsertRowId };
};

export const editTransaction = async (
  data: TransactionFormState,
  id: string
) => {
  const { amount, category, note, paymentMethod, date } = data;

  await db.runAsync(
    `UPDATE transactions 
     SET amount = ?, category_id = ?, note = ?, payment_method = ?, date = ? 
     WHERE id = ?;`,
    [amount, category, note, paymentMethod, date, id]
  );

  return { success: true };
};
