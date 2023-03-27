import React from 'react';
import { LogBox } from 'react-native';
import { AuthProvider } from './src/context';
import { ProductListProvider } from './src/context/ProductListProvider';
import { CartListProvider } from './src/context/CartListProvider';
import './src/lib/i18n';
import MainRootScreen from './src/screens';
LogBox.ignoreLogs(["ViewPropTypes will be removed", "ColorPropType will be removed", "`useNativeDriver` was not specified."]);

const App = () => {

    return (
        <AuthProvider>
            <ProductListProvider>
                <CartListProvider>
                    <MainRootScreen/>
                </CartListProvider>
            </ProductListProvider>
        </AuthProvider>
    )
}

export default App;