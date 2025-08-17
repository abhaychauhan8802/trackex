import BottomSheetList from "@/components/BottomSheetList";
import Card from "@/components/ui/Card";
import RoundIcon from "@/components/ui/RoundIcon";
import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { expenseCategories, incomeCategories } from "@/utils/category";
import { useCallback } from "react";
import { Image, useColorScheme } from "react-native";

const CategorySelector = ({
  selectedTab,
  categories,
  setCategory,
  handleClosePress,
}: {
  selectedTab: "income" | "expense";
  categories: any;
  setCategory: (category: number) => void;
  handleClosePress: () => void;
}) => {
  const theme = useColorScheme() ?? "light";

  const categoryMap =
    selectedTab === "income" ? incomeCategories : expenseCategories;

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <Card
        backgroundColor={Colors[theme].surface}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          marginBottom: 6,
        }}
        onPress={() => {
          setCategory(item.id);
          handleClosePress();
        }}
      >
        <RoundIcon style={{ backgroundColor: Colors[theme].background }}>
          <Image
            source={
              categoryMap[item.name as keyof typeof categoryMap]?.icon ??
              require("@/assets/icons/other.png")
            }
            style={{ width: 20, height: 20 }}
            tintColor={Colors[theme].icon}
          />
        </RoundIcon>
        <ThemedText type="body" weight="semibold">
          {capitalizeFirstLetter(item.name)}
        </ThemedText>
      </Card>
    ),
    [theme, categoryMap, setCategory, handleClosePress]
  );

  return (
    <BottomSheetList
      data={categories?.[`${selectedTab}Categories`] ?? []}
      renderItem={renderItem}
    />
  );
};

export default CategorySelector;
