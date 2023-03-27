
import React, { useState, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import { useTranslation } from "react-i18next";
import { LoggedHeader, FormikFields, Button } from '@components';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import apiHost from "@lib/apiHost";
const ChangePasswordScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const formRef = useRef();
    const [loading, setLoading] = useState(false);


    const onSubmit = async (values) => {
        setLoading(true);
        let token = await AsyncStorage.getItem('token');
        apiHost({
            endpoint: '/update-password',
            method: 'post',
            body: {
                old_password: values.password,
                new_password: values.new_password,
                token: token
            }
        }).then( async (res) => {
            if (res?.ResponseCode == 0) {
                Alert.alert(null, res.ResponseMessage, [{ text: "OK" }]);
                setLoading(false);
            }
            else {
                setLoading(false);
                Alert.alert(null, result?.ResponseMessage, [{ text: "OK", onPress: () =>  navigation.goBack()}]);
            }
        });
    }

    return (
        <KeyboardAwareScrollView bounces={false} contentContainerStyle={{flex: 1}} style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <LoggedHeader isBack navigation={navigation} />
                <View style={{ paddingHorizontal: 16, flex: 1, paddingTop: 30 }}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ color: '#000', lineHeight: 18, fontSize: 18, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29 }}>{t('logged.mainscreen.change_password')}</Text>
                    </View>
                    <View style={{flex :1}}>
                        <Formik
                            initialValues={{
                                password: '',
                                new_password: ''
                            }}
                            onSubmit={onSubmit}
                            innerRef={formRef}
                        >
                            {({ handleSubmit, values }) => (
                                <View style={{flex :1, paddingBottom: 20}}>
                                <View style={{flex: 1}}>
                                    <FormikFields
                                        type="anim"
                                        name="password"
                                        isPassword
                                        label={t("logged.mainscreen.current_password")}
                                        validations={[
                                            {
                                                type: 'required',
                                                message: ''
                                            }
                                        ]}
                                    />
                                    <FormikFields
                                        type="anim"
                                        name="new_password"
                                        isPassword
                                        label={t("logged.mainscreen.new_password")}
                                        validations={[
                                            {
                                                type: 'required',
                                                message: ''
                                            }
                                        ]}
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



export default ChangePasswordScreen;