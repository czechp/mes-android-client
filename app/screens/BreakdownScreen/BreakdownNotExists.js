import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

import AppButton from "../../components/AppButton/AppButton";
import AppForm from "../../components/AppForm/AppForm";
import AppTextInput from "../../components/AppTextInput/AppTextInput";
import showToast from "../../utilities/showToast";

const BreakdownNotExists = ({ createNewBreakdown }) => {
  const BREKADOWN_COTENT_LENGTH = 5;
  const [breakdownContent, setBreakdownContent] = useState("");

  const createNewBreakdownOnPress = () => {
    if (breakdownContent.length >= BREKADOWN_COTENT_LENGTH) {
      Alert.alert(
        "Potwierdzenie stworzenia nowej awarii",
        "Czy na pewno chcesz stworzyć nową awarie?",
        [
          {
            text: "Stwórz",
            onPress: () => {
              createNewBreakdown(breakdownContent);
            },
          },
          {
            text: "Anuluj",
            onPress: () => {},
          },
        ]
      );
    } else
      showToast(
        `Zawartość awarii musi mieć co najmniej ${BREKADOWN_COTENT_LENGTH} znaków`
      );
  };
  return (
    <View style={styles.container}>
      <AppForm>
        <AppTextInput
          title="Treść awarii:"
          value={breakdownContent}
          onChangeText={setBreakdownContent}
          placeholder="Wpisz treść awarii"
          minLength={BREKADOWN_COTENT_LENGTH}
        />
        <AppButton
          title="Utwórz nową awarie"
          onPress={() => createNewBreakdownOnPress()}
        />
      </AppForm>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BreakdownNotExists;
