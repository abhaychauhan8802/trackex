import Card from "@/components/ui/Card";
import RoundIcon from "@/components/ui/RoundIcon";
import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { expenseCategories, incomeCategories } from "@/utils/category";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CategorySelector = ({
  selectedTab,
  categories,
  category,
  setCategory,
  setVisible,
}: {
  selectedTab: "income" | "expense";
  categories: any;
  category: number | null;
  setCategory: (category: number) => void;
  setVisible: (visible: boolean) => void;
}) => {
  const theme = useColorScheme() ?? "light";
  const insets = useSafeAreaInsets();

  const categoryMap =
    selectedTab === "income" ? incomeCategories : expenseCategories;

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, gap: 10 }}>
      <ThemedText
        type="label"
        weight="semibold"
        style={{ paddingTop: 16, paddingBottom: 5 }}
      >
        Select Category
      </ThemedText>
      <FlatList
        data={categories?.[`${selectedTab}Categories`] ?? []}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <Card
            backgroundColor={Colors[theme].surface}
            style={{ marginBottom: 6 }}
          >
            <TouchableOpacity
              key={item.id}
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              activeOpacity={0.6}
              onPress={() => {
                setCategory(item.id);
                setVisible(false);
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
            </TouchableOpacity>
          </Card>
        )}
      />
    </View>
  );
};

export default CategorySelector;
