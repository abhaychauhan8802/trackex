import ScreenWrapper from "@/components/ScreenWrapper";
import Loader from "@/components/ui/Loader";
import { ThemedText } from "@/components/ui/ThemedText";
import { useApi } from "@/hooks/useApi";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const TransactionDetail = () => {
  const { id } = useLocalSearchParams();
  const { request, data, error, loading } = useApi();

  useEffect(() => {
    request("post", `/transaction/${id}`);
  }, [request, id]);

  if (error) return <ThemedText>{error}</ThemedText>;

  return (
    <ScreenWrapper headerTitle="Transaction" headerShowBackButton>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Loader />
        </View>
      ) : (
        <ThemedText>{JSON.stringify(data, null, 2)}</ThemedText>
      )}
    </ScreenWrapper>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({});
