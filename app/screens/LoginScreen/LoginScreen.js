import React, { useState } from "react";
import { StyleSheet, ToastAndroid } from "react-native";

import AppButton from "../../components/AppButton/AppButton";
import AppForm from "../../components/AppForm/AppForm";
import AppScreen from "../../components/AppScreen/AppScreen";
import AppTextInput from "../../components/AppTextInput/AppTextInput";
import httpErrorHandler from "../../utilities/httpErrorHandler";
import showToast from "../../utilities/showToast";
import { uninterceptedAxiosInstance } from "../../utilities/axiosInstance";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const minDataLength = 3;

  const dataValidated =
    username.length >= minDataLength && password.length >= minDataLength;

  const checkUserRole = (role) => {
    if (role === "ADMIN") navigation.navigate("SettingsScreen");
    else
      showToast(
        "Masz zbyt niskie uprawnienia do konfiguracji tego urządzenia."
      );
  };

  const loginRequest = () => {
    uninterceptedAxiosInstance()
      .post(
        "/appusers/login",
        { username, password },
        {
          headers: {
            Authorization: "",
          },
        }
      )
      .then((response) => {
        checkUserRole(response.data.appUserRole);
      })
      .catch((error) => {
        httpErrorHandler(error);
      });
  };

  const loginOnPress = () => {
    if (dataValidated) {
      loginRequest();
    } else {
      ToastAndroid.show("Sprawdź poprawność danych");
    }
  };

  return (
    <AppScreen title="Logowanie" style={styles.container}>
      <AppForm>
        <AppTextInput
          title="Login:"
          placeholder="Wpisz login"
          autocorrect={false}
          autoFocus
          value={username}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          minLength={minDataLength}
        />
        <AppTextInput
          title="Hasło:"
          placeholder="Wpisz hasło"
          autocorrect={false}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          minLength={minDataLength}
        />
        <AppButton
          disabled={true}
          title="Zaloguj"
          onPress={loginOnPress}
          color="primary"
          disabled={!dataValidated}
        />
      </AppForm>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
