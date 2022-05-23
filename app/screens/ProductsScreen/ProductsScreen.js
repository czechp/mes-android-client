import React, { PureComponent, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";


import AppScreen from "../../components/AppScreen/AppScreen";
import ProductCard from "./ProductCard";
import axiosInstance from "../../utilities/axiosInstance";
import httpErrorHandler from "../../utilities/httpErrorHandler";
import systemConfiguration from "../../configuration/systemConfiguration";
import showToast from "../../utilities/showToast";

const ProductsScreen = ({ navigation }) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  const getProductsRequest = () => {
    axiosInstance
      .get(`/product-efficiencies/lines/${systemConfiguration.lineName.value}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        httpErrorHandler(error);
      })
      .finally(() => {
        setDataLoaded(true);
      });
  };

  const selectProductRequest = (productId) => {
    axiosInstance
      .patch(
        `/lines/product/${systemConfiguration.lineId.value}`,
        {},
        {
          params: { productId: productId },
        }
      )
      .then((response) => {
        showToast(
          `Produkt dla linii ${systemConfiguration.lineName.value} zaktualizowany`
        );
        navigation.navigate("LineInfoScreen");
      })
      .catch((error) => httpErrorHandler(error));
  };

  useEffect(() => {
    const navSubscription = navigation.addListener("focus", () => {
      setDataLoaded(false);
      getProductsRequest();
    });

    return navSubscription;
  }, []);

  return (
    <AppScreen title="Produkty" dataLoaded={dataLoaded}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <ProductCard
            productInfo={item}
            selectProductOnPress={() => {
              selectProductRequest(item.productId);
            }}
          />
        )}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({});

export default ProductsScreen;
