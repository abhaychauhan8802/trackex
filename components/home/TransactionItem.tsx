import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatDateString } from "@/utils/formatDate";
import { StyleSheet, View } from "react-native";
import Card from "../ui/Card";

export default function TransactionItem({
  transaction,
  theme,
}: {
  transaction: any;
  theme: "light" | "dark";
}) {
  const isIncome = transaction.type === "income";

  return (
    <Card>
      <View style={[styles.card, { backgroundColor: Colors[theme].surface }]}>
        <View>
          <ThemedText type="subTitle" weight="semibold">
            {capitalizeFirstLetter(transaction.category_name)}
          </ThemedText>
          <ThemedText type="bodySmall">
            {capitalizeFirstLetter(transaction.payment_method)}
          </ThemedText>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <ThemedText
            type="body"
            weight="semibold"
            style={{
              color: isIncome ? Colors[theme].success : Colors[theme].error,
            }}
          >
            {isIncome ? "+ " : "- "}₹{transaction.amount}
          </ThemedText>
          <ThemedText type="bodySmall">
            {formatDateString(transaction.date)}
          </ThemedText>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
