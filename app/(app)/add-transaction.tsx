import CustomHeader from "@/components/CustomHeader";
import BottomSheet from "@/components/ui/BottomSheet";
import Button from "@/components/ui/Button";
import ThemedSafeAreaView from "@/components/ui/ThemedSafeAreaView";

import CategorySelector from "../../components/add-transaction/CategorySelector";
import TransactionDetailsList from "../../components/add-transaction/TransactionDetailsList";
import TransactionInputSection from "../../components/add-transaction/TransactionInputSection";

import PaymentMethodSelector from "@/components/add-transaction/PaymentMethodSelector";
import TabsSwitcher from "@/components/ui/TabsSwitcher";
import axios from "@/config/axios";
import { formatDate } from "@/utils/formatDate";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useEffect, useMemo, useReducer, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

let today = formatDate(new Date());

type TransactionFormState = {
  amount: string;
  category: number | null;
  note: string;
  paymentMethod: "cash" | "bank";
  date: string;
};

type TransactionFormAction =
  | { type: "SET_AMOUNT"; payload: string }
  | { type: "SET_CATEGORY"; payload: number | null }
  | { type: "SET_NOTE"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_PAYMENT_METHOD"; payload: string }
  | { type: "RESET_FORM" };

const initialState: TransactionFormState = {
  amount: "",
  note: "",
  category: null,
  paymentMethod: "cash" as "cash" | "bank",
  date: today,
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
      return { ...state, paymentMethod: action.payload as "cash" | "bank" };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

const AddTransaction = () => {
  const [selectedTab, setSelectedTab] = useState<"income" | "expense">(
    "expense"
  );
  const [visible, setVisible] = useState<boolean>(false);
  const [categories, setCategories] = useState<any>();
  const [bottomSheetType, setBottomSheetType] = useState<
    "category" | "payment" | null
  >(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, dispatch] = useReducer(reducer, initialState);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category");
      if (res?.data?.success) setCategories(res.data.categories);
    } catch (error: AxiosError | any) {
      console.log(error?.response?.data);
    }
  };

  const handleAddTransaction = async () => {
    const { amount, category, note } = formData;

    const showError = (message: string) =>
      Toast.show({ type: "error", text1: message });

    if (!amount) return showError("Amount is required");
    if (!category) return showError("Category is required");
    if (!note) return showError("Note is required");

    setIsAdding(true);
    try {
      const res = await axios.post("/transaction/add", {
        ...formData,
        categoryId: formData.category,
      });

      if (res?.data?.success) {
        Toast.show({
          type: "success",
          text1: res?.data?.message,
        });
        dispatch({ type: "RESET_FORM" });

        router.replace("/(app)/(tabs)");
      }
    } catch (error: AxiosError | any) {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message,
      });

      console.log(error?.response?.data);
    } finally {
      setIsAdding(false);
    }
  };

  const selectedCategoryName = useMemo(() => {
    if (!categories || formData.category == null) return "";

    const categoryList =
      selectedTab === "expense"
        ? categories.expenseCategories
        : categories.incomeCategories;

    const selected = categoryList.find(
      (cat: any) => cat.id === formData.category
    );
    return selected?.name ?? "";
  }, [categories, formData.category, selectedTab]);

  useEffect(() => {
    if (!categories) {
      fetchCategories();
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: "SET_CATEGORY",
      payload: selectedTab === "expense" ? 6 : 1,
    });
  }, [selectedTab]);

  return (
    <ThemedSafeAreaView>
      <CustomHeader title="Add Transaction" showBack />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{ paddingHorizontal: 16, paddingVertical: 10, flex: 1 }}
            >
              <TabsSwitcher
                options={[
                  { key: "expense", label: "Expense" },
                  { key: "income", label: "Income" },
                ]}
                selected={selectedTab}
                onChange={setSelectedTab}
              />

              <TransactionInputSection
                amount={formData.amount}
                note={formData.note}
                onAmountChange={(amount) =>
                  dispatch({ type: "SET_AMOUNT", payload: amount })
                }
                onNoteChange={(note) =>
                  dispatch({ type: "SET_NOTE", payload: note })
                }
              />
              <TransactionDetailsList
                onOpen={(type) => {
                  setBottomSheetType(type);
                  setVisible(true);
                }}
                category={selectedCategoryName}
                paymentMethod={formData.paymentMethod}
                date={formData.date}
                setDate={(date) =>
                  dispatch({ type: "SET_DATE", payload: date })
                }
              />
              <Button
                text="Add Transaction"
                style={{ marginTop: 12 }}
                loading={isAdding}
                disabled={isAdding}
                onPress={handleAddTransaction}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <BottomSheet
        visible={visible}
        onClose={() => {
          setVisible(false);
          setBottomSheetType(null);
        }}
        height={500}
      >
        {bottomSheetType === "category" && (
          <CategorySelector
            selectedTab={selectedTab}
            categories={categories}
            category={formData.category}
            setCategory={(category) =>
              dispatch({ type: "SET_CATEGORY", payload: category })
            }
            setVisible={setVisible}
          />
        )}
        {bottomSheetType === "payment" && (
          <PaymentMethodSelector
            paymentMethod={formData.paymentMethod}
            setPaymentMethod={(paymentMethod) =>
              dispatch({ type: "SET_PAYMENT_METHOD", payload: paymentMethod })
            }
            setVisible={setVisible}
          />
        )}
      </BottomSheet>
    </ThemedSafeAreaView>
  );
};

export default AddTransaction;
