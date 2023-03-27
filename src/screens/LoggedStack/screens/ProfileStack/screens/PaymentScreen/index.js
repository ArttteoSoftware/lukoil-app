
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTranslation } from "react-i18next";
import { LoggedHeader } from '@components';
import Dots from '@assets/media/dots.svg';
import Mastercard from '@assets/media/mastercard.svg';
import Visa from '@assets/media/visa.svg';

import { isEmpty } from 'lodash';
import moment from 'moment';


const PaymentScreen = ({navigation}) => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState([{
        id: 1,
        name: 'visa',
        mask: '5151'
    },{
        id: 2,
        name: 'mastercard',
        mask: '4141'
    }]);

    const itemRender = (item) => {
        return (
            <TouchableOpacity activeOpacity={.9} style={{marginTop: 0, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', paddingHorizontal: 16, paddingVertical: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{marginTop: -3}}>
                   {item.name === 'visa' ? <Visa/> : <Mastercard/>}
                </View>
                <View style={{flex: 1, marginLeft: 10, flexDirection: 'row', alignItems: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#000', lineHeight: 14, paddingTop: 4, fontSize: 14, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>**** **** **** </Text>
                    <Text style={{color: '#000', lineHeight: 14, paddingTop: 0, fontSize: 14, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>{item.mask}</Text>
                </View>
                <View><Dots/></View>
            </TouchableOpacity>
        )
    }


    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <LoggedHeader isBack navigation={navigation}/>
            <View style={{paddingHorizontal: 16, flex: 1, paddingTop: 30}}>
                <View style={{marginBottom: 20}}>
                    <Text style={{color: '#000', lineHeight: 18, fontSize: 18, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{t('logged.mainscreen.payment_methods')}</Text>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => item.id+index.toString()}
                    renderItem={({ item, index }) => itemRender(item)}
                    ItemSeparatorComponent={() => <View style={{height: 15}}/>}
                />
            </View>
        </View>
    )
}



export default PaymentScreen;