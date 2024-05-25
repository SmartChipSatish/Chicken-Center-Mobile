import React, { useEffect, useState } from 'react'
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TEXT_COLORS, THEME_COLORS } from '../../../GlobalStyles/GlobalStyles';
import { AddProductIcon, FavouriteIcon, RemoveProductIcon } from '../../../assets/svgimages/HomeSvgs/svgsIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { QUANTITY_LIMIT, cartProducts, useDetectFirstRender } from '../../utils/constents';
import { setQuantity } from '../../store/slices/ProductsListSlice';
import { setCartProducts } from '../../store/slices/CartProductsSlice';

interface productDetails {
    show: boolean,
    handleClose: () => void,
    productId: string
}

export default function ProductItem({ show, handleClose, productId }: productDetails) {
    const [selectProduct, setSelectProduct] = useState<any>();
    const products = useSelector((store: RootState) => store.products.addProducts);
    const cartItems = useSelector((store: RootState) => store.cartProducts.cartProducts);
    const distach = useDispatch();
    const firstRender = useDetectFirstRender()
    const [amount, setAmount] = useState<number>(0);

    const handleQuantity = (type: string) => {

        if (type === 'add' && selectProduct.quantity !== QUANTITY_LIMIT) {
            const quantity = selectProduct?.quantity + 1
            distach(setQuantity({ id: productId, quantity: quantity }))
            const amount = (selectProduct?.itemPrice * quantity) || 0;
            setAmount(amount);
        } else if (type === 'remove' && selectProduct.quantity !== 1) {
            distach(setQuantity({ id: productId, quantity: selectProduct?.quantity - 1 }))
            const amounts = amount - selectProduct.itemPrice || 0;
            setAmount(amounts);
        }
    }

    const handleAddToCart = () => {
        const data: any = {
            ...selectProduct,
            total: amount
        }
        const cartDatacheck = cartItems.filter((e) => {
            return e.id === productId
        })
        handleClose();
        if (cartDatacheck.length > 0) {
            Alert.alert('product is already added');
        } else {
            distach(setCartProducts(data));
            distach(setQuantity({ id: productId, quantity: 1 }));
            Alert.alert('product added to cart successfully');
        }

    }

    useEffect(() => {
        const data = products.filter((e) => { return e.id === productId })[0]
        setSelectProduct(data);
        if (firstRender) {
            setAmount(data?.itemPrice * data.quantity);
        }
    }, [productId, products]);

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
                                    source={{
                                        uri: selectProduct?.imageUrl,
                                    }}
                                    style={style.image}
                                />
                                <View >
                                    <Text style={style.product_text}>{selectProduct?.itemName+' '+selectProduct?.itemQty}</Text>

                                    <View style={style.product_prices}>
                                        <Text style={style.itemPrice}>₹ {selectProduct?.itemPrice}</Text>
                                        <Text style={{ textDecorationLine: 'line-through' }}>₹ 250</Text>
                                        <FavouriteIcon color={`${THEME_COLORS.secondary}`}
                                            height={25}
                                            width={25}
                                            fill={selectProduct?.favourite ? `${THEME_COLORS.secondary}` : 'none'} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginLeft: 10, marginRight: 10 }}>
                                <View>
                                    <View style={[style.product_quantity, { marginBottom: 10 }]}>
                                        <Text style={style.quantity_text}>Quantity</Text>
                                        <View style={style.add_product_remove}>
                                            <RemoveProductIcon onPress={() => handleQuantity('remove')} 
                                                               style={{marginLeft:6}}/>
                                            <Text style={{ color: `#ffffff`, fontSize: 23 }}>{selectProduct?.quantity}</Text>
                                            <AddProductIcon color={'#ffffff'} 
                                                            onPress={() => handleQuantity('add')} 
                                                            style={{marginRight:6}}/>
                                        </View>
                                    </View>
                                    <Text style={[style.quantity_text, { marginBottom: 10 }]}>Description</Text>
                                </View>
                                <View>
                                    <View style={style.total_amount}>
                                        <Text style={style.quantity_text}>Total Amount :</Text>
                                        <Text style={[style.quantity_text, { color: `${THEME_COLORS.secondary}`, fontWeight: 'bold', marginRight: 5 },]}> ₹ {amount}</Text>
                                        <Text style={{ textDecorationLine: 'line-through' }}>(₹ 250)</Text>
                                    </View>
                                    <TouchableOpacity style={style.add_cart} onPress={handleAddToCart}>
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
        objectFit: 'cover',
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
    itemPrice: {
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
    }, total_amount: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center'
    }
})