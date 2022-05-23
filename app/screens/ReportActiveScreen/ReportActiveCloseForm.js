import React, {useState} from "react";
import { Modal, StyleSheet, View } from "react-native";

import AppButton from "../../components/AppButton/AppButton";
import AppForm from "../../components/AppForm/AppForm";
import AppTextInput from "../../components/AppTextInput/AppTextInput";
import AppTitle from "../../components/AppTitle/AppTitle";

const ReportActiveCloseForm = ({ closeReportOnClick }) => {
  const [trashAmount, setTrashAmount] = useState("0");
  const [modalVisibility, setModalVisibility] = useState(false);

  const closeReport = () => {
    setModalVisibility(false);
    closeReportOnClick(trashAmount);
  };

  return (
    <View style={styles.container}>
      <AppForm style={styles.closeForm}>
        <AppButton
          title="Zamknij raport"
          onPress={() => setModalVisibility(true)}
        />
      </AppForm>
      <Modal visible={modalVisibility} animationType="fade">
        <View style={styles.modalContainer}>
            <AppTitle title="Zamykanie raportu" />
          <AppForm>
            <AppTextInput
              title="Ilość odpadu:"
              keyboardType="numeric"
              value={trashAmount}
              onChangeText={setTrashAmount}
            />
          </AppForm>
          <View style={styles.buttonSection}>
            <AppButton title="Zakończ" color="success" onPress={closeReport} />
            <AppButton
              title="Anuluj"
              color="danger"
              onPress={() => setModalVisibility(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  closeForm: {
    marginTop: 50,
  },
  buttonSection: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default ReportActiveCloseForm;
