import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

import ReportCard from "./ReportCard";
import ReportActiveCloseForm from "./ReportActiveCloseForm";
import AppRefreshButton from "../../components/AppRefreshButton/AppRefreshButton";

const ReportActiveExists = ({
  activeReport,
  reloadReport,
  closeReportRequest,
}) => {
  return (
    <View style={styles.container}>
      <ReportCard report={activeReport} />
      <ReportActiveCloseForm closeReportOnClick={closeReportRequest} />
      <View style={styles.refreshButtonContainer}>
        <AppRefreshButton style={styles.refreshButton} onPress={reloadReport} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  refreshButton: {
    width: "30%",
  },
  refreshButtonContainer:{
      width: "100%",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      marginBottom: 100

  }

});
export default ReportActiveExists;
