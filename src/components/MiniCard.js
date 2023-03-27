
import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import GassolineIcon from '@assets/media/gasolineSmall.svg';

const MiniCard = () => {
    const { t } = useTranslation();
    return (
        <View style={{alignItems: 'center', justifyContent: 'center',marginTop: -45}}>
            <View style={{backgroundColor: '#DB2B36', borderWidth: 2, borderColor: '#fff', padding: 8, width: 155, height: 86, borderRadius: 8, }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Text style={{fontSize: 10, color: '#fff', fontFamily: 'PlusJakartaSans-Light'}}>{t('logged.mainscreen.card_name')}</Text>
                        <Text style={{fontSize: 13, color: '#fff', fontFamily: 'PlusJakartaSans-Bold'}}>Main card</Text>
                    </View>
                    <View>
                        <GassolineIcon/>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default MiniCard; 