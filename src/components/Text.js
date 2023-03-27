import React from 'react';
import { TouchableOpacity, Text as NativeText, ActivityIndicator, StyleSheet } from 'react-native';
import { isEmpty } from 'lodash';
const Text = ({children, color, size, font, style}) => {
    return (
        <NativeText style={[{
            color: color ? color : '#fff',
            fontSize: size ? size : 14,
            fontFamily: font ? font : 'PlusJakartaSans-Medium',
            ...style
        }]}>
            {children}
        </NativeText>
    )
}

export default Text;