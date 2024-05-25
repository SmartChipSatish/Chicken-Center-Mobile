import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TEXT_COLORS, THEME_COLORS } from '../../../GlobalStyles/GlobalStyles';
import { AddProductIcon, FavouriteIcon } from '../../../assets/svgimages/HomeSvgs/svgsIcons';
import { itemData } from '../../utils/constents';

interface productsinfo {
    type: string
    item: itemData
    handleModelShow?: (eve: any, id: string) => void
    handleFav?: (data: itemData) => void
    handleQuantity?: (type: string, item: itemData) => void
}

const ProductsCard = ({ item,
    handleModelShow,
    handleFav,
    type,
    handleQuantity }: productsinfo) => {

    return (
        <>
            <TouchableOpacity key={item.id} style={styles.card_items} onPress={(eve: any) => { type === 'product' && handleModelShow?.(eve, item.id) }}>
                <View style={styles.items_subCard} >
                    <Image
                        source={{
                            uri: item.imageUrl
                        }}
                        style={styles.image}
                    />
                    <View >
                        <Text style={styles.item_text}>{item.itemName+' '+item.itemQty}</Text>
                        <Text style={styles.item_price}>₹ {type ==='cart' ?item.total :item.itemPrice}</Text>
                        <Text style={{ textDecorationLine: 'line-through' }}>₹ 250</Text>
                    </View>
                </View>
                {type === 'product' && <View style={styles.item_addIcon}>
                    <FavouriteIcon color={`${THEME_COLORS.secondary}`}
                        height={25}
                        width={25}
                        fill={item.favourite ? `${THEME_COLORS.secondary}` : 'none'}
                        onPress={() => handleFav?.(item)} />
                    <AddProductIcon color={'#000000'} />
                </View>}
                {type === 'cart' && <View style={styles.quantityContainer}>
                    <Text style={styles.quantityButton} onPress={() => handleQuantity?.('remove', item)}>-</Text>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <Text style={styles.quantityButton} onPress={() => handleQuantity?.('add', item)}>+</Text>
                </View>}
            </TouchableOpacity>
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
        height: 100
    },
    image: {
        width: 85,
        height: 85,
        objectFit: 'cover',
        borderRadius: 10,
        marginRight: 10
    },
    item_text: {
        color: `${TEXT_COLORS.primary}`,
        fontSize: 14,
        marginBottom: 3,
        fontWeight: 'bold',
    }, item_price: {
        color: `${THEME_COLORS.secondary}`,
        fontSize: 15,
        fontWeight: 'bold',
    }, items_subCard: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    item_addIcon: {
        marginRight: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '90%'
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        padding: 5,
    },
    quantityButton: {
        fontSize: 16,
        color: 'maroon',
        paddingHorizontal: 10,
    },
    quantity: {
        fontSize: 16,
        color: TEXT_COLORS.primary,
        marginHorizontal: 10,
    },
})