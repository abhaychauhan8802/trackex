import { useThemeColor } from "@/hooks/useThemeColor";
import { store } from "@/store/store";
import createToastConfig from "@/utils/toastConfig";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const color = useThemeColor({}, "background");

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const toastConfig = createToastConfig(colorScheme);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: color }}>
            <Slot />
            <StatusBar style="auto" />
            <Toast config={toastConfig} />
          </View>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
}
