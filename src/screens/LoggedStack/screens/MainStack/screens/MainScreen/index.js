
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTranslation } from "react-i18next";
import { LoggedHeader, Cards } from '@components';
import ExchangeCircle from '@assets/media/exchange-circle.svg';
import CardsCircle from '@assets/media/cards-circle.svg';
import GusPumpIcon from '@assets/media/gas-pump.svg';
import { ProductListContext } from '@context/ProductListContext';
const MainScreen = ({navigation}) => {
    const { t } = useTranslation();
    const { productList } = useContext(ProductListContext);

    const numColumns = 3;
    const formatData = (dataList, numColumns) => {
        const totalRows = Math.floor(dataList.length / numColumns);
        let totalLastRow = dataList.length - (totalRows*numColumns);
        while(totalLastRow !==0 && totalLastRow !== numColumns) {
            dataList.push({empty: true});
            totalLastRow++;
        }
        return dataList;
    }

    const itemRender = (item) => {
        if (item.empty) {
            return <View style={{padding: 16, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0)', marginLeft: 15, marginBottom: 15, borderRadius: 8, flex: 1, height: 108}}/>
        }
        else {
            return (
                <View style={{padding: 16, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', marginLeft: 15, marginBottom: 15, borderRadius: 8, flex: 1, height: 108}}> 
                    <View><GusPumpIcon/></View>
                    <View style={{marginTop: 15}}>
                        <Text numberOfLines={1} style={{color: '#000', lineHeight: 13, fontSize: 13, opacity: .6, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>{item.name}</Text>
                        <Text style={{color: '#000', paddingTop: 5, lineHeight: 14, fontSize: 14, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{Number(item?.price).toFixed(2)} gel</Text>
                    </View>
                </View>
            )
        }
    }
    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <LoggedHeader navigation={navigation}/>
            <View style={{marginTop: 20}}>
                <View style={{paddingHorizontal: 16, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View/>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity activeOpacity={.9} onPress={() => navigation.navigate('ExchangeScreen')}>
                            <ExchangeCircle/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Cards/>
                <View style={{marginTop: 20, paddingHorizontal: 16}}>
                    <View style={{marginBottom: 15}}><Text style={{color: '#000', lineHeight: 18, fontSize: 18, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{t('logged.mainscreen.products')}</Text></View>
                    <FlatList
                        data={formatData(productList, numColumns)}
                        numColumns={numColumns}
                        keyExtractor={(item, index) => item.id+index.toString()}
                        style={{marginLeft: -15}}
                        renderItem={({ item, index }) => itemRender(item)}
                    />
                </View>
            </View>
        </View>
    )
}

export default MainScreen;