import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ui/ThemedText";
import { ThemedView } from "./ui/ThemedView";

type Props = {
  title: string;
  showBack?: boolean;
  headerStyle?: StyleProp<ViewStyle>;
  headerTitleStyle?: StyleProp<TextStyle>;
};

const CustomHeader = ({
  title,
  headerStyle,
  headerTitleStyle,
  showBack = false,
}: Props) => {
  const navigation = useNavigation();

  const color = useThemeColor({}, "textPrimary");

  return (
    <ThemedView
      style={[
        {
          paddingHorizontal: 14,
          flexDirection: "row",
          alignItems: "center",
          height: 60,
        },
        headerStyle,
      ]}
    >
      {showBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={20} color={color} />
        </TouchableOpacity>
      )}
      <ThemedText
        style={[
          {
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: showBack ? 20 : 0,
          },
          headerTitleStyle,
        ]}
      >
        {title}
      </ThemedText>
    </ThemedView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
