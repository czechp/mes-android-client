import React from "react";
import { Image, StyleSheet, View } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import AppForm from "../../components/AppForm/AppForm";
import AppScreen from "../../components/AppScreen/AppScreen";
import AppText from "../../components/AppText/AppText";

const MenuScreen = ({ navigation }) => {
  return (
    <AppScreen style={styles.container}>
      <View style={styles.logoContainer}>
        <AppText style={styles.logoText}>MES System</AppText>
      </View>
      <AppForm style={styles.buttonContainer}>
        <AppButton
          title="Linia"
          onPress={() => navigation.navigate("LineInfoScreen")}
        />
        <AppButton
          title="Produkty"
          onPress={() => navigation.navigate("ProductsScreen")}
        />
        <AppButton
          title="Raporty"
          onPress={() => navigation.navigate("ReportNavigator")}
        />
                <AppButton
          title="Surowce"
          onPress={() => navigation.navigate("RawMaterialNavigator")}
        />
        <AppButton
          title="Kontrola jakości"
          onPress={() => navigation.navigate("QualityControlNavigator")}
        />
        <AppButton
          title="Przestoje produkcyjne"
          onPress={() => navigation.navigate("DowntimeNavigator")}
        />
        <AppButton
          title="Awarie"
          onPress={() => navigation.navigate("BreakdownNavigator")}
        />
        <AppButton
          title="Ustawienia"
          onPress={() => navigation.navigate("SettingsLoginScreen")}
        />
      </AppForm>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  logoContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    resizeMode: "contain",
    width: 400,
    height: 150,
  },
  logoText: {
    textAlign: "center",
  },
  buttonContainer: {
    flex: 0.8,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default MenuScreen;
