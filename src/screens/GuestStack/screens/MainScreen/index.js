
import React, { Fragment, useState, useRef, useContext } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Text, FormikFields } from '@components';
import { Formik } from 'formik';
import { useTranslation } from "react-i18next";
import LogoSvg from '@assets/media/logo.svg';
import EmailIcon from '@assets/media/mobile.svg';
import LockIcon from '@assets/media/lock.svg';
import myApi from "@lib/api";
import apiHost from "@lib/apiHost";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthDispatch, useAuthState, setCurrentUser } from '@context';
import { ProductListContext } from '@context/ProductListContext';
import { isEmpty } from 'lodash';
const MainScreen = ({ navigation }) => {
    const [input, setInput] = useState({});
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const formRef = useRef();
    const dispatch = useAuthDispatch();
    const { user } = useAuthState();
    const { updateProductList } = useContext(ProductListContext);

    navigation.addListener('blur', () => {
        if (formRef) {
            formRef?.current?.resetForm();
        }
    });

    const saveInput = () => {
        setLoading(true);
        if (formRef.current) {
            formRef.current.handleSubmit();
            if (formRef.current.isValid) {
                const values = formRef?.current?.values;
                apiHost({
                    endpoint: '/login',
                    method: 'post',
                    body: {
                        username: values.username,
                        password: values.password,
                        userType: 0
                    }
                }).then( async (res) => {
                    getUserByToken(res.token);
                }).catch((err) => {
                    Alert.alert(null, err.message , [{ text: "OK" }]);
                    setLoading(false);
                });
            }
        }
    };

    const getUserByToken = (token) => {
        apiHost({
            endpoint: '/get-current-user',
            method: 'get',
            body: {
                token: token
            }
        }).then( async (res) => {
            if (res?.user?.ResponseCode == 0) {
                Alert.alert(null, res?.user?.ResponseMessage , [{ text: "OK" }]);
                setLoading(false);
            }
            else {
                await AsyncStorage.setItem('token', token);
                if (!isEmpty(res.products)) {
                    const prod = res.products.original.products;
                    setLoading(false);
                    await updateProductList(prod);
                }
                await setCurrentUser(dispatch, res?.user);
                setLoading(false);
            }
        });
    }



    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{backgroundColor: '#000', flex: 1, paddingHorizontal: 16}} keyboardVerticalOffset={20}>
            <View style={{flex:  1, marginBottom: 40}}>
                <View style={{ marginTop: 30,  marginBottom: 20 }}>
                    <LogoSvg />
                    <View style={{ marginTop: 15 }}>
                        <Text font="PlusJakartaSans-SemiBold" size={20}>{t('guest.welcome_text')}</Text>
                        <Text font="PlusJakartaSans-Regular" size={15} style={{ marginTop: 8, opacity: .6 }}>{t('guest.welcome_text_h1')}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity 
                            activeOpacity={.9} 
                            style={{ height: 60, flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#DB2B36'}}>
                            <Text size={17} font="PlusJakartaSans-SemiBold" style={{ opacity: 1 }}>{t('guest.log_in')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen')} activeOpacity={.9} style={{ height: 60, flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#808080' }}>
                            <Text size={17} font="PlusJakartaSans-SemiBold" style={{ opacity: .6 }}>{t('guest.sign_up')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingVertical: 16 }}>
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            onSubmit={(values) => setInput(values)}
                            innerRef={formRef}
                        >
                            {({ handleSubmit, values }) => (
                                <Fragment>
                                    <FormikFields
                                        type="text"
                                        name="username"
                                        label={t("guest.phoneemail")}
                                        icon={<EmailIcon />}
                                        validations={[
                                            {
                                                type: 'required',
                                                message: ''
                                            }
                                        ]}
                                    />
                                    <FormikFields
                                        type="password"
                                        name="password"
                                        label={t("guest.password")}
                                        icon={<LockIcon />}
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
                    <Button onPress={() => saveInput()} loading={loading}>{t('guest.log_in')}</Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
export default MainScreen;