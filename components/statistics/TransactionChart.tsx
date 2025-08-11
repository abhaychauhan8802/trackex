import { Colors } from "@/constants/Colors";
import { useColorScheme, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { ThemedText } from "../ui/ThemedText";

export type ChartData = {
  label: string;
  value: number;
  color: string;
  text: string;
};

const TransactionChart = ({
  chartData,
  total,
  current,
}: {
  chartData: ChartData[];
  total: number;
  current?: "expense" | "income";
}) => {
  const theme = useColorScheme() ?? "light";

  return (
    <PieChart
      data={chartData}
      donut
      radius={120}
      innerRadius={70}
      showText
      textColor={Colors[theme].onSecondary}
      innerCircleColor={Colors[theme].background}
      centerLabelComponent={() => {
        return (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {current && (
              <ThemedText type="body" color="textSecondary">
                {current}
              </ThemedText>
            )}
            <ThemedText weight="bold" type="subTitle">
              ₹{total}
            </ThemedText>
          </View>
        );
      }}
    />
  );
};

export default TransactionChart;
