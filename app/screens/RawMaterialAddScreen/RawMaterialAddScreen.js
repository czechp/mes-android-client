import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import AppButton from "../../components/AppButton/AppButton";
import AppInfoCard from "../../components/AppInfoCard/AppInfoCard";
import AppScreen from "../../components/AppScreen/AppScreen";
import AppTextInput from "../../components/AppTextInput/AppTextInput";
import systemConfiguration from "../../configuration/systemConfiguration";
import axiosInstance from "../../utilities/axiosInstance";
import httpErrorHandler from "../../utilities/httpErrorHandler";
import showToast from "../../utilities/showToast";

const RawMaterialAddScreen = ({ navigation }) => {
  const MIN_TEXT_LENGTH = 3;
  const [newMaterial, setNewMaterial] = useState({
    systemId: "",
    name: "",
    provider: "",
    partNr: "",
    date: "",
  });

  const [materials, setMaterials] = useState([]);

  const setNewMaterialFromTemplate = ({ systemId, name, provider }) => {
    setNewMaterial({
      ...newMaterial,
      systemId: systemId.toString(),
      name,
      provider,
    });
  };

  const clearForm = () => {
    setNewMaterial({
      systemId: "",
      name: "",
      provider: "",
      partNr: "",
      date: "",
    });
  };

  const formValidated = () => {
    const nameValidated = singleFieldFormValidated(newMaterial.name);
    const providerValidated = singleFieldFormValidated(newMaterial.provider);

    return nameValidated && providerValidated;
  };

  const singleFieldFormValidated = (text, length = MIN_TEXT_LENGTH) => {
    return text.length >= length;
  };

  const getMaterialsRequest = () => {
    axiosInstance
      .get(`/raw-materials/line/${systemConfiguration.lineId.value}`)
      .then((response) => {
        setMaterials(
          response.data.sort((el1, el2) => el1.name.localeCompare(el2.name))
        );
      })
      .catch((error) => httpErrorHandler(error));
  };

  const addNewMaterialRequest = (body) => {
    axiosInstance
      .post("/used-raw-materials", body)
      .then((response) => {
        showToast("Pobrany surowiec został dodany");
        clearForm();
      })
      .catch((error) => httpErrorHandler(error));
  };

  useEffect(() => {
    const navSub = navigation.addListener("focus", () => {
      getMaterialsRequest();
    });
    return navSub;
  }, []);

  return (
    <AppScreen title="Dodaj pobrany surowiec">
      <AddForm
        newMaterial={newMaterial}
        setNewMaterial={setNewMaterial}
        formValidated={formValidated()}
        addNewMaterial={addNewMaterialRequest}
      />
      <MaterialList
        materials={materials}
        setNewMaterial={setNewMaterialFromTemplate}
      />
    </AppScreen>
  );
};

const AddForm = ({
  newMaterial,
  setNewMaterial,
  formValidated,
  addNewMaterial,
}) => {
  const addNewMaterialOnPress = () => {
    const addNewMaterialAccept = () => {
      const systemId = parseInt(newMaterial.systemId);
      if (isNaN(systemId)) {
        showToast("Erp Id musi być liczbą");
        return;
      }
      const body = {
        ...newMaterial,
        lineId: systemConfiguration.lineId.value,
        systemId,
      };
      addNewMaterial(body);
    };

    Alert.alert(
      "Dodawanie pobranego surowca",
      "Czy na pewno chcesz dodać nowy pobrany surowiec?",
      [
        { text: "Dodaj", onPress: addNewMaterialAccept },
        { text: "Anuluj", style: "cancel" },
      ]
    );
  };

  return (
    <View style={styles.addFormContainer}>
      <View style={styles.addFromRow}>
        <AppTextInput
          title="Erp id:"
          inputStyles={{ width: "50%" }}
          value={newMaterial.systemId.toString()}
          onChangeText={(text) =>
            setNewMaterial({ ...newMaterial, systemId: text })
          }
        />
        <AppTextInput
          title="Nazwa:"
          minLength={3}
          inputStyles={{ width: "50%" }}
          value={newMaterial.name}
          onChangeText={(text) =>
            setNewMaterial({ ...newMaterial, name: text })
          }
        />
      </View>
      <View style={styles.addFromRow}>
        <AppTextInput
          title="Dostawca:"
          minLength={3}
          inputStyles={{ width: "50%" }}
          value={newMaterial.provider}
          onChangeText={(text) =>
            setNewMaterial({ ...newMaterial, provider: text })
          }
        />
        <AppTextInput
          title="Nr.partii:"
          inputStyles={{ width: "50%" }}
          value={newMaterial.partNr}
          onChangeText={(text) =>
            setNewMaterial({ ...newMaterial, partNr: text })
          }
        />
      </View>
      <AppTextInput
        title="Data:"
        inputStyles={{ width: "50%" }}
        value={newMaterial.date}
        onChangeText={(text) => setNewMaterial({ ...newMaterial, date: text })}
      />
      <AppButton
        title="Dodaj"
        onPress={addNewMaterialOnPress}
        disabled={!formValidated}
      />
    </View>
  );
};

const MaterialList = ({ materials, setNewMaterial }) => {
  return (
    <View style={styles.materialListContainer}>
      <FlatList
        data={materials}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MaterialRow material={item} setNewMaterial={setNewMaterial} />
        )}
      />
    </View>
  );
};

const MaterialRow = ({ material, setNewMaterial }) => {
  return (
    <TouchableOpacity onPress={() => setNewMaterial(material)}>
      <AppInfoCard
        data={[
          { title: "Erp Id:", value: material.systemId },
          { title: "Nazwa:", value: material.name },
          { title: "Dostawca:", value: material.provider },
        ]}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  addFormContainer: {
    flex: 0.35,
    width: "100%",
  },
  addFromRow: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  materialListContainer: {
    width: "100%",
    flex: 0.5,
  },
  materialListRow: {},
});

export default RawMaterialAddScreen;
