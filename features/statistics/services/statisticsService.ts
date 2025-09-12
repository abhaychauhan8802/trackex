import db from "@/config/database";
import { TimeType } from "@/utils/timePeriod";

export async function getCategoryTotal(selectedTimePeriod: TimeType) {
  const { end, start } = selectedTimePeriod;

  const income = await db.getAllAsync(
    `SELECT c.name AS category_name, c.color AS category_color, SUM(t.amount) / 100 AS total
     FROM transactions t
     JOIN categories c ON t.category_id = c.id
     WHERE c.type = 'income' AND datetime(t.date) BETWEEN ? AND ?
     GROUP BY c.name
     ORDER BY total DESC`,
    [start, end]
  );

  const expense = await db.getAllAsync(
    `SELECT c.name AS category_name, c.color AS category_color, SUM(t.amount) / 100 AS total
     FROM transactions t
     JOIN categories c ON t.category_id = c.id
     WHERE c.type = 'expense' AND datetime(t.date) BETWEEN ? AND ?
     GROUP BY c.name
     ORDER BY total DESC`,
    [start, end]
  );

  return { income, expense };
}
