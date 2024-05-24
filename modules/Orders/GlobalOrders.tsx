import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Modal, TouchableOpacity, Alert } from 'react-native';
import { TEXT_COLORS, TEXT_FONT_SIZE, THEME_COLORS } from '../GlobalStyles/GlobalStyles';
import CrossMark from '../assets/svgimages/util';
import Rating from './Rating';
import OrderSummary from './OrderSummary';
import Cartitems from '../Home/components/Cart/CartItems';

export default function GlobalOrders() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRatedItem, setCurrentRatedItem] = useState<any>(null);
  const [ratings, setRatings] = useState<any>({});
  const [modalVisible1,setModalVisible1]=useState(false)
  const [items, setItems] = useState<any>([
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
      id: 2,
      name: 'Chicken liver',
      image: 'https://media.istockphoto.com/photos/chicken-meat-picture-id1319903960?k=20&m=1319903960&s=612x612&w=0&h=_VBryQo-J1RmuBGCS6OIfKiimN5wnQEcyWnH6hywcjE=',
      priceBeforeDiscount: 200,
      price: 150,
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

  const handleRateOrder = (item:any) => {
    setCurrentRatedItem(item);
    setModalVisible(true);
  };

  const handleRatingChange = (rating:any) => {
    setRatings((prevRatings:any) => ({ ...prevRatings, [currentRatedItem.id]: rating }));
  };

  const handleSubmitRating = () => {
    Alert.alert("Submitted successfully");
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          {items.map((item:any, index:any) => (
            <TouchableOpacity key={index} onPress={()=>{setModalVisible1(true)}}>
            <View  style={styles.card}>
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

                <View style={styles.separator}></View>
                <View style={styles.twoButtons}>
                  {ratings[item.id] ? (
                    <View style={styles.ratingContainer}>
                      {[...Array(ratings[item.id])].map((_, index) => (
                        <Image
                          key={index}
                          style={styles.tinyLogo2}
                          source={{
                            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyYPvs1xPs_hTJQp1pKDhBqoP9NPso4AOTOMYqTAKVrA&s",
                          }}
                        />
                      ))}
                      <Text style={{marginLeft:5}}>Rating submitted</Text>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => handleRateOrder(item)}>
                      <Text style={styles.RepeatColor1}>Rate order</Text>
                    </TouchableOpacity>
                    
                  )}
                </View>
              </View>
            </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Rate order modal */}

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
                  <Image
                         
                          style={styles.chickenImage}
                          source={{
                            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqCfQOm98hADU_pLAuhtDc_Yi7cmekWqpP8EyE7IPlEg&s",
                          }}
                        />
                    <Text style={styles.orderText}>How would you rate the products you ordered?</Text>
                  </View>
                  <ScrollView style={{ width: "95%" }}>
                    {currentRatedItem && (
                      <View style={styles.card1}>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Image
                            style={styles.tinyLogos}
                            source={{
                              uri: currentRatedItem.image,
                            }}
                          />
                          <View style={styles.ordersPlace1}>
                            <Text style={styles.textAll}>{currentRatedItem.name}</Text>
                            <View style={styles.allratings}>
                            <Rating
                            
                              rating={ratings[currentRatedItem.id] || 0}
                              onRatingChange={handleRatingChange}
                            />
                            </View>
                            
                          </View>
                        </View>
                      </View>
                    )}
                  </ScrollView>
                  <TouchableOpacity onPress={handleSubmitRating}>
                    <View style={{ margin: 20 }}>
                      <Text style={styles.buttonSubmit}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

      {/* Order summary modal */}

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
                </View>
              </View>
            </View>
          </Modal>
        </View>
        
        {/* Order summary modal */}
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:20,
  },
  tinyLogo2:{height:13,width:13},
  

  buttonSubmit: {
    backgroundColor: THEME_COLORS.secondary,
    color: THEME_COLORS.primary,
    width: 160,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 5

  },
  allratings:{ 
    marginTop:25
  },
  textAll: {
    position: "absolute",
    top: 10,
    color: TEXT_COLORS.primary,
    fontWeight: "bold"
  },
  textColorsone: {

    marginVertical: -68,
    marginTop: 35,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginLeft:10,
    marginRight:25,
  },
  chickenImage:{
    height:60,
    width:60,
  borderRadius:50,
  marginLeft:30
},
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    width:"90%",
    marginLeft:10,
    marginTop:5
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
    marginVertical: 18,
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
    marginRight: 10,
  },
  ordersPlace: {
    display: "flex",
    flexDirection: "row"
  },
  ordersPlace1: {
    display: "flex",
    flexDirection: "row",
    marginTop: 25,
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
    marginVertical: -50,
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
  tinyLogos: {
    height: 70,
    width: 80,
    borderRadius: 8,
    marginTop: 20,
    marginLeft: 10,
    padding:10,
    marginVertical:20
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
  },
  price2: {
    fontSize: 10,
    color: TEXT_COLORS.secondary,
    marginVertical: 5,
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
