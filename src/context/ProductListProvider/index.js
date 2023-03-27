import React, {useState} from 'react';
import { ProductListContext } from '../ProductListContext';

export const ProductListProvider = ({children}) => {
    const [productList, setProductList] = useState([]);
        
    const updateProductList = data => {
        setProductList(data);
    };

    return (
        <ProductListContext.Provider
        value={{
            productList: productList,
            updateProductList: updateProductList,
        }}>
        {children}
        </ProductListContext.Provider>
    );
};