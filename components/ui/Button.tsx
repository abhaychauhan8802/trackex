import { Colors } from "@/constants/Colors";
import { Constants } from "@/constants/Constants";
import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type ButtonProps = {
  text: string;
  onPress?: () => void;
  type?: "default" | "secondary" | "ghost";
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  props?: React.ComponentPropsWithoutRef<typeof TouchableOpacity>;
};

const Button = ({
  text,
  onPress,
  type = "default",
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  style,
  ...props
}: ButtonProps) => {
  const theme = useColorScheme() ?? "light";

  const buttonTypeStyle = {
    default: {
      backgroundColor: Colors[theme].primary,
    },
    secondary: {
      backgroundColor: "#E5E5EA",
      color: "#FFF",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#FFF",
    },
  }[type];

  const textStyle = {
    default: {
      color: Colors[theme].onPrimary,
    },
    secondary: {
      color: "#FFF",
    },
    ghost: {
      color: "#FFF",
    },
  }[type];

  return (
    <TouchableOpacity
      onPress={onPress}
      {...props}
      disabled={disabled}
      activeOpacity={Constants.activeOpacity}
    >
      <ThemedView
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 15,
            paddingHorizontal: 16,
            borderRadius: Constants.borderRadius,
            justifyContent: "center",
          },
          buttonTypeStyle,
          style,
        ]}
      >
        {loading ? (
          <>
            <ActivityIndicator
              size="small"
              color={textStyle.color}
              style={{ marginRight: 8 }}
            />
            <ThemedText
              style={[textStyle, { fontWeight: "bold", fontSize: 16 }]}
            >
              {text}
            </ThemedText>
          </>
        ) : (
          <>
            {iconLeft && <>{iconLeft}</>}
            <ThemedText
              style={[textStyle, { fontWeight: "bold", fontSize: 16 }]}
            >
              {text}
            </ThemedText>
            {iconRight && <>{iconRight}</>}
          </>
        )}
      </ThemedView>
    </TouchableOpacity>
  );
};

export default Button;
