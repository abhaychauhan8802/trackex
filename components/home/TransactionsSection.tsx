import { ThemedText } from "@/components/ui/ThemedText";
import { View } from "react-native";
import TransactionItem from "./TransactionItem";

export default function TransactionsSection({
  transactions,
  theme,
  selectedTab,
}: {
  transactions: any[];
  theme: "light" | "dark";
  selectedTab?: "week" | "month" | "year";
}) {
  return (
    <>
      {transactions.length ? (
        <View style={{ gap: 10 }}>
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              theme={theme}
            />
          ))}
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ThemedText
            type="body"
            weight="semibold"
            color="textSecondary"
            style={{
              textAlign: "center",
              paddingTop: 12,
            }}
          >
            No transactions found for this {selectedTab ? selectedTab : "month"}
          </ThemedText>
        </View>
      )}
    </>
  );
}
