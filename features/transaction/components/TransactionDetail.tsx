import ScreenWrapper from "@/components/ScreenWrapper";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { CustomAlert } from "@/components/ui/CustomAlert";
import { ThemedText } from "@/components/ui/ThemedText";
import { Constants } from "@/constants/Constants";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatINR } from "@/utils/formatAmount";
import { formatDateString } from "@/utils/formatDate";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { deleteTransaction, useTransactionDetail } from "../";

const TransactionDetail = () => {
  const { id } = useLocalSearchParams();
  const { transaction } = useTransactionDetail(id as string);

  const transactionData = [
    {
      id: 1,
      title: "Note",
      value: transaction?.note,
    },
    {
      id: 2,
      title: "Type",
      value: capitalizeFirstLetter(transaction?.category_type as string),
    },
    {
      id: 3,
      title: "Category",
      value: capitalizeFirstLetter(transaction?.category_name as string),
    },
    {
      id: 4,
      title: "Payment Method",
      value: capitalizeFirstLetter(transaction?.payment_method as string),
    },
    {
      id: 5,
      title: "Date",
      value: formatDateString(transaction?.date as string),
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
      await deleteTransaction(id as string);
      router.back();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDeleteAlert = () => {
    CustomAlert.alert(
      "Delete transaction?",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDelete(),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <ScreenWrapper
      headerTitle="Transaction"
      headerShowBackButton
      edges={["top", "bottom"]}
    >
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
              {capitalizeFirstLetter(transaction?.category_type as string)}
            </ThemedText>
            <ThemedText
              style={{ fontSize: 50 }}
              weight="semibold"
              color={
                transaction?.category_type === "expense" ? "error" : "success"
              }
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
                pathname: "/(app)/add-transaction",
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
