import React, { Fragment, useState } from "react";
import { View, StyleSheet, TextInput as Input } from "react-native";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import EditIcon from 'assets/media/edit-2.svg';
import { TouchableOpacity } from "react-native-gesture-handler";

const AnimatedTextInput = ({onChange, value, edit, onPress, label, disabled, form, field, isPassword}) => {
    const [focused, setFocused] = useState(false);


    const isError = () => {
        return form.touched[field.name] && form.errors[field.name]?.length ? true : false;
    }
    
    return (
        <View style={{marginBottom: 15, position: 'relative', zIndex: 1}}>
            <FloatingLabelInput
                isPassword={isPassword}
                label={label}
                value={value}
                editable={disabled ? false : true}
                onChangeText={value => onChange(value)}
                inputStyle={{
                    height: 50
                }}
                containerStyles={{
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                    borderRadius: 8,
                    height: 50,
                    paddingLeft: 10,
                    paddingRight: edit ? 20 : 10,
                    color: '#000'
                }}
                customLabelStyles={{
                    colorBlurred: '#000000',
                    colorFocused: '#000'
                }}
                labelStyles={{
                    opacity: .6,
                    fontSize: 14,
                    fontFamily: 'PlusJakartaSans-Medium'
                }}
            />
            {edit && <View style={{position: 'absolute', top: 15, right: 10}}>
                {onPress ? <TouchableOpacity onPress={() => onPress()}><EditIcon/></TouchableOpacity> : <EditIcon/>}
            </View>}
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

export default AnimatedTextInput;