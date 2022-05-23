import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { fontLargerStyles } from "../../configuration/styles";
import AppSeparator from "../AppSeparator/AppSeparator";
import AppText from "../AppText/AppText";

const AppInfoCard = ({ title, data = [] }) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}> {title} </AppText>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.title}-${item.value}-${index}`}
        renderItem={({ item }) => <AppInfoCardRow data={item} />}
      />
      <AppSeparator style={{ marginVertical: 20 }} />
    </View>
  );
};

const AppInfoCardRow = ({ data }) => {
  return (
    <View style={styles.infoRow}>
      <AppText>{data.title}</AppText>
      <AppText>{data.value}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 40,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    ...fontLargerStyles,
    textAlign: "center",
  },
});

export default AppInfoCard;
