import React, { Fragment, useState } from "react";
import { View, StyleSheet, TextInput as Input } from "react-native";

const TextInput = ({onChange, value, onBlur, keyboardType, label, disabled, form, field, icon}) => {
    const [focused, setFocused] = useState(false);

    const isError = () => {
        return form.touched[field.name] && form.errors[field.name]?.length ? true : false;
    }

    return (
        <View style={[styles.inputLayer, isError() ? styles.borderBottomParamsWithError : styles.borderBottomParamsWithOutError]}>
          {icon && <View>{icon}</View>}
            <Input
                style={[styles.input, { paddingHorizontal: icon ? 14 : 0 }]}
                onChangeText={(e) => onChange(e)}
                placeholder={label}
                value={value}
                keyboardType={keyboardType ? keyboardType : 'default'}
                editable={disabled ? false : true}
                placeholderTextColor="rgba(255, 255, 255, .6)"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputLayer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: 48,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 16
    },
    input: {
        height: 48,
        flex: 1,
        fontSize: 14,
        justifyContent: 'center', 
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'PlusJakartaSans-Medium'
    },
    borderBottomParamsWithOutError: {
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1
    },
    borderBottomParamsWithError: {
        borderColor: '#DB2B36',
        borderWidth: 1
    }
});

export default TextInput;