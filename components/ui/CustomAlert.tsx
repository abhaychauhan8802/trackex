import { Colors } from "@/constants/Colors";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

type AlertButton = {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
};

type AlertOptions = {
  title: string;
  message?: string;
  buttons?: AlertButton[];
  dismissible?: boolean;
};

let alertRef: any;

const CustomAlertComponent = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<AlertOptions | null>(null);

  const theme = useColorScheme() ?? "light";

  const styles = useStyles(theme);

  useImperativeHandle(ref, () => ({
    show: (opts: AlertOptions) => {
      setOptions({ dismissible: true, ...opts });
      setVisible(true);
    },
  }));

  const handleClose = () => {
    if (options?.dismissible) {
      setVisible(false);
    }
  };

  const handlePress = (btn: AlertButton) => {
    setVisible(false);
    btn.onPress?.();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <Pressable style={styles.backdrop} onPress={handleClose}>
        <Pressable style={styles.dialog}>
          {/* Title */}
          <Text style={styles.title}>{options?.title}</Text>

          {/* Message */}
          {options?.message && (
            <Text style={styles.message}>{options.message}</Text>
          )}

          {/* Buttons */}
          <View style={styles.actions}>
            {options?.buttons?.map((btn, idx) => (
              <Pressable
                key={idx}
                onPress={() => handlePress(btn)}
                android_ripple={{ color: "rgba(0,0,0,0.1)", borderless: false }}
                style={({ pressed }) => [
                  styles.button,
                  pressed && Platform.OS === "ios" && { opacity: 0.7 },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    btn.style === "destructive"
                      ? { color: Colors[theme].error }
                      : btn.style === "cancel"
                      ? { color: Colors[theme].textSecondary }
                      : { color: Colors[theme].primary },
                  ]}
                >
                  {btn.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});

export const CustomAlert = {
  setRef: (ref: any) => (alertRef = ref),
  alert: (
    title: string,
    message?: string,
    buttons?: AlertButton[],
    dismissible = true
  ) => {
    alertRef?.show({ title, message, buttons, dismissible });
  },
};

export default CustomAlertComponent;

const useStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.43)",
      justifyContent: "center",
      alignItems: "center",
    },
    dialog: {
      width: 312,
      backgroundColor: Colors[theme].surface,
      borderRadius: 28,
      padding: 24,
      elevation: 6,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
    title: {
      fontSize: 22,
      fontWeight: "600",
      color: Colors[theme].textPrimary,
      marginBottom: 16,
    },
    message: {
      fontSize: 16,
      color: Colors[theme].textSecondary,
      marginBottom: 24,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    button: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      marginLeft: 8,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "600",
      textTransform: "uppercase",
    },
  });
