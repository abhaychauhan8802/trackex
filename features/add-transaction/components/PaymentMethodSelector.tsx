import Card from "@/components/ui/Card";
import RoundIcon from "@/components/ui/RoundIcon";
import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { useCallback } from "react";
import { Image, useColorScheme } from "react-native";
import BottomSheetList from "../../../components/BottomSheetList";

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
  setPaymentMethod,
  handleClosePress,
}: {
  setPaymentMethod: (paymentMethod: "cash" | "bank") => void;
  handleClosePress: () => void;
}) => {
  const theme = useColorScheme() ?? "light";

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
          setPaymentMethod(item.name.toLowerCase() as "cash" | "bank");
          handleClosePress();
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
      </Card>
    ),
    [theme, setPaymentMethod, handleClosePress]
  );

  return (
    <BottomSheetList data={paymentMethods ?? []} renderItem={renderItem} />
  );
};

export default PaymentMethodSelector;
