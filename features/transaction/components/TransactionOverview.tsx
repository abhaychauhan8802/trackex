import ScreenWrapper from "@/components/ScreenWrapper";
import { ThemedText } from "@/components/ui/ThemedText";
import { Link } from "expo-router";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { useTransactionOverview } from "../";
import { DebitCard, TransactionSection } from "./";

const TransactionOverview = () => {
  const { transactions, totalAmounts } = useTransactionOverview();
  const theme = useColorScheme() ?? "light";

  return (
    <ScreenWrapper headerTitle="Trackex" headerTitleStyle={{ fontSize: 26 }}>
      <DebitCard
        totalIncome={(totalAmounts.income as number) ?? 0}
        totalExpense={(totalAmounts.expense as number) ?? 0}
      />

      <View style={{ marginTop: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <ThemedText type="sectionHeading" weight="semibold">
            Recent activity
          </ThemedText>
          <Link href="/(app)/(tabs)/transactions" asChild>
            <TouchableOpacity>
              <ThemedText type="body">See all</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>
        <TransactionSection transactions={transactions ?? []} theme={theme} />
      </View>
    </ScreenWrapper>
  );
};

export default TransactionOverview;
