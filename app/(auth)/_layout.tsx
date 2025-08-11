import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { saveUser } from "@/store/slice/userSlice";
import { Redirect, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export default function AuthLayout() {
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
  if (user) return <Redirect href="/(app)/(tabs)" />;

  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "ios_from_right" }}
    />
  );
}
