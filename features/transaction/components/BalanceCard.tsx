import { ThemedText } from "@/components/ui/ThemedText";
import { Constants } from "@/constants/Constants";
import { formatINR } from "@/utils/formatAmount";
import { StyleSheet, View } from "react-native";

type Props = {
  title: string;
  value: number;
  color: string;
};

export default function BalanceCard({ title, value, color }: Props) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <ThemedText type="label" color="onPrimary">
        {title}
      </ThemedText>
      <ThemedText type="subTitle" color="onPrimary" weight="bold">
        {formatINR(Number(value))}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: Constants.borderRadius,
    flex: 1,
    gap: 6,
  },
});
