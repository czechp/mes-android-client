//embedded import section
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import AppForm from "../../components/AppForm/AppForm";
//custom import section
import AppInfoCard from "../../components/AppInfoCard/AppInfoCard";
import AppRefreshButton from "../../components/AppRefreshButton/AppRefreshButton";
import dateFormatter from "../../utilities/dateFormatter";

const DowntimeExists = ({ downtime, refresh, closeDowntime }) => {
  const closeDowntimeOnPress = () => {
    Alert.alert(
      "Zamykanie przestoju produkcyjnego",
      "Czy na pewno chcesz zamknąć przestój produkcyjny?",
      [
        {
          text: "Zakończ",
          onPress: () => {
            closeDowntime();
          },
        },
        { text: "Anuluj", onPress: () => {} },
      ]
    );
  };

  return (
    <View style={styles.contaier}>
      <DowntimeExistsInfo downtime={downtime} />
      <AppForm style={{ marginTop: 70 }}>
        <AppButton title="Zakończ przestój" onPress={closeDowntimeOnPress} />
      </AppForm>
      <View style={styles.refreshButtonContainer}>
        <AppRefreshButton style={styles.refreshButton} onPress={refresh} />
      </View>
    </View>
  );
};

export const DowntimeExistsInfo = ({
  downtime,
  title = "Aktualny przestój",
}) => {
  return (
    <AppInfoCard
      title={title}
      data={[
        { title: "Id:", value: downtime.id },
        { title: "Stworzone przez: ", value: downtime.operatorName },
        {
          title: "Data utworzenia: ",
          value: dateFormatter(downtime.creationDate),
        },
        {
          title: "Data zakończenia: ",
          value: downtime.closeDate
            ? dateFormatter(downtime.closeDate)
            : "Postój w toku",
        },
        { title: "Przestój: ", value: downtime.content },
        { title: "Czas trwania: ", value: `${downtime.totalMinutes} min` },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  refreshButtonContainer: {
    position: "absolute",
    bottom: 150,
  },
});

export default DowntimeExists;
