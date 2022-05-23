import React, { useEffect, useState  } from "react";
import { StyleSheet } from "react-native";
import AppRefreshButton from "../../components/AppRefreshButton/AppRefreshButton";

import AppScreen from "../../components/AppScreen/AppScreen";
import systemConfiguration from "../../configuration/systemConfiguration";
import axiosInstance from "../../utilities/axiosInstance";
import httpErrorHandler from "../../utilities/httpErrorHandler";
import LineInfoCard from "./LineInfoCard";

const LineInfoScreen = ({ navigation }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [line, setLine] = useState({});

  const getLine = () => {
    setDataLoaded(false);
    axiosInstance
      .get(`/lines/${systemConfiguration.lineId.value}`)
      .then((response) => {
        setLine(response.data);
      })
      .catch((error) => {
        httpErrorHandler(error);
      })
      .finally(() => setDataLoaded(true));
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getLine();
    });
  }, []);
  return (
    <AppScreen
      style={styles.container}
      title="Informacje o linii"
      dataLoaded={dataLoaded}
    >
      <LineInfoCard line={line} />
      <AppRefreshButton style={{marginTop: 100}} onPress={getLine} />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
export default LineInfoScreen;
