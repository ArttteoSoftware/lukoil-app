
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Button, Text, FormikFields } from '@components';
import { Formik } from 'formik';
import { useTranslation } from "react-i18next";
import LogoSvg from '@assets/media/logo.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import apiHost from "@lib/apiHost";

const RegistrationScreen = ({ navigation }) => {
    const [input, setInput] = useState({});
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const formRef = useRef();

    navigation.addListener('blur', () => {
        if (formRef) {
            formRef?.current?.resetForm();
        }
    });
    

    
    const saveInput = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
            if (formRef.current.isValid) {
                const values = formRef?.current?.values;
                apiHost({
                    endpoint: '/sign-up-request',
                    method: 'post',
                    body: {
                        firstname: values.firstname,
                        lastname: values.lastname,
                        email: values.email,
                        phone: values.phonenumber
                    }
                }).then( async (res) => {
                    Alert.alert(null, t('guest.reg_text'),
                        [{ text: "OK", onPress: () => navigation.navigate("MainScreen")}]
                    );
                    setLoading(false);
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    };

    return (
        <KeyboardAwareScrollView bounces={false} contentContainerStyle={{flex: 1}} style={{flex: 1, backgroundColor: '#000'}} keyboardShouldPersistTaps='always'>
            <View style={{flex:  1, marginBottom: 40, paddingHorizontal: 16}}>
                <View style={{ marginTop: 30,  marginBottom: 20 }}>
                    <LogoSvg />
                    <View style={{ marginTop: 15 }}>
                        <Text font="PlusJakartaSans-SemiBold" size={20}>{t('guest.welcome_text')}</Text>
                        <Text font="PlusJakartaSans-Regular" size={15} style={{ marginTop: 8, opacity: .6 }}>{t('guest.welcome_text_h1')}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('MainScreen')} activeOpacity={.9} style={{ height: 60, flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#808080' }}>
                            <Text size={17} font="PlusJakartaSans-SemiBold" style={{ opacity: .6 }}>{t('guest.log_in')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.9} style={{ height: 60, flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#DB2B36'}}>
                            <Text size={17} font="PlusJakartaSans-SemiBold" style={{ opacity: 1 }}>{t('guest.sign_up')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingVertical: 16 }}>                           
                        <Formik
                            initialValues={{ 
                                firstname: '', 
                                lastname: '',
                                email: '',
                                phonenumber: ''
                            }}
                            onSubmit={(values) => setInput(values)}
                            innerRef={formRef}
                        >
                            {({ handleSubmit, values }) => (
                                <Fragment>
                                    <FormikFields
                                        type="text"
                                        name="firstname"
                                        label={t("guest.first_name")}
                                        validations={[
                                            {
                                                type: 'required',
                                                message: ''
                                            }
                                        ]}
                                    />
                                    <FormikFields
                                        type="text"
                                        name="lastname"
                                        label={t("guest.last_name")}
                                        validations={[
                                            {
                                                type: 'required',
                                                message: ''
                                            }
                                        ]}
                                    />
                                    <FormikFields
                                        type="text"
                                        name="phonenumber"
                                        label={t("guest.phone_number")}
                                        validations={[
                                            {
                                                type: 'required',
                                                message: ''
                                            }
                                        ]}
                                    />
                                    <FormikFields
                                        type="text"
                                        name="email"
                                        label={t("guest.email")}
                                        validations={[
                                            {
                                                type: 'required',
                                                message: ''
                                            }
                                        ]}
                                    />
                                </Fragment>
                            )}
                        </Formik>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                        <Text style={{ opacity: .6 }}>{t('guest.by_clicking')}</Text>
                        <TouchableOpacity activeOpacity={.9} onPress={() => console.log(1)}>
                            <Text style={{ paddingLeft: 5 }}>{t('guest.terms_conditions')}</Text>
                        </TouchableOpacity>
                    </View>
                    <Button loading={loading} onPress={() => saveInput()}>{t('guest.sign_up')}</Button>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}
export default RegistrationScreen;