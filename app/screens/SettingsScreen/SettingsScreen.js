import React, { useEffect, useState } from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import AppIndicator from "../../components/AppIndicator/AppIndicator";

import AppInfoCard from "../../components/AppInfoCard/AppInfoCard";
import AppScreen from "../../components/AppScreen/AppScreen";
import systemConfiguration from "../../configuration/systemConfiguration";
import axiosInstance, {
  configureInterceptors, uninterceptedAxiosInstance,
} from "../../utilities/axiosInstance";
import httpErrorHandler from "../../utilities/httpErrorHandler";
import showToast from "../../utilities/showToast";
import SettingsLoginPwdForm from "./SettingsLoginPwdForm";
import SettingsSelectForm from "./SettingsSelectForm";

const SettingsScreen = ({ navigation }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [lineId, setLineId] = useState(0);
  const [lineName, setLineName] = useState("");
  const [lineType, setLineType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lines, setLines] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const minDataLength = 3;
  const dataValidated =
    newUsername.length >= minDataLength && newPassword.length >= minDataLength;

  const buildDataForFlatList = () => {
    function DataRow(title, value) {
      this.title = title;
      this.value = value;
    }

    return [
      new DataRow("Id:", lineId),
      new DataRow("Nazwa linii:", lineName),
      new DataRow("Dział:", lineType),
      new DataRow("Login:", username),
      new DataRow("Hasło:", password),
    ];
  };

  const readConfigurationData = () => {
    setLineId(systemConfiguration.lineId.value);
    setLineName(systemConfiguration.lineName.value);
    setLineType(systemConfiguration.lineType.value);
    setUsername(systemConfiguration.username.value);
    setPassword(systemConfiguration.password.value);
  };

  const saveConfigurationLine = async (line) => {
    setLineId(line.id);
    setLineName(line.name);
    setLineType(line.productionType);

    await systemConfiguration.lineId.saveData(line.id.toString());
    await systemConfiguration.lineName.saveData(line.name);
    await systemConfiguration.lineType.saveData(line.productionType);
    systemConfiguration.readAll();
  };

  const saveConfigurationAuth = async () => {
    if (dataValidated) {
      setUsername(newUsername);
      setPassword(newPassword);
      await systemConfiguration.username.saveData(newUsername);
      await systemConfiguration.password.saveData(newPassword);
      await systemConfiguration.readAll();
      configureInterceptors();
    }
  };
  const selectLine = (lineName) => {
    const line = lines.find((line) => line.name === lineName);
    if (line) saveConfigurationLine(line);
    else showToast(`Linia ${lineName} nie istnieje`);
  };

  const getLines = () => {
    axiosInstance
      .get("/lines")
      .then((response) => {
        setLines(response.data);
      })
      .catch((error) => {
        httpErrorHandler(error);
      })
      .finally(() => setDataLoaded(true));
  };

  const updateAuthData = () => {
    uninterceptedAxiosInstance()
      .post("/appusers/login", { username: newUsername, password: newPassword })
      .then(async (response) => {
        saveConfigurationAuth();
      })
      .catch((error) => {
        httpErrorHandler(error);
      });
  };

  useEffect(async () => {
    const navSubscription = navigation.addListener("focus", () => {
      readConfigurationData();
      getLines();
    });

    return navSubscription;
  }, []);

  return (
    <AppScreen
      style={styles.container}
      title="Ustawienia systemu"
      dataLoaded={dataLoaded}
    >
      <AppInfoCard title="Konfiguracja systemu" data={buildDataForFlatList()} />
      <SettingsSelectForm
        value={lineName}
        values={lines.map((line) => line.name)}
        onAssign={selectLine}
      />
      <SettingsLoginPwdForm
        minDataLength={minDataLength}
        username={newUsername}
        setUsername={setNewUsername}
        password={newPassword}
        setPassword={setNewPassword}
        dataValidated={dataValidated}
        onPress={updateAuthData}
        dataValidated={dataValidated}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default SettingsScreen;
