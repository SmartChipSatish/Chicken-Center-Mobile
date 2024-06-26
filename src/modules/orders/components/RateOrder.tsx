import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Modal, TouchableOpacity, TextInput, Alert, ToastAndroid } from 'react-native';
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyle/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CrossMark from '../../../assets/svgimages/util';
const tick = require('../../../assets/Images/tick.png');

const RateOrder = ({ show, handleClose }:{show:boolean,handleClose:()=>void}) => {
    const navigation = useNavigation();
    const starRatingOptions = [1, 2, 3, 4, 5];
    const [starRating, setStarRating] = useState<number>(0);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        if (starRating === null) {
            ToastAndroid.showWithGravity("Rating required. Please select a rating before submitting.",
                ToastAndroid.CENTER,
                ToastAndroid.CENTER);
        } else {
            const data = {
                rating: starRating,
                comment: comment
            }
            handleClose();
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
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Rate Order</Text>
                        <TouchableOpacity onPress={handleClose} style={styles.crossMarkContainer}>
                            <CrossMark color={'white'} width={18} height={18} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.stars}>
                            {starRatingOptions.map((option, index) => (
                                <TouchableOpacity key={index} onPress={() => setStarRating(option)}>
                                    <Ionicons
                                        name={starRating >= option ? 'star' : 'star-outline'}
                                        size={32}
                                        style={starRating >= option ? styles.starSelected : styles.starUnselected} 
                                        />
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
                            placeholderTextColor={TEXT_COLORS.primary}
                        />
                        {/* <Button
                            title="Submit"
                            onPress={handleSubmit}
                            color={THEME_COLORS.secondary}
                        
                        /> */}
                        <TouchableOpacity style={styles.sub_btn}>
                            <Text style={styles.sub_text}>Submit</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    header: {
        backgroundColor: THEME_COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        position: 'relative',
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    crossMarkContainer: {
        position: 'absolute',
        right: 8,
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    starUnselected: {
        color: '#aaa',
    },
    starSelected: {
        color: '#ffb300',
    },
    stars: {
        flexDirection: 'row',
        marginBottom: 20,
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
        color:TEXT_COLORS.primary,
        fontSize:16
    },sub_btn:{
        backgroundColor:THEME_COLORS.secondary,
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        height:30,
        borderRadius:5
    },sub_text:{
        color:TEXT_COLORS.whiteColor,
        fontSize:18,
    }
});

export default RateOrder;
