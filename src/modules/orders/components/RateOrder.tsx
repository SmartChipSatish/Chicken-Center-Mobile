import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Modal, TouchableOpacity, TextInput, Alert, ToastAndroid } from 'react-native';
import { THEME_COLORS } from '../../../globalStyle/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CrossMark from '../../../assets/svgimages/util';
const tick = require('../../../assets/Images/tick.png');
const RateOrder = ({ show, handleClose }: any) => {
    const navigation = useNavigation<any>();
    const starRatingOptions = [1, 2, 3, 4, 5];
    const [starRating, setStarRating] = useState<any>(null);
    const [comment, setComment] = useState<string>('');
    
    const handleSubmit = () => {
        if(starRating === null) {
            // Alert.alert("Rating required", "Please select a rating before submitting.")
            ToastAndroid.showWithGravity("Rating required. Please select a rating before submitting.", 
            ToastAndroid.CENTER, 
            ToastAndroid.CENTER);
        }else{
             const data = {
            rating: starRating,
            comment: comment
        }
        handleClose()
        }
       
    }
    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
            onRequestClose={handleClose}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Rate Order</Text>
                    <TouchableOpacity onPress={() => { handleClose()}}>
                    <View style={{}}>
                        <CrossMark color={'white'} width={18} height={18}></CrossMark>
                    </View>
                    </TouchableOpacity>
                </View>
              
                <View style={styles.content}>
                    <View style={styles.stars}>
                        {starRatingOptions.map((option, index) => (
                            <TouchableOpacity key={index} onPress={() => setStarRating(option)}>
                                <Ionicons
                                    name={starRating >= option ? 'star' : 'star-outline'}
                                    size={32}
                                    style={starRating >= option ? styles.starSelected : styles.starUnselected} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Write your review here..."
                        multiline
                        numberOfLines={4}
                        onChangeText={text => setComment(text)}
                        value={comment}
                    />
                    <Button
                        title="Submit"
                        onPress={() => handleSubmit()}
                        color={THEME_COLORS.secondary}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        
    },
    header: {
        width: '80%',
        backgroundColor: THEME_COLORS.secondary,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        flexDirection:'row'
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        width: '80%',
        gap:10
    },
    checkmark: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    orderPlacedText: {
        fontSize: 20,
        color: 'green',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderDetailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    emailText: {
        fontSize: 14,
        color: 'grey',
        textAlign: 'center',
        marginTop: 20
    },
    AlltextColors: {
        color: "grey",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },
    textRows: {
        flex: 0,
        flexDirection: 'row'
    },
    starUnselected: {
        color: '#aaa',
    },
    starSelected: {
        color: '#ffb300',
    },
    stars: {
        display: 'flex',
        flexDirection: 'row',
    },
    commentInput: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
        textAlignVertical: 'top',
    },
});

export default RateOrder;