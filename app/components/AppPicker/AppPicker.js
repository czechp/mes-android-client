import React, {useState} from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import colors from "../../configuration/colors";
import AppText from "../AppText/AppText";
import AppSeparator from "../AppSeparator/AppSeparator";

const AppPicker = ({ title, value, values = [], onAssign }) => {
  const [modalVisibilty, setModalVisibility] = useState(false);

  const showValues = () => {
    setModalVisibility(true);
  };

  const hideValues = () => {
    setModalVisibility(false);
  };

  const selectValue = (value) => {
    onAssign(value);
    hideValues();
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>
      <TouchableOpacity style={styles.topSection} onPress={showValues}>
        <AppText />
        <AppText>{value}</AppText>
        <AntDesign name="caretdown" size={26} color={colors.secondary} />
      </TouchableOpacity>
      <Modal visible={modalVisibilty} animationType="slide">
        <AppPickerValueClose onPress={hideValues} />
        <FlatList
          data={values}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <AppPickerValue
              content={item}
              onPress={() => {
                selectValue(item);
              }}
            />
          )}
        />
      </Modal>
    </View>
  );
};

const AppPickerValue = ({ content, onPress }) => {
  return (
    <>
      <TouchableOpacity style={styles.pickerValue} onPress={onPress}>
        <AppText>{content}</AppText>
      </TouchableOpacity>
      <AppSeparator />
    </>
  );
};

const AppPickerValueClose = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.pickerValue} onPress={onPress}>
      <AntDesign name="closecircleo" size={45} color={colors.danger} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%"
  },
  topSection: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    textAlign: "center",
  },
  pickerValue: {
    alignItems: "center",
    paddingVertical: 20,
  },
});

export default AppPicker;
