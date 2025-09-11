export type TransactionFormState = {
  amount: number | null;
  category: number | null;
  note: string;
  paymentMethod: "cash" | "bank";
  date: string | null;
};

export type TransactionFormAction =
  | { type: "SET_AMOUNT"; payload: number }
  | { type: "SET_CATEGORY"; payload: number | null }
  | { type: "SET_NOTE"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_PAYMENT_METHOD"; payload: "cash" | "bank" }
  | { type: "SET_FORM_DATA"; payload: TransactionFormState }
  | { type: "RESET_FORM" };

export type CategoryType = {
  id: number;
  name: string;
  type: "income" | "expense";
  color: string;
};
