import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import ProductItem from './AddItemModal';
import { AddProductIcon, FavouriteIcon } from '../../../assets/svgimages/HomeSvgs/svgsIcons';
import { TEXT_COLORS, THEME_COLORS } from '../../../GlobalStyles/GlobalStyles';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { itemsDetails } from '../../utils/constents';
import { RootState } from '../../../store/store';
import { setFavourite } from '../../store/slices/ProductsListSlice';

const ProductsList = () => {
    const navigate = useNavigation<any>();
    const [show, setShow] = useState(false);
    const [productId,setProductId]=useState<number>(0);
    const handleClose = () => {
        setShow(false)
    }
    const image = require('../../../../modules/assets/svgimages/HomeSvgs/carouselimages/Chickenimg.png')
    const products = useSelector((store: RootState) => store.products.addProducts);;
    const modalShow = (e: { stopPropagation: () => void },itemId:number)=>{
        e.stopPropagation();
        setShow(true)
        setProductId(itemId);
      }
    const dispatch = useDispatch()
    const handleFavourite = (item: any) => {
      console.log(item,'item')
      dispatch(setFavourite(item))
      }
    return (
        <>
            {products.map((e: itemsDetails, index: number) => {
                return (
                    <TouchableOpacity key={e.id} style={styles.card_items}  onPress={(eve)=>{modalShow(eve,e.id);}}>
                        <View style={styles.items_subCard} >
                            <Image
                                source={{
                                    uri:e.imgUrl
                                }}
                                style={styles.image}
                            />
                            <View >
                                <Text style={styles.item_text}>{e.title}</Text>
                                <Text style={styles.item_price}>₹ {e.price}</Text>
                                <Text style={{textDecorationLine: 'line-through'}}>₹ 250</Text>
                            </View>
                        </View>
                        <View style={styles.item_addIcon}>
                            <FavouriteIcon color={`${THEME_COLORS.secondary}`} 
                                           height={25} 
                                           width={25}
                                           fill={e.favourite?`${THEME_COLORS.secondary}`: 'none'}
                                           onPress={()=>handleFavourite(e)}/>
                            <AddProductIcon color={'#000000'}/>
                        </View>
                    </TouchableOpacity>
                )
            })}
            {show && <ProductItem show={show} handleClose={handleClose} productId={productId}/>}

        </>
    )
}

export default ProductsList

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
        height:100
    },
    button: {
        borderWidth: 0.5,
        borderRadius: 4,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconPlus: {
        color: 'green',
        fontWeight: '600',
    },
    wrapperCardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10
    },
    Add_btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `${THEME_COLORS.secondary}`,
        borderRadius: 5,
        padding: 2
    },
    add_text: {
        color: 'black',
        fontSize: 18,
    },
    image: {
        width: 88,
        height: 85,
        objectFit: 'contain',
        borderRadius: 10,
        marginRight:10
    },
    item_text:{
        color:`${TEXT_COLORS.primary}`,
        fontSize:14,
        marginBottom:3, 
        fontWeight: 'bold', 
    },item_price:{
        color:`${THEME_COLORS.secondary}`,
        fontSize:15, 
        fontWeight: 'bold',
    },items_subCard:{
        flexDirection: 'row',
        alignItems:'center'
    },
    item_addIcon:{
        marginRight:10,
        flexDirection:'column',
        justifyContent:'space-between',
        height:'90%'
    }
})