
import React, { Fragment, useEffect, useState } from 'react';
import { TouchableOpacity, Text, Image, View, Modal, StyleSheet, TextInput, FlatList} from 'react-native';
import { isEmpty, orderBy, filter } from 'lodash';
//import GestureRecognizer from 'react-native-swipe-gestures';
import { ScrollView } from 'react-native-gesture-handler';
import Flags from './resources/flags';

const PhoneNumber = ({onChangeItem}) => {
    const [visible, setVisible] = useState(false);
    const [allCountries, setAllcountries] = useState([]);
    const [value, setValue] = useState('');
    const [selected, setSelected] = useState({
        name: "Georgia (საქართველო)",
        iso2: "ge",
        dialCode: "995"
    });

    useEffect(() => {
        if (visible) {
            getAll();
        }
    }, [visible]);

    useEffect(() => {
        handleSearch(value);
    }, [value]);

    useEffect(() => {
        onChangeItem(selected.dialCode);
    }, [selected])


    const getAll = async () => {
        let countries = await orderBy(require('./resources/countries.json'),['name'],['asc']);
        
        setAllcountries(countries);
    }  

    const handleSearch = async (searchInput) => {
        let countries = await orderBy(require('./resources/countries.json'),['name'],['asc']);
        let filteredData = countries.filter(v => {
            return (
                v.name.toLowerCase().includes(searchInput.toLowerCase())
            );
        });


        setAllcountries(filteredData);
    }

    const onPressItem = (item) => {
        setSelected(item);
        setVisible(false);
    }


    return (
        <Fragment>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{marginRight: 5}}><Image accessibilityIgnoresInvertColors={true} source={Flags.get(selected.iso2)} style={[styles.flag]} /></View>
                    <Text style={{fontSize: 14, color: 'rgba(36, 36, 36, .9)'}}>+{selected.dialCode}</Text>
                </View>
            </TouchableOpacity>
                {/* <GestureRecognizer>
                    <Modal useNativeDriver={true} animationType="slide" visible={visible} transparent={true} style={styles.modal} backdropOpacity = {.1}>
                        <TouchableOpacity onPress={() => setVisible(false)} activeOpacity={1} style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0, .02)' }}>
                            <View style={{flex: .6, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
                                <View style={{padding: 16}}>
                                    <TextInput
                                        placeholder='Search...'
                                        value={value}
                                        onChangeText={(e) => setValue(e)}
                                        placeholderTextColor="rgba(36, 36, 36, .6)"
                                        style={{
                                            backgroundColor: '#fff',
                                            borderWidth: 1,
                                            borderColor: 'rgba(0, 0, 0, 0.09)',
                                            height: 46,
                                            paddingHorizontal: 10,
                                            borderRadius: 5,
                                            fontSize: 14,
                                            fontFamily: 'Quicksand-Medium',
                                            color: 'rgba(36, 36, 36, .6)'
                                        }}
                                    />
                                </View>
                                <FlatList
                                    data={allCountries}
                                    keyExtractor={(item, index) => index.toString()+'_ca'}
                                    keyboardShouldPersistTaps='handled'
                                    renderItem={({ item }) => 
                                        <TouchableOpacity
                                            activeOpacity={.9}
                                            style={{
                                                height: 45, 
                                                borderBottomWidth: 1, 
                                                borderBottomColor: 'rgba(0, 0, 0, 0.09)', 
                                                backgroundColor: '#fff',
                                                justifyContent: 'center',
                                                paddingHorizontal: 15,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                alignContent: 'center'
                                            }} 
                                            onPress={() => onPressItem(item)}
                                        >
                                            <View style={{flexDirection: 'row'}}>
                                                <View style={{marginRight: 5}}><Image accessibilityIgnoresInvertColors={true} source={Flags.get(item.iso2)} style={[styles.flag]} /></View>
                                                <Text style={{fontFamily: 'Quicksand-Bold', color: 'rgba(36, 36, 36, .9)'}}>+{item.dialCode}</Text>
                                            </View>
                                            <View style={{width: 200}}>
                                                <Text ellipsizeMode='tail' numberOfLines={1} style={{textAlign: 'right', fontFamily: 'Quicksand-Medium', color: 'rgba(36, 36, 36, .9)'}}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }

                                />
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </GestureRecognizer> */}
        </Fragment>
    );
}
const styles =  StyleSheet.create({
    modal: {
      backgroundColor: 'white',
      margin: 0, // This is the important style you need to set
      alignItems: undefined,
      justifyContent: undefined,
    },
    flag: {
        height: 20,
        width: 30,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#cecece',
        backgroundColor: '#cecece',
    },
});
export default PhoneNumber;