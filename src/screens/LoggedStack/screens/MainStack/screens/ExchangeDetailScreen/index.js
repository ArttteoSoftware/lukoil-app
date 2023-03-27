
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import { LoggedHeader, Button, DropDown, Liters } from '@components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CardIcon from '@assets/media/card0.svg';
const ExchangeDetailScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const [mainData] = useState([{
        id: 1,
        name: 'Main Account',
    },{
        id: 2,
        name: 'Main gold account',
        litersleft: 45
    }]);

    const [toData] = useState([{
        id: 1,
        name: 'Nutsa\'s account',
    },{
        id: 2,
        name: 'Gio\s account'
    }]);

    const [data, setData] = useState([{
        id: 1,
        name: 'Super ecto',
        litersleft: 75
    },{
        id: 1,
        name: 'Super ecto 100',
        litersleft: 45
    },{
        id: 1,
        name: 'Premium avangard',
        litersleft: 65
    },{
        id: 1,
        name: 'Regular',
        litersleft: 95
    }]);

    const transformer = () => {

    }


    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <LoggedHeader isBack navigation={navigation} />
            <KeyboardAwareScrollView bounces={true} contentContainerStyle={{flex: 1}} style={{flex: 1, paddingTop: 30}}>
                <View style={{ marginBottom: 20, paddingHorizontal: 16 }}>
                    <Text style={{ color: '#000', lineHeight: 16, fontSize: 16, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29 }}>{t('logged.mainscreen.choose_product')}</Text>
                </View>
                <View style={{ paddingHorizontal: 16, flex: 1 }}>
                    <DropDown
                        data={data}
                        placeholder={t('logged.mainscreen.choose_product')}
                        onSelect={(e) => console.log(e)}
                    />
                    <View style={{marginTop: 20}}>
                        <Text style={{ color: '#000', lineHeight: 16, fontSize: 16, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29 }}>{t('logged.mainscreen.liters')}</Text>
                        <Liters onChangeLiter={(e) => console.log(e)} style={{marginTop: 20}}/>
                    </View>

                    <View style={{marginTop: 20, position: 'relative', zIndex: 39999}}>
                        <Text style={{ color: '#000', lineHeight: 16, fontSize: 16, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29 }}>{t('logged.mainscreen.from')}</Text>
                        <DropDown
                            data={mainData}
                            onSelect={(e) => console.log(e)}
                            placeholder={t('logged.mainscreen.from')}
                            style={{marginTop: 15}}
                            icon={<CardIcon/>}
                        />
                    </View>
                    <View style={{marginTop: 20, position: 'relative', zIndex: 3999}}>
                        <Text style={{ color: '#000', lineHeight: 16, fontSize: 16, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29 }}>{t('logged.mainscreen.to')}</Text>
                        <DropDown
                            data={toData}
                            onSelect={(e) => console.log(e)}
                            placeholder={t('logged.mainscreen.to')}
                            style={{marginTop: 15}}
                            icon={<CardIcon/>}
                        />
                    </View>
                </View>
                <View style={{paddingBottom: 20, paddingHorizontal: 16}}><Button onPress={() => transformer()}>Transfer</Button></View>
                
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    mBottom: {
        marginBottom: 12
    },
    textStyle: {
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: 14,
        lineHeight: 14,
        color: '#000',
        opacity: .6
    },
    priceStyle: {
        fontFamily: 'PlusJakartaSans-Bold',
        fontSize: 14,
        lineHeight: 14,
        color: '#000',
        opacity: 1
    }
})

export default ExchangeDetailScreen;