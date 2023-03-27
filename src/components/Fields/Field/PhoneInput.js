import React, { Fragment, useState } from "react";
import { View, StyleSheet, TextInput as Input, Platform } from "react-native";
import { PhoneNumber } from 'components';
const TextInput = ({onChange, value, onBlur, type, label, disabled, form, field, icon, onDialCodeChange, bordered}) => {
    const [focused, setFocused] = useState(false);
    const [dialCode, setDialCode] = useState('');

    const isError = () => {
        return form.touched[field.name] && form.errors[field.name]?.length ? true : false;
    }

    const onTextChange = (e) => {
        onChange(e);
    }

    return (
      <View style={{marginBottom: 15}}>
      <View style={[{paddingHorizontal: bordered ? 10 : 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}, bordered ? isError() ? styles.borderBottomParamsWithErrorBordered : styles.borderBottomParamsWithOutErrorBordered : null]}>
          <View style={{paddingRight: 10}}>
            <PhoneNumber onChangeItem={(e) => onDialCodeChange(e)}/>
          </View>
          <Input
              style={[styles.input]}
              onChangeText={(e) => onTextChange(e)}
              placeholder={label}
              keyboardType={'number-pad'}
              value={value}
              editable={disabled ? false : true}
              placeholderTextColor="rgba(36, 36, 36, .6)"
          />
        </View>
        {!bordered && <View style={[isError() ? styles.borderBottomParamsWithError : styles.borderBottomParamsWithOutError, {marginLeft: 30}]}></View>}
      </View>
    );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    marginBottom: Platform.OS === 'ios' ? 0 : 3,
    fontFamily: 'Quicksand-Medium',
    color: 'rgba(36, 36, 36, .6)',
    flex: 1,
    fontSize: 14
  },
  borderBottomParamsWithOutError: {
    borderBottomColor: 'rgba(0, 0, 0, 0.09)',
    borderBottomWidth: 1
  },
  borderBottomParamsWithError: {
    borderBottomColor: '#eb4d4b',
    borderBottomWidth: 1
  },
  borderBottomParamsWithOutErrorBordered: {
    borderColor: 'rgba(0, 0, 0, 0.09)',
    borderWidth: 1,
    borderRadius: 8
  },
  borderBottomParamsWithErrorBordered: {
    borderColor: '#eb4d4b',
    borderWidth: 1,
    borderRadius: 8
  },
  iconStyle: {
    paddingRight: 12,
    marginTop: -15
  }
});

export default TextInput;