import { Colors } from "@/constants/Colors";
import { formatDate } from "@/utils/formatDate";
import React, { useState } from "react";
import { useColorScheme } from "react-native";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

let today = formatDate(new Date());

const CalendarSelector = ({
  date,
  setDate,
  setDialogOpen,
}: {
  date: string;
  setDate: (date: string) => void;
  setDialogOpen: (open: boolean) => void;
}) => {
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState<DateType>(date);

  const theme = useColorScheme() ?? "light";

  return (
    <DateTimePicker
      mode="single"
      date={selected}
      onChange={({ date }) => {
        if (!date) return;

        const picked =
          typeof date === "object" && "toDate" in date
            ? date.toDate()
            : new Date(date);

        const normalized = new Date(
          picked.getFullYear(),
          picked.getMonth(),
          picked.getDate()
        );

        setSelected(normalized);
        setDate(formatDate(normalized));
        setDialogOpen(false);
      }}
      maxDate={today}
      styles={{
        ...defaultStyles,
        selected: {
          backgroundColor: Colors[theme].primary,
          borderRadius: 50,
        },
        today: {
          backgroundColor:
            theme === "light"
              ? Colors[theme].mutedBackground
              : Colors[theme].background,
          borderRadius: 50,
        },
      }}
    />
  );
};

export default CalendarSelector;
