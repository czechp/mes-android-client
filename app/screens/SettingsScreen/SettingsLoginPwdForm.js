import React from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppButton from "../../components/AppButton/AppButton";

import AppForm from "../../components/AppForm/AppForm";
import AppTextInput from "../../components/AppTextInput/AppTextInput";

const SettingsLoginPwdForm = ({
  minDataLength,
  username,
  setUsername,
  password,
  setPassword,
  dataValidated,
  onPress,
}) => {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <AppForm>
        <AppTextInput
          title={"Login: "}
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
          autocorrect={false}
          autoCapitalize="none"
          minLength={minDataLength}
        />
        <AppTextInput
          title={"Hasło: "}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          autocorrect={false}
          autoCapitalize="none"
          minLength={minDataLength}
          secureTextEntry
        />
        <AppButton
          title="Aktualizuj"
          onPress={onPress}
          disabled={!dataValidated}
          onPress={onPress}
          color="primary"
        />
      </AppForm>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%",
  },
});

export default SettingsLoginPwdForm;
