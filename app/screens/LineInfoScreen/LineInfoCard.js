import React, { PureComponent } from "react";

import { StyleSheet, View } from "react-native";
import AppText from "../../components/AppText/AppText";
import colors from "../../configuration/colors";
import {
  colorByLineState,
  colorBySystemStatus,
  fontLargerStyles,
  fontSmallerStyles,
} from "../../configuration/styles";
import translator from "../../utilities/translators";

const LineInfoCard = ({ line = {} }) => {
  return (
    <View style={styles.container}>
      <AppText style={fontSmallerStyles}>{`Id: ${line.id}`}</AppText>
      <LineInfoRow data={{ title: "Nazwa linii", value: line.name }} />
      <LineInfoRow
        data={{
          title: "Dział",
          value: translator.productionType(line.productionType),
        }}
      />
      <LineInfoRow data={{ title: "Produkt:", value: line.productName }} />
      <LineInfoRow data={{ title: "Operator:", value: line.operator ? line.operator: "Brak" }} />
      <LineInfoRow
        data={{
          title: "Stan linii:",
          value: translator.lineStatus(line.lineStatus),
        }}
        valueColor={colorByLineState(line.lineStatus)}
      />
      <LineInfoRow
        data={{
          title: "System monitorowania produkcji: ",
          value: line.opcUaCommunicationError ? "Wyłączony" : "Włączony",
        }}
        valueColor={colorBySystemStatus(line.opcUaCommunicationError)}
      />
            <LineInfoRow
        data={{
          title: "System monitorowania operatora: ",
          value: line.rfidReaderError ? "Wyłączony" : "Włączony",
        }}
        valueColor={colorBySystemStatus(line.rfidReaderError)}
      />
    </View>
  );
};

const LineInfoRow = ({ data = {}, valueColor = colors.primary }) => {
  return (
    <View style={[styles.row]}>
      <AppText style={styles.titleText}>{data.title}</AppText>
      <AppText style={{ ...styles.valueText, color: valueColor }}>
        {data.value}
      </AppText>
    </View>
  );
};

const styles = {
  container: {
    width: "100%",
  },
  row: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  titleText: {},
  valueText: {
    ...fontLargerStyles,
  },
};

export default LineInfoCard;
