import * as SQLite from "expo-sqlite";

export const DATABASE_NAME = "trackex.db";
const db = SQLite.openDatabaseSync(DATABASE_NAME);

const createTableQuery = `PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  color TEXT
);
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount INTEGER NOT NULL 
    CHECK (amount >= 0 AND amount <= 100000000),
  category_id INTEGER NOT NULL,
  payment_method TEXT CHECK (payment_method IN ('cash', 'bank')) NOT NULL,
  note TEXT,
  date TIMESTAMP NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
`;

const defaultCategories = [
  // incomes
  { name: "salary", type: "income", color: "#4CAF50" },
  { name: "coupons", type: "income", color: "#2D9CDB" },
  { name: "sold items", type: "income", color: "#F28E2B" },
  { name: "gift", type: "income", color: "#76B7B2" },
  { name: "other income", type: "income", color: "#4E79A7" },
  // expenses
  { name: "food", type: "expense", color: "#4CAF50" },
  { name: "shopping", type: "expense", color: "#F28E2B" },
  { name: "travelling", type: "expense", color: "#E15759" },
  { name: "entertainment", type: "expense", color: "#76B7B2" },
  { name: "medical", type: "expense", color: "#69aa96ff" },
  { name: "bills", type: "expense", color: "#EDC948" },
  { name: "investments", type: "expense", color: "#B07AA1" },
  { name: "rent", type: "expense", color: "#FF9DA7" },
  { name: "taxes", type: "expense", color: "#9C755F" },
  { name: "insurance", type: "expense", color: "#BAB0AC" },
  { name: "gift", type: "expense", color: "#2D9CDB" },
  { name: "donation", type: "expense", color: "#91ae27ff" },
  { name: "education", type: "expense", color: "#F39C12" },
  { name: "other expenses", type: "expense", color: "#4E79A7" },
];

export const initializeDatabase = async () => {
  try {
    // Create Tables
    await db.execAsync(createTableQuery);

    // Check if categories already exist
    const result = await db.getFirstAsync<{ count: number }>(
      "SELECT COUNT(*) as count FROM categories"
    );

    if (result?.count === 0) {
      // Insert default categories
      for (const cat of defaultCategories) {
        await db.runAsync(
          "INSERT INTO categories (name, type, color) VALUES (?, ?, ?)",
          [cat.name, cat.type, cat.color]
        );
      }
      console.log("Default categories inserted ✅");
    } else {
      console.log("Categories already exist, skipping seed ❌");
    }
  } catch (error) {
    console.error("Error executing SQL queries:", error);
  }
};

export default db;
