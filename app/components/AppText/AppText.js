import React from "react";
import { StyleSheet, Text } from "react-native";

import { fontStyles } from "../../configuration/styles";

const AppText = ({ children, style, ...otherProps }) => {
  return (
    <>
      <Text style={[styles.text, style]} {...otherProps}>
        {children}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    ...fontStyles,
  },
});

export default AppText;
