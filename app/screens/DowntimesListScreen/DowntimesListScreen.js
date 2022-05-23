//embedded imports
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

//custom imports
import AppScreen from "../../components/AppScreen/AppScreen";
import systemConfiguration from "../../configuration/systemConfiguration";
import axiosInstance from "../../utilities/axiosInstance";
import httpErrorHandler from "../../utilities/httpErrorHandler";
import { DowntimeExistsInfo } from "../DowntimesActiveScreen/DowntimeExists";

const DowntimesListScreen = ({ navigation }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [downtimes, setDowntimes] = useState([]);

  const getDowntimesRequest = () => {
    axiosInstance
      .get(`/reports/status/active/${systemConfiguration.lineId.value}`)
      .then((response) => {
        setDowntimes(response.data.downtimes);
      })
      .catch((error) => httpErrorHandler(error))
      .finally(() => setDataLoaded(true));
  };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      getDowntimesRequest();
    });
  }, []);

  return (
    <AppScreen title="Lista przestojów produkcyjnych" dataLoaded={dataLoaded}>
      <FlatList
        data={downtimes}
        keyExtractor={(d) => d.id}
        renderItem={({ item }) => (
          <DowntimeExistsInfo
            downtime={item}
            title={item.content}
          />
        )}
      />
    </AppScreen>
  );
};

export default DowntimesListScreen;
