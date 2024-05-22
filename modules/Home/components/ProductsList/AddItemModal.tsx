import React, { useState } from 'react'
import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TEXT_COLORS, THEME_COLORS } from '../../../GlobalStyles/GlobalStyles';
import { AddProductIcon, FavouriteIcon, RemoveProductIcon } from '../../../assets/svgimages/HomeSvgs/svgsIcons';


export default function ProductItem({ show, handleClose }: { show: boolean, handleClose: () => void, }) {
    const image = require('../../../../modules/assets/svgimages/HomeSvgs/carouselimages/Chickenimg.png')
    const [count, setCount] = useState(1);
    const [amount,setAmount]=useState(200);
    return (
        <>
            {show && <Modal
                transparent={true}
                visible={show}
                onRequestClose={handleClose}
            >
                <TouchableWithoutFeedback onPress={handleClose}>
                    <View style={style.modalContainer}>
                        <View style={style.selected_product}>
                            <View style={style.product_details}>
                                <Image
                                    source={image}
                                    style={style.image}
                                />
                                <View >
                                    <Text style={style.product_text}>Chicken Skinless</Text>
                                    <View style={style.product_prices}>
                                        <Text style={style.price}>₹ 100</Text>
                                        <Text style={{ textDecorationLine: 'line-through' }}>₹ 250</Text>
                                        <FavouriteIcon color={`${THEME_COLORS.secondary}`}
                                            height={25}
                                            width={25}
                                            fill={'none'} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginLeft: 10, marginRight: 10 }}>
                                <View>
                                    <View style={[style.product_quantity, { marginBottom: 10 }]}>
                                        <Text style={style.quantity_text}>Quantity</Text>
                                        <View style={style.add_product_remove}>
                                            <RemoveProductIcon onPress={() => count !==1 && setCount(count - 1)} />
                                            <Text style={{ color: `#ffffff`, fontSize: 23 }}>{count}</Text>
                                            <AddProductIcon color={'#ffffff'} onPress={() =>count !==10 &&setCount(count + 1)} />
                                        </View>
                                    </View>
                                    <Text style={[style.quantity_text, { marginBottom: 10 }]}>Description</Text>
                                </View>
                                <View>
                                    <View style={style.total_amount}>
                                       <Text style={style.quantity_text}>Total Amount :</Text>
                                        <Text style={[style.quantity_text,{color:`${THEME_COLORS.secondary}`,fontWeight:'bold'},]}> ₹ 200 </Text>
                                        <Text style={{ textDecorationLine: 'line-through'}}>(₹ 250)</Text>
                                    </View>
                                    <TouchableOpacity style={style.add_cart}>
                                        <Text style={{ color: '#ffffff', fontSize: 18 }}>Add to Cart</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>}
        </>
    )
}

const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    image: {
        width: 150,
        height: 150,
        objectFit: 'contain',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
    }, selected_product: {
        backgroundColor: `${THEME_COLORS.primary}`,
        paddingTop: 20,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
    }, product_details: {
        flexDirection: 'row',
    }, product_text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: `${TEXT_COLORS.primary}`
    }, product_prices: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        width: '70%',

    },
    price: {
        color: `${THEME_COLORS.secondary}`,
        fontSize: 18,
        fontWeight: "bold",
    }, product_quantity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    }, quantity_text: {
        color: `${TEXT_COLORS.primary}`,
        // fontWeight:'400',
        fontSize: 18
    }, add_cart: {
        backgroundColor: `${THEME_COLORS.secondary}`,
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5
    }, add_product_remove: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: `${THEME_COLORS.secondary}`,
        borderRadius: 6,
        width: '20%',
        marginRight: 6,
        // height:28    
    },total_amount:{
        flexDirection:'row',
        marginBottom: 10,
        alignItems:'center'
    }
})