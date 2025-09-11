import { Keyboard, useColorScheme } from "react-native";

import ScreenWrapper from "@/components/ScreenWrapper";
import Button from "@/components/ui/Button";
import TabsSwitcher from "@/components/ui/TabsSwitcher";
import BottomSheet from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { useBottomSheet, useTransactionForm } from "../hooks";
import { CategoriesResultType } from "../services";
import {
  BottomSheetButtons,
  TransactionDatePicker,
  TransactionInputSection,
} from "./";
import TransactionSheet from "./TransactionSheet";

// ---------------- Main Component -------------
const TransactionForm = () => {
  const {
    formData,
    dispatch,
    selectedTab,
    setSelectedTab,
    categories,
    isLoading,
    handleSubmit,
    isEdit,
    selectedCategoryName,
  } = useTransactionForm();

  const {
    bottomSheetType,
    handleClosePress,
    handleSheetChange,
    sheetRef,
    snapPoints,
    handleSnapPress,
    setBottomSheetType,
  } = useBottomSheet();

  // Hooks
  const theme = useColorScheme() ?? "light";

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
          amount={formData.amount as number}
          note={formData.note}
          onAmountChange={(amount) =>
            dispatch({ type: "SET_AMOUNT", payload: Number(amount) })
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
            dispatch({
              type: "SET_DATE",
              payload: `${format(date, "yyyy-MM-dd")} ${format(
                new Date(),
                "HH:mm:ss"
              )}`,
            })
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
      <TransactionSheet
        categories={categories as CategoriesResultType}
        sheetRef={sheetRef as React.RefObject<BottomSheet>}
        snapPoints={snapPoints}
        handleSheetChange={handleSheetChange}
        bottomSheetType={bottomSheetType}
        handleClosePress={handleClosePress}
        dispatch={dispatch}
        selectedTab={selectedTab}
      />
    </>
  );
};

export default TransactionForm;
