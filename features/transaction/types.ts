export type TransactionType = {
  id: number;
  amount: number;
  date: string;
  note: string;
  payment_method: "cash" | "bank";
  category_name: string;
  category_type: "expense" | "income";
  category_color: string;
  category_id?: number;
};

export type TotalAmountsType = {
  income: number;
  expense: number;
};
