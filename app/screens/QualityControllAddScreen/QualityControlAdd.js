import React from "react";
import { StyleSheet, View } from "react-native";

import AppInfoCard from "../../components/AppInfoCard/AppInfoCard";
import translator from "../../utilities/translators";
import AppText from "../../components/AppText/AppText";
import { fontLargerStyles } from "../../configuration/styles";
import AppButton from "../../components/AppButton/AppButton";
import { FlatList } from "react-native-gesture-handler";
import AppSeparator from "../../components/AppSeparator/AppSeparator";
import colors from "../../configuration/colors";

const QualityControlAdd = ({
  user,
  productProperties,
  addToControlResult,
  controlResult,
  saveOnPress
}) => {
  return (
    <View style={styles.container}>
      <QualityControllAddUser user={user} />
      {productProperties.length > 0 && (
        <QualityControlProperties
          productProperties={productProperties}
          addToControlResult={addToControlResult}
        />
      )}
      <QualityControlResult
        productProperties={productProperties}
        controlResult={controlResult}
        saveOnPress={saveOnPress}
      />
    </View>
  );
};

const QualityControllAddUser = ({ user }) => {
  return (
    <View style={{ width: "100%" }}>
      <AppInfoCard
        title="Użytkownik:"
        data={[
          {
            title: "Imie i nazwisko:",
            value: `${user.firstName} ${user.secondName},`,
          },
          { title: "Dział:", value: translator.userRole(user.userRole) },
        ]}
      />
    </View>
  );
};

const QualityControlProperties = ({
  productProperties,
  addToControlResult,
}) => {
  return (
    <View style={{ width: "100%", flex: 0.2 }}>
      <FlatList
        data={productProperties}
        keyExtractor={(item, idx) => `${item.id}-${idx}`}
        renderItem={({ item }) => (
          <QualityControlPropertyCard
            productProperty={item}
            addToControlResult={addToControlResult}
          />
        )}
      />
      <AppSeparator />
    </View>
  );
};

const QualityControlPropertyCard = ({
  productProperty,
  addToControlResult,
}) => {
  return (
    <View style={{ width: "100%" }}>
      <AppText style={{ textAlign: "center", ...fontLargerStyles }}>
        {productProperty.content}
      </AppText>
      <View style={styles.propertyCardButtonContainer}>
        <AppButton
          color="success"
          title="OK"
          style={{ width: "45%" }}
          onPress={() => addToControlResult(productProperty.id, true)}
        />
        <AppButton
          color="danger"
          title="NOK"
          style={{ width: "45%" }}
          onPress={() => addToControlResult(productProperty.id, false)}
        />
      </View>
    </View>
  );
};

const QualityControlResult = ({ productProperties, controlResult, saveOnPress }) => {
  return (
    <View
      style={{ width: "100%", flex: productProperties.length > 0 ? 0.75 : 1 }}
    >
      <AppText style={{ textAlign: "center", ...fontLargerStyles }}>
        Podsumowanie:
      </AppText>
      <FlatList
        data={controlResult}
        keyExtractor={(item, idx) => `${idx}-${item.content}`}
        renderItem={({ item }) => (
          <QualityControlResultRow controlResult={item} />
        )}
      />
      {productProperties.length === 0 && (
        <AppButton title="Zapisz" color="success" onPress={saveOnPress} />
      )}
    </View>
  );
};

const QualityControlResultRow = ({ controlResult }) => {
  const controlResultColor = {
    color: controlResult.qualityOK ? colors.success : colors.danger,
  };

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <AppText style={controlResultColor}>{controlResult.content}</AppText>
      <AppText style={controlResultColor}>
        {controlResult.qualityOK ? "OK" : "NOK"}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  propertyCardButtonContainer: {
    marginTop: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default QualityControlAdd;
