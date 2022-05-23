import AsyncStorage from "@react-native-async-storage/async-storage";

import showToast from "../utilities/showToast";

function SystemConfiguration(fieldName) {
  this.fieldName = fieldName;
  this.value = "";
}

SystemConfiguration.prototype.saveData = async function (value) {
  try {
    await AsyncStorage.setItem(this.fieldName, value);
  } catch (error) {
    showToast(`Problem z zapisaniem konfiguracji dla: ${this.fieldName}`);
  }
};

SystemConfiguration.prototype.readData = async function () {
  try {
    this.value = await AsyncStorage.getItem(this.fieldName);
  } catch (error) {
    showToast(`Problem z odczytaniem konfiguracji dla: ${this.fieldName}`);
  }
};

const systemConfiguration = {
  lineId: new SystemConfiguration("lineId"),
  lineName: new SystemConfiguration("lineName"),
  lineType: new SystemConfiguration("lineType"),
  username: new SystemConfiguration("username"),
  password: new SystemConfiguration("password"),
  readAll: async function () {
    await this.lineId.readData();
    await this.lineName.readData();
    await this.lineType.readData();
    await this.username.readData();
    await this.password.readData();
  },
};

export default systemConfiguration;
