import { Redirect, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import "react-native-reanimated";

import CustomAlertComponent, { CustomAlert } from "@/components/ui/CustomAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { saveUser } from "@/store/slice/userSlice";
import { useEffect, useState } from "react";

export default function StackLayout() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const storedUser = await SecureStore.getItemAsync("currentUser");
      dispatch(saveUser(storedUser ? JSON.parse(storedUser) : null));
      setLoading(false);
    })();
  }, [dispatch]);

  if (loading) return null;
  if (!user) return <Redirect href="/(auth)/login" />;

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
