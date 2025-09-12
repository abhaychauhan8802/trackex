import { Colors } from "@/constants/Colors";
import {
  BottomSheetBackdrop,
  default as GorhomBottomSheet,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useCallback } from "react";
import { useColorScheme } from "react-native";

type BottomSheetProps = {
  children: React.ReactNode;
  sheetRef: React.RefObject<BottomSheetMethods>;
  snapPoints: string[];
  handleSheetChange?: (index: number) => void;
};

const BottomSheet = ({
  children,
  sheetRef,
  snapPoints,
  handleSheetChange,
}: BottomSheetProps) => {
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
    <GorhomBottomSheet
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
      {children}
    </GorhomBottomSheet>
  );
};

export default BottomSheet;
