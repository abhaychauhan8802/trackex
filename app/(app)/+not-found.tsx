import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import ScreenWrapper from "@/components/ScreenWrapper";
import { ThemedText } from "@/components/ui/ThemedText";

export default function NotFoundScreen() {
  return (
    <ScreenWrapper
      headerTitle="Oops!"
      headerShowBackButton={true}
      containerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText type="headline" weight="bold" style={{ textAlign: "center" }}>
        This screen does not exist.
      </ThemedText>
      <Link href="/" style={styles.link}>
        <ThemedText type="body" weight="semibold" color="primary">
          Go to home screen!
        </ThemedText>
      </Link>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 8,
    paddingVertical: 15,
  },
});
