import React, { Fragment, useState } from "react";
import { View, StyleSheet, TextInput as Input, TouchableOpacity } from "react-native";
import { isEmpty } from 'lodash';
import Eyeicon from '@assets/media/eye.svg';
import EyeActiveIcon from '@assets/media/eye-slash.svg';

const InputPassword = ({onChange, value, onBlur, disabled, form, field, label, icon}) => {
    const [showPassword, setShowPassword] = useState(true);
    const isError = () => {
        return form.touched[field.name] && form.errors[field.name]?.length ? true : false;
    }

    const handleChangePasswordView = () => {
      setShowPassword(showPassword ? false : true);
    }

    return (
      <View style={[styles.inputLayer, isError() ? styles.borderBottomParamsWithError : styles.borderBottomParamsWithOutError]}>
        {icon && <View>{icon}</View>}
        <Input
            style={[styles.input, { paddingHorizontal: icon ? 14 : 0 }]}
            secureTextEntry={showPassword}
            onChangeText={(e) => onChange(e)}
            placeholder={label}
            value={value}
            editable={disabled ? false : true}
            placeholderTextColor="rgba(255, 255, 255, .6)"
        />
        <TouchableOpacity activeOpacity={.8} onPress={() => handleChangePasswordView()}>
          {showPassword ? <EyeActiveIcon/> : <Eyeicon/>}
        </TouchableOpacity>
      </View>
    );
};
///
const styles = StyleSheet.create({
    inputLayer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: 48,
        borderRadius: 5,
        paddingHorizontal: 16,
        marginBottom: 15
    },
    input: {
        height: 48,
        flex: 1,
        fontSize: 14,
        justifyContent: 'center', 
        alignItems: 'center',
        paddingHorizontal: 14,
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

export default InputPassword;