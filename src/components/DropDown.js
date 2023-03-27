
import React from 'react';
import { TouchableOpacity, View, Text, Animated, ScrollView, StyleSheet } from 'react-native';
import { isEmpty, map } from 'lodash';
import ArrowDown from '@assets/media/arrow-down.svg';
import CloseIcon from '@assets/media/close11.svg';

const DropDown = ({data, maxHeight, onSelect, placeholder, style, icon}) => {
    const [_firstRender, _setFirstRender] = React.useState(true);
    const [dropdown, setDropdown] = React.useState(false);
    const [selectedval, setSelectedVal] = React.useState("");
    const [height, setHeight] = React.useState(200);
    const animatedvalue = React.useRef(new Animated.Value(0)).current;

    const slidedown = () => {
        setDropdown(true)
        Animated.timing(animatedvalue,{
            toValue:height,
            duration:200,
            useNativeDriver:false,
        }).start()
    }

    const slideup = () => {    
        Animated.timing(animatedvalue,{
            toValue:0,
            duration:200,
            useNativeDriver:false,
            
        }).start(() => setDropdown(false))
    }

    React.useEffect( () => {
        if(maxHeight) setHeight(maxHeight)
    },[maxHeight]);


    React.useEffect(() => {
        if(_firstRender){
          _setFirstRender(false);
          return;
        }
    },[selectedval]);

    const onSelectItem = (item) => {
        setSelectedVal(item);
        onSelect(item);
        slideup();
    }

    const onClearSelect = () => {
        setSelectedVal("");
        slideup();
        onSelect(null);
    }


    return (
        <View style={{...style, position: 'relative', zIndex: 33}}>
        <TouchableOpacity 
            activeOpacity={.9} 
            style={[styles.dropdown, { borderBottomRightRadius: dropdown ? 0 : 8, borderBottomLeftRadius: dropdown ? 0 : 8 }]} 
            onPress={() => { if(!dropdown){ slidedown() } else { slideup() } }}
        >
            <View style={{flexDirection: icon ? 'row' : null, alignItems: icon ? 'center' : null}}>
                {icon ? <View style={{marginRight: 5}}>{icon}</View> : null}
                <Text style={[styles.placeholder, {opacity: selectedval == "" ? .6 : 1, paddingTop: icon ? 2.5 : 0}]}>
                    { (selectedval == "") ? (placeholder) ? placeholder : 'Select option' : selectedval?.name  }
                </Text>
            </View>

            {!dropdown && isEmpty(selectedval) ? <ArrowDown/> : <TouchableOpacity activeOpacity={.9} style={{padding: 10, marginRight: -10}} onPress={() => onClearSelect()}><CloseIcon/></TouchableOpacity>}
        </TouchableOpacity>
        {
            dropdown && 
            <Animated.View style={[styles.shadow, {maxHeight:animatedvalue, position: 'absolute', zIndex: 33, top: 48, width: '100%'}]}>
                <ScrollView style={[styles.dropdownopened]} nestedScrollEnabled={true}>
                    {
                        !isEmpty(data) ? map(data, (x, index) => {
                            let isLastIndex = data.length === index+1;
                            return (
                                <TouchableOpacity 
                                    onPress={() => onSelectItem(x)}
                                    activeOpacity={.9}
                                    style={[styles.listItems, {borderBottomWidth: isLastIndex ? 0 : 1, flexDirection: icon ? 'row' : null, alignItems: icon ? 'center' : null }]} 
                                    key={index.toString()+'_list_data'+x.id}
                                >
                                    {icon ? <View style={{marginRight: 5}}>{icon}</View> : null}
                                    <Text style={[styles.listText, {paddingTop: icon ? 2.5 : 0}]}>{x.name}</Text>
                                </TouchableOpacity>
                            )
                        }) : <View style={{padding: 16, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.emptyData}>Data is Empty</Text>
                            </View>
                    }
                </ScrollView>
            </Animated.View>
        }
        </View>
    )
}
const styles = StyleSheet.create({
    listText: {
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: 13,
        lineHeight: 13
    }, 
    dropdown: {
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.1)',
        height: 48,
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 16,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },
    placeholder: {
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: 14,
        lineHeight: 14,
        color: '#000'
    },
    shadow: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    dropdownopened: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderLeftColor:'rgba(0, 0, 0, 0.1)',
        borderRightColor:'rgba(0, 0, 0, 0.1)',
        borderBottomColor:'rgba(0, 0, 0, 0.1)',
        borderTopColor:'rgba(0, 0, 0, 0)',
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginTop: 0,
    },
    emptyData: {
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: 14,
        lineHeight: 14,
        color: '#000',
        opacity: .6
    },
    listItems: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#fff',
        borderBottomColor:'rgba(0, 0, 0, 0.1)'
    }
})
export default DropDown;