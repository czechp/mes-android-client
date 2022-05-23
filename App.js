import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import systemConfiguration from "./app/configuration/systemConfiguration";
import MainNavigator from "./app/navigators/MainNavigator";
import LoginScreen from "./app/screens/LoginScreen/LoginScreen";
import { configureInterceptors } from "./app/utilities/axiosInstance";

export default function App() {
  
  useEffect(async () => {
    await appInit();
  }, []);

  return (
    <MainNavigator />
    // <LoginScreen />
  );
}

const appInit = async () => {
  await systemConfiguration.readAll();  
  configureInterceptors();
};
