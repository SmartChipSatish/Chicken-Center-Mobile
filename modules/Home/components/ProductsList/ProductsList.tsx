import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import ProductItem from './AddItemModal';


const ProductsList = ({ data }: any) => {
    const navigate = useNavigation<any>();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    }

    return (
        <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {data.map((e: any, index: number) => {
                    return (
                        <View key={index} style={{ flex: 1, flexDirection: 'row', width: '98%', borderStyle: 'solid', borderColor: 'black', borderWidth: 1, margin: 5 }} >
                            <View style={{ flex: 1, flexDirection: 'row', width: '60%' }}>
                                <View style={{ padding: 5 }}>
                                    <e.imgUrl />
                                </View>

                                <View >
                                    <Text style={{ fontWeight: 'bold' }}>{e.title}</Text>
                                    <Text>₹ {e.price}</Text>
                                    <Text>{e.quantity}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '38%', paddingLeft: 100 }} >
                                <View style={styles.wrapperCardBottom}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={{ fontWeight: '600' }}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{ paddingHorizontal: 12 }}>3</Text>
                                    <TouchableOpacity style={[styles.button, { borderColor: 'green' }]}>
                                        <Text style={styles.iconPlus}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setShow(true)}>
                                    <Text style={{ backgroundColor: 'red', padding: 3, borderStyle: 'solid', borderColor: 'black', borderWidth: 1 }}>ADD</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}

                {show && <ProductItem show={show} handleClose={handleClose} />}

            </View>
        </View>
    )
}

export default ProductsList

const styles = StyleSheet.create({
    img123: {
        borderRadius: 50
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
})