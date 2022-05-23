import React from "react";
import { View, Text } from "react-native";
import AppInfoCard from "../../components/AppInfoCard/AppInfoCard";
import dateFormatter from "../../utilities/dateFormatter";
import translator from "../../utilities/translators";

const BreakdownCard = ({ breakdown }) => {
  return (
    <View style={{ width: "100%" }}>
      <AppInfoCard
        data={[
          { title: "Id:", value: breakdown.id },
          {
            title: "Status:",
            value: translator.breakdownStatus(breakdown.breakdownStatus),
          },
          { title: "Zgłaszający: ", value: breakdown.operatorName },
          {
            title: "Pracownik UR: ",
            value: breakdown.maintenanceName
              ? breakdown.maintenanceName
              : "Oczekiwanie na przybycie",
          },
          {
            title: "Czas zgłoszenia: ",
            value: dateFormatter(breakdown.creationDate),
          },
          {
            title: "Czas zakończenia: ",
            value: breakdown.closeDate
              ? dateFormatter(breakdown.closeDate)
              : "Awaria w trakcie",
          },
          {
            title: "Czas przybycia UR: ",
            value: breakdown.maintenanceArrivedTime
              ? dateFormatter(breakdown.maintenanceArrivedTime)
              : "Brak",
          },
          {
            title: "Minut do przybycia UR:",
            value: breakdown.maintenanceArrivedTotalTime + " min.",
          },
          {
            title: "Czas trwania awarii:",
            value: breakdown.breakdownTotalTime + " min.",
          },
          {
            title: "Numer zgłoszenia UMUP:",
            value: breakdown.umupNumber ? breakdown.umupNumber : "Brak",
          },
          { title: "Opis awarii:", value: breakdown.content },
        ]}
      />
    </View>
  );
};

export default BreakdownCard;
