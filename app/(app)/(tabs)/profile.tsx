import ScreenWrapper from "@/components/ScreenWrapper";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slice/userSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { RelativePathString, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useCallback, useMemo, useRef } from "react";
import { Image, StyleSheet, useColorScheme, View } from "react-native";

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
  // Hooks
  const { user } = useAppSelector((state) => state.user);
  const theme = useColorScheme() ?? "light";

  // Bottom Sheet
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%"], []);

  // Redux
  const dispatch = useAppDispatch();

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

  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        style={[props.style, { top: 0, height: "100%" }]}
      />
    ),
    []
  );

  return (
    <>
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
            <Card
              key={item.name}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => router.push(item.route as RelativePathString)}
            >
              <ThemedText type="subTitle" weight="semibold">
                {item.name}
              </ThemedText>
              <MaterialIcons
                name="arrow-forward-ios"
                size={15}
                color={Colors[theme].textPrimary}
              />
            </Card>
          ))}
          <Button onPress={handleSnapPress} text="Logout" />
        </View>
      </ScreenWrapper>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={sheetRef}
        index={-1}
        enableOverDrag={false}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: Colors[theme].background }}
        handleIndicatorStyle={{ backgroundColor: Colors[theme].textSecondary }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ThemedText
            type="subTitle"
            weight="semibold"
            style={{ textAlign: "center" }}
          >
            Are you sure you want to logout?
          </ThemedText>
          <View style={{ flexDirection: "row", gap: 26, marginTop: 20 }}>
            <Button
              type="secondary"
              onPress={handleClosePress}
              text="Cancel"
              style={styles.buttonStyles}
            />
            <Button
              onPress={handleLogout}
              text="Logout"
              style={styles.buttonStyles}
            />
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginTop: 8,
  },
  buttonStyles: {
    paddingHorizontal: 48,
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
