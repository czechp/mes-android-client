import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../../components/AppText/AppText";
import dateFormatter from "../../utilities/dateFormatter";
import translator from "../../utilities/translators";

import colors from "../../configuration/colors";
import AppProgressBar from "../../components/AppProgressBar/AppProgressBar";

const ReportCard = ({ report }) => {
  const productionStateColor = determineProductionColor(    
    report.statistics.currentProductionPercent,
    report.statistics.expectedProductionPercent
  );


  return (
    <View style={styles.container}>
      <ReportInfoRow info={{ title: "Id:", value: report.id }} />
      <ReportInfoRow info={{ title: "Produkt:", value: report.productName }} />
      <ReportInfoRow
        info={{
          title: "Zmiana:",
          value: translator.workShift(report.reportWorkShift),
        }}
      />
      <ReportInfoRow
        info={{ title: "Wydajność zmianowa:", value: report.targetAmount }}
      />
      <ReportInfoRow
        info={{ title: "Utworzony przez:", value: report.createOperator }}
      />
      <ReportInfoRow
        info={{
          title: "Data utworzenia:",
          value: dateFormatter(report.creationDate),
        }}
      />
      <ReportInfoRow
        info={{
          title: "Czas pracy:",
          value: `${report.statistics.workingTime.hours} h ${report.statistics.workingTime.minutes} min`,
        }}
      />
      <ReportProgressBars
        expectProduction={{
          percent: report.statistics.expectedProductionPercent,
          value: report.statistics.expectedProduction,
        }}
        currentProduction={{
          percent: report.statistics.currentProductionPercent,
          value: report.amount,
        }}
        currentColor={productionStateColor}
      />
    </View>
  );
};

const ReportInfoRow = ({ info }) => {
  return (
    <View style={styles.row}>
      <AppText>{info.title}</AppText>
      <AppText style={styles.rowInfoText}>{info.value}</AppText>
    </View>
  );
};

const ReportProgressBars = ({
  expectProduction,
  currentProduction,
  currentColor,
}) => {
  return (
    <View style={styles.progressBarsContainer}>
      <AppText style={{ textAlign: "center" }}>Produkcja</AppText>
      <View style={styles.progressBars}>
        <AppProgressBar
          title="Oczekiwana"
          progress={expectProduction.percent}
          value={`${expectProduction.value} szt.`}
        />
        <AppProgressBar
          title="Rzeczywista"
          progress={currentProduction.percent}
          value={`${currentProduction.value} szt.`}
          color={currentColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
    alignItems: "center",
  },
  rowInfoText: {
    fontWeight: "bold",
    textAlign: "right",
  },
  progressBarsContainer: {
    width: "100%",
  },
  progressBars: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

const determineProductionColor = (currentPercent, expectPercent) => {

    const percentDifference = expectPercent - currentPercent;
    if(percentDifference < 5)
      return colors.success;
    else if(percentDifference >=5 && percentDifference < 10)
      return colors.warning;
    else
      return colors.danger;
};

export default ReportCard;
