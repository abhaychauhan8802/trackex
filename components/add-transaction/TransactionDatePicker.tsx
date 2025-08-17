import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Button } from "react-native";
import { ThemedText } from "../ui/ThemedText";

const TransactionDatePicker = ({ theme }: { theme: "light" | "dark" }) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <ThemedText>selected: {date.toLocaleString()}</ThemedText>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode as any}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default TransactionDatePicker;
