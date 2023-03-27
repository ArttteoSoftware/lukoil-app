import { createContext } from 'react';

export const ProductListContext = createContext({
    productList: [],
    updateProductList: () => {
        throw new Error('updateCartList() not implemented');
    },
});