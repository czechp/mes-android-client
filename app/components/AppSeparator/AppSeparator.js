import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../configuration/colors";

const AppSeparator = ({ style = [] }) => {
  return <View style={[styles.container, style]} />;
};

const styles = StyleSheet.create({
  container: {
    height: 2,
    width: "100%",
    backgroundColor: colors.primary,
    marginVertical: 10
  },
});

export default AppSeparator;
