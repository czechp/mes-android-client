import showToast from "./showToast";

const httpErrorHandler = (error, text = "") => {
  if (error.toString() === "Error: Network Error") {
    showToast("Brak połączenia z serwerem!");
    return;
  }
  switch (error.response.status) {
    case 401:
      showToast("Niepoprawne dane logowania!");
      break;
    case 400:
      showToast(error.response.data.message);
      break;
    case 404:
      showToast(text ? text : "Element nie istnieje");
      break;
    default:
      showToast("Unindetified error!");
  }
};

export default httpErrorHandler;
