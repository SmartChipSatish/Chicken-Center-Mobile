import React from 'react'
import { Button, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';


export default function ProductItem({ show, handleClose }: { show: boolean, handleClose: () => void, }) {

    return (
        <>
            {show && <Modal
                transparent={true}
                visible={show}
                onRequestClose={handleClose}
            >
                <TouchableWithoutFeedback onPress={handleClose}>
                    <View style={style.modalContainer}>
                        <View style={style.modalContent}>
                            <View style={{ marginTop: 10 }}>
                                <Text>Hello Nasa</Text>
                            </View>
                            <View style={style.inputContainer}>
                                <Button title='X' onPress={handleClose} />
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
    modalContent: {
        backgroundColor: '#ffff',
        padding: 30,
    },
    numberVerificationBtn: {
        marginTop: 10,
        backgroundColor: 'red',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    mobileNo_textInput: {
        //    borderBottomWidt
        height: 58,
        marginTop: 20,
        width: '90%',
        alignSelf: "center",
        padding: 10,
        fontSize: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        // borderBottomWidth: 1,
        height: 58,
        width: '100%',
        alignItems: 'center',
        marginVertical: 32
    }
})