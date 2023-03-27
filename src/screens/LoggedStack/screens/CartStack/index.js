import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
    MainScreen
} from './screens';
const Stack = createStackNavigator();

function ShopStack() {
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
            </Stack.Navigator>
    );
}

export default ShopStack;
