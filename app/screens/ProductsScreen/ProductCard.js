import React, { PureComponent } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import AppText from "../../components/AppText/AppText";
import AppSeparator from "../../components/AppSeparator/AppSeparator";
import colors from "../../configuration/colors";
import { fontLargerStyles } from "../../configuration/styles";

const ProductCard = ({ productInfo, selectProductOnPress }) => {
  return (
    <View style={styles.container}>
      <AppText
        style={styles.sectionId}
      >{`Id: ${productInfo.productId}`}</AppText>
      <AppText style={styles.sectionProductName}>
        {productInfo.productName}
      </AppText>
      <Swipeable
        renderRightActions={() => (
          <SelectButtonSection selectOnPress={selectProductOnPress} />
        )}
      >
        <View style={styles.sectionAmount}>
          <AppText>Wydajność na zmiane: </AppText>
          <AppText>{productInfo.amount}</AppText>
        </View>
        <AppText>Kontrola jakości:</AppText>
        <FlatList
          data={productInfo.productProperties}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item, index }) => (
            <AppText style={styles.sectionProperty}>{`${index + 1}. ${
              item.content
            }`}</AppText>
          )}
        />
      </Swipeable>
      <AppSeparator style={styles.separator} />
    </View>
  );
};

const SelectButtonSection = ({ selectOnPress }) => {
  const onPress = () => {
    Alert.alert(
      "Wybieranie nowego produktu",
      "Czy napewno chcesz wybrać ten produkt?",
      [
        {
          text: "Wybierz",
          onPress: () => {
            selectOnPress();
          },
        },
        { text: "Anuluj", onPress: () => {} },
      ]
    );
  };
  return (
    <View style={styles.selectButtonContainer}>
      <AppText>Wybierz produkt:</AppText>
      <TouchableOpacity style={styles.selectButton} onPress={() => onPress()}>
        <AntDesign name="checkcircleo" size={90} color={colors.success} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  sectionId: {
    fontSize: 20,
  },
  sectionProductName: {
    ...fontLargerStyles,
    textAlign: "center",
    marginVertical: 20,
  },
  sectionAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  sectionProperty: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
  },
  selectButtonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  selectButton: {
    borderColor: colors.success,
    borderWidth: 4,
    padding: 20,
    marginVertical: 20,
    borderRadius: 25,
  },
});

export default ProductCard;
