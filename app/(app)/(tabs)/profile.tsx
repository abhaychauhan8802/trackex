import ScreenWrapper from "@/components/ScreenWrapper";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slice/userSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RelativePathString, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

type ScreenDataType = {
  name: string;
  route: string;
};

const screensData: ScreenDataType[] = [
  {
    name: "Account Info",
    route: "/(app)/(profile)/account-info",
  },
];

const Profile = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const theme = useColorScheme() ?? "light";

  const handleLogout = async () => {
    await Promise.all([
      SecureStore.deleteItemAsync("currentUser"),
      SecureStore.deleteItemAsync("token"),
    ]);

    dispatch(logout());

    if (!user) {
      router.replace("/(auth)/login");
    }
  };

  return (
    <ScreenWrapper headerTitle="Profile" headerTitleStyle={{ fontSize: 26 }}>
      <Image
        source={require("../../../assets/images/profile.png")}
        style={styles.img}
      />
      <ThemedText style={[styles.text]} type="title" weight="semibold">
        {user?.name}
      </ThemedText>

      <View style={styles.container}>
        {screensData.map((item) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => router.push(item.route as RelativePathString)}
          >
            <Card>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <ThemedText type="subTitle" weight="semibold">
                  {item.name}
                </ThemedText>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={15}
                  color={Colors[theme].textPrimary}
                />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
        <Button onPress={handleLogout} text="Logout" />
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 8,
  },
  img: {
    width: 140,
    height: 140,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 30,
  },
  container: {
    marginTop: 20,
    gap: 16,
  },
});
