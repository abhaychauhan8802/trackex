import DebitCard from "@/components/home/DebitCard";
import TransactionsSection from "@/components/home/TransactionsSection";
import ScreenWrapper from "@/components/ScreenWrapper";
import Loader from "@/components/ui/Loader";
import { ThemedText } from "@/components/ui/ThemedText";
import axios from "@/config/axios";
import { timePeriod } from "@/utils/timePeriod";
import { AxiosError } from "axios";
import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  TouchableOpacity,
  useColorScheme,
  Vibration,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  // States
  const [transactions, setTransactions] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const theme = useColorScheme() ?? "light";
  const { currentMonth } = timePeriod;

  const getTransactions = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await getTransactions();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <ScreenWrapper
      headerTitle="Trackex"
      headerTitleStyle={{ fontSize: 26 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            Vibration.vibrate(100);
            onRefresh();
          }}
        />
      }
    >
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
        {loading ? (
          <View
            style={{
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </View>
        ) : (
          <TransactionsSection
            transactions={transactions?.transactions ?? []}
            theme={theme}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}
