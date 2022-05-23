import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AppScreen from "../components/AppScreen/AppScreen";
import BreakdownActiveScreen from "../screens/BreakdownScreen/BreakdownActiveScreen";
import BreakdownListScreen from "../screens/BreakdownListScreen/BreakdownListScreen";

const BreakdownTabNavigator = createMaterialTopTabNavigator();

const BreakdownNavigator = ({ navigation }) => {
  return (
    <AppScreen>
      <BreakdownTabNavigator.Navigator>
        <BreakdownTabNavigator.Screen
         name="BreakdownActiveScreen" 
         component={BreakdownActiveScreen}
         options={{
             title:"Aktualna awaria"
         }}
        />
         <BreakdownTabNavigator.Screen
         name="BreakdownListScreen" 
         component={BreakdownListScreen}
         options={{
             title:"Lista awarii"
         }}
        />
      </BreakdownTabNavigator.Navigator>
    </AppScreen>
  );
};

export default BreakdownNavigator;