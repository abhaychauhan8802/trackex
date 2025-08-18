import ScreenWrapper from "@/components/ScreenWrapper";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { CustomAlert } from "@/components/ui/CustomAlert";
import Loader from "@/components/ui/Loader";
import { ThemedText } from "@/components/ui/ThemedText";
import axios from "@/config/axios";
import { Constants } from "@/constants/Constants";
import { useApi } from "@/hooks/useApi";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatINR } from "@/utils/formatAmount";
import { formatDateString } from "@/utils/formatDate";
import { AxiosError } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, StyleSheet, Vibration, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const TransactionDetail = () => {
  const { id } = useLocalSearchParams();
  const { request, data, error, loading } = useApi();

  const [refreshing, setRefreshing] = useState(false);

  const transaction = data?.transaction;

  const transactionData = [
    {
      id: 1,
      title: "Note",
      value: transaction?.note,
    },
    {
      id: 2,
      title: "Type",
      value: capitalizeFirstLetter(transaction?.type),
    },
    {
      id: 3,
      title: "Category",
      value: capitalizeFirstLetter(transaction?.category_name),
    },
    {
      id: 4,
      title: "Payment Method",
      value: capitalizeFirstLetter(transaction?.payment_method),
    },
    {
      id: 5,
      title: "Date",
      value: formatDateString(transaction?.date),
    },
  ];

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <Card style={[item.title === "Note" ? styles.note : styles.item]}>
        <ThemedText type="subTitle" weight="semibold">
          {item.title}
        </ThemedText>
        <ThemedText>{item.value}</ThemedText>
      </Card>
    ),
    []
  );

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/transaction/${id}`);
      const data = res?.data;

      if (data?.success) {
        Toast.show({
          type: "success",
          text1: data?.message,
        });

        router.back();
      }
    } catch (error: AxiosError | any) {
      console.log(error?.response?.data);
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message,
      });
    }
  };

  const handleDeleteAlert = () => {
    CustomAlert.alert("Delete transaction?", "This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => handleDelete(),
      },
    ]);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await request("post", `/transaction/${id}`);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    request("post", `/transaction/${id}`);
  }, [request, id]);

  if (error) return <ThemedText>{error}</ThemedText>;

  return (
    <ScreenWrapper
      headerTitle="Transaction"
      headerShowBackButton
      edges={["top", "bottom"]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            Vibration.vibrate(100);
            onRefresh();
          }}
        />
      }
    >
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Loader />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View>
            <View style={styles.card}>
              <ThemedText type="subTitle">
                {capitalizeFirstLetter(transaction?.type)}
              </ThemedText>
              <ThemedText
                style={{ fontSize: 50 }}
                weight="semibold"
                color={transaction?.type === "expense" ? "error" : "success"}
              >
                {formatINR(Number(transaction?.amount))}
              </ThemedText>
            </View>

            {/* List */}
            <View style={styles.details}>
              <FlatList
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                data={transactionData}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              />
            </View>
          </View>

          <View>
            <Button
              text="Edit Transaction"
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: "/(app)/transaction-form",
                  params: transaction,
                })
              }
            />
            <Button
              type="secondary"
              text="Delete Transaction"
              style={styles.button}
              onPress={handleDeleteAlert}
            />
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  card: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Constants.borderRadius,
  },
  note: {
    height: 120,
  },
  details: {
    marginTop: 50,
    gap: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    marginBottom: 10,
  },
});
