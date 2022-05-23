import React, { useState, useEffect } from "react";
import { Text } from "react-native";

import AppScreen from "../../components/AppScreen/AppScreen";
import BreakdownExists from "./BreakdownExists";
import axiosInstance from "./../../utilities/axiosInstance";
import systemConfiguration from "../../configuration/systemConfiguration";
import httpErrorHandler from "../../utilities/httpErrorHandler";
import showToast from "../../utilities/showToast";
import BreakdownNotExists from "./BreakdownNotExists";

const BreakdownActiveScreen = ({ navigation }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [breakdown, setBreakdown] = useState();

  const getActiveBreakdownRequest = () => {
    setBreakdown(null);
    setDataLoaded(false);
    axiosInstance
      .get(`/breakdowns/status/active/${systemConfiguration.lineId.value}`)
      .then((response) => {
        if (response.data.length > 0) setBreakdown(response.data[0]);
      })
      .catch((error) => {
        if (error.response.status !== 404) httpErrorHandler(error);
      })
      .finally(() => setDataLoaded(true));
  };

  const patchMaintenanceArrivedRequest = (umupNumber) => {
    axiosInstance
      .patch(
        `/breakdowns/status/progress/${breakdown.id}`,
        {},
        { params: { umup: umupNumber } }
      )
      .then((response) => {
        getActiveBreakdownRequest();
      })
      .catch((error) => httpErrorHandler(error));
  };

  const patchCloseBreakdwonRequest = () => {
    axiosInstance
      .patch(`/breakdowns/status/close/${breakdown.id}`, {})
      .then((response) => {
        showToast("Awaria zakończona z powodzeniem");
        navigation.navigate("BreakdownListScreen")
      })
      .catch((error) => httpErrorHandler(error));
  };

  const createNewBreakdownRequest = (content) => {
    axiosInstance
      .post(`/breakdowns/line/${systemConfiguration.lineId.value}`, { content })
      .then((response) => {
        showToast("Awaria została utworzona.");
        getActiveBreakdownRequest();
      })
      .catch((error) => httpErrorHandler(error));
  };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      getActiveBreakdownRequest();
    });
  }, []);

  return (
    <AppScreen title="Awarie" dataLoaded={dataLoaded}>
      {breakdown && (
        <BreakdownExists
          breakdown={breakdown}
          maintenanceArrived={patchMaintenanceArrivedRequest}
          getBreakdown={getActiveBreakdownRequest}
          closeBreakdown={patchCloseBreakdwonRequest}
        />
      )}
      {!breakdown && <BreakdownNotExists createNewBreakdown={createNewBreakdownRequest}/>}
    </AppScreen>
  );
};

export default BreakdownActiveScreen;
