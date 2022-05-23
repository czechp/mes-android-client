const productionTypeTranslate = (type) => {
  switch (type) {
    case "PTS":
      return "PTS";
    case "CANDLE":
      return "Świeczka";
    case "TEALIGHT":
      return "Tealight";
    default: 
        return "Brak"
  }
};
