import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Modal, TouchableOpacity, Alert } from 'react-native';
import Rating from './Rating';
import OrderSummary from './OrderSummary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CrossMark from '../../../assets/svgimages/util';
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyle/GlobalStyles';
import { useGetOrdersByUserIdMutation } from '../store/services/OrdersEndpoint';

export default function GlobalOrders() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRatedItem, setCurrentRatedItem] = useState<any>(null);
  const [ratings, setRatings] = useState<any>({});
  const [modalVisible1,setModalVisible1]=useState(false)
  const appLogo = require('../../../assets/Images/app-logo.png');
  const [ordersData, setOrdersData] = useState([])
  const [myOrderId,setMyOrderId] = useState()
  const  [getOrdersByUserId] = useGetOrdersByUserIdMutation();

  const getOrderData=async()=>{
    try{
      const storedUid = await AsyncStorage.getItem('userId');
            console.log(storedUid)
            const uid = storedUid?.replace(/['"]/g, '').trim();
            console.log(uid,'uid')
        const response = await getOrdersByUserId(uid);
        setOrdersData(response.data)
        console.log(response,'orderbyuserid')
    }catch(error){
        console.log(error)
    }
    
}


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

useEffect(()=>{
  getOrderData()
},[])

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>

          {ordersData && ordersData.length > 0 && ordersData.map((item:any, index:any) => (
            <TouchableOpacity key={item._id} onPress={()=>{setMyOrderId(item._id);setModalVisible1(true);}}>
            <View  style={styles.card}>
              <View style={{display:"flex",flexDirection:"column"}}>
              <View>
              {/* <Text style={styles.orderId}>Shipment ID: 000zx4933pxzsdnkjdsnknk </Text> */}
              <Text style={styles.orderId}>ORDER ID: {item.id}</Text>
              <Text style={styles.status}>Status: {item.orderStatus}</Text>
              </View>
              <View>
              <Image style={styles.tinyLogo} source={{ uri: item?.items[0]?.imageUrl }} />
              </View>

              <View style={styles.ordersPlace}>
                  
                  <Text style={styles.price1}> ₹{item?.totals?.amount}</Text>
                  <Text> |</Text>
                  <Text style={styles.price2}> Qty.{item?.totals?.quantity}</Text>

                </View>

                <View style={styles.twoButtons}>
                <Text style={styles.RepeatColor}>Repeat</Text>
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
                      <Text style={styles.Ratings}>Rating submitted</Text>
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
                   <Image source={appLogo}
                     style={styles.chickenImage} />     
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
                            <View>
                            <Text style={styles.textAll} >{currentRatedItem.name}</Text>
                            </View>
                            <View >
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
                 <OrderSummary orderId={myOrderId}></OrderSummary>
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
  Ratings:{
    color:TEXT_COLORS.secondary
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:-10,
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
    marginTop:25,
    marginRight:30
  },
  textAll: {
    color: TEXT_COLORS.primary,
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
    height:80,
    width:80,
    marginLeft:30,
    backgroundColor:THEME_COLORS.secondary,
    borderRadius: 10,
},
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    width:"90%",
    marginLeft:10,
    marginTop:10
  },
  crossMark: {
    marginLeft: 330,
    marginTop: 30,
  },
  twoButtons: {
    display: "flex",
    flexDirection: 'row',
    // position: "relative",
    // left: -50,
    justifyContent: "center",
    alignItems:"center",
    marginTop:20,
    marginLeft:50
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
    marginRight:25
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
    // marginLeft: -77,
    color: TEXT_COLORS.primary,
    fontWeight: "bold",
    marginVertical:-20
  },
  status:{
    marginTop: 20,
    // marginLeft: 120,
    color: TEXT_COLORS.primary,
    fontWeight: "bold",
    marginVertical:-20
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
    flexDirection: "row",
    marginTop:-40,
    marginLeft:100
  },
  ordersPlace1: {
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
    marginTop: -5,
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
    // marginVertical:-10
    // marginLeft: -260
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
    marginLeft: -200,
    marginTop: 50,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
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