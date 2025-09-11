import Input from "@/components/ui/Input";
import { ThemedText } from "@/components/ui/ThemedText";
import { View } from "react-native";

const TransactionInputSection = ({
  amount,
  note,
  onAmountChange,
  onNoteChange,
}: {
  amount: number;
  note: string;
  onAmountChange: (amount: string) => void;
  onNoteChange: (note: string) => void;
}) => {
  return (
    <View>
      <ThemedText type="label" style={{ marginBottom: 8 }}>
        Amount
      </ThemedText>
      <Input
        placeholder="Enter amount"
        keyboardType="numeric"
        iconLeft={<ThemedText type="label">₹</ThemedText>}
        value={amount?.toString()}
        onChangeText={(e) => onAmountChange(e)}
      />

      <ThemedText type="label" style={{ marginTop: 12, marginBottom: 8 }}>
        Note
      </ThemedText>
      <Input
        multiline
        numberOfLines={4}
        maxLength={40}
        placeholder="Note..."
        value={note}
        onChangeText={(e) => onNoteChange(e)}
      />
    </View>
  );
};

export default TransactionInputSection;
