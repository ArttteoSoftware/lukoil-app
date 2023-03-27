import { createContext } from 'react';

export const CartListContext = createContext({
    cartList: [],
    updateCartList: () => {
        throw new Error('updateCartList() not implemented');
    },
});