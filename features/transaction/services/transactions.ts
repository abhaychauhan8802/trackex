import db from "@/config/database";
import { TotalAmountsType, TransactionType } from "../types";

export const getAllTransactions = async (
  limit: number,
  start?: string,
  end?: string
) => {
  let query = `
    SELECT 
      t.id,
      t.amount / 100 AS amount,
      t.date,
      t.note,
      t.payment_method,
      c.name AS category_name,
      c.type AS category_type,
      c.color AS category_color
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
  `;

  const params: any[] = [];

  if (start && end) {
    query += ` WHERE DATE(t.date) BETWEEN ? AND ?`;
    params.push(start, end);
  }

  query += ` ORDER BY datetime(t.date) DESC LIMIT ?;`;
  params.push(limit);

  return db.getAllAsync<TransactionType>(query, params);
};

export const getTransactionById = async (id: string) => {
  return db.getFirstAsync(
    `SELECT t.id, t.amount / 100 AS amount, t.date, t.note, t.payment_method, c.name as category_name, c.type as category_type, c.color as category_color, c.id as category_id FROM transactions t JOIN categories c ON t.category_id = c.id WHERE t.id = ?`,
    [id]
  );
};

export const deleteTransaction = async (id: string) => {
  await db.runAsync(`DELETE FROM transactions WHERE id = ?;`, [id]);
  return { success: true };
};

export const getTotalAmount = async ({
  start,
  end,
}: {
  start: string;
  end: string;
}) => {
  return await db.getFirstAsync<TotalAmountsType>(
    `SELECT
      SUM(CASE WHEN c.type = 'income' THEN t.amount END) / 100.0 AS income,
      SUM(CASE WHEN c.type = 'expense' THEN t.amount END) / 100.0 AS expense
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE DATE(t.date) BETWEEN ? AND ?;`,
    [start, end]
  );
};
