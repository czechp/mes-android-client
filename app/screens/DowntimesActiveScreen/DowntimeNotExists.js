import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { fontLargerStyles, sectionStyle } from "../../configuration/styles";
import AppText from "../../components/AppText/AppText";
import colors from "../../configuration/colors";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import AppSeparator from "../../components/AppSeparator/AppSeparator";
import AppButton from "../../components/AppButton/AppButton";

const DowntimeNotExists = ({ downtimes = [], saveDowntime }) => {
  const [newDowntime, setNewDowntime] = useState("");

  useEffect(() => {
    setNewDowntime(downtimes[0] ? downtimes[0].content : "Brak");
  }, [downtimes]);

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <DowntimeNotExistsList
        downtimeList={downtimes}
        newDowntimeOnAssign={setNewDowntime}
      />
      <DowntimeNotExistsResult
        newDowntime={newDowntime}
        saveDowntime={saveDowntime}
      />
    </View>
  );
};

const DowntimeNotExistsList = ({ downtimeList = [], newDowntimeOnAssign }) => {
  return (
    <View style={{ ...sectionStyle, flex: 0.7 }}>
      {downtimeList.length > 0 && (
        <FlatList
          data={downtimeList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DowntimeRow
              downtime={item}
              newDowntimeOnAssign={newDowntimeOnAssign}
            />
          )}
        />
      )}

      {downtimeList.length === 0 && (
        <AppText
          style={{
            ...fontLargerStyles,
            color: colors.danger,
            textAlign: "center",
          }}
        >
          Brak zdefiniowanych przestojów produkcyjnych
        </AppText>
      )}
    </View>
  );
};

const DowntimeNotExistsResult = ({ newDowntime, saveDowntime }) => {
  const createDowntimeOnPress = () => {
    Alert.alert(
      "Zapisywanie noweg przestoju produkcyjnego",
      "Czy napewno chcesz zapisać nowy przestój produkcyjny?",
      [
        {
          text: "Zapisz",
          onPress: () => {
            saveDowntime(newDowntime);
          },
        },
        {
          text: "Anuluj",
          onPress: () => {},
        },
      ]
    );
  };
  return (
    <View style={styles.resultSection}>
      <AppText style={styles.choosenDowtimeText}>Wybrany przestój:</AppText>
      <AppText style={{ ...styles.choosenDowtimeText }}>{newDowntime}</AppText>
      <AppButton
        title="Zapisz"
        color="success"
        onPress={createDowntimeOnPress}
      />
    </View>
  );
};

const DowntimeRow = ({ downtime, newDowntimeOnAssign }) => {
  return (
    <View style={{ paddingTop: 20 }}>
      <View style={styles.downtimeRow}>
        <AppText
          style={{ textAlign: "left", ...fontLargerStyles, width: "60%" }}
        >
          {downtime.content}
        </AppText>

        <AppButton
          color="success"
          title="Wybierz"
          onPress={() => {
            newDowntimeOnAssign(downtime.content);
          }}
          style={{ width: "30%" }}
        />
      </View>
      <AppSeparator style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  downtimeRow: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  resultSection: {
    justifyContent: "space-between",
    flex: 0.3,
  },

  choosenDowtimeText: {
    textAlign: "center",
    ...fontLargerStyles,
  },
});

export default DowntimeNotExists;
