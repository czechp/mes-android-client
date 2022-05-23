import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AppInfoCard from "../../components/AppInfoCard/AppInfoCard";

import AppScreen from "../../components/AppScreen/AppScreen";
import AppText from "../../components/AppText/AppText";
import colors from "../../configuration/colors";
import { fontLargerStyles } from "../../configuration/styles";
import systemConfiguration from "../../configuration/systemConfiguration";
import axiosInstance from "../../utilities/axiosInstance";
import httpErrorHandler from "../../utilities/httpErrorHandler";

const RawMaterialListScreen = ({ navigation }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [reportExists, setReportExists] = useState(false);
  const [rawMaterials, setRawMaterials] = useState([]);

  const getUsedMaterialRequest = () => {
    setDataLoaded(false);
    const URL = `/reports/status/active/${systemConfiguration.lineId.value}`;
    axiosInstance
      .get(URL)
      .then((response) => {
        setReportExists(true);
        setRawMaterials(response.data.materials);
      })
      .catch((error) => {
        if (error.response.status === 404) setReportExists(false);
        httpErrorHandler(error);
      })
      .finally(() => {
        setDataLoaded(true);
      });
  };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      //TODO: remove timeout
      setTimeout(() => {
        getUsedMaterialRequest();
      }, 1000);
    });
  }, []);

  return (
    <AppScreen title="Pobrane surowce" dataLoaded={dataLoaded}>
      {!reportExists && <ReportDoesNotExist />}
      {reportExists && <RawMaterialList rawMaterials={rawMaterials} />}
    </AppScreen>
  );
};

const RawMaterialList = ({ rawMaterials }) => {
  return (
    <View style={styles.rawMaterialListContainer}>
      <FlatList
        data={rawMaterials}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RawMaterialRow material={item} />}
      />
    </View>
  );
};

const RawMaterialRow = ({ material }) => {
  return (
    <AppInfoCard
      data={[
        { title: "Id:", value: material.id },
        { title: "Erp Id:", value: material.systemId },
        { title: "Nazwa:", value: material.name },
        { title: "Dostawca:", value: material.provider },
        { title: "Nr. partii:", value: material.partNr },
        { title: "Data:", value: material.date },
        

        
      ]}
    />
  );
};

const ReportDoesNotExist = () => {
  return (
    <View style={styles.reportNotExistsContainer}>
      <AppText style={styles.reportNotExistsText}>Raport nie istnieje</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  reportNotExistsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reportNotExistsText: {
    ...fontLargerStyles,
    color: colors.danger,
  },
  rawMaterialListContainer: {
    flex: 1,
  },
});
export default RawMaterialListScreen;
