import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OfferCards = () => {
    const carouselItems = [
        { name: 'Chicken' },
        { name: 'Fish' },
        { name: 'Mutton' },
        { name: 'Beef' },
        { name: 'Coldcuts' },

    ];
    const renderItem = ({ item }: any) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* <Image
      style={styles.img123}
      source={{uri: item.image}}/> */}
                <Text style={styles.img123}>{item.name}</Text>
            </View>
        )
    }
    return (
        <View>
            <FlatList
                data={carouselItems}
                renderItem={renderItem}
                horizontal={true} />
        </View>
    )
}

export default OfferCards

const styles = StyleSheet.create({
    img123: {
        height: 80,
        width: 150,
        backgroundColor: 'lightgreen',
        margin: 10
    },
})