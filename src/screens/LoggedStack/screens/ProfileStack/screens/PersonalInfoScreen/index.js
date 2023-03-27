
import React, { useState, Fragment, useEffect, useContext, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import { useTranslation } from "react-i18next";
import { LoggedHeader, FormikFields, Button } from '@components';
import { Formik } from 'formik';
import myApi from "@lib/api";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useAuthState, useAuthDispatch, setCurrentUser } from '@context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiHost from "@lib/apiHost";
import { isEmpty } from 'lodash'
const PaymentScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const formRef = useRef();
    const { user } = useAuthState();
    const dispatch = useAuthDispatch();
    const [loading, setLoading] = useState(false);
    
    const onSubmit = async (values) => {
        setLoading(true);
        let token = await AsyncStorage.getItem('token');
        apiHost({
            endpoint: '/update-profile',
            method: 'post',
            body: {
                firstname: values.firstname,
                lastname: values.lastname,
                token: token
            }
        }).then( async (res) => {
            if (res?.user?.ResponseCode == 0) {
                setLoading(false);
            }
            else {
                await setCurrentUser(dispatch, res.user);
                setLoading(false);
                Alert.alert(null, "Data updated successfully", [{ text: "OK" }]);
            }
        });
    }

    return (
        <KeyboardAwareScrollView bounces={false} contentContainerStyle={{flex: 1}} style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <LoggedHeader isBack navigation={navigation} />
                <View style={{ paddingHorizontal: 16, flex: 1, paddingTop: 30 }}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ color: '#000', lineHeight: 18, fontSize: 18, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29 }}>{t('logged.mainscreen.personal_info')}</Text>
                    </View>
                    <View style={{flex :1}}>
                        <Formik
                            initialValues={{password: '******', ...user}}
                            onSubmit={onSubmit}
                            innerRef={formRef}
                        >
                            {({ handleSubmit, values }) => (
                                <View style={{flex :1, paddingBottom: 20}}>
                                <View style={{flex: 1}}>
                                    <FormikFields
                                        type="anim"
                                        name="firstname"
                                        label={t("guest.first_name")}
                                        edit
                                        validations={[
                                            {
                                                type: 'required',
                                                message: ''
                                            }
                                        ]}
                                    />
                                    <FormikFields
                                        type="anim"
                                        name="lastname"
                                        label={t("guest.last_name")}
                                        edit
                                        validations={[
                                            {
                                                type: 'required',
                                                message: ''
                                            }
                                        ]}
                                    />
                                    {!isEmpty(user?.email) && <FormikFields
                                        type="anim"
                                        name="email"
                                        label={t("guest.email")}
                                        disabled
                                    />}
                                    <FormikFields
                                        type="anim"
                                        name="phone"
                                        disabled
                                        label={t("guest.phone")}
                                    />
                                    <FormikFields
                                        onPress={() => navigation.navigate('ChangePasswordScreen')}
                                        disabled
                                        type="anim"
                                        name="password"
                                        edit
                                        isPassword
                                        label={t("guest.password")}
                                    />
                                </View>
                                    <Button loading={loading} onPress={handleSubmit}>Save changes</Button>
                                </View>
                            )}
                        </Formik>
                        {/*  */}
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}



export default PaymentScreen;