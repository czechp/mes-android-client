import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import systemConfiguration from "../../configuration/systemConfiguration";
import BreakdownCard from "../BreakdownScreen/BreakdownCard";

import AppScreen from "./../../components/AppScreen/AppScreen";
import axiosInstance from "./../../utilities/axiosInstance";
import httpErrorHandler from "./../../utilities/httpErrorHandler";

const BreakdownListScreen = ({ navigation }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [breakdowns, setBreakdowns] = useState([]);

  const getBreakdownsRequest = () => {
    setBreakdowns([]);
    setDataLoaded(false);
    axiosInstance
      .get(`/breakdowns/line/${systemConfiguration.lineId.value}`)
      .then((response) => {
        setBreakdowns(response.data);
      })
      .catch((error) => {
        httpErrorHandler(error);
      })
      .finally(() => setDataLoaded(true));
  };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      getBreakdownsRequest();
    });
  }, []);

  return (
    <AppScreen title="Lista awarii" dataLoaded={dataLoaded}>
      <FlatList data={breakdowns} keyExtractor={(item) => item.id} renderItem={({item})=><BreakdownCard breakdown={item} />} />
    </AppScreen>
  );
};

const BreakdownCardWrapper = ({ breakdown }) => {};
export default BreakdownListScreen;
