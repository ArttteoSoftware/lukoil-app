import React, { Fragment, useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, LogBox, Platform, ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from '@components'
import GuestStrack from './GuestStack';
import LoggedStack from './LoggedStack';
import { useTranslation } from "react-i18next";
import { useAuthDispatch, useAuthState, setCurrentUser } from '@context';
import { ProductListContext } from '@context/ProductListContext';
import apiHost from "@lib/apiHost";

const MainRootScreen = () => {
    const [screenLoading, setScreenLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const { updateProductList } = useContext(ProductListContext);
    const dispatch = useAuthDispatch();
    const { user } = useAuthState();


    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        getUserLang();
        getCurrentuserWIthToken();
    }, []);

    const getUserLang = async () => {
        let value = await AsyncStorage.getItem('@LANG');
        if (!isEmpty(value)) {
            i18n.changeLanguage(value);
        }
        else {
            i18n.changeLanguage("en");
            await AsyncStorage.setItem('@LANG', "en");
        }
    }

    const getCurrentuserWIthToken = async () => {
        let token = await AsyncStorage.getItem('token');
        apiHost({
            endpoint: '/get-current-user',
            method: 'get',
            body: {
                token: token
            }
        }).then( async (res) => {
            if (res?.user?.ResponseCode == 0) {
                await AsyncStorage.removeItem('token');
                await setCurrentUser(dispatch, {});
                setScreenLoading(false);
            }
            else {
                await AsyncStorage.setItem('token', token);
                if (!isEmpty(res.products)) {
                    const prod = res.products.original.products;
                    await updateProductList(prod);
                }
                await setCurrentUser(dispatch, res?.user);
                setScreenLoading(false);
            }
        });
    }

    const navTheme = {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#000',
        },
    };
    
    if (!screenLoading) {
        return (
            <NavigationContainer theme={navTheme}>
                <StatusBar/>
                    {
                        isEmpty(user) ? 
                            <GuestStrack/> 
                            : 
                            <LoggedStack/>

                    }
                
            </NavigationContainer>
        )
    }
    else {
        return (
            <View style={{backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="red"/>
            </View>
        )
    }

}
export default MainRootScreen;