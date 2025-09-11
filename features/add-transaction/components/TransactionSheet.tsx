import { Colors } from "@/constants/Colors";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import { useColorScheme } from "react-native";
import { CategoriesResultType } from "../services";
import { TransactionFormAction } from "../types";
import CategorySelector from "./CategorySelector";
import PaymentMethodSelector from "./PaymentMethodSelector";

type TransactionSheetProps = {
  sheetRef: React.RefObject<BottomSheet>;
  snapPoints: string[];
  handleSheetChange: (index: number) => void;
  bottomSheetType: "category" | "payment" | null;
  handleClosePress: () => void;
  dispatch: (action: TransactionFormAction) => void;
  selectedTab: "income" | "expense";
  categories: CategoriesResultType;
};

const TransactionSheet = ({
  sheetRef,
  snapPoints,
  handleSheetChange,
  bottomSheetType,
  handleClosePress,
  dispatch,
  selectedTab,
  categories,
}: TransactionSheetProps) => {
  const theme = useColorScheme() ?? "light";

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

  return (
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
  );
};

export default TransactionSheet;
