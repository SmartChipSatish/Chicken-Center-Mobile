import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Modal, TouchableOpacity, Alert } from 'react-native';
import { TEXT_COLORS, TEXT_FONT_SIZE, THEME_COLORS } from '../GlobalStyles/GlobalStyles';
import CrossMark from '../assets/svgimages/util';
import Rating from './Rating';
import OrderSummary from './OrderSummary';
import Cartitems from '../Home/components/Cart/CartItems';

export default function GlobalOrders() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [RateVisible,setRateVisible]=useState(false)
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Chicken chest',
      image: 'https://img.freepik.com/premium-photo/raw-whole-chicken-with-skin-arranged-grill_527904-677.jpg',
      priceBeforeDiscount: 150,
      price: 100,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Chicken liver',
      image: 'https://media.istockphoto.com/photos/chicken-meat-picture-id1319903960?k=20&m=1319903960&s=612x612&w=0&h=_VBryQo-J1RmuBGCS6OIfKiimN5wnQEcyWnH6hywcjE=',
      priceBeforeDiscount: 200,
      price: 150,
      quantity: 1,
    },
    {
      id: 1,
      name: 'Chicken chest',
      image: 'https://img.freepik.com/premium-photo/raw-whole-chicken-with-skin-arranged-grill_527904-677.jpg',
      priceBeforeDiscount: 150,
      price: 100,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Chicken liver',
      image: 'https://media.istockphoto.com/photos/chicken-meat-picture-id1319903960?k=20&m=1319903960&s=612x612&w=0&h=_VBryQo-J1RmuBGCS6OIfKiimN5wnQEcyWnH6hywcjE=',
      priceBeforeDiscount: 200,
      price: 150,
      quantity: 1,
    },
  ]);

  

  return (
    <View>
      <ScrollView >
       <TouchableOpacity >
       <View style={styles.container} >
          {/*displaying items here */}
          {items.map((item, index) => (
            <TouchableOpacity  onPress={()=>{setModalVisible1(true)}}>
              <View key={index} style={styles.card}>

<Image style={styles.tinyLogo} source={{ uri: item.image }} />
<Text style={styles.orderId}>Shipment ID: 000zx4933pxz</Text>
<View style={styles.cardContent}>
  <Text style={styles.title}>{item.name}</Text>
  <View style={styles.ordersPlace}>
    <Text style={styles.price}>500gms </Text>
    <Text> |</Text>
    <Text style={styles.price1}> ₹{item.price}</Text>
    <Text> |</Text>
    <Text style={styles.price2}> Qty.1</Text>
  </View>

  <View style={styles.rightAlign}>
    <View style={styles.quantityContainer}>
    </View>
  </View>
  <View style={styles.separator}></View>
  <View style={styles.twoButtons}>
    <Text style={styles.RepeatColor}>Repeat</Text>
    { <TouchableOpacity onPress={(e) => { setModalVisible(true)
      console.log(e,"syam")
     }}>
      <Text style={styles.RepeatColor1}>Rate order</Text>
    </TouchableOpacity>}
    { <View>
    {/* <Image
        style={styles.tinyLogo2}
        source={{
          uri: "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png",
        }}
      />
      <Text>Rating submitted.Thank you!</Text> */}
    </View>}
   
  </View>

 

</View>
</View>
            </TouchableOpacity>
          ))}
        </View>
       </TouchableOpacity>

        {/* {Rate-order-model} */}

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <View style={styles.crossMark}>
                      <CrossMark color={'black'} width={25} height={25}></CrossMark>
                    </View>
                  </TouchableOpacity>
                  
                  <View style={styles.textColorsone}>
                    <Text style={styles.orderText}>How would you rate the products you ordered?</Text>
                  </View>
                  <ScrollView style={{ width: "95%" }} >
                    {items.map((item, index) => {
                      return (
                        <View >
                          <View style={styles.card1}>
                            <View>

                              <View style={{ display: "flex", flexDirection: "row" }}>
                                <Image
                                  style={styles.tinyLogo}
                                  source={{
                                    uri: item.image,
                                  }}
                                />
                                <View style={styles.ordersPlace1}>
                                  <Text style={styles.textAll}>{item.name}</Text>
                                  <Rating></Rating>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      )
                    })}

                    
                  </ScrollView>
                  <TouchableOpacity 
                  onPress={() => {
                    
                    Alert.alert("submited successfull")
                    setTimeout(()=>{
                      setModalVisible(false);
                      // setRateVisible(true)
                    },2000)
                  }}
                  >
                  
                  <View style={{ margin: 20 }}>
                    <Text style={styles.buttonSubmit}>Submits</Text>
                  </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        
        {/* {model} */} 

        {/* order-summary-model */}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => {
              setModalVisible1(!modalVisible1);
            }}>
            <View>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible1(false);
                    }}>
                    <View style={styles.crossMark}>
                      <CrossMark color={'black'} width={25} height={25}></CrossMark>
                    </View>
                  </TouchableOpacity>
                  
                 <OrderSummary></OrderSummary>
                  
                  <View style={{ margin: 20 }}>
                    <Text style={styles.buttonSubmit}>Submit</Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>

           {/* order-summary-model */}

      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    height: 1000
  },
  tinyLogo2:{height:20,width:20},

  buttonSubmit: {
    backgroundColor: THEME_COLORS.secondary,
    color: THEME_COLORS.primary,
    width: 160,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 5

  },
  textAll: {
    position: "absolute",
    top: 10,
    color: TEXT_COLORS.primary,
    fontWeight: "bold"
  },
  orderText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20
  },

  textColorsone: {

    marginVertical: -68,
    marginTop: 35,
    padding: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,


  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossMark: {
    marginLeft: 330,
    marginTop: 30,
  },
  twoButtons: {
    display: "flex",
    flexDirection: 'row',
    position: "relative",
    left: -50,
    justifyContent: "space-evenly"

  },
  twoButtons1: {
    display: "flex",
    flexDirection: 'row',
    position: "relative",
    left: -50,
    

  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 100,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },

  discounts: {
    color: "green",
    fontSize: 8,
    fontWeight: "bold"
  },
  RepeatColor: {
    backgroundColor: THEME_COLORS.secondary,
    color: THEME_COLORS.primary,
    width: 110,
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
  },
  RepeatColor1: {
    backgroundColor: THEME_COLORS.primary,
    color: THEME_COLORS.secondary,
    width: 110,
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: THEME_COLORS.secondary,

  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 10,
    marginLeft: -90,
  },
  orderId: {
    marginTop: 5,
    marginLeft: -77,
    color: TEXT_COLORS.primary,
    fontWeight: "bold",


  },
  prices: {
    color: TEXT_COLORS.primary,
    fontWeight: "bold",
    fontSize: 16
  },
  tinyLogo1: {
    height: 70,
    width: 80,
    borderRadius: 8,
    marginRight: 10, // Space between images
  },
  ordersPlace: {
    display: "flex",
    flexDirection: "row"
  },
  ordersPlace1: {

    marginTop: 35,
    marginLeft: 20,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,

  },
  card1: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // padding: 10,
    marginVertical: -50,
    // marginHorizontal: 10,
    width: "100%",
    marginTop: 1
  },

  tinyLogo: {
    height: 70,
    width: 80,
    borderRadius: 8,
    marginTop: 40,
    marginLeft: 10
  },
  cardContent: {
    flex: 1,
    marginLeft: -90,
    marginTop: 50,
    justifyContent: 'center',
  },
  cardContent1: {
    flex: 1,
    marginLeft: 10,
    marginTop: 50,
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    color: "black",

  },
  price: {
    fontSize: 10,
    color: TEXT_COLORS.secondary,
    marginVertical: 5,
    // fontWeight: "bold",

  },
  price2: {
    fontSize: 10,
    color: TEXT_COLORS.secondary,
    marginVertical: 5,
    // fontWeight: "bold",

  },
  price1: {
    fontSize: 17,
    color: TEXT_COLORS.primary,
    marginVertical: 5,
    fontWeight: "bold",
    marginTop: -0
  },
  rightAlign: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 5,
    position: "relative",
    bottom: 80
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
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  leftText: {
    flex: 1,
  },
  rightText: {
    flex: 1,
    alignItems: 'flex-end',
  },



  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },


});
