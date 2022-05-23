import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import { fontLargerStyles } from "../../configuration/styles";
import AppSeparator from "../AppSeparator/AppSeparator";
import AppText from "../AppText/AppText";

const AppTitle = ({ title }) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>
      <AppSeparator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    ...fontLargerStyles,
  },
});

export default AppTitle;
