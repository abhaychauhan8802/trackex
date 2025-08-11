import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import React from "react";
import { StyleSheet, View } from "react-native";
import Card from "../ui/Card";
import { ThemedText } from "../ui/ThemedText";
import { ChartData } from "./TransactionChart";

const CategoryTotalCard = ({
  categoryTotal,
  selectedTab,
}: {
  categoryTotal: ChartData[];
  selectedTab: "expense" | "income";
}) => {
  return (
    <View style={styles.cardContainer}>
      <ThemedText
        weight="bold"
        type="sectionHeading"
        style={{ marginBottom: 10 }}
      >
        Category
      </ThemedText>
      <View style={{ gap: 10 }}>
        {categoryTotal.map((item, idx) => {
          return (
            <Card key={idx}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      backgroundColor: item.color,
                    }}
                  />
                  <ThemedText weight="semibold" type="subTitle">
                    {capitalizeFirstLetter(item.label)}
                  </ThemedText>
                </View>
                <ThemedText
                  color={selectedTab === "expense" ? "error" : "success"}
                >{`${selectedTab === "expense" ? "- " : "+ "}₹${
                  item.value
                }`}</ThemedText>
              </View>
            </Card>
          );
        })}
      </View>
    </View>
  );
};

export default CategoryTotalCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 32,
  },
});
