import db from "@/config/database";
import { CategoryType } from "../types";

export type CategoriesResultType = {
  expenseCategories: CategoryType[];
  incomeCategories: CategoryType[];
};

export const getCategories = async (): Promise<CategoriesResultType> => {
  const categories = await db.getAllAsync<CategoryType>(
    `SELECT * FROM categories;`
  );

  return {
    expenseCategories: categories.filter((c) => c.type === "expense"),
    incomeCategories: categories.filter((c) => c.type === "income"),
  };
};
