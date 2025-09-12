import ScreenWrapper from "@/components/ScreenWrapper";
import Dropdown from "@/components/ui/Dropdown";
import TabsSwitcher from "@/components/ui/TabsSwitcher";
import { ThemedText } from "@/components/ui/ThemedText";
import React from "react";
import { View } from "react-native";
import { CategoryTotalCard, dates, TransactionChart, useStatistics } from "../";

const StatisticsScreen = () => {
  const {
    selected,
    setSelected,
    selectedTab,
    setSelectedTab,
    total,
    chartData,
    chartDataNoZero,
    categoryTotal,
  } = useStatistics();

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

export default StatisticsScreen;
