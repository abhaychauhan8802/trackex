import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const DEFAULT_HEIGHT = SCREEN_HEIGHT / 2;

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  height?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const BottomSheet = ({
  visible,
  onClose,
  height = DEFAULT_HEIGHT,
  style,
  children,
}: BottomSheetProps) => {
  const translateY = useSharedValue(height);
  const [show, setShow] = useState(visible);

  const inset = useSafeAreaInsets();

  const theme = useColorScheme() ?? "light";
  const styles = useStyles(theme);

  useEffect(() => {
    if (visible) {
      setShow(true);
      translateY.value = withTiming(0, { duration: 300 });
    } else {
      translateY.value = withTiming(height, { duration: 200 }, (finished) => {
        if (finished) runOnJS(setShow)(false);
      });
    }
  }, [height, translateY, visible]);

  useEffect(() => {
    const onBackPress = () => {
      if (visible) {
        onClose();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => subscription.remove();
  }, [visible, onClose]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!show) return null;

  return (
    <Pressable style={styles.fullScreenOverlay} onPress={onClose}>
      <Animated.View
        style={[
          styles.sheet,
          { height, paddingBottom: inset.bottom },
          animatedStyle,
          style,
        ]}
        onStartShouldSetResponder={() => true}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default BottomSheet;

const useStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    fullScreenOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      justifyContent: "flex-end",
    },
    sheet: {
      backgroundColor: Colors[theme].background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: "hidden",
      zIndex: 100,
    },
  });
