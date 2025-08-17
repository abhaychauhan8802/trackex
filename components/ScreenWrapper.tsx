import React from "react";
import {
  ScrollView,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import CustomHeader from "./CustomHeader";
import ThemedSafeAreaView from "./ui/ThemedSafeAreaView";

type ScreenWrapperProps = {
  headerTitle: string;
  children: React.ReactNode;
  edges?: ("top" | "bottom" | "left" | "right")[];
  headerTitleStyle?: TextStyle;
  headerStyle?: ViewStyle;
  headerShowBackButton?: boolean;
  containerStyle?: ViewStyle;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  headerTitle,
  children,
  edges = ["top"],
  headerTitleStyle,
  headerStyle,
  headerShowBackButton,
  containerStyle,
}) => {
  return (
    <ThemedSafeAreaView edges={edges}>
      <CustomHeader
        title={headerTitle}
        headerTitleStyle={headerTitleStyle}
        headerStyle={headerStyle}
        showBack={headerShowBackButton}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.contentContainer, containerStyle]}>
          {children}
        </View>
      </ScrollView>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
});

export default ScreenWrapper;
