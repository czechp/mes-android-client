import React from "react";
import { StyleSheet, View } from "react-native";

const AppForm = ({children, style={}}) => {
    return <View style={[styles.container, style]}>
        {children}
    </View>
};

const styles = StyleSheet.create({
    container: {
        width: "80%",
    }
})

export default AppForm;