import axios from "@/config/axios";
import * as SecureStore from "expo-secure-store";

const CATEGORY_KEY = "categories";

export type Category = {
  id: string;
  name: string;
  type: "income" | "expense";
};

export async function getCategories(): Promise<Category[]> {
  try {
    const stored = await SecureStore.getItemAsync(CATEGORY_KEY);
    if (stored) {
      return JSON.parse(stored) as Category[];
    }

    // 2. If not found, fetch from API
    const { data } = await axios.get("/category");

    // 3. Store categories securely
    await SecureStore.setItemAsync(
      CATEGORY_KEY,
      JSON.stringify(data.categories)
    );

    return data.categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function refreshCategories(): Promise<Category[]> {
  try {
    const { data } = await axios.get("/category");

    await SecureStore.setItemAsync(
      CATEGORY_KEY,
      JSON.stringify(data.categories)
    );

    return data.categories;
  } catch (error) {
    console.error("Failed to refresh categories:", error);
    return [];
  }
}
