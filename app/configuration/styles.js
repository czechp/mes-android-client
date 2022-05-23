import colors from "./colors";

export const fontStyles = {
  fontSize: 20,
  color: colors.primary,
};

export const fontLargerStyles = {
  fontSize: 25,
  fontWeight: "bold",
};

export const fontSmallerStyles = {
  fontSize: 15,
  fontWeight: "bold",
};

export const sectionStyle = {
  width: "100%"
}

export const colorByLineState = (state) => {
  switch (state) {
    case "ACTIVE":
      return colors.success;
    case "DEACTIVATED":
      return colors.secondary;
    case "BREAKDOWN":
      return colors.danger;
    default:
      return colors.primary;
  }
};

export const colorBySystemStatus = (status) =>
  status ? colors.danger : colors.success;
