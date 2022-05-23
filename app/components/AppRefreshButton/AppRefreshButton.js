import React, { PureComponent } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import colors from "../../configuration/colors";

const AppRefreshButton = ({ style, ...otherProps }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...otherProps}>
      <Feather name="refresh-cw" size={100} color={colors.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: colors.primary,
    padding: 30,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
});
export default AppRefreshButton;
