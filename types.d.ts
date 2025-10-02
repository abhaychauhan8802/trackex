type TransactionFormAction =
  | { type: "SET_AMOUNT"; payload: number }
  | { type: "SET_CATEGORY"; payload: number | null }
  | { type: "SET_NOTE"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_PAYMENT_METHOD"; payload: "cash" | "bank" }
  | { type: "SET_FORM_DATA"; payload: TransactionFormState }
  | { type: "RESET_FORM" };

interface TransactionFormState {
  amount: number | null;
  category: number | null;
  note: string;
  paymentMethod: "cash" | "bank";
  date: string | null;
}

interface CategoryType {
  id: number;
  name: string;
  type: "income" | "expense";
  color: string;
}

interface CategoryType {
  category_name: string;
  category_color: string;
  total: number;
}

interface CategoryTotalType {
  expense: CategoryType[];
  income: CategoryType[];
}

interface ChartDataType {
  label: string;
  value: number;
  color: string;
  text: string;
  focused?: boolean;
}

interface TransactionType {
  id: number;
  amount: number;
  date: string;
  note: string;
  payment_method: "cash" | "bank";
  category_name: string;
  category_type: "expense" | "income";
  category_color: string;
  category_id?: number;
}

interface TotalAmountsType {
  income: number;
  expense: number;
}
