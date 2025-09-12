import BottomSheet from "@/components/BottomSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { CategoriesResultType } from "../services";
import { TransactionFormAction } from "../types";
import CategorySelector from "./CategorySelector";
import PaymentMethodSelector from "./PaymentMethodSelector";

type TransactionSheetProps = {
  sheetRef: React.RefObject<BottomSheetMethods>;
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
  return (
    <BottomSheet
      sheetRef={sheetRef}
      snapPoints={snapPoints}
      handleSheetChange={handleSheetChange}
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
