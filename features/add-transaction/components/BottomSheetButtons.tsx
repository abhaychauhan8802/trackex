import Card from "@/components/ui/Card";
import RoundIcon from "@/components/ui/RoundIcon";
import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { expenseCategories, incomeCategories } from "@/utils/category";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image, useColorScheme, View } from "react-native";

const paymentMethodsIcons = [
  {
    name: "cash",
    icon: require("@/assets/icons/cash.png"),
  },
  {
    name: "bank",
    icon: require("@/assets/icons/bank.png"),
  },
];

const BottomSheetButtons = ({
  onOpen,
  category,
  paymentMethod,
  selectedTab,
}: {
  onOpen: (type: "category" | "payment", index?: number) => void;
  category: string;
  paymentMethod: "cash" | "bank";
  selectedTab: "income" | "expense";
}) => {
  const theme = useColorScheme() ?? "light";

  const categoryMap =
    selectedTab === "income" ? incomeCategories : expenseCategories;

  const details = [
    {
      label: "Category",
      icon: categoryMap[category]?.icon ?? require("@/assets/icons/other.png"),
      key: "category",
      value: category,
    },
    {
      label: "Payment Method",
      icon: paymentMethodsIcons.find((m) => m.name === paymentMethod)?.icon,
      key: "payment",
      value: paymentMethod,
    },
  ];

  return (
    <>
      <View style={{ gap: 10, marginTop: 12 }}>
        {details.map((detail) => (
          <Card
            key={detail.label}
            onPress={() => onOpen(detail.key as "category" | "payment", 0)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 14 }}
            >
              <RoundIcon>
                <Image
                  source={detail.icon}
                  style={{ width: 20, height: 20 }}
                  tintColor={Colors[theme].icon}
                />
              </RoundIcon>
              <ThemedText type="body" weight="semibold">
                {capitalizeFirstLetter(detail.value)}
              </ThemedText>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={22}
              color={Colors[theme].icon}
            />
          </Card>
        ))}
      </View>
    </>
  );
};

export default BottomSheetButtons;
