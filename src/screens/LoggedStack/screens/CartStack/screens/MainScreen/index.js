
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useTranslation } from "react-i18next";
import { LoggedHeader, MiniCard } from '@components'
import Modal from 'react-native-modal';
import { isEmpty, find, forEach, filter, sumBy } from 'lodash';
import EditCarticon from '@assets/media/edit2.svg';
import ModalClose from '@assets/media/modalClose.svg';
import CartPlus from '@assets/media/cartPlus.svg';
import CartMinus from '@assets/media/cartMinus.svg';
import { CartListContext } from '@context/CartListContext';
const MainScreen = ({navigation}) => {
    const { t } = useTranslation();
    const [selected, setSelected] = useState(null);
    const [visible, setVisible] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const { cartList, updateCartList } = useContext(CartListContext);
    
    useEffect(() => {
        if (!isEmpty(selected)) {
            setVisible(true);
            const findItem = find(cartList, (x) => x.id === selected.id);
            if (findItem) {
                setQuantity(findItem.quantity);
            }
        }
    }, [selected]);


    const addToCart = (item) => {
        setSelected(item);
    }

    const getProductDiscount = (item) => {
        return sumBy(item, function(o) { return Number(o.discountamount).toFixed(2); });
    }

    const getProductPrice = (item) => {
        let sumDiscount = sumBy(item?.discounts, function(o) { return Number(o.discountamount).toFixed(2); });
        return (Number(item?.price)-sumDiscount).toFixed(2);
    }

    const itemRender = (item) => {
        return (
            <View style={{padding: 16, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 8, flex: 1}}> 
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <View>
                        <Text numberOfLines={1} style={{color: '#000', lineHeight: 16, fontSize: 16, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{item.name}</Text>
                        <Text>{item.quantity}x</Text>
                        <TouchableOpacity onPress={() => addToCart(item)} activeOpacity={.9} style={{width: 109, height: 36, marginTop: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', borderRadius: 6}}>
                            <View style={{marginRight: 5, opacity: .6}}><EditCarticon/></View>
                            <Text style={{color: '#fff', lineHeight: 13, fontSize: 13, opacity: 1, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>{t('logged.mainscreen.edit')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{color: '#000', lineHeight: 13, fontSize: 13, opacity: .6, fontFamily: 'PlusJakartaSans-Light', letterSpacing: -.29}}>{t('logged.mainscreen.standart_price')}</Text>
                            <Text style={{color: '#000', paddingLeft: 17, lineHeight: 13, fontSize: 13, opacity: 1, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{Number(item?.price).toFixed(2)} GEL</Text>
                        </View>
                        <View style={{marginTop: 17, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{color: '#000', lineHeight: 13, fontSize: 13, opacity: .6, fontFamily: 'PlusJakartaSans-Light', letterSpacing: -.29}}>{t('logged.mainscreen.discount')}</Text>
                            <Text style={{color: '#000', paddingLeft: 17, lineHeight: 13, fontSize: 13, opacity: 1, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{getProductDiscount(item?.discounts)} GEL</Text>
                        </View>
                        <View style={{marginTop: 17, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{color: '#000', lineHeight: 13, fontSize: 13, opacity: .6, fontFamily: 'PlusJakartaSans-Light', letterSpacing: -.29}}>{t('logged.mainscreen.your_price')}</Text>
                            <Text style={{color: '#DB2B36', paddingLeft: 17, lineHeight: 13, fontSize: 13, opacity: 1, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{getProductPrice(item)} GEL</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    const add = () => {
        setQuantity((val) => Number(val)+1);
    }

    const remove = () => {
        if (quantity !== 0) {
            setQuantity((val) => Number(val)-1);
        }
        else {
            const newArr = filter(cartList, (x) => x.id !== selected.id);
           updateCartList(newArr);
            setVisible(false);
        }
    }

    const addSumLitr = (value) => {
        setQuantity(value);
    }

    const addItemTocart = () => {
        const findItem = find(cartList, (x) => x.id === selected.id);
        if (findItem) {
            cartList.forEach((v) => {
                if (selected.id === v.id) { 
                    v.quantity = quantity;
                }
            });
            updateCartList(cartList);
        }
        else {
            selected.quantity = quantity;
            updateCartList([...cartList, selected]);
        }
        setVisible(false);
    }

    const onMoadlFullClosed = () => {
        setSelected(null);
        setQuantity(0);
    }

    const countSumPrice = () => {
        let sumPrice = 0;
        forEach(cartList, (x, index) => {
            const price = Number(x.price);
            const disc = getProductDiscount(x.discounts);
            sumPrice += (price-disc)*x.quantity;
        })
        return sumPrice.toFixed(2);
    }

    const countSumChekoutPrice = () => {
        const disc = selected ? getProductDiscount(selected?.discounts) : 0;
        
        return (quantity*(selected?.price-disc)).toFixed(2);
    }


    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <LoggedHeader navigation={navigation} title={t('logged.mainscreen.cart')} description={t('logged.mainscreen.checkout')}/>
            <MiniCard/>
            <View style={{paddingHorizontal: 16, flex: 1, paddingTop: 20}}>
                <View style={{flex: 1}}>
                <FlatList
                    data={cartList}
                    keyExtractor={(item, index) => item.id+index.toString()}
                    renderItem={({ item, index }) => itemRender(item)}
                    ItemSeparatorComponent={() => <View style={{height: 15}}/>}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#000', opacity: .6}}>Cart empty</Text>
                        </View>
                    }
                />
                </View>
                {!isEmpty(cartList) && <TouchableOpacity style={{
                    marginTop: 15, 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    backgroundColor: '#DB2B36',
                    height: 56,
                    marginBottom: 20,
                    borderRadius: 8,
                    paddingHorizontal: 16
                }} onPress={() => alert(countSumPrice())} activeOpacity={.9}>
                    <Text style={{fontFamily: 'PlusJakartaSans-Bold', lineHeight: 16, fontSize: 16, color: '#fff'}}>{countSumPrice()} GEL</Text>
                    <Text style={{fontFamily: 'PlusJakartaSans-Bold', lineHeight: 16, fontSize: 16, color: '#fff'}}>{t('logged.mainscreen.checkout')}</Text>
                </TouchableOpacity>}
            </View>
            <Modal 
                isVisible={visible}
                style={styles.modal} 
                hasBackdrop={true}
                backdropOpacity={0.6}
                backdropColor="black"
                onModalHide={() => onMoadlFullClosed()}
                onBackdropPress={() => setVisible(false)}
                avoidKeyboard={true}
            >
                <View style={{backgroundColor: '#fff', paddingBottom: 40, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                    <View style={{flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{borderBottomWidth: 1, marginTop: 10, flex: 1, borderBottomColor: '#e5e5e5'}}>
                            <Text style={{color: '#000', paddingVertical: 15, lineHeight: 16, fontSize: 16, opacity: 1, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>Add to cart</Text>
                        </View>
                        <View style={{marginLeft: 10, paddingTop: 20,}}>
                            <TouchableOpacity activeOpacity={.9} onPress={() => setVisible(false)}>
                                <ModalClose/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{paddingHorizontal: 16, paddingTop: 25}}>
                    <View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{color: '#000', lineHeight: 14, fontSize: 14, opacity: .6, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>{t('logged.mainscreen.standart_price')}</Text>
                                <Text style={{color: '#000', lineHeight: 14, fontSize: 14, opacity: 1, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{Number(selected?.price).toFixed(2)} GEL</Text>
                            </View>
                            <View style={{marginTop: 17, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{color: '#000', lineHeight: 14, fontSize: 13, opacity: .6, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>{t('logged.mainscreen.discount')}</Text>
                                <Text style={{color: '#000', lineHeight: 14, fontSize: 14, opacity: 1, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{getProductDiscount(selected?.discounts)} GEL</Text>
                            </View>
                            <View style={{marginTop: 17, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{color: '#000', lineHeight: 14, fontSize: 14, opacity: .6, fontFamily: 'PlusJakartaSans-Medium', letterSpacing: -.29}}>{t('logged.mainscreen.your_price')}</Text>
                                <Text style={{color: '#DB2B36', lineHeight: 14, fontSize: 14, opacity: 1, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{getProductPrice(selected)} GEL</Text>
                            </View>
                        </View>
                        <View style={{marginTop: 15}}>
                            <View>
                                <View style={{position: 'relative'}}>
                                    <TouchableOpacity activeOpacity={.9} onPress={() => remove()} style={{position: 'absolute', zIndex: 2, top: 0, left: 0}}><CartMinus/></TouchableOpacity>
                                    <TextInput
                                        style={{
                                            height: 48, 
                                            paddingHorizontal: 50, 
                                            textAlign: 'center', 
                                            borderTopWidth: 1, 
                                            borderTopColor: '#e5e5e5', 
                                            borderBottomWidth: 1, 
                                            borderBottomColor: '#e5e5e5',
                                            fontFamily: 'PlusJakartaSans-Bold',
                                            fontSize: 16,
                                            color: '#000'
                                        }}
                                        placeholder="0.00L"
                                        value={quantity > 0 ? quantity.toString() : ''}
                                        onChangeText={(e) => addSumLitr(e)}
                                    />
                                    <TouchableOpacity activeOpacity={.9} onPress={() => add()} style={{position: 'absolute', zIndex: 2, top: 0, right: 0}}><CartPlus/></TouchableOpacity>
                                </View>
                                <TouchableOpacity style={{
                                    marginTop: 15, 
                                    flexDirection: 'row', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    backgroundColor: '#DB2B36',
                                    height: 56,
                                    borderRadius: 8,
                                    paddingHorizontal: 16
                                }} onPress={() => addItemTocart()} activeOpacity={.9}>
                                    <Text style={{fontFamily: 'PlusJakartaSans-Bold', lineHeight: 16, fontSize: 16, color: '#fff'}}>{countSumChekoutPrice()} GEL</Text>
                                    <Text style={{fontFamily: 'PlusJakartaSans-Bold', lineHeight: 16, fontSize: 16, color: '#fff'}}>Add to cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
})

export default MainScreen;