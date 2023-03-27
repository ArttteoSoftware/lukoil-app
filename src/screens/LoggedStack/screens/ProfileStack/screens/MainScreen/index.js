
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from "react-i18next";
import { LoggedHeader } from '@components';
import ArrowRight from '@assets/media/arrow-right.svg';
import InfoCircle from '@assets/media/info-circle.svg';
import CardIcon from '@assets/media/cards.svg';
import ReceiptIcon from '@assets/media/receipt.svg';
import ModalClose from '@assets/media/modalClose.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import myApi from "@lib/api";
import { useAuthDispatch, useAuthState, setCurrentUser } from '@context';
const MainScreen = ({navigation}) => {
    const { t, i18n } = useTranslation();
    const [visible, setVisible] = useState(false);
    const [defaultLang, setDefaultLang] = useState(null);
    const [localLang, setLocalLang] = useState(null);
    const dispatch = useAuthDispatch();
    useEffect(() => {
        getUserLang();
    }, [])

    const getUserLang = async () => {
        if (i18n.language === 'ka') {
            setDefaultLang('Georgian');
        }
        else if (i18n.language === 'en') {
            setDefaultLang('English');
        }
        else if (i18n.language === 'ru') {
            setDefaultLang('Russian');
        }
    }



    const changeLanguageHandler = async (lang) => {
        await AsyncStorage.setItem('@LANG', lang);
        i18n.changeLanguage(lang);
        if (lang === 'ka') {
            setDefaultLang('Georgian');
        }
        else if (lang === 'en') {
            setDefaultLang('English');
        }
        else if (lang === 'ru') {
            setDefaultLang('Russian');
        }
        setVisible(false);
    }

    const logOutRequest = async () => {
        
        Alert.alert(null, "Are you sure you want logout", [{ text: "yes", onPress: () => logout() }, {text: "cancel"}]);
        //const token = await AsyncStorage.getItem('token', token);
        // myApi({
        //     xmp: 'TransactionResult',
        //     body: `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        //     <Body>
        //         <Logout xmlns="http://view.stawizcustomerwslukoil.mepsan.com/">
        //             <UserName xmlns="">kotek1</UserName>
        //             <Password xmlns="">kotek1kotek1#</Password>
        //             <sessionTokenId xmlns="">${token}</sessionTokenId>
        //         </Logout>
        //     </Body>
        // </Envelope>`
        // }).then( async (res) => {
        //     logout();
        // });
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('access_token');
        await setCurrentUser(dispatch, {});
    }

    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <LoggedHeader navigation={navigation}/>
            <View style={{marginTop: 35, paddingHorizontal: 16}}>
                <View style={{marginBottom: 15}}>
                    <Text style={{color: '#000', lineHeight: 18, fontSize: 18, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{t('logged.mainscreen.account_information')}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('PersonalInfoScreen')} activeOpacity={.9} style={{borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', paddingHorizontal: 16, paddingVertical: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <View><InfoCircle/></View>
                        <View style={{flex: 1, marginLeft: 10}}><Text style={{color: '#000', lineHeight: 14, paddingTop: 2, fontSize: 14, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>Personal Info</Text></View>
                        <View><ArrowRight/></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PaymentScreen')} activeOpacity={.9} style={{marginTop: 15, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', paddingHorizontal: 16, paddingVertical: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <View><CardIcon/></View>
                        <View style={{flex: 1, marginLeft: 10}}><Text style={{color: '#000', lineHeight: 14, paddingTop: 2, fontSize: 14, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>Payment methods</Text></View>
                        <View><ArrowRight/></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('OrderScreen')} activeOpacity={.9} style={{marginTop: 15, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', paddingHorizontal: 16, paddingVertical: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <View><ReceiptIcon/></View>
                        <View style={{flex: 1, marginLeft: 10}}><Text style={{color: '#000', lineHeight: 14, paddingTop: 2, fontSize: 14, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>Orders</Text></View>
                        <View><ArrowRight/></View>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 35}}>
                    <Text style={{color: '#000', lineHeight: 18, fontSize: 18, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{t('logged.mainscreen.account_information')}</Text>
                </View>
                <TouchableOpacity onPress={() => setVisible(true)} activeOpacity={.9} style={{marginTop: 15, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', paddingHorizontal: 16, paddingVertical: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex: 1}}><Text style={{color: '#000', lineHeight: 14, paddingTop: 2, fontSize: 14, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>{defaultLang}</Text></View>
                    <View><ArrowRight/></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => logOutRequest()} activeOpacity={.9} style={{marginTop: 15, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', paddingHorizontal: 16, paddingVertical: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex: 1}}><Text style={{color: '#000', lineHeight: 14, paddingTop: 2, fontSize: 14, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>Log out</Text></View>
                    <View><ArrowRight/></View>
                </TouchableOpacity>
            </View>
            <Modal 
                isVisible={visible}
                style={styles.modal} 
                hasBackdrop={true}
                backdropOpacity={0.6}
                backdropColor="black"
                onBackdropPress={() => setVisible(false)}
                useNativeDriver
            >
                <View style={{backgroundColor: '#fff', paddingBottom: 40, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                    <View style={{flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{borderBottomWidth: 1, marginTop: 10, flex: 1, borderBottomColor: '#e5e5e5'}}>
                            <Text style={{color: '#000', paddingVertical: 15, lineHeight: 16, fontSize: 16, opacity: 1, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{t('logged.mainscreen.change_language')}</Text>
                        </View>
                        <View style={{marginLeft: 10, paddingTop: 20,}}>
                            <TouchableOpacity activeOpacity={.9} onPress={() => setVisible(false)}>
                                <ModalClose/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{paddingHorizontal: 16, paddingTop: 20}}>
                        <TouchableOpacity onPress={() => changeLanguageHandler('en')} activeOpacity={.9} style={{marginTop: 0, backgroundColor: i18n.language === 'en' ? '#DB2B36' : '#fff', borderWidth: 1, borderColor: i18n.language === 'en' ? '#DB2B36' : 'rgba(0, 0, 0, 0.1)', paddingHorizontal: 16, paddingVertical: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex: 1}}><Text style={{color: i18n.language === 'en' ? '#fff' : '#000', lineHeight: 14, paddingTop: 2, fontSize: 14, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>English</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeLanguageHandler('ka')} activeOpacity={.9} style={{marginTop: 10, backgroundColor: i18n.language === 'ka' ? '#DB2B36' : '#fff', borderWidth: 1, borderColor: i18n.language === 'ka' ? '#DB2B36' : 'rgba(0, 0, 0, 0.1)', paddingHorizontal: 16, paddingVertical: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex: 1}}><Text style={{color: i18n.language === 'ka' ? '#fff' : '#000', lineHeight: 14, paddingTop: 2, fontSize: 14, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>Georgian</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeLanguageHandler('ru')} activeOpacity={.9} style={{marginTop: 10, backgroundColor: i18n.language === 'ru' ? '#DB2B36' : '#fff', borderWidth: 1, borderColor: i18n.language === 'ru' ? '#DB2B36' : 'rgba(0, 0, 0, 0.1)', paddingHorizontal: 16, paddingVertical: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex: 1}}><Text style={{color: i18n.language === 'ru' ? '#fff' : '#000', lineHeight: 14, paddingTop: 2, fontSize: 14, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>Russian</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
})
export default MainScreen;