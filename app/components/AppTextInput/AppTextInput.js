import React, { PureComponent, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import AppText from "../AppText/AppText";
import colors from "../../configuration/colors";
import { fontStyles } from "../../configuration/styles";

const AppTextInput = ({ title = "", minLength, inputStyles={}, ...otherProps }) => {
  const [alreadyTouched, setAlreadyTouched] = useState(false);

  const minLengthValidatorText = minLength
    ? `Minimałna długość to ${minLength} znaków`
    : "";

  const minValidatorVisibility =
    minLength && alreadyTouched && otherProps.value.length < minLength;

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>
      <TextInput
        style={{...styles.textInput, ...inputStyles}}
        {...otherProps}
        onFocus={() => setAlreadyTouched(true)}
      />
      {minValidatorVisibility && (
        <AppText style={styles.validatorText}>{minLengthValidatorText}</AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    marginBottom: 40
  },
  textInput: {
    ...fontStyles,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    width: "100%",
    textAlign: "center",
  },
  validatorText: {
    marginTop: 5,
    ...fontStyles,
    fontSize: 15,
    color: colors.danger,
  },
  title: {
    marginBottom: 10,
    color: colors.secondary
  },
});

export default AppTextInput;
