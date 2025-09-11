import { Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";

import CustomAlertComponent, { CustomAlert } from "@/components/ui/CustomAlert";
import { initializeDatabase } from "@/config/database";

export default function StackLayout() {
  useEffect(() => {
    (async () => {
      await initializeDatabase();
    })();
  }, []);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "ios_from_right",
        }}
      />
      <CustomAlertComponent ref={CustomAlert.setRef} />
    </>
  );
}
