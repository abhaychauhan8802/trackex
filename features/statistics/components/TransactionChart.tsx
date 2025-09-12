import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { formatINR } from "@/utils/formatAmount";
import { useColorScheme, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { type ChartDataType } from "../";

const TransactionChart = ({
  chartData,
  total,
  current,
}: {
  chartData: ChartDataType[];
  total: number;
  current?: "expense" | "income";
}) => {
  const theme = useColorScheme() ?? "light";

  return (
    <PieChart
      data={chartData}
      donut
      radius={130}
      innerRadius={80}
      strokeColor={Colors[theme].background}
      strokeWidth={4}
      sectionAutoFocus
      showText
      textColor={Colors[theme].onPrimary}
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
              {formatINR(Number(total))}
            </ThemedText>
          </View>
        );
      }}
    />
  );
};

export default TransactionChart;
