//embedded components section
import React, { useEffect, useState } from "react";

//custom components section
import AppScreen from "../../components/AppScreen/AppScreen";
import systemConfiguration from "../../configuration/systemConfiguration";
import axiosInstance from "../../utilities/axiosInstance";
import httpErrorHandler from "../../utilities/httpErrorHandler";
import DowntimeNotExists from "./DowntimeNotExists";
import showToast from "../../utilities/showToast";
import DowntimeExists from "./DowntimeExists";

const DownTimeActiveScreen = ({ navigation }) => {
  const [activeDowntime, setActiveDowntime] = useState();
  const [downtimes, setDowntimes] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const getDowntimesRequest = () => {
    axiosInstance
      .get(`/downtimes/line/${systemConfiguration.lineId.value}`)
      .then((response) => {
        setDowntimes(response.data);
      })
      .catch((error) => {
        httpErrorHandler(error);
      })
      .finally(() => setDataLoaded(true));
  };

  const createNewDowntimeRequest = (newDownTime) => {
    if (newDownTime.length > 0) {
      axiosInstance
        .post(`/downtimes-executed/line/${systemConfiguration.lineId.value}`, {
          content: newDownTime,
        })
        .then((response) => {
          showToast("Stworzono nowy postój produkcyjny.");
          getActiveDowntimeRequest();
        })
        .catch((error) => {
          httpErrorHandler(error);
        });
    } else showToast("Zdefiniowany przestój produkcyjne jest za krótki.");
  };

  const getActiveDowntimeRequest = () => {
    setDataLoaded(false);
    axiosInstance
      .get(`/downtimes-executed/status/open/line/${systemConfiguration.lineId.value}`)
      .then((response) => {
        setActiveDowntime(response.data);
      })
      .catch((error) => {
        if (error.response.status !== 404) httpErrorHandler(error);
        else setActiveDowntime(null);
      })
      .finally(() => setDataLoaded(true));
  };

  const closeDowntimeRequest = () => {
    axiosInstance
      .patch(`/downtimes-executed/status/close/${activeDowntime.id}`)
      .then((response) => {
        showToast("Przestój zakończony z powodzeniem.");
        navigation.navigate("DowntimesListScreen");
      })
      .catch((error) => {
        httpErrorHandler(error);
      });
  };

  useEffect(() => {
    setDataLoaded(false);

    return navigation.addListener("focus", () => {
      getDowntimesRequest();
      getActiveDowntimeRequest();
    });
  }, []);

  return (
    <AppScreen title="Przestoje produkcyjne" dataLoaded={dataLoaded}>
      {!activeDowntime && (
        <DowntimeNotExists
          downtimes={downtimes}
          saveDowntime={createNewDowntimeRequest}
        />
      )}

      {activeDowntime && (
        <DowntimeExists
          downtime={activeDowntime}
          refresh={getActiveDowntimeRequest}
          closeDowntime={closeDowntimeRequest}
        />
      )}
    </AppScreen>
  );
};

export default DownTimeActiveScreen;
