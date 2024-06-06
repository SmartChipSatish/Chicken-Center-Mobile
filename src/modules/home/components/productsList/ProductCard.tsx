import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { TEXT_COLORS, THEME_COLORS } from '../../../../globalStyle/GlobalStyles';
import { FavouriteIcon } from '../../../../assets/svgimages/HomeSvgs/svgsIcons';
import { itemData } from '../../utils/constents';
import { handelAddToCart, handleCartQuantity } from '../../utils/AddTocartAndQuantity';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';




interface productsinfo {
    type: string
    item: itemData
    handleFav?: (data: itemData) => void

}

const ProductsCard: React.FC<productsinfo> = ({ item,
    handleFav,
    type,
}) => {
    const dispatch = useDispatch();
    const products = useSelector((store: RootState) => store.products.addProducts);




const addtocart=(id:string)=>{
    const cartItem= products.filter((e)=>(e.id===id))[0];
    handelAddToCart(id,dispatch,cartItem);
}




    return (
        <>
            <View key={item.id} style={styles.card_items} >
                <View style={styles.items_subCard} >
                    <Image
                        source={{
                            uri: item.imageUrl
                        }}
                        style={styles.image}
                    />
                    <View style={{width:'50%'}}>
                        <Text style={styles.item_text}>{item.itemName + ' ' + item.itemQty}</Text>
                        {/* <Text style={styles.item_price}>₹ {type === 'cart' ? item.total : item.itemPrice}</Text> */}
                        <Text style={styles.item_price}>₹ {item.itemPrice}</Text>
                        <Text style={{ textDecorationLine: 'line-through' }}>₹ 250</Text>
                    </View>
                </View>
                <View style={[type === 'cart' ? styles.add_cart : styles.add_fav,{width:'25%',paddingRight:'1%'}]}>
                    {type === 'product' && <View >
                        <FavouriteIcon color={`${THEME_COLORS.secondary}`}
                            height={25}
                            width={25}
                            fill={item.favourite ? `${THEME_COLORS.secondary}` : 'none'}
                            onPress={() => handleFav?.(item)} />
                    </View>}
                    {(item.showQuantity || type === 'cart') && <View style={styles.quantityContainer}>
                        <Text style={styles.quantityButton} onPress={() => handleCartQuantity('remove', item, dispatch)}>-</Text>
                        <Text style={styles.quantity}>{item.quantity}</Text>
                        <Text style={styles.quantityButton} onPress={() => handleCartQuantity('add', item, dispatch)}>+</Text>
                    </View>}
                    {!item.showQuantity && type === 'product' && item.globalItemStatus && <TouchableOpacity
                        onPress={() => addtocart(item.id)}>
                        <Text style={[styles.addBtn,{padding:5}]}>Add</Text>
                    </TouchableOpacity>}
                    {!item.showQuantity && type === 'product' && !item.globalItemStatus && <View
                    >
                        <Text style={[styles.addBtn, { color: THEME_COLORS.secondary, backgroundColor: TEXT_COLORS.whiteColor }]}>Not Available</Text>
                    </View>}
                </View>
            </View>
        </>
    )
}

export default ProductsCard

const styles = StyleSheet.create({
    img123: {
        borderRadius: 50
    },
    card_items: {
        borderWidth: 1,
        borderColor: '#ddd',
        width: '98%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: `${TEXT_COLORS.primary}`,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        marginBottom: '0%'
    },
    image: {
        width: 85,
        height: 85,
        objectFit: 'cover',
        borderRadius: 10,
        marginRight: 10
    },
    item_text: {
        color: '#626364',
        fontSize: 15,
        marginBottom: 3,
        fontWeight: '700',
    }, item_price: {
        color: `${THEME_COLORS.secondary}`,
        fontSize: 15,
        fontWeight: 'bold',
    }, items_subCard: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        padding: 5,
    },
    quantityButton: {
        fontSize: 20,
        color: `${THEME_COLORS.secondary}`,
        paddingHorizontal: 10,
    },
    quantity: {
        fontSize: 16,
        color: TEXT_COLORS.primary,
        marginHorizontal: 10,
    }, add_fav: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: '90%'
    }, addBtn: {
        backgroundColor: THEME_COLORS.secondary,
        color: TEXT_COLORS.whiteColor,
        borderRadius: 10,
    }, add_cart: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})