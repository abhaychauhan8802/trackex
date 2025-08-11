import Card from "@/components/ui/Card";
import RoundIcon from "@/components/ui/RoundIcon";
import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import {
  FlatList,
  Image,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const paymentMethods = [
  {
    id: 1,
    name: "Cash",
    icon: require("@/assets/icons/cash.png"),
  },
  {
    id: 2,
    name: "Bank",
    icon: require("@/assets/icons/bank.png"),
  },
];

const PaymentMethodSelector = ({
  paymentMethod,
  setPaymentMethod,
  setVisible,
}: {
  paymentMethod: "cash" | "bank";
  setPaymentMethod: (paymentMethod: "cash" | "bank") => void;
  setVisible: (visible: boolean) => void;
}) => {
  const theme = useColorScheme() ?? "light";
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, gap: 10 }}>
      <ThemedText
        type="label"
        weight="semibold"
        style={{ paddingTop: 16, paddingBottom: 5 }}
      >
        Select Payment Method
      </ThemedText>

      <FlatList
        data={paymentMethods}
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
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
              }}
              activeOpacity={0.6}
              onPress={() => {
                setPaymentMethod(item.name.toLowerCase() as "cash" | "bank");
                setVisible(false);
              }}
            >
              <RoundIcon style={{ backgroundColor: Colors[theme].background }}>
                <Image
                  source={item.icon}
                  style={{ width: 20, height: 20 }}
                  tintColor={Colors[theme].icon}
                />
              </RoundIcon>
              <ThemedText type="body" weight="semibold">
                {item.name}
              </ThemedText>
            </TouchableOpacity>
          </Card>
        )}
      />
    </View>
  );
};

export default PaymentMethodSelector;
