import DebitCard from "@/components/home/DebitCard";
import TransactionsSection from "@/components/home/TransactionsSection";
import ScreenWrapper from "@/components/ScreenWrapper";
import { ThemedText } from "@/components/ui/ThemedText";
import axios from "@/config/axios";
import { timePeriod } from "@/utils/timePeriod";
import { AxiosError } from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const { currentMonth } = timePeriod;
  const [transactions, setTransactions] = useState<any>();
  const theme = useColorScheme() ?? "light";

  const getTransactions = async () => {
    try {
      const res = await axios.post("/transaction", {
        ...currentMonth,
        limit: 5,
      });
      setTransactions(res.data);
    } catch (error: AxiosError | any) {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message,
      });

      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <ScreenWrapper headerTitle="Trackex" headerTitleStyle={{ fontSize: 26 }}>
      <DebitCard
        totalIncome={transactions?.totalIncome ?? 0}
        totalExpense={transactions?.totalExpense ?? 0}
      />

      <View style={{ marginTop: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText
            type="sectionHeading"
            weight="semibold"
            style={{ marginBottom: 6 }}
          >
            Recent activity
          </ThemedText>
          <Link href="/(app)/(tabs)/transactions" asChild>
            <TouchableOpacity>
              <ThemedText type="body">See all</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>
        <TransactionsSection
          transactions={transactions?.transactions ?? []}
          theme={theme}
        />
      </View>
    </ScreenWrapper>
  );
}
