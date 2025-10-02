import Card from "@/components/ui/Card";
import RoundIcon from "@/components/ui/RoundIcon";
import { ThemedText } from "@/components/ui/ThemedText";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { expenseCategories, incomeCategories } from "@/utils/category";
import { formatINR } from "@/utils/formatAmount";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

const CategoryTotalCard = ({
  categoryTotal,
  selectedTab,
}: {
  categoryTotal: ChartDataType[];
  selectedTab: "expense" | "income";
}) => {
  const categoryImage =
    selectedTab === "income" ? incomeCategories : expenseCategories;

  return (
    <View style={styles.cardContainer}>
      <ThemedText
        weight="semibold"
        type="sectionHeading"
        style={{ marginBottom: 10 }}
      >
        Category
      </ThemedText>
      <View style={{ gap: 10 }}>
        {categoryTotal.map((item, idx) => {
          return (
            <Card
              key={idx}
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
                  gap: 10,
                }}
              >
                <RoundIcon>
                  <Image
                    source={categoryImage?.[item.label]?.icon}
                    style={{ width: 20, height: 20 }}
                    tintColor={item.color}
                  />
                </RoundIcon>
                <ThemedText weight="semibold" type="subTitle">
                  {capitalizeFirstLetter(item.label)}
                </ThemedText>
              </View>
              <ThemedText
                color={selectedTab === "expense" ? "error" : "success"}
                weight="semibold"
              >
                {`${selectedTab === "expense" ? "- " : "+ "}${formatINR(
                  Number(item.value)
                )}`}
              </ThemedText>
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
