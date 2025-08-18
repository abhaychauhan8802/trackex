import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { AxiosError } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { BackHandler, Keyboard, useColorScheme } from "react-native";
import Toast from "react-native-toast-message";

import CategorySelector from "@/components/add-transaction/CategorySelector";
import PaymentMethodSelector from "@/components/add-transaction/PaymentMethodSelector";
import TransactionDatePicker from "@/components/add-transaction/TransactionDatePicker";
import ScreenWrapper from "@/components/ScreenWrapper";
import Button from "@/components/ui/Button";
import TabsSwitcher from "@/components/ui/TabsSwitcher";
import axios from "@/config/axios";
import { Colors } from "@/constants/Colors";
import { getCategories } from "@/utils/categoryService";
import { formatDate } from "@/utils/formatDate";
import BottomSheetButtons from "../../components/add-transaction/BottomSheetButtons";
import TransactionInputSection from "../../components/add-transaction/TransactionInputSection";

// -----------------------------
// Types
// -----------------------------
type TransactionFormState = {
  amount: string;
  category: number | null;
  note: string;
  paymentMethod: "cash" | "bank";
  date: string | null;
};

type TransactionFormAction =
  | { type: "SET_AMOUNT"; payload: string }
  | { type: "SET_CATEGORY"; payload: number | null }
  | { type: "SET_NOTE"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_PAYMENT_METHOD"; payload: string }
  | { type: "SET_FORM_DATA"; payload: TransactionFormState }
  | { type: "RESET_FORM" };

// -----------------------------
// Initial State & Reducer
// -----------------------------
const initialState: TransactionFormState = {
  amount: "",
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
      return { ...state, paymentMethod: action.payload as "cash" | "bank" };
    case "SET_FORM_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

const addNewTransaction = async (data: TransactionFormState, dispatch: any) => {
  const res = await axios.post("/transaction/add", {
    ...data,
    categoryId: data.category,
  });

  if (res?.data?.success) {
    Toast.show({ type: "success", text1: res?.data?.message });
    dispatch({ type: "RESET_FORM" });
    router.replace("/(app)/(tabs)");
  }
};

const editTransactionDB = async (
  data: TransactionFormState,
  id: string,
  dispatch: any
) => {
  const res = await axios.post("/transaction/edit", {
    ...data,
    id,
    categoryId: data.category,
  });

  if (res?.data?.success) {
    Toast.show({ type: "success", text1: res?.data?.message });
    dispatch({ type: "RESET_FORM" });
    router.back();
  }
};

// -----------------------------
// Render
// -----------------------------
const TransactionForm = () => {
  // State
  const [formData, dispatch] = useReducer(reducer, initialState);
  const [selectedTab, setSelectedTab] = useState<"income" | "expense">(
    "expense"
  );
  const [categories, setCategories] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  // Bottom sheet state
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const [bottomSheetType, setBottomSheetType] = useState<
    "category" | "payment" | null
  >(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Hooks
  const theme = useColorScheme() ?? "light";
  const params = useLocalSearchParams();

  const isEdit = params?.id ? true : false;

  // -----------------------------
  // Functions
  // -----------------------------

  // Add transaction function
  const handleSubmit = async () => {
    const { amount, category, note } = formData;

    const showError = (message: string) =>
      Toast.show({ type: "error", text1: message });

    if (!amount) return showError("Amount is required");
    if (!category) return showError("Category is required");
    if (!note) return showError("Note is required");

    setIsLoading(true);

    try {
      if (isEdit) {
        await editTransactionDB(formData, params?.id as string, dispatch);
      } else {
        await addNewTransaction(formData, dispatch);
      }
    } catch (error: AxiosError | any) {
      Toast.show({ type: "error", text1: error?.response?.data?.message });
      console.log(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  // Bottom sheet functions
  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    setIsSheetOpen(index >= 0);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        style={[props.style, { top: 0, height: "100%" }]}
      />
    ),
    []
  );

  // -----------------------------
  // Derived Values
  // -----------------------------

  // selected category
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

  // -----------------------------
  // Effects
  // -----------------------------

  // fetch categories
  useEffect(() => {
    (async () => {
      const cats = await getCategories();
      setCategories(cats);
    })();
  }, []);

  // set default category
  useEffect(() => {
    const cat =
      selectedTab === "expense"
        ? categories?.expenseCategories[0]?.id
        : categories?.incomeCategories[0]?.id;

    if (!isEdit) {
      dispatch({
        type: "SET_CATEGORY",
        payload: cat,
      });
      dispatch({
        type: "SET_DATE",
        payload: formatDate(new Date()),
      });
    }
  }, [categories, selectedTab]);

  // set values on edit
  useEffect(() => {
    if (isEdit) {
      setSelectedTab(params?.type as "expense" | "income");

      dispatch({
        type: "SET_FORM_DATA",
        payload: {
          amount: params?.amount as string,
          category: Number(params?.category_id),
          note: params?.note as string,
          paymentMethod: params?.payment_method as "cash" | "bank",
          date: formatDate(new Date(params?.date as string)),
        },
      });
    }
  }, [isEdit]);

  // handle android back press to close bottom sheet
  useEffect(() => {
    const backAction = () => {
      if (isSheetOpen) {
        sheetRef.current?.close();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isSheetOpen]);

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <>
      <ScreenWrapper
        headerTitle={isEdit ? "Edit Transaction" : "Add Transaction"}
        edges={["bottom", "top"]}
        headerShowBackButton
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
          onNoteChange={(note) => dispatch({ type: "SET_NOTE", payload: note })}
        />

        <BottomSheetButtons
          onOpen={(type, idx) => {
            Keyboard.dismiss();
            setBottomSheetType(type);
            handleSnapPress(idx as number);
          }}
          selectedTab={selectedTab}
          category={selectedCategoryName}
          paymentMethod={formData.paymentMethod}
        />

        <TransactionDatePicker
          theme={theme}
          formDate={new Date(formData.date as string)}
          onDateChange={(date) =>
            dispatch({ type: "SET_DATE", payload: formatDate(date) })
          }
        />

        <Button
          text={isEdit ? "Update Transaction" : "Add Transaction"}
          style={{ marginTop: 12 }}
          loading={isLoading}
          disabled={isLoading}
          onPress={handleSubmit}
        />
      </ScreenWrapper>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={sheetRef}
        index={-1}
        enableOverDrag={false}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onChange={handleSheetChange}
        backgroundStyle={{ backgroundColor: Colors[theme].background }}
        handleIndicatorStyle={{ backgroundColor: Colors[theme].textSecondary }}
      >
        {bottomSheetType === "category" && (
          <CategorySelector
            selectedTab={selectedTab}
            categories={categories}
            setCategory={(category) =>
              dispatch({ type: "SET_CATEGORY", payload: category })
            }
            handleClosePress={handleClosePress}
          />
        )}
        {bottomSheetType === "payment" && (
          <PaymentMethodSelector
            setPaymentMethod={(paymentMethod) =>
              dispatch({ type: "SET_PAYMENT_METHOD", payload: paymentMethod })
            }
            handleClosePress={handleClosePress}
          />
        )}
      </BottomSheet>
    </>
  );
};

export default TransactionForm;
