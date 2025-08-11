import ScreenWrapper from "@/components/ScreenWrapper";
import CategoryTotalCard from "@/components/statistics/CategoryTotalCard";
import TransactionChart from "@/components/statistics/TransactionChart";
import Dropdown from "@/components/ui/Dropdown";
import TabsSwitcher from "@/components/ui/TabsSwitcher";
import { ThemedText } from "@/components/ui/ThemedText";
import axios from "@/config/axios";
import { pieChartColors } from "@/constants/ChartColors";
import { timePeriod } from "@/utils/timePeriod";
import { AxiosError } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useColorScheme, View } from "react-native";
import Toast from "react-native-toast-message";

const dates = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];

type CategoryType = {
  category_name: string;
  total: number;
};

type CategoryTotalType = {
  expense: CategoryType[];
  income: CategoryType[];
};

const Statistics = () => {
  const { currentWeek, currentMonth, currentYear } = timePeriod;
  const theme = useColorScheme() ?? "light";

  const [categoryTotal, setCategoryTotal] = useState<CategoryTotalType>({
    expense: [],
    income: [],
  });

  const [selectedTab, setSelectedTab] = useState<"expense" | "income">(
    "expense"
  );
  const [selected, setSelected] = useState("week");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(currentWeek);
  const [loading, setLoading] = useState(false);

  const total = useMemo(() => {
    return categoryTotal[selectedTab].reduce(
      (acc, item) => acc + Number(item.total),
      0
    );
  }, [categoryTotal, selectedTab, selected]);

  const chartData = useMemo(() => {
    return categoryTotal[selectedTab].map((item, idx) => {
      const percantage = Math.round((Number(item.total) / total) * 100);

      return {
        label: item.category_name,
        value: Number(item.total),
        text: percantage + "%",
        color: pieChartColors[idx],
      };
    });
  }, [categoryTotal, selectedTab]);

  const chartDataNoZero = useMemo(() => {
    return chartData.filter((item) => parseInt(item.text) !== 0);
  }, [chartData]);

  const fetchCategoryTotal = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "/transaction/category-total",
        selectedTimePeriod
      );

      if (res?.data?.success) {
        setCategoryTotal(res.data.categoryTotal);
      }
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

  useEffect(() => {
    fetchCategoryTotal();
  }, [selectedTimePeriod]);

  useEffect(() => {
    const mapping: Record<string, any> = {
      week: currentWeek,
      month: currentMonth,
      year: currentYear,
    };
    setSelectedTimePeriod(mapping[selected]);
  }, [selected]);

  return (
    <ScreenWrapper headerTitle="Statistics" headerTitleStyle={{ fontSize: 26 }}>
      <TabsSwitcher
        options={[
          { key: "expense", label: "Expense" },
          { key: "income", label: "Income" },
        ]}
        selected={selectedTab}
        onChange={setSelectedTab}
      />
      <Dropdown
        data={dates}
        value={selected}
        onChange={(val) => setSelected(val)}
      />
      {categoryTotal[selectedTab].length > 0 ? (
        <>
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <TransactionChart
              chartData={chartDataNoZero}
              total={total}
              current={selectedTab}
            />
          </View>

          <CategoryTotalCard
            categoryTotal={chartData}
            selectedTab={selectedTab}
          />
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText
            style={{ textAlign: "center" }}
            weight="semibold"
            color="textSecondary"
          >
            No transactions found for this {selected}.
          </ThemedText>
        </View>
      )}
    </ScreenWrapper>
  );
};

export default Statistics;
