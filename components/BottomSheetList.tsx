import { Constants } from "@/constants/Constants";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomSheetList = ({
  data,
  renderItem,
}: {
  data: any[];
  renderItem: ({ item }: { item: any }) => React.ReactElement;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetFlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{
        paddingBottom: insets.bottom + 5,
        paddingHorizontal: Constants.borderRadius,
        paddingTop: 10,
      }}
      keyboardShouldPersistTaps="handled"
      renderItem={renderItem}
    />
  );
};

export default BottomSheetList;
