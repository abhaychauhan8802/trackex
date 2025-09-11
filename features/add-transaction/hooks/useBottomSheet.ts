import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";

export function useBottomSheet() {
  const sheetRef = useRef<BottomSheet>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState<
    "category" | "payment" | null
  >(null);

  const snapPoints = ["60%"];

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    setIsSheetOpen(index >= 0);
  }, []);

  // Android back button
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

  return {
    sheetRef,
    snapPoints,
    isSheetOpen,
    bottomSheetType,
    setBottomSheetType,
    handleSnapPress,
    handleClosePress,
    handleSheetChange,
  };
}
