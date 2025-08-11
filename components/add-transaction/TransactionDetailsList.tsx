import Card from "@/components/ui/Card";
import RoundIcon from "@/components/ui/RoundIcon";
import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatDateString } from "@/utils/formatDate";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Image, TouchableOpacity, useColorScheme, View } from "react-native";
import Dialog from "../ui/Dialog";
import CalendarSelector from "./CalendarSelector";

const TransactionDetailsList = ({
  onOpen,
  category,
  paymentMethod,
  date,
  setDate,
}: {
  onOpen: (type: "category" | "payment") => void;
  category: string;
  paymentMethod: "cash" | "bank";
  date: string;
  setDate: (date: string) => void;
}) => {
  const theme = useColorScheme() ?? "light";

  const details = [
    {
      label: "Category",
      icon: require("@/assets/icons/category.png"),
      key: "category",
      value: category,
    },
    {
      label: "Payment Method",
      icon: require("@/assets/icons/card.png"),
      key: "payment",
      value: paymentMethod,
    },
    {
      label: "Date",
      icon: require("@/assets/icons/calendar.png"),
      key: "date",
      value: formatDateString(date),
    },
  ];

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <View style={{ gap: 10, marginTop: 12 }}>
      {details.map((detail) => (
        <Card style={{ padding: 0 }} key={detail.label}>
          <TouchableOpacity
            onPress={() => {
              detail.key === "date"
                ? setDialogOpen(true)
                : onOpen(detail.key as "category" | "payment");
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 16,
            }}
            activeOpacity={0.6}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 9 }}
            >
              <RoundIcon>
                <Image
                  source={detail.icon}
                  style={{ width: 20, height: 20 }}
                  tintColor={Colors[theme].icon}
                />
              </RoundIcon>
              <ThemedText type="body" weight="semibold">
                {detail.label}
              </ThemedText>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ThemedText type="bodySmall">
                {capitalizeFirstLetter(detail.value)}
              </ThemedText>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={22}
                color={Colors[theme].icon}
              />
            </View>
          </TouchableOpacity>
        </Card>
      ))}

      <Dialog visible={dialogOpen} onClose={() => setDialogOpen(false)}>
        <CalendarSelector
          date={date}
          setDate={setDate}
          setDialogOpen={setDialogOpen}
        />
      </Dialog>
    </View>
  );
};

export default TransactionDetailsList;
