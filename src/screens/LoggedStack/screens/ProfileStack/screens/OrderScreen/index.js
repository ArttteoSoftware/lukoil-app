
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useTranslation } from "react-i18next";
import { LoggedHeader } from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductListContext } from '@context/ProductListContext';
import { find } from 'lodash';
import moment from 'moment';
import apiHost from "@lib/apiHost";
import { useAuthDispatch, setCurrentUser } from '@context';

const OrderScreen = ({navigation}) => {
    const { t, i18n } = useTranslation();
    const { productList } = useContext(ProductListContext);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const dispatch = useAuthDispatch();


    useEffect(() => {
        getMyHorders();
    }, []);

    const getMyHorders = async () => {
        let token = await AsyncStorage.getItem('token');
        apiHost({
            endpoint: '/get-my-orders',
            method: 'get',
            body: {
                token: token
            }
        }).then( async (res) => {
            if (res?.ResponseCode == 0) {
                await setCurrentUser(dispatch, {});
                setLoading(false);
            }
            else {
                setData(res?.orders);
                setIsLoading(false);
            }
        });
    }

    const childItems = (prod) => {
        return prod.map((v, ind) => {
            const rr = find(productList, function(o) { return o.id === v.id; });
            return (
                <View key={ind.toString()} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 11, fontFamily: 'PlusJakartaSans-Medium'}}>{rr?.name}</Text>
                    <Text style={{fontSize: 11, fontFamily: 'PlusJakartaSans-Medium'}}>{v?.litres} Lt</Text>
                </View>
            )
        })
        
    }

    const itemRender = (item) => {
        return (
            <TouchableOpacity activeOpacity={.9} style={{marginTop: 0, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', paddingHorizontal: 16, paddingVertical: 15, borderRadius: 8}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View><Text style={{color: '#000', lineHeight: 14, paddingTop: 2, fontSize: 14, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>{moment().format('MMM D, YYYY')}</Text></View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Text style={{color: '#000', lineHeight: 14, paddingTop: 2, fontSize: 14, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{item.total?.toFixed(2)}</Text>
                    </View>
                </View>
                <View style={{borderTopWidth: 1, borderTopColor: 'rgba(0, 0, 0, 0.1)', marginBottom: 3, marginTop: 3}}/>
                {childItems(item.products)}
            </TouchableOpacity>
        )
    }


    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <LoggedHeader isBack navigation={navigation}/>
            <View style={{paddingHorizontal: 0, flex: 1, paddingTop: 30}}>
                <View style={{marginBottom: 20, paddingHorizontal: 16}}>
                    <Text style={{color: '#000', lineHeight: 18, fontSize: 18, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{t('logged.mainscreen.orders')}</Text>
                </View>
                {isLoading ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator/></View> : <FlatList
                    data={data}
                    style={{paddingHorizontal: 16, marginBottom: 5}}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => item.id+index.toString()}
                    renderItem={({ item, index }) => itemRender(item)}
                    ItemSeparatorComponent={() => <View style={{height: 15}}/>}
                    ListEmptyComponent={<View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}><Text>{t('logged.listEmpty')}</Text></View>}
                />}
            </View>
        </View>
    )
}
export default OrderScreen;