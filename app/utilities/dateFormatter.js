import dayjs from "dayjs";

const dateFormatter = (date) => {
  return dayjs(date).format('H:mm:ss \n D.M.YYYY r.');
};

export default dateFormatter;
