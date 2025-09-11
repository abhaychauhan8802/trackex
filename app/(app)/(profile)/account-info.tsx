import ScreenWrapper from "@/components/ScreenWrapper";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ThemedText } from "@/components/ui/ThemedText";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

const AccountInfo = () => {
  const [editable, setEditable] = useState(false);

  return (
    <ScreenWrapper
      headerTitle="Account Info"
      edges={["top", "bottom"]}
      headerShowBackButton={true}
    >
      <Image
        source={require("../../../assets/images/profile.png")}
        style={styles.img}
      />

      <View style={{ gap: 10 }}>
        <View>
          <ThemedText type="label" weight="bold" style={styles.label}>
            Name
          </ThemedText>
          <Input value="dummy" editable={editable} />
        </View>
        <View>
          <ThemedText type="label" weight="bold" style={styles.label}>
            Email
          </ThemedText>
          <Input value="dummy" editable={editable} />
        </View>
        {editable ? (
          <Button text="Update Profile" onPress={() => setEditable(false)} />
        ) : (
          <Button text="Edit Profile" onPress={() => setEditable(true)} />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default AccountInfo;

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
  label: {
    marginBottom: 8,
  },
});
