import Card from "@/components/ui/Card";
import RoundIcon from "@/components/ui/RoundIcon";
import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { expenseCategories, incomeCategories } from "@/utils/category";
import { formatINR } from "@/utils/formatAmount";
import { formatDateString } from "@/utils/formatDate";
import { RelativePathString, router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function TransactionItem({
  transaction,
  theme,
}: {
  transaction: any;
  theme: "light" | "dark";
}) {
  const isIncome = transaction.category_type === "income";

  const categoryImage = isIncome ? incomeCategories : expenseCategories;

  return (
    <Card
      style={[styles.card]}
      onPress={() =>
        router.push({
          pathname: "/(app)/transaction-detail/[id]" as RelativePathString,
          params: { id: transaction.id },
        })
      }
    >
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <RoundIcon>
          <Image
            source={categoryImage?.[transaction.category_name]?.icon}
            style={{ width: 18, height: 18 }}
            tintColor={Colors[theme].icon}
          />
        </RoundIcon>
        <View>
          <ThemedText type="subTitle" weight="semibold">
            {capitalizeFirstLetter(transaction.category_name)}
          </ThemedText>
          <ThemedText type="bodySmall">
            {capitalizeFirstLetter(transaction.payment_method)}
          </ThemedText>
        </View>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <ThemedText
          type="body"
          weight="semibold"
          style={{
            color: isIncome ? Colors[theme].success : Colors[theme].error,
          }}
        >
          {isIncome ? "+ " : "- "}
          {formatINR(transaction.amount)}
        </ThemedText>
        <ThemedText type="bodySmall">
          {formatDateString(transaction.date)}
        </ThemedText>
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
