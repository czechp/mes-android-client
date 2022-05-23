import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import AppRefreshButton from "../../components/AppRefreshButton/AppRefreshButton";

import AppScreen from "../../components/AppScreen/AppScreen";
import AppText from "../../components/AppText/AppText";
import colors from "../../configuration/colors";
import {
  fontLargerStyles,
  fontSmallerStyles,
} from "../../configuration/styles";
import systemConfiguration from "../../configuration/systemConfiguration";
import axiosInstance from "../../utilities/axiosInstance";
import httpErrorHandler from "../../utilities/httpErrorHandler";
import showToast from "../../utilities/showToast";
import QualityControlAdd from "./QualityControlAdd";

const QualityControlAddScreen = ({ navigation }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [report, setReport] = useState();
  const [productProperties, setProductProperties] = useState();
  const [user, setUser] = useState();
  const [controlResult, setControlResult] = useState([]);

  const getActiveReport = () => {
    setDataLoaded(false);
    setReport(null);
    axiosInstance
      .get(`/reports/status/active/${systemConfiguration.lineId.value}`)
      .then((response) => {
        setReport(response.data);
        getProductRequest(response.data.productName);
      })
      .catch((error) => {
        httpErrorHandler(error, "Brak aktywnego raportu.");
      })
      .finally(() => {
        setDataLoaded(true);
      });
  };

  const getProductRequest = (productName) => {
    axiosInstance
      .get(`/products/name`, { params: { productName } })
      .then((response) => {
        setProductProperties(response.data.productProperties);
      })
      .catch((error) => {
        httpErrorHandler(error);
      });
  };

  const getUserRequest = () => {
    axiosInstance
      .get(`/users/line/${systemConfiguration.lineId.value}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) setUser(null);
        else httpErrorHandler(error);
      });
  };

  const addToControlResult = (id, qualityOK) => {
    const element = productProperties.find((item) => item.id === id);
    if (element) {
      const inspectionRow = { content: element.content, qualityOK };
      setControlResult([...controlResult, inspectionRow]);
      setProductProperties(productProperties.filter((item) => item.id !== id));
    }
  };

  const saveQualityControlOnPress = () => {
    Alert.alert(
      "Zapisywanie kontroli jakości",
      "Czy na pewno chcesz zapisać kontrole jakości?",
      [
        {
          text: "Tak",
          onPress: () => {
            saveQualityControlRequest();
          },
        },
        { text: "Anuluj", style: "cancel" },
      ]
    );
  };

  const saveQualityControlRequest = () => {
    axiosInstance
      .post(
        `/quality-controls/line/${systemConfiguration.lineId.value}`,
        controlResult
      )
      .then((response) => {
        showToast("Kontrola jakości zapisana");
        navigation.navigate("QualityControlCurrentList");
      })
      .catch((error) => {
        httpErrorHandler(error);
      });
  };

  useEffect(() => {
    const navSub = navigation.addListener("focus", () => {
      getActiveReport();
      getUserRequest();
      setControlResult([]);
    });
    return navSub;
  }, []);

  return (
    <AppScreen title={"Dodaj"} dataLoaded={dataLoaded}>
      {report && user && productProperties && (
        <QualityControlAdd
          user={user}
          productProperties={productProperties}
          addToControlResult={addToControlResult}
          controlResult={controlResult}
          saveOnPress={saveQualityControlOnPress}
        />
      )}
      <ConditionsNotComplete
        user={user}
        report={report}
        refresh={() => {
          getActiveReport();
          getUserRequest();
        }}
      />
    </AppScreen>
  );
};

const ConditionsNotComplete = ({ user, report, refresh }) => {
  return (
    <>
      {(!user || !report) && (
        <View style={styles.elementNotExistsContainer}>
          <AppText style={styles.elementNotExistText}>
            Nie można wykonać kontroli jakości.
          </AppText>
          {!user && (
            <>
              <AppText style={styles.elementNotExistText}>
                Nie wykryto użytkownika.
              </AppText>
              <AppText
                style={{ ...styles.elementNotExistText, ...fontSmallerStyles }}
              >
                (Zbiż karte do czytnika).
              </AppText>
            </>
          )}
          {!report && (
            <AppText style={styles.elementNotExistText}>
              Brak aktualnie otwartego raportu.
            </AppText>
          )}
          <AppRefreshButton style={{ marginTop: 100 }} onPress={refresh} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  elementNotExistsContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  elementNotExistText: {
    color: colors.danger,
    marginTop: 10,
    ...fontLargerStyles,
  },
});
export default QualityControlAddScreen;
