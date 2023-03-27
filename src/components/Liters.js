
import React from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import { isEmpty, map } from 'lodash';
import CartPlus from '@assets/media/cartPlus.svg';
import CartMinus from '@assets/media/cartMinus.svg';

const Liters = ({ onChangeLiter, style }) => {
    const [quantity, setQuantity] = React.useState(0);

    React.useEffect(() => {
        onChangeLiter(quantity);
    }, [quantity]);

    const add = () => {
        setQuantity((val) => Number(val)+1);
    }

    const remove = () => {
        if (quantity !== 0) {
            setQuantity((val) => Number(val)-1);
        }
    }

    const addSumLitr = (value) => {
        setQuantity(value);
    }

    return (
        <View style={style}>
            <View style={{ position: 'relative' }}>
                <TouchableOpacity activeOpacity={.9} onPress={() => remove()} style={{ position: 'absolute', zIndex: 2, top: 0, left: 0 }}><CartMinus /></TouchableOpacity>
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
                <TouchableOpacity activeOpacity={.9} onPress={() => add()} style={{ position: 'absolute', zIndex: 2, top: 0, right: 0 }}><CartPlus /></TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

})
export default Liters; 