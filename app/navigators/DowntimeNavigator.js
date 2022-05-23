import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ReportActiveScreen from "../screens/ReportActiveScreen/ReportActiveScreen";
import AppScreen from "../components/AppScreen/AppScreen";
import DownTimeActiveScreen from "../screens/DowntimesActiveScreen/DowntimeActiveScreen";
import DowntimesListScreen from "../screens/DowntimesListScreen/DowntimesListScreen";

const DownTimeNavigator = createMaterialTopTabNavigator();

const DowntimeNavigator = ({ navigation }) => {
  return (
    <AppScreen>
      <DownTimeNavigator.Navigator>
        <DownTimeNavigator.Screen
          name="DowntimeActiveScreen"
          component={DownTimeActiveScreen}
          options={{
            title: "Aktualny przestój",
          }}
        />
        <DownTimeNavigator.Screen
          name="DowntimesListScreen"
          component={DowntimesListScreen}
          options={{
            title: "List zakończonych przestojów",
          }}
        />
      </DownTimeNavigator.Navigator>
    </AppScreen>
  );
};

export default DowntimeNavigator;
