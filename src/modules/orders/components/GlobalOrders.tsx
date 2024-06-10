import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Modal, TouchableOpacity, Alert, Button, Pressable } from 'react-native';
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
import { RightArrowIcon } from '../../../assets/svgimages/OrdersSvgs/OrderSvgs';
import RatingDisplay from '../../../sharedFolders/components/RatingDisplay';
import RateOrder from './RateOrder';


export default function GlobalOrders() {
  const navigation = useNavigation<any>()
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRatedItem, setCurrentRatedItem] = useState<any>(null);
  const [ratings, setRatings] = useState<any>({});
  const [modalVisible1, setModalVisible1] = useState(false);
  const appLogo = require('../../../assets/Images/app-logo.png');
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [myOrderId, setMyOrderId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [show, setShow] = useState(false);
  const TABS = {
    PLACED: ['Received', 'PLACED'],
    CANCELLED: 'CANCELLED',
    DELIVERED: 'DELIVERED'
  };
  const [selectedTab, setSelectedTab] = useState('Received');
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
   
  const filterOrders = () => {
    console.log('SSSS', selectedTab)
    return ordersData?.filter((item) => selectedTab === TABS.PLACED[0] ? TABS.PLACED.includes(item?.orderStatus) : item?.orderStatus === selectedTab)
  }
  const handleClose = () => {
    setShow(false)
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
    <TabButton label={'RECEIVED'} isSelected={selectedTab === TABS.PLACED[0]} onPress={()=>setSelectedTab(TABS.PLACED[0])}/>
    <TabButton label={'DELIVERED'} isSelected={selectedTab === TABS.DELIVERED} onPress={()=>setSelectedTab(TABS.DELIVERED)}/>
    <TabButton label={'CANCELLED'} isSelected={selectedTab === TABS.CANCELLED} onPress={()=>setSelectedTab(TABS.CANCELLED)}/>
    </View>
      {!isLoading &&
      <ScrollView >
        {filterOrders() && filterOrders().length > 0 ? filterOrders().map((item: Order) => (
          <Pressable key={item._id}
            onPress={() => { setMyOrderId(item._id); setOrderStatus(item?.orderStatus); setModalVisible1(true); }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#ddd' : '#f0f0f0',
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
              styles.main_card,
            ]}
            >
            <View style={styles.card}>
              <View style={styles.orderIdCardHeader}>
                <View style={styles.orderIdContainer}>
                 <Text style={styles.orderIdText}>ORDER ID: </Text>
                <Text style={styles.orderIdHeader}>{item?.id}</Text>  
                </View>
               
                {/* <StatusButton status='PLACED'/> */}
                {item?.orderStatus !== 'DELIVERED' && <RatingDisplay rating={4.3} votes={2925} />}
                
              </View>

              <View style={styles.item_details}>
                <Image style={styles.tinyLogo} source={{ uri: item?.items[0]?.imageUrl }} />
                <View style={styles.itemDetailsContainer}>
                <View style={styles.nameTextContainer}>
      <Text style={styles.itemName}>{item?.items[0]?.itemName}</Text>
    </View>
                  <View style={styles.ordersPlace}>
                    <Text style={styles.amount}> ₹{item?.totals?.amount}</Text>
                    <Text> |</Text>
                    <Text style={styles.price1}> Qty: {item?.totals?.quantity}</Text>

                  </View>
                  
                  
                </View>
                <View style={{marginLeft:10}}>
                    <StatusButton status={item?.orderStatus}/>
                  </View>
                <View style={{marginLeft:10}}>
                   <RightArrowIcon/>
                </View>
                
              </View>

              <View style={item?.orderStatus !== 'DELIVERED' ? styles.twoButtons : null}>
                {item?.orderStatus === 'DELIVERED' && <View>
                  <Text style={styles.RepeatColor}>Repeat</Text>
                </View>}

                 
                  {item?.orderStatus === 'DELIVERED' && <TouchableOpacity onPress={() =>  setShow(true)}>
                    <Text style={styles.RepeatColor1}>Rate order</Text>
                  </TouchableOpacity>}
                  {item?.orderStatus === 'PLACED' && item?.paymentStatus === 'PENDING' && <View>
                  <Text style={styles.RepeatColor}>Make Payment</Text>
                </View>}
                  {(item?.orderStatus === 'Received' || 'PLACED') && <TouchableOpacity onPress={() =>  setShow(true)}>
                    <Text style={styles.RepeatColor1}>Cancel Order</Text>
                  </TouchableOpacity>}
               
              </View>
            </View>
          </Pressable>
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
      
      {show && <RateOrder show={show} handleClose={handleClose} />}  


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
    width: '98%',
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
  itemDetailsContainer: {
    flex: 1,
  },
  nameTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  itemName:{
    fontSize: 14,
    color: TEXT_COLORS.primary,
    fontWeight: "500",
    marginLeft: 2, 
  },
  amount:{
    fontSize: 13,
    color: THEME_COLORS.secondary,
    fontWeight: "bold",
  },
  price1: {
    fontSize: 13,
    color: TEXT_COLORS.primary,
    fontWeight: "400",
  },
  orderIdHeader:{
    fontSize: 13,
    color: THEME_COLORS.secondary,
    fontWeight: "bold",
  },
  orderIdText:{
    fontSize: 13,
    color: TEXT_COLORS.primary,
    fontWeight: "500",
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  orderIdCardHeader:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    margin:2
  },
  quantity: {
    fontSize: 16,
    color: TEXT_COLORS.primary,
    marginHorizontal: 10,
  },
  item_details: {
    flexDirection: 'row',
    alignItems: 'center',
  
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