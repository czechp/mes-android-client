import React from "react";
import AppForm from "../../components/AppForm/AppForm";
import AppPicker from "../../components/AppPicker/AppPicker";
import AppText from "../../components/AppText/AppText";

const SettingsSelectForm = ({ value, values, onAssign }) => {
  return (
    <AppForm>
      <AppPicker
        title="Wybierz linie:"
        value={value}
        values={values}
        onAssign={onAssign}
      />
    </AppForm>
  );
};

export default SettingsSelectForm;
