import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { isEmpty } from 'lodash';
const Button = ({onPress, children, smart, type, style, primary, loading}) => {
    if (!type) {
        return (
            <TouchableOpacity activeOpacity={.9} style={[{...style}, styles.button, primary ? styles.primary : styles.default]} onPress={() => onPress()}>
                {loading ? <ActivityIndicator color="#fff"/> : smart ? children : <Text style={{color: '#fff', fontSize: 14, fontFamily: 'PlusJakartaSans-SemiBold'}}>{children}</Text>}
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        borderRadius: 8
    },
    primary: {
        backgroundColor: '#000',
        borderWidth: 1,
        borderColor: '#fff'
    },
    default: {
        backgroundColor: '#DB2B36',
        borderWidth: 1,
        borderColor: '#DB2B36'
    }
})
export default Button;