import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Modal, TouchableOpacity, Alert, Button } from 'react-native';
import Rating from './Rating';
import OrderSummary from './OrderSummary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CrossMark from '../../../assets/svgimages/util';
import { TEXT_COLORS, THEME_COLORS } from '../../../globalStyle/GlobalStyles';
import { useGetOrdersByUserIdMutation, useLazyGetOrdersByUserId1Query } from '../store/services/OrdersEndpoint';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Loding from '../../dashboard/components/Loding';
import { Order } from '../utils/constants';
import StatusButton from './StatusButton';
import TabButton from './TabButton';


export default function GlobalOrders() {
  const navigation = useNavigation<any>()
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRatedItem, setCurrentRatedItem] = useState<any>(null);
  const [ratings, setRatings] = useState<any>({});
  const [modalVisible1, setModalVisible1] = useState(false)
  const appLogo = require('../../../assets/Images/app-logo.png');
  const [ordersData, setOrdersData] = useState<Order[]>([])
  const [myOrderId, setMyOrderId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [orderStatus, setOrderStatus] = useState('')
  const TABS = {
    PLACED: 'Received',
    CANCELLED: 'CANCELLED',
    DELIVERED: 'DELIVERED'
  };
  const [selectedTab, setSelectedTab] = useState(TABS.PLACED);
  const [getOrdersByUserId] = useGetOrdersByUserIdMutation();
  const NoOrders = require('../../../assets/Images/NoOrders.png');
  const getOrderData = async () => {
    setIsLoading(true)
    try {
      setIsLoading(true)
      const storedUid = await AsyncStorage.getItem('userId');
      console.log(storedUid)
      const uid = storedUid?.replace(/['"]/g, '').trim();
      console.log(uid, 'uid')
      const response = await getOrdersByUserId(uid);
      setOrdersData(response.data)
      console.log(response, 'orderbyuserid')
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
    setIsLoading(false)
  }


  const handleRateOrder = (item: any) => {
    setCurrentRatedItem(item);
    setModalVisible(true);
  };

  const handleRatingChange = (rating: any) => {
    setRatings((prevRatings: any) => ({ ...prevRatings, [currentRatedItem.id]: rating }));
  };

  const handleSubmitRating = () => {
    Alert.alert("Submitted successfully");
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

   
  const filterOrders = () => {
    return ordersData.filter((item) => item.orderStatus == selectedTab)
  }

  useFocusEffect(
    useCallback(() => {
      getOrderData()
    }, [])
  )
  
  return (
    <>
    <View style={{marginTop:-10,flex:1}}>
    <View style={styles.tabsContainer}>
    <TabButton label={TABS.PLACED} isSelected={selectedTab === TABS.PLACED} onPress={()=>setSelectedTab(TABS.PLACED)}/>
    <TabButton label={TABS.DELIVERED} isSelected={selectedTab === TABS.DELIVERED} onPress={()=>setSelectedTab(TABS.DELIVERED)}/>
    <TabButton label={TABS.CANCELLED} isSelected={selectedTab === TABS.CANCELLED} onPress={()=>setSelectedTab(TABS.CANCELLED)}/>
    </View>
      {!isLoading &&
      <ScrollView >
        {filterOrders() && filterOrders().length > 0 ? filterOrders().map((item: Order) => (
          <TouchableOpacity key={item._id}
            onPress={() => { setMyOrderId(item._id); setOrderStatus(item?.orderStatus); setModalVisible1(true); }}
            style={styles.main_card}>
            <View style={styles.card}>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
                <Text style={styles.orderIdHeader}>ORDER ID: {item?.id}</Text>
                <StatusButton status='PLACED'/>
                {/* <StatusButton status={orderStatus}/> */}
              </View>

              <View style={styles.item_details}>
                <Image style={styles.tinyLogo} source={{ uri: item?.items[0]?.imageUrl }} />
                <View>
                  <Text style={styles.price1}> {item?.items[0]?.itemName}</Text>
                  <View style={styles.ordersPlace}>
                    <Text style={styles.price1}> ₹{item?.totals?.amount}</Text>
                    <Text> |</Text>
                    <Text style={styles.price1}> Qty.{item?.totals?.quantity}</Text>

                  </View>
                </View>

              </View>

              <View style={styles.twoButtons}>
                <View>
                  <Text style={styles.RepeatColor}>Repeat</Text>
                </View>
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
          </TouchableOpacity>
        )): 
        <View  style={styles.orderContainer}>
           <Image source={NoOrders} style={styles.orderImg}/>
           <Text style={styles.orderHeader}>No Orders Found</Text>
                 <Text style={styles.orderBody}>
                  Looks like you haven't made {"\n"} 
                  {'            '}your order yet...
                 </Text>
           <TouchableOpacity style={styles.orderButton} onPress={()=>navigation.navigate('home')}>
            <Text style={styles.noOrderText}>Back To Home</Text>
           </TouchableOpacity>

        </View>
        }
      </ScrollView>
      }
      
      


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
          }}
          >
          <View>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <OrderSummary orderId={myOrderId} setModalVisible1={ ()=>setModalVisible1(false)} orderStatus={orderStatus}></OrderSummary>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
    {isLoading && <Loding /> }
    </>
    
  );
}

const styles = StyleSheet.create({
  Ratings: {
    color: TEXT_COLORS.secondary
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4%',
    height: 30
  },
  tinyLogo2: {
    height: 13,
    width: 13
  },
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 25,
  },
  chickenImage: {
    height: 80,
    width: 80,
    marginLeft: 30,
    backgroundColor: THEME_COLORS.secondary,
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
    width: "90%",
    marginLeft: 10,
    marginTop: 10
  },
  crossMark: {
    marginLeft: 330,
    marginTop: 30,
  },
  twoButtons: {
    display: "flex",
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    borderTopWidth: 0.5,
    borderTopColor: TEXT_COLORS.secondary
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
  RepeatColor: {
    backgroundColor: THEME_COLORS.secondary,
    color: THEME_COLORS.primary,
    width: 110,
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
    marginRight: '8%',
    marginTop: '4%',
    height: 30

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
    marginTop: '5%'
  },
  orderId: {
    marginTop: 5,
    color: TEXT_COLORS.primary,
    fontWeight: "bold",
    marginVertical: -20
  },
  prices: {
    color: TEXT_COLORS.primary,
    fontWeight: "bold",
    fontSize: 16
  },
  ordersPlace: {
    flexDirection: "row",
    marginLeft: '5%',
    alignItems: 'center'
  },
  ordersPlace1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: -5,
    marginLeft: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    width: '97%',
    top:10
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
    marginTop: '2%',
  },
  tinyLogos: {
    height: 70,
    width: 80,
    borderRadius: 8,
    marginTop: 20,
    marginLeft: 10,
    padding: 10,
    marginVertical: 20
  },
  price1: {
    fontSize: 13,
    color: TEXT_COLORS.primary,
    fontWeight: "bold",
  },
  orderIdHeader:{
    fontSize: 13,
    color: THEME_COLORS.secondary,
    fontWeight: "bold",
    paddingTop:5,
    left:-7
  },
  quantity: {
    fontSize: 16,
    color: TEXT_COLORS.primary,
    marginHorizontal: 10,
  },
  item_details: {
    flexDirection: 'row',
    alignItems: 'center'
  }, 
  main_card: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0, 0, 0, 0.1)',
    paddingVertical:2,

  },
  orderContainer:{
    justifyContent:'center',
    alignItems:'center',
   flex:1
},
orderImg:{
  height:300,
  width:300,
  objectFit:'contain',
  top:50
},
orderHeader:{
  fontSize:18,
  fontWeight:'bold',
  color:TEXT_COLORS.primary,
  margin:10
},
orderBody:{
  fontSize:14,
  fontWeight:'600',
  marginBottom:20
},
orderButton:{
  backgroundColor:THEME_COLORS.secondary,
  borderRadius:5,
  padding:10
},
noOrderText:{
  color:TEXT_COLORS.whiteColor
},
tabsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: '#f2f2f2',
  paddingVertical: 10,
},

});