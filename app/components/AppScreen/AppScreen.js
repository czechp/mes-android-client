import React from "react";
import { Button, StatusBar, StyleSheet, View } from "react-native";

import colors from "../../configuration/colors";
import AppSeparator from "../AppSeparator/AppSeparator";
import AppText from "../AppText/AppText";
import systemConfiguration from "../../configuration/systemConfiguration";
import { useNavigation } from "@react-navigation/core";
import AppButton from "../AppButton/AppButton";
import AppIndicator from "../AppIndicator/AppIndicator";
import { fontLargerStyles } from "../../configuration/styles";

const AppScreen = ({ title, children, style = [], dataLoaded = true }) => {
  return (
    <View style={styles.container}>
      {title && <AppTitle title={title} />}
      {dataLoaded && (
        <View style={[styles.contentContainer, style]}>{children}</View>
      )}
      {!dataLoaded && <AppIndicator />}
    </View>
  );
};

const AppTitle = ({ title }) => {
  const navigation = useNavigation();
  const lineInfo = `${systemConfiguration.lineName.value}`;

  return (
    <View style={styles.title}>
      <View style={styles.titleSection}>
        <AppButton
          title="Menu"
          style={styles.navigateButton}
          onPress={() => navigation.navigate("MenuScreen")}
        />
        <AppText style={styles.titleText}>{title}</AppText>
        <AppText style={{ ...styles.titleText, width: "20%" }}>
          {lineInfo}
        </AppText>
      </View>
      <AppSeparator style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    width: "100%",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    alignItems: "center",
    marginVertical: 30,
  },
  separator: {
    marginVertical: 10,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  titleText: {
    ... fontLargerStyles,
    textAlign: "center",
  },
  contentContainer: {
    width: "100%",
    flex: 1,
  },

  navigateButton: {
    width: "20%",
    marginBottom: 0,
  },
});

export default AppScreen;
