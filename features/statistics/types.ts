export type CategoryType = {
  category_name: string;
  category_color: string;
  total: number;
};

export type CategoryTotalType = {
  expense: CategoryType[];
  income: CategoryType[];
};

export type ChartDataType = {
  label: string;
  value: number;
  color: string;
  text: string;
  focused?: boolean;
};
