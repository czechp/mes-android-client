import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MenuScreen from "../screens/MenuScreen/MenuScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SettingsScreen from "../screens/SettingsScreen/SettingsScreen";
import ProductsScreen from "../screens/ProductsScreen/ProductsScreen";
import LineInfoScreen from "../screens/LineInfoScreen/LineInfoScreen";
import ReportNavigator from "./ReportNavigator";
import DowntimeNavigator from "./DowntimeNavigator";
import QualityControlNavigator from "./QualityControlNavigator";
import BreakdownNavigator from "./BreakdownNavigator";
import RawMaterialNavigator from "./RawMaterialNavigator";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen
          name="RawMaterialNavigator"
          component={RawMaterialNavigator}
        />
        <Stack.Screen name="DowntimeNavigator" component={DowntimeNavigator} />
        <Stack.Screen
          name="QualityControlNavigator"
          component={QualityControlNavigator}
        />
        <Stack.Screen name="ReportNavigator" component={ReportNavigator} />
        <Stack.Screen
          name="BreakdownNavigator"
          component={BreakdownNavigator}
        />
        <Stack.Screen name="LineInfoScreen" component={LineInfoScreen} />
        <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
        <Stack.Screen name="SettingsLoginScreen" component={LoginScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default MainNavigator;
