import { useThemeColor } from "@/hooks/useThemeColor";
import {
  StyleSheet,
  Text,
  useColorScheme,
  type ColorSchemeName,
  type TextProps,
} from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "headline"
    | "title"
    | "subTitle"
    | "body"
    | "bodySmall"
    | "label"
    | "caption"
    | "sectionHeading";
  color?:
    | "textPrimary"
    | "textSecondary"
    | "primary"
    | "error"
    | "success"
    | "onPrimary"
    | "onSecondary";
  weight?: "regular" | "semibold" | "bold";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "body",
  color: colorKey = "textPrimary",
  weight = "regular",
  ...rest
}: ThemedTextProps) {
  const theme: ColorSchemeName = useColorScheme() ?? "light";
  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorKey);

  const styles = useStyle();

  const textStyle = [
    styles[type],
    { fontWeight: fontWeightMap[weight] },
    { color },
    style,
  ];

  return <Text style={textStyle} {...rest} />;
}

const fontWeightMap = {
  regular: "400" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

const useStyle = () =>
  StyleSheet.create({
    headline: { fontSize: 32 },
    title: { fontSize: 26 },
    subTitle: { fontSize: 18 },
    sectionHeading: {
      fontSize: 22,
    },
    body: { fontSize: 16 },
    bodySmall: { fontSize: 14 },
    label: { fontSize: 14 },
    caption: { fontSize: 12 },
  });
