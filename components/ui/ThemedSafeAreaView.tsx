import { useThemeColor } from "@/hooks/useThemeColor";
import { ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  edges?: ("top" | "bottom" | "left" | "right")[];
};

const ThemedSafeAreaView = ({
  style,
  lightColor,
  darkColor,
  edges = ["top"],
  ...otherProps
}: ThemedViewProps) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <SafeAreaView
      style={[{ backgroundColor }, { flex: 1 }, style]}
      edges={edges}
      {...otherProps}
    />
  );
};

export default ThemedSafeAreaView;
