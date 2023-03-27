import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
    MainScreen,
    OrderScreen,
    PaymentScreen,
    PersonalInfoScreen,
    ChangePasswordScreen
} from './screens';
const Stack = createStackNavigator();

function MainStack() {
    return (
            <Stack.Navigator initialRouteName={'MainScreen'} screenOptions={{ presentation: "modal", gestureEnabled: false, }}>
                <Stack.Screen 
                    options={{
                        headerShown: false, 
                        animationEnabled:true,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} 
                    name="MainScreen" 
                    component={MainScreen}
                />
                <Stack.Screen 
                    options={{
                        headerShown: false, 
                        animationEnabled:true,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} 
                    name="OrderScreen" 
                    component={OrderScreen}
                />
                <Stack.Screen 
                    options={{
                        headerShown: false, 
                        animationEnabled:true,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} 
                    name="PaymentScreen" 
                    component={PaymentScreen}
                />
                <Stack.Screen 
                    options={{
                        headerShown: false, 
                        animationEnabled:true,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }} 
                    name="PersonalInfoScreen" 
                    component={PersonalInfoScreen}
                />
                <Stack.Screen 
                    options={{
                        headerShown: false, 
                        animationEnabled:true,
                        cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                    }} 
                    name="ChangePasswordScreen" 
                    component={ChangePasswordScreen}
                />





            </Stack.Navigator>
    );
}

export default MainStack;
