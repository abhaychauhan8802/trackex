import { Colors } from "@/constants/Colors";
import { Constants } from "@/constants/Constants";
import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

const createToastConfig = (colorScheme: "light" | "dark") => {
  return {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftWidth: 0,
          backgroundColor: Colors[colorScheme].success,
          borderRadius: Constants.borderRadius,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          color: Colors[colorScheme].onPrimary,
          fontWeight: "600",
        }}
        text2Style={{
          color: Colors["light"].textSecondary,
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftWidth: 0,
          backgroundColor: Colors[colorScheme].error,
          borderRadius: Constants.borderRadius,
        }}
        text1Style={{
          color: Colors[colorScheme].onPrimary,
          fontWeight: "600",
        }}
        text2Style={{
          color: Colors["light"].textSecondary,
        }}
      />
    ),
  };
};

export default createToastConfig;
