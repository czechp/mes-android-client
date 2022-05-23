import React, { PureComponent } from "react";
import { Alert, StyleSheet, View } from "react-native";

import AppButton from "../../components/AppButton/AppButton";
import AppText from "../../components/AppText/AppText";
import { fontLargerStyles } from "../../configuration/styles";

const ReportActiveNotExists = ({ createReportOnClick }) => {
  const createButtonOnClick = () => {
    Alert.alert(
      "Tworzenie nowego raportu",
      "Czy na pewno chcesz stworzyć nowy raport",
      [
        {
          text: "Stwórz raport",
          onPress: () => {createReportOnClick()},
        },
        {
          text: "Anuluj",
          onPress: () => {},
        },
      ]
    );
  };

  return (
    <View style={styles.cotainer}>
      <AppText style={styles.text}>Brak aktywnego raportu</AppText>
      <AppButton
        style={styles.button}
        onPress={createButtonOnClick}
        title="Stwórz raport"
        color="success"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    ...fontLargerStyles,
  },
  button: {
    marginTop: 50,
  },
});

export default ReportActiveNotExists;
