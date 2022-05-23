import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
import colors from "../../configuration/colors";
import AppText from "../AppText/AppText";

const AppProgressBar = ({
  title,
  progress,
  value,
  color = colors.primary,
  ...otherProps
}) => {
  return (
    <View style={styles.container}>
      <AppText style={{ ...styles.title, color }}>{title}</AppText>
      <View>
        <Progress.Circle
          thickness={15}
          style={styles.progressBar}
          {...otherProps}
          progress={progress / 100}
          size={220}
          color={color}
          direction="counter-clockwise"
        />
        <View style={styles.textContainer}>
          <AppText style={{ ...styles.text, color }}>{`${parseInt(
            progress
          )}%`}</AppText>
          <AppText style={{ ...styles.text, color }}>{value}</AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    alignItems: "center",
  },
  title: {
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    marginBottom: 5,
  },
});
export default AppProgressBar;
