import { timePeriod, TimeType } from "@/utils/timePeriod";
import { useEffect, useMemo, useState } from "react";
import { CategoryTotalType } from "../";
import { getCategoryTotal } from "../services/statisticsService";

export function useStatistics() {
  const { currentWeek, currentMonth, currentYear } = timePeriod;

  const [categoryTotal, setCategoryTotal] = useState<CategoryTotalType>({
    expense: [],
    income: [],
  });
  const [selectedTab, setSelectedTab] = useState<"expense" | "income">(
    "expense"
  );
  const [selected, setSelected] = useState("week");
  const [selectedTimePeriod, setSelectedTimePeriod] =
    useState<TimeType>(currentWeek);

  const total = useMemo(() => {
    return categoryTotal[selectedTab].reduce(
      (acc, item) => acc + Number(item.total),
      0
    );
  }, [categoryTotal, selectedTab]);

  const chartData = useMemo(() => {
    const currentData = categoryTotal[selectedTab];
    if (!currentData.length) return [];

    const maxIndex = currentData.reduce(
      (maxIdx, item, idx, arr) =>
        Number(item.total) > Number(arr[maxIdx].total) ? idx : maxIdx,
      0
    );

    return currentData.map((item, idx) => {
      const percentage = Math.round((Number(item.total) / total) * 100);
      return {
        label: item.category_name,
        value: Number(item.total),
        text: percentage + "%",
        color: item.category_color,
        focused: idx === maxIndex,
      };
    });
  }, [categoryTotal, selectedTab, total]);

  const chartDataNoZero = useMemo(() => {
    return chartData.filter((item) => parseInt(item.text) !== 0);
  }, [chartData]);

  useEffect(() => {
    const mapping: Record<string, any> = {
      week: currentWeek,
      month: currentMonth,
      year: currentYear,
    };
    setSelectedTimePeriod(mapping[selected]);
  }, [currentMonth, currentWeek, currentYear, selected]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCategoryTotal(selectedTimePeriod);
        setCategoryTotal(data as CategoryTotalType);
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, [selectedTimePeriod, selectedTab]);

  return {
    selected,
    setSelected,
    selectedTab,
    setSelectedTab,
    total,
    chartData,
    chartDataNoZero,
    categoryTotal,
  };
}
