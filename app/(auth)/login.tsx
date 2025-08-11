import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ThemedSafeAreaView from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import axios from "@/config/axios";
import { Colors } from "@/constants/Colors";
import { useAppDispatch } from "@/store/hooks";
import { saveUser } from "@/store/slice/userSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AxiosError } from "axios";
import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Login = () => {
  const theme = useColorScheme() ?? "light";

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    const user = { email, password };

    switch (true) {
      case !user.email:
        Toast.show({
          type: "error",
          text1: "Email is required",
        });
        return;
      case !user.password:
        Toast.show({
          type: "error",
          text1: "Password is required",
        });
        return;
      default:
        break;
    }

    try {
      setLoading(true);
      const res = await axios.post("/auth/login", user);

      if (res && res.data.success) {
        await Promise.all([
          SecureStore.setItemAsync("token", res.data.token),
          SecureStore.setItemAsync(
            "currentUser",
            JSON.stringify(res.data.user)
          ),
        ]);

        dispatch(saveUser(res.data.user));

        Toast.show({
          type: "success",
          text1: res.data.message,
        });

        router.replace("/(app)/(tabs)");
      }
    } catch (error: AxiosError | any) {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message,
      });
      console.log("Error occurs when login", error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedSafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ gap: 10, marginTop: 80 }}>
              <ThemedText type="headline" weight="bold">
                Log in
              </ThemedText>
              <ThemedText color="textSecondary">
                Enter your email and password to securely access your account.
              </ThemedText>
            </View>

            <View style={{ gap: 16, marginTop: 20 }}>
              <View>
                <ThemedText
                  type="label"
                  weight="semibold"
                  style={{ marginBottom: 8 }}
                >
                  Email
                </ThemedText>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
              </View>
              <View>
                <ThemedText
                  type="label"
                  weight="semibold"
                  style={{ marginBottom: 8 }}
                >
                  Password
                </ThemedText>
                <Input
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  iconRight={
                    <TouchableOpacity
                      onPress={() => setIsPasswordVisible((prev) => !prev)}
                    >
                      <Ionicons
                        name={isPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color={Colors[theme].icon}
                      />
                    </TouchableOpacity>
                  }
                />
              </View>
            </View>

            <Button
              text="Login"
              onPress={handleLogin}
              style={{ marginTop: 20 }}
              loading={loading}
            />

            <ThemedText style={{ textAlign: "center", marginVertical: 10 }}>
              Not have an account?{" "}
              <Link href="/(auth)/signup">
                <ThemedText type="body" color="primary">
                  Signup
                </ThemedText>
              </Link>
            </ThemedText>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    gap: 10,
  },
});
