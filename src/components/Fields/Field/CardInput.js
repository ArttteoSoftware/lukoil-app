import React, { Fragment, useState } from "react";
import { View, StyleSheet, TextInput as Input } from "react-native";

const CardInput = ({onChange, value, onBlur, keyboardType, label, disabled, form, field, icon}) => {
    const [focused, setFocused] = useState(false);

    const isError = () => {
        return form.touched[field.name] && form.errors[field.name]?.length ? true : false;
    }

    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {icon && <View style={styles.iconStyle}>{icon}</View>}
          <Input
              style={[styles.input, isError() ? styles.borderBottomParamsWithError : styles.borderBottomParamsWithOutError]}
              onChangeText={(e) => onChange(e)}
              placeholder={label}
              value={value}
              keyboardType={keyboardType ? keyboardType : 'default'}
              editable={disabled ? false : true}
              placeholderTextColor="rgba(36, 36, 36, .6)"
          />
        </View>
    );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.09)',
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
  iconStyle: {
    width: 30,
    paddingRight: 12,
    marginTop: -15
  }
});

export default CardInput;