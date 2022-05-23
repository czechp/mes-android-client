import React, { useEffect, useState  } from "react";

import AppScreen from "../../components/AppScreen/AppScreen";
import systemConfiguration from "../../configuration/systemConfiguration";
import axiosInstance from "../../utilities/axiosInstance";
import httpErrorHandler from "../../utilities/httpErrorHandler";
import showToast from "../../utilities/showToast";
import ReportActiveExists from "./ReportActiveExists";
import ReportActiveNotExists from "./ReportActiveNotExists";

const ReportActiveScreen = ({ navigation }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [activeReportExists, setActiveReportExsits] = useState(false);
  const [activeReport, setActiveReport] = useState({});

  const createActiveReportRequest = () => {
    setDataLoaded(false);
    axiosInstance
      .post(`reports/${systemConfiguration.lineId.value}`)
      .then((response) => {
        showToast("Nowy raport został stworzony.");
        getActiveReportRequest();
      })
      .catch((error) => {
        httpErrorHandler(error);
      })
      .finally(() => setDataLoaded(true));
  };

  const getActiveReportRequest = () => {
    setDataLoaded(false);
    axiosInstance
      .get(`/reports/status/active/${systemConfiguration.lineId.value}`)
      .then((response) => {
        setActiveReport(response.data);
        setActiveReportExsits(true);
      })
      .catch((error) => {
        if (error.response.status === 404) setActiveReportExsits(false);
        else httpErrorHandler(error);
      })
      .finally(() => setDataLoaded(true));
  };

  const closeReportRequest = (trashAmount) => {
    axiosInstance
      .patch(
        `/reports/status/close/${activeReport.id}`,
        {},
        {
          params: {
            trashAmount: trashAmount,
          },
        }
      )
      .then((repsone) => {
        setActiveReportExsits(false);
        getActiveReportRequest();
        showToast("Raport zamkniety z powodzeniem.");
      })
      .catch((error) => {
        httpErrorHandler(error);
      })
      .finally(() => setDataLoaded(true));
  };

  useEffect(() => {
    const navSubscription = navigation.addListener("focus", () => {
      getActiveReportRequest();
    });

    return navSubscription;
  }, []);
  return (
    <AppScreen title="Aktualny raport" dataLoaded={dataLoaded}>
      {activeReportExists && (
        <ReportActiveExists
          activeReport={activeReport}
          reloadReport={getActiveReportRequest}
          closeReportRequest={closeReportRequest}
        />
      )}
      {!activeReportExists && (
        <ReportActiveNotExists
          createReportOnClick={createActiveReportRequest}
        />
      )}
    </AppScreen>
  );
};

export default ReportActiveScreen;
