import { ThemedText } from "@/components/ui/ThemedText";
import { View } from "react-native";
import { TransactionItem } from "./";

export default function TransactionSection({
  transactions,
  theme,
}: {
  transactions: any[];
  theme: "light" | "dark";
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
          style={{
            height: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
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
            You don’t have any transactions yet
          </ThemedText>
        </View>
      )}
    </>
  );
}
