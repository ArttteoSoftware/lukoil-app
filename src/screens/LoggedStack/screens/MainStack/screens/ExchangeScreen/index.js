
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import { LoggedHeader, Button, Cards } from '@components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ExchangeScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();



    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <LoggedHeader isBack navigation={navigation} />
            <KeyboardAwareScrollView bounces={true} contentContainerStyle={{flex: 1}} style={{flex: 1, paddingTop: 30}}>
                <View style={{ marginBottom: 20, paddingHorizontal: 16 }}>
                    <Text style={{ color: '#000', lineHeight: 16, fontSize: 16, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29 }}>{t('logged.mainscreen.transfer_between')}</Text>
                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <View style={{borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 8, padding: 16}}>
                        <View style={{ marginBottom: 16 }}>
                            <Text style={{ color: '#000', lineHeight: 14, fontSize: 14, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29 }}>{t('logged.mainscreen.main_balance')}</Text>
                        </View>
                        <View style={[styles.mBottom, styles.block]}>
                            <Text style={styles.textStyle}>Super Ecto 100</Text>
                            <Text style={styles.priceStyle}>280.00 Lt</Text>
                        </View>
                        <View style={[styles.mBottom, styles.block]}>
                            <Text style={styles.textStyle}>Super Ecto</Text>
                            <Text style={styles.priceStyle}>200.00 Lt</Text>
                        </View>
                        <View style={[styles.mBottom, styles.block]}>
                            <Text style={styles.textStyle}>Premium Avangard</Text>
                            <Text style={styles.priceStyle}>10.00 Lt</Text>
                        </View>
                        <View style={[styles.mBottom, styles.block]}>
                            <Text style={styles.textStyle}>Euro Regular</Text>
                            <Text style={styles.priceStyle}>15.00 Lt</Text>
                        </View>
                        <View style={styles.block}>
                            <Text style={styles.textStyle}>Euro Diesel</Text>
                            <Text style={styles.priceStyle}>0.00 Lt</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 24}}>
                        <Button onPress={() => navigation.navigate('ExchangeDetailScreen')}>{t('logged.mainscreen.transfer_between')}</Button>
                    </View>
                </View>
                <View style={{marginTop: 24}}>
                    <View style={{ marginBottom: 16, paddingHorizontal: 16 }}>
                        <Text style={{ color: '#000', lineHeight: 16, fontSize: 16, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29 }}>{t('logged.mainscreen.cards')}</Text>
                    </View>
                    <Cards/>
                </View>
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

export default ExchangeScreen;