import React, {useState} from 'react';
import { CartListContext } from '../CartListContext';

export const CartListProvider = ({children}) => {
    const [cartList, setCartList] = useState([]);
        
    const updateCartList = cartListInformation => {
        setCartList(cartListInformation);
    };

    return (
        <CartListContext.Provider
        value={{
            cartList: cartList,
            updateCartList: updateCartList,
        }}>
        {children}
        </CartListContext.Provider>
    );
};