import React, { useState, useRef, Fragment, useEffect } from 'react';
import { TouchableOpacity, Dimensions, Text, View, StyleSheet } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import GassolineIcon from '@assets/media/gasoline.svg';
import EditIcon from '@assets/media/edit.svg';
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiHost from "@lib/apiHost";

const { width, height } = Dimensions.get('window');

const Cards = () => {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);

    const baseOptions = {
        vertical: false,
        width: width * 0.90,
        height: width / 2,
    };

    useEffect(() => {
        getCards();
    }, []);

    const getCards = async () => {
        let token = await AsyncStorage.getItem('token');
        apiHost({
            endpoint: '/get-user-cards',
            method: 'get',
            body: {
                token: token
            }
        }).then( async (res) => {
            console.log('CARDS', res);
        });
    }


    return (
        <Fragment>
             <Carousel
                {...baseOptions}
                loop={false}
                ref={ref}
                style={{ width: '100%' }}
                autoPlay={false}
                autoPlayInterval={5000}
                data={data}
                pagingEnabled={true}
                onSnapToItem={(index) => setCurrentIndex(index)}
                renderItem={({ item, index }) => (
                    
                    <TouchableOpacity 
                        activeOpacity={.9} 
                        onPress={() => console.log(22)} 
                        style={{marginLeft: data.length === index ? 0 : 16, backgroundColor: index%2 != 1 ? '#DB2B36' : '#000', borderRadius: 8 }}
                    >
                        <View style={{height:185, paddingVertical: 25, paddingHorizontal: 20}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <View>
                                    <Text style={{color: '#FFFFFF', lineHeight: 12, fontSize: 12, opacity: .8, fontFamily: 'PlusJakartaSans-Light', letterSpacing: -.29}}>{t('logged.mainscreen.card_name')}</Text>
                                    <View style={{flexDirection: 'row', marginTop: 3, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{color: '#FFFFFF', lineHeight: 16, fontSize: 16, fontFamily: 'PlusJakartaSans-Bold', letterSpacing: -.29}}>{item.name}</Text>
                                        <View style={{marginLeft: 7, marginTop: -2, opacity: .7}}>
                                            <EditIcon/>
                                        </View>
                                    </View>
                                </View>
                                <View><GassolineIcon/></View>
                            </View>   
                            <View style={styles.grid}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridItemName}>Super Ecto 100</Text>
                                    <Text style={styles.gridItemPrice}>28.20L</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridItemName}>Super ecto</Text>
                                    <Text style={styles.gridItemPrice}>0.00L</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridItemName}>Premium Avangard</Text>
                                    <Text style={styles.gridItemPrice}>0.00L</Text>
                                </View>
                            </View>
                            <View style={styles.grid}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridItemName}>Euro Regular</Text>
                                    <Text style={styles.gridItemPrice}>0.00L</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridItemName}>Euro Diesel</Text>
                                    <Text style={styles.gridItemPrice}>45.00L</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                {
                    data.map((x, indx) => { 
                        return (
                            <View key={indx.toString()} style={{width: 6, height: 6, borderRadius: 6, backgroundColor: '#000', opacity: indx == currentIndex ? 1 : 0.1, marginRight: 4}}/>
                        ) 
                    })
                }
            </View>
        </Fragment>
    )
}
const styles = StyleSheet.create({
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: 20
    },
    gridItem: {
        width: '33.33%',
        marginBottom: 10
    },
    gridItemName: {
        fontSize: 12,
        color: '#fff',
        paddingBottom: 3,
        fontFamily: 'PlusJakartaSans-Medium'
    },
    gridItemPrice: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'PlusJakartaSans-Bold'
    }
})

export default Cards;