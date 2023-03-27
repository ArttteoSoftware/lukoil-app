import React, { Fragment } from 'react';
import { View, Dimensions, Platform, StatusBar } from 'react-native';
const { height, width } = Dimensions.get('window');
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const N_WIDTH = 390;
const N_HEIGHT = 844;

export const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT || width === N_WIDTH && height === N_HEIGHT  : false;

export const StatusBarHeight = Platform.select({
    ios: isIPhoneX() ? 44 : 45,
    android: StatusBar.currentHeight,
    default: 0
});

const getStatusBarHeight = () => {

    return (
        <Fragment>
            <StatusBar barStyle="light-content" backgroundColor="#000"/>
            <View style={{backgroundColor: "#000", height: Platform.OS === 'ios' ? StatusBarHeight : 0}}/>
        </Fragment>
    )
}

export default getStatusBarHeight;