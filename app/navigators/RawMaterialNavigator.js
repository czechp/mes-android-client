import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

import AppScreen from "../components/AppScreen/AppScreen";
import RawMaterialAddScreen from "../screens/RawMaterialAddScreen/RawMaterialAddScreen";
import RawMaterialListScreen from "../screens/RawMaterialListScreen/RawMaterialListScreen";

const RawMaterialTabNavigator = createMaterialTopTabNavigator();

const RawMaterialNavigator = () => {
  return (
    <AppScreen>
      <RawMaterialTabNavigator.Navigator>
        <RawMaterialTabNavigator.Screen
          name="RawMaterialAddScreen"
          component={RawMaterialAddScreen}
          options={{ title: "Dodaj pobrany surowiec" }}
        />
        <RawMaterialTabNavigator.Screen
          name="RawMaterialListScreen"
          component={RawMaterialListScreen}
          options={{ title: "Lista pobranych surowców" }}
        />
      </RawMaterialTabNavigator.Navigator>
    </AppScreen>
  );
};

export default RawMaterialNavigator;
