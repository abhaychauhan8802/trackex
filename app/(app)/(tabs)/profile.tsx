import ScreenWrapper from "@/components/ScreenWrapper";
import Card from "@/components/ui/Card";
import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RelativePathString, router } from "expo-router";
import React from "react";
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
  const theme = useColorScheme() ?? "light";

  return (
    <>
      <ScreenWrapper headerTitle="Profile" headerTitleStyle={{ fontSize: 26 }}>
        <Image
          source={require("../../../assets/images/profile.png")}
          style={styles.img}
        />
        <ThemedText style={[styles.text]} type="title" weight="semibold">
          Abhay
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
        </View>
      </ScreenWrapper>
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
