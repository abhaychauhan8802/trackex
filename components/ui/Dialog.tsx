import { Colors } from "@/constants/Colors";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Dialog = ({ visible, onClose, children }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <Pressable style={{ flex: 1 }} onPress={onClose}>
        <View style={styles.overlay}>
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={[
              styles.dialogContent,
              { backgroundColor: Colors[theme].surface },
            ]}
          >
            {children}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  dialogContent: {
    width: "100%",
    maxWidth: 350,
    padding: 20,
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});

export default Dialog;
