import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import AppScreen from "../components/AppScreen/AppScreen";
import QualityControlAddScreen from "../screens/QualityControllAddScreen/QualityControlAddScreen";
import QualityControlCurrentList from "../screens/QualityControllAddScreen/QualityControlCurrentList";

const QualityControlTabNavigator = createMaterialTopTabNavigator();

const QualityControlNavigator = () => {
  return (
    <AppScreen>
      <QualityControlTabNavigator.Navigator>
        <QualityControlTabNavigator.Screen
          name="QualityControllAddScreen"
          component={QualityControlAddScreen}
          options={{ title: "Dodaj kontrole jakości" }}
        />
        <QualityControlTabNavigator.Screen
          name="QualityControlCurrentList"
          component={QualityControlCurrentList}
          options={{ title: "Wykonane kontrole jakości" }}
        />
      </QualityControlTabNavigator.Navigator>
    </AppScreen>
  );
};

export default QualityControlNavigator;
