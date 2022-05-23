import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import AppButton from "../../components/AppButton/AppButton";
import AppForm from "../../components/AppForm/AppForm";
import AppTextInput from "../../components/AppTextInput/AppTextInput";
import showToast from "../../utilities/showToast";
import BreakdownCard from "./BreakdownCard";
import AppRefreshButton from "./../../components/AppRefreshButton/AppRefreshButton";

const BreakdownExists = ({ breakdown, maintenanceArrived, getBreakdown, closeBreakdown }) => {
  return (
    <View style={styles.container}>
      <BreakdownCard breakdown={breakdown} />

      {breakdown.breakdownStatus === "NEW" && (
        <BreakdownExistsStartForm maintenanceArrived={maintenanceArrived} />
      )}
      {breakdown.breakdownStatus === "IN_PROGRESS" && (
        <BreakdownExistsCloseForm closeBreakdown={closeBreakdown} />
      )}

      <AppRefreshButton
        style={{ width: "30%", marginBottom: 80 }}
        onPress={() => {
          getBreakdown();
        }}
      />
    </View>
  );
};

const BreakdownExistsStartForm = ({ maintenanceArrived }) => {
  const [umupNumber, setUmupNumber] = useState("");
  const confirmStartingOnClick = () => {
    if (umupNumber.length >= 3) {
      Alert.alert(
        "Potwierdzenie rozpoczęcia usuwania awarii",
        "Czy jesteś pewny, że chcesz potwierdzić rozpoczęcie usuwania awarii?",
        [
          {
            text: "Rozpocznij",
            onPress: () => {
              maintenanceArrived(umupNumber);
            },
          },
          {
            text: "Anuluj",
            onPress: () => {},
          },
        ]
      );
    } else showToast("Numer umup musi mieć przynajmniej 3 znaki!");
  };
  return (
    <AppForm style={styles.startForm}>
      <AppTextInput
        title="Wpisz nummer UMUP:"
        minLength={3}
        value={umupNumber}
        onChangeText={(text) => {
          setUmupNumber(text);
        }}
      />
      <AppButton
        title="Rozpocznij usuwanie awarii"
        onPress={() => confirmStartingOnClick()}
      />
    </AppForm>
  );
};

const BreakdownExistsCloseForm = ({ closeBreakdown }) => {
  const closeBreakdownOnPress = () => {
    Alert.alert(
      "Potwierdzenie zamknięcia awarii",
      "Czy na pewno chcesz zakończyć awarie?",
      [
        {
          text: "Zakończ",
          onPress: () => {
            closeBreakdown();
          },
        },
        { text: "Anuluj", onPress: () => {} },
      ]
    );
  };
  return (
    <AppForm style={{ width: "100%" }}>
      <AppButton
        title="Zakończ awarie"
        onPress={() => closeBreakdownOnPress()}
      />
    </AppForm>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  startForm: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
});

export default BreakdownExists;
