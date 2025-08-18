import { Colors } from "@/constants/Colors";
import { formatDateString } from "@/utils/formatDate";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import Card from "../ui/Card";
import RoundIcon from "../ui/RoundIcon";
import { ThemedText } from "../ui/ThemedText";

const TransactionDatePicker = ({
  theme,
  formDate,
  onDateChange,
}: {
  theme: "light" | "dark";
  formDate: Date;
  onDateChange: (date: Date) => void;
}) => {
  const [date, setDate] = useState(formDate);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (_: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    onDateChange(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  useEffect(() => {
    setDate(formDate);
  }, [formDate]);

  return (
    <>
      <Card
        onPress={() => showDatepicker()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <RoundIcon>
            <Image
              source={require("@/assets/icons/calendar.png")}
              style={{ width: 20, height: 20 }}
              tintColor={Colors[theme].icon}
            />
          </RoundIcon>
          <ThemedText type="body" weight="semibold">
            {formatDateString(date.toISOString())}
          </ThemedText>
        </View>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={22}
          color={Colors[theme].icon}
        />
      </Card>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode as any}
          is24Hour={true}
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
    </>
  );
};

export default TransactionDatePicker;
