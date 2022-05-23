import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import AppScreen from "../../components/AppScreen/AppScreen";
import systemConfiguration from "../../configuration/systemConfiguration";
import axiosInstance from "../../utilities/axiosInstance";
import httpErrorHandler from "../../utilities/httpErrorHandler";
import { fontLargerStyles } from "../../configuration/styles";
import colors from "../../configuration/colors";
import AppText from "../../components/AppText/AppText";
import translator from "../../utilities/translators";
import dateFormmatter from "../../utilities/dateFormatter";
import { FlatList } from "react-native-gesture-handler";
import AppSeparator from "../../components/AppSeparator/AppSeparator";

const QualityControlCurrentList = ({ navigation }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [report, setReport] = useState();

  const getReportRequest = () => {
    setReport(null);
    setDataLoaded(false);

    axiosInstance
      .get(`/reports/status/active/${systemConfiguration.lineId.value}`)
      .then((response) => {
        setReport(response.data);
      })
      .catch((error) => httpErrorHandler(error, "Brak aktywnego raportu"))
      .finally(() => setDataLoaded(true));
  };

  useEffect(() => {
    const navSub = navigation.addListener("focus", () => {
      getReportRequest();
    });

    return navSub;
  }, []);
  return (
    <AppScreen title={"Wykonane kontrole jakości"} dataLoaded={dataLoaded}>
      {report && (
        <QualityControlsList qualityControls={report.qualityControls} />
      )}
      {!report && <ReportNotExists />}
    </AppScreen>
  );
};

const ReportNotExists = () => {
  return (
    <View style={styles.reportNotExistsContainer}>
      <AppText style={styles.reportDoesNotExistsText}>
        Brak aktualnie otwartego raportu
      </AppText>
    </View>
  );
};

const QualityControlsList = ({ qualityControls }) => {
  return (
    <View style={{ ...styles.fullWidth }}>
      <FlatList
        data={qualityControls}
        keyExtractor={(item, idx) => `${item.id}-${idx}`}
        renderItem={({ item }) => <QualityControlCard qualityControl={item} />}
      />
    </View>
  );
};

const QualityControlCard = ({ qualityControl }) => {
  const qualityOK = qualityControlOk(qualityControl);
  return (
    <View
      style={{
        ...styles.fullWidth,
        paddingLeft: 10,
        borderLeftWidth: 15,
        borderLeftColor: qualityControlOk(qualityControl)
          ? colors.success
          : colors.danger,
      }}
    >
      <InfoRow title="Id:" data={qualityControl.id} />
      <InfoRow title="Wykonał:" data={qualityControl.inspector} />
      <InfoRow
        title="Dział:"
        data={translator.userRole(qualityControl.inspectorRole)}
      />
      <InfoRow
        title="Utworzono: "
        data={dateFormmatter(qualityControl.creationDate)}
      />
      <QualityInspectionCard inspections={qualityControl.inspections} />
      <AppSeparator />
    </View>
  );
};

const InfoRow = ({ title, data, textStyle = {} }) => {
  return (
    <View style={styles.infoRow}>
      <AppText style={textStyle}>{title}</AppText>
      <AppText style={textStyle}>{data}</AppText>
    </View>
  );
};

const QualityInspectionCard = ({ inspections }) => {
  return (
    <View style={styles.fullWidth}>
      <AppText style={{ textAlign: "center" }}>Kontrola:</AppText>
      <FlatList
        data={inspections}
        keyExtractor={(item, idx) => `${item.id}-${idx}`}
        renderItem={({ item }) => (
          <InfoRow
            title={item.content}
            data={item.qualityOK ? "OK" : "NOK"}
            textStyle={{
              color: item.qualityOK ? colors.success : colors.danger,
            }}
          />
        )}
      />
    </View>
  );
};

const qualityControlOk = (qualityControl) =>
  !qualityControl.inspections.some((el) => el.qualityOK === false);

const styles = StyleSheet.create({
  reportNotExistsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reportDoesNotExistsText: {
    ...fontLargerStyles,
    color: colors.danger,
  },
  fullWidth: {
    width: "100%",
  },
  infoRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});
export default QualityControlCurrentList;
