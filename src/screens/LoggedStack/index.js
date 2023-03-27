import React, { useContext, useState, useEffect } from 'react';
import { View, Platform, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from "react-i18next";
import {
    MainStack,
    ShopStack,
    CartStack,
    ProfileStack
} from './screens/index';
import HomeIcon from '@assets/media/bottomBar/Home'
import ShopIcon from '@assets/media/bottomBar/Shop'
import CartIcon from '@assets/media/bottomBar/Cart'
import ProfileIcon from '@assets/media/bottomBar/Profile'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBar = ({ navigation, state, descriptors }) => {
    const { t, i18n } = useTranslation();
    return (
        <View style={styles.block}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const iconName = () => {
                    if (route.name === 'MainStack') {
                        return <HomeIcon color={isFocused ? '#DB2B36' : '#000'}/>
                    }
                    else if (route.name === 'ShopStack') {
                        return <ShopIcon color={isFocused ? '#DB2B36' : '#000'}/>
                    }
                    else if (route.name === 'CartStack') {
                        return <CartIcon color={isFocused ? '#DB2B36' : '#000'}/>
                    }
                    else if (route.name === 'ProfileStack') {
                        return <ProfileIcon color={isFocused ? '#DB2B36' : '#000'}/>
                    }
                };

                const generateName = () => {
                    if (route.name === 'MainStack') {
                        return t('logged.bottombar.home');
                    }
                    else if (route.name === 'ShopStack') {
                        return t('logged.bottombar.shop');
                    }
                    else if (route.name === 'CartStack') {
                        return t('logged.bottombar.cart');
                    }
                    else if (route.name === 'ProfileStack') {
                        return t('logged.bottombar.profile');
                    }
                };

                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({ type: 'tabLongPress', target: route.key });
                    onLongPress = { onLongPress }
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        activeOpacity={.8}
                        key={index + '_' + route.name}
                        style={[
                            styles.iconsBlock, {
                                marginRight: state.routes.length === index+1 ? 0 : 40,
                                paddingRight: 0,
                                borderTopWidth: 1, 
                                borderTopColor: isFocused ? '#DB2B36' : '#eeeff7'
                            }
                        ]}
                    >
                        <View style={{alignItems: 'center'}}>
                            <View style={{paddingLeft: 2}}>{iconName()}</View>
                            <Text style={{paddingTop: 3, paddingLeft: 3, fontSize: i18n.language !== 'ka' ? 13 : 9, textAlign: 'center', color: isFocused ? '#DB2B36' : '#000'}}>{generateName()}</Text>
                            </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const TabNavigator = ({ navigation }) => {
    return (
        <>
            <Tab.Navigator initialRouteName="MainStack" tabBar={props => <CustomTabBar {...props} />} screenOptions={{ gestureEnabled: false }}>
                <Tab.Screen
                    name="MainStack"
                    component={MainStack}
                    options={{
                        headerShown: false,
                        animationEnabled: true,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}
                />
                <Tab.Screen
                    name="ShopStack"
                    component={ShopStack}
                    options={{
                        headerShown: false,
                        animationEnabled: true,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}
                />
                <Tab.Screen
                    name="CartStack"
                    component={CartStack}
                    options={{
                        headerShown: false,
                        animationEnabled: true,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}
                />
                <Tab.Screen
                    name="ProfileStack"
                    component={ProfileStack}
                    options={{
                        headerShown: false,
                        animationEnabled: true,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}
                />
            </Tab.Navigator>
        </>
    );
}

const LoggedStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: false,
                    animationEnabled: true
                }}
                name="RootScreen"
                component={TabNavigator}
            />
            {/* <Stack.Screen 
                options={{
                    headerShown: false, 
                    animationEnabled:true,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }} 
                name="ProfileStack" 
                component={ProfileStack}
            /> */}
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    block: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#eeeff7',
        height: Platform.OS === 'ios' ? 77 : 60,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconsBlock: {
        width: 50,
        textAlign: 'cenetr',
        marginBottom: Platform.OS === 'ios' ? 8 : 0,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: Platform.OS === 'ios' ? 71 : 60,
    }
});
export default LoggedStack;
