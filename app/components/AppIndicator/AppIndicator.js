import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '../../configuration/colors';

const AppIndicator = ({})=>{
    
    return (
        <View style={styles.container}>
            <ActivityIndicator size={300} color={colors.primary} />
        </View>
    );   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"        
    }
});
export default AppIndicator;