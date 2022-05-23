import React, { PureComponent, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import AppScreen from "../../components/AppScreen/AppScreen";
import systemConfiguration from "../../configuration/systemConfiguration";
import axiosInstance from "../../utilities/axiosInstance";
import httpErrorHandler from "../../utilities/httpErrorHandler";
import AppText from "../../components/AppText/AppText";
import { fontSmallerStyles } from "../../configuration/styles";
import dateFormatter from "../../utilities/dateFormatter";
import AppSeparator from "../../components/AppSeparator/AppSeparator";
import translator from "../../utilities/translators";
import colors from "../../configuration/colors";

const ReportsClosedScreen = ({ navigation }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [reports, setReports] = useState([]);

  const getReportsRequest = () => {
    setDataLoaded(false);
    axiosInstance
      .get(`/reports/line/${systemConfiguration.lineId.value}`)
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        httpErrorHandler(error);
      })
      .finally(() => {
        setDataLoaded(true);
      });
  };

  useEffect(() => {
    const navSub = navigation.addListener("focus", () => {       
      getReportsRequest();
    });
    return navSub;
  }, []);

  return (
    <AppScreen title="Zapisane raporty" dataLoaded={dataLoaded}>
      <FlatList
        data={reports}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <ReportsClosedCard report={item} />}
      />
    </AppScreen>
  );
};

const ReportsClosedCard = ({ report }) => {
  return (
    <View style={{...styles.card, borderLeftColor: determineProductionColor(report)}}>
      <AppText style={styles.idText}>Id:{report.id}</AppText>
      <ReportClosedRow
        data={{ title: "Produkt:", value: report.productName }}
      />
      <ReportClosedRow
        data={{
          title: "Zmiana:",
          value: translator.workShift(report.reportWorkShift),
        }}
      />
      <ReportClosedRow
        data={{ title: "Utworzony przez:", value: report.createOperator }}
      />
      <ReportClosedRow
        data={{
          title: "Data utworzenia:",
          value: dateFormatter(report.creationDate),
        }}
      />
      <ReportClosedRow
        data={{ title: "Zamknięty przez:", value: report.finishOperator }}
      />

      <ReportClosedRow
        data={{
          title: "Data zamknięcia:",
          value: dateFormatter(report.finishDate),
        }}
      />

      <ReportClosedRow
        data={{
          title: "Czas pracy:",
          value: `${report.statistics.workingTime.hours} h  ${report.statistics.workingTime.minutes} min`,
        }}
      />
      <ProductionSection report={report} />
      <AppSeparator />
    </View>
  );
};

const ReportClosedRow = ({ data }) => {
  return (
    <View style={styles.row}>
      <AppText style={styles.titleText}>{data.title}</AppText>
      <AppText style={styles.valueText}>{data.value}</AppText>
    </View>
  );
};

const ProductionSection = ({ report }) => {
  return (
    <View>
      <AppText style={styles.productionTitle}>Produkcja:</AppText>
      <View style={styles.productionTileContainer}>
        <ProductionTile
          title="Rzeczywista"
          value={`${report.amount} szt.`}
          color={determineProductionColor(report)}
        />
        <ProductionTile
          title="Rzeczywista"
          value={`${parseFloat(
            report.statistics.currentProductionPercent
          ).toFixed(2)} %.`}
          color={determineProductionColor(report)}
        />
        <ProductionTile
          title="Oczekiwana"
          value={`${report.statistics.expectedProduction} szt.`}
        />
        <ProductionTile
          title="Oczekiwana"
          value={`${parseFloat(
            report.statistics.expectedProductionPercent
          ).toFixed(2)} %.`}
        />
        <ProductionTile
          title="Zmianowa"
          value={`${report.targetAmount} szt.`}
        />
      </View>
    </View>
  );
};

const ProductionTile = ({ title, value, color = colors.primary }) => {
  return (
    <View>
      <AppText
        style={{ ...fontSmallerStyles, textAlign: "center", color: color }}
      >
        {title}
      </AppText>
      <AppText style={{ textAlign: "center", color }}>{value}</AppText>
    </View>
  );
};

const determineProductionColor = (report) => {
  if (report) {
    const percentDifference =
      report.statistics.expectedProductionPercent -
      report.statistics.currentProductionPercent;
    if (percentDifference < 5) return colors.success;
    else if (percentDifference >= 5 && percentDifference < 10)
      return colors.warning;
    return colors.danger;
  }

  return colors.primary;
};

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: 15,
    padding: 20,
    width: "100%",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
    alignItems: "center",
  },
  idText: {
    ...fontSmallerStyles,
    textAlign: "left",
  },
  valueText: {
    textAlign: "right",
    ...fontSmallerStyles,
  },
  titleText: {
    ...fontSmallerStyles,
  },
  productionTitle: {
    textAlign: "center",
  },
  productionTileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ReportsClosedScreen;
