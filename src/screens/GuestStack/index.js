import React, { Fragment } from 'react';
import { View } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { MainScreen, RegistrationScreen } from './screens';
const Stack = createStackNavigator();

function GuestStack() {
    return (
        <Fragment>
            <Stack.Navigator initialRouteName={'MainScreen'} screenOptions={{ gestureEnabled: false, }} >
                <Stack.Screen 
                    options={{
                        headerShown: false, 
                        animationEnabled:true,
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
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
                    name="RegistrationScreen" 
                    component={RegistrationScreen}
                    
                />




                
            </Stack.Navigator>
        </Fragment>
    );
}

export default GuestStack;
