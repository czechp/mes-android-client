const translator = {
  lineStatus: (status) => {
    switch (status) {
      case "ACTIVE":
        return "Włączona";
      case "DEACTIVATED":
        return "Wyłączona";
      case "BREAKDOWN":
        return "Awaria";

      default:
        return "Błąd nie rozpoznano";
    }
  },

  productionType: (type) => {
    switch (type) {
      case "PTS":
        return "PTS";
      case "CANDLE":
        return "Świeca";
      case "TEALIGHT":
        return "TeaLight";
      default:
        return "Błąd nie rozpoznano";
    }
  },

  workShift: (workShift) => {
    switch (workShift) {
      case "FIRST":
        return "I";
      case "SECOND":
        return "II";
      case "THIRD":
        return "III";
      default:
        return "Błąd nie rozpoznano";
    }
  },

  userRole: (role) => {
    switch (role) {
      case "PRODUCTION":
        return "Produkcja";
      case "QUALITY_CONTROL":
        return "Kontrola jakości";
      case "MAINTENANCE":
        return "Utrzymanie ruchu";
      default:
        return "Błąd. Nie rozpoznano";
    }
  },

  breakdownStatus: (breakdownStatus) => {
    switch (breakdownStatus) {
      case "NEW":
        return "Oczekiwanie na UR";
      case "IN_PROGRESS":
        return "Usuwanie awarii";
      case "CLOSE":
        return "Zakończona";
      default:
        return "Nie rozpoznano";
    }
  },
};

export default translator;
