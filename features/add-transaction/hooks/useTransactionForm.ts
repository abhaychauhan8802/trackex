import { rupeeToPaise } from "@/utils/currency";
import { formatDate } from "@/utils/formatDate";
import { format } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useReducer, useState } from "react";
import Toast from "react-native-toast-message";
import {
  addTransaction,
  CategoriesResultType,
  editTransaction,
  getCategories,
} from "../services";

const initialState: TransactionFormState = {
  amount: null,
  note: "",
  category: null,
  paymentMethod: "cash",
  date: null,
};

function reducer(state: TransactionFormState, action: TransactionFormAction) {
  switch (action.type) {
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_NOTE":
      return { ...state, note: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_PAYMENT_METHOD":
      return { ...state, paymentMethod: action.payload };
    case "SET_FORM_DATA":
      return { ...state, ...action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

export function useTransactionForm() {
  const [formData, dispatch] = useReducer(reducer, initialState);
  const [selectedTab, setSelectedTab] = useState<"income" | "expense">(
    "expense"
  );
  const [categories, setCategories] = useState<CategoriesResultType>();
  const [isLoading, setIsLoading] = useState(false);

  const params = useLocalSearchParams();
  const isEdit = Boolean(params?.id);

  // fetch categories
  useEffect(() => {
    (async () => {
      const cats = await getCategories();
      setCategories(cats);
    })();
  }, []);

  // set default category
  useEffect(() => {
    if (!categories) return;
    const cat =
      selectedTab === "expense"
        ? categories.expenseCategories[0]?.id
        : categories.incomeCategories[0]?.id;

    if (!isEdit) {
      dispatch({ type: "SET_CATEGORY", payload: cat });
      dispatch({
        type: "SET_DATE",
        payload: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      });
    }
  }, [categories, isEdit, selectedTab]);

  // set form values in edit mode
  useEffect(() => {
    if (isEdit) {
      setSelectedTab(params?.category_type as "expense" | "income");
      dispatch({
        type: "SET_FORM_DATA",
        payload: {
          amount: Number(params?.amount),
          category: Number(params?.category_id),
          note: params?.note as string,
          paymentMethod: params?.payment_method as "cash" | "bank",
          date: formatDate(new Date(params?.date as string)),
        },
      });
    }
  }, [isEdit]);

  const selectedCategoryName = useMemo(() => {
    if (!categories || formData.category == null) return "";
    const list =
      selectedTab === "expense"
        ? categories.expenseCategories
        : categories.incomeCategories;

    return list.find((cat: any) => cat.id === formData.category)?.name ?? "";
  }, [categories, formData.category, selectedTab]);

  // Submit function
  const handleSubmit = async () => {
    if (!formData.amount)
      return Toast.show({ type: "error", text1: "Amount is required" });
    if (!formData.category)
      return Toast.show({ type: "error", text1: "Category is required" });
    if (!formData.note)
      return Toast.show({ type: "error", text1: "Note is required" });

    setIsLoading(true);
    try {
      if (isEdit) {
        await editTransaction(
          { ...formData, amount: rupeeToPaise(formData.amount) },
          params?.id as string
        );
        Toast.show({ type: "success", text1: "Transaction updated" });
        router.back();
      } else {
        await addTransaction({
          ...formData,
          amount: rupeeToPaise(formData.amount),
        });

        Toast.show({ type: "success", text1: "Transaction added" });
        router.replace("/(app)/(tabs)");
      }
      dispatch({ type: "RESET_FORM" });
    } catch {
      Toast.show({ type: "error", text1: "Database error" });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    dispatch,
    selectedTab,
    setSelectedTab,
    categories,
    selectedCategoryName,
    isEdit,
    isLoading,
    handleSubmit,
  };
}
