import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { isEmpty } from 'lodash';
import { useTranslation } from "react-i18next";
import moment from 'moment';
import LogoSvg from '@assets/media/logo.svg';
import UserSvg from '@assets/media/user.svg';
import ArrowLeft from '@assets/media/arrow-left.svg';
import { useAuthState } from '@context';
const LoggedHeader = ({title, description, navigation, isBack}) => {
    const { t } = useTranslation();
    const { user } = useAuthState();
    
    if (title) {
        return (
            <View style={{
                backgroundColor: '#000', 
                height: 165, 
                flexDirection: 'row', 
                justifyContent: 'center', 
                alignItems: 'center',
                paddingHorizontal: 16
            }}>           
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: '#fff', fontSize: 18, lineHeight: 18, fontFamily: 'PlusJakartaSans-SemiBold'}}>{t(title)}</Text>
                    {description && <Text style={{color: '#fff', fontSize: 12, paddingTop: 5, opacity: .6, lineHeight: 12, fontFamily: 'PlusJakartaSans-SemiBold'}}>{description}</Text>}
                </View>
            </View>
        )
    }
    else {
        return (
            <View style={{
                backgroundColor: '#000', 
                height: 124, 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingHorizontal: 16
            }}>
                <View>
                    {
                        isBack ? 
                            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={.9}>
                                <ArrowLeft/>
                            </TouchableOpacity>
                            :
                            <LogoSvg/>
                    }
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: '#fff', fontSize: 13, opacity: .6, lineHeight: 13, fontFamily: 'PlusJakartaSans-SemiBold'}}>{moment().format('D, MMM  YYYY')}</Text>
                    <Text style={{color: '#fff', paddingTop: 5, fontSize: 17, lineHeight: 17, fontFamily: 'PlusJakartaSans-SemiBold'}}>{t('logged.loggedheader.welcome', {user: user?.firstname})}</Text>
                </View>
                <View>
                    <TouchableOpacity 
                        activeOpacity={.9}
                        onPress={() => {
                            navigation.navigate('ProfileStack', {
                                screen: 'MainScreen',
                                initial: false,
                            })
                        }}
                        >
                            <View style={styles.avatar}>
                                <Text style={{color: '#FFF', fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 18}}>{user?.firstname.charAt(0)}</Text>
                            </View>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#DB2B36',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default LoggedHeader;