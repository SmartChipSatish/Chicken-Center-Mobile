import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useMemo, useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import { CardIcon, DownArrowIcon, ForwardArrowIcon } from '../../../../assets/svgimages/AccountsSvgs/accountsSvgs';
import { TEXT_COLORS, THEME_COLORS } from '../../../../GlobalStyles/GlobalStyles';

export default function RechargeWallet() {
  const radioButtons = useMemo(() => ([
    {
      id: '1',
      label: '100',
      value: '100'
    },
    {
      id: '2',
      label: '500',
      value: '500'
    },
    {
      id: '3',
      label: '1000',
      value: '1000'
    }
  ]), []);

  const [selectedId, setSelectedId] = useState('');
  const [cardShow, setCardShow] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <ScrollView  contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Wallet</Text>
          <View style={styles.input}>
            <TextInput placeholder='Enter the Amount'
                       style={styles.text_inpt} 
                       maxLength={5}/>
          </View>
          <View>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
              containerStyle={{ flexDirection: 'row', marginTop: 10 }}
            />
          </View>
          <View>
            <View style={styles.payment_types}>
              <View style={{flexDirection:'row',justifyContent:'space-around'}}>
              <CardIcon/>
              <Text style={{ fontSize: 20, color: `${TEXT_COLORS.primary}` }}>Card</Text>
              </View>
              {!cardShow && <ForwardArrowIcon onPress={() => setCardShow(true)} />}
              {cardShow && <DownArrowIcon onPress={() => setCardShow(false)}/>}
            </View>
            {cardShow && (
              <View>
                <TextInput placeholder='Name on the card'
                           style={styles.card_inputs} 
                           maxLength={20}/>
                <TextInput placeholder='Card Number'
                           style={styles.card_inputs} 
                           keyboardType="numeric"
                           maxLength={10}/>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput placeholder='MM' 
                             style={styles.card_inputsSmall} 
                             keyboardType="numeric"
                             maxLength={2}/>
                  <TextInput placeholder='YY' 
                             style={styles.card_inputsSmall} 
                             keyboardType="numeric"
                             maxLength={2}/>
                  <TextInput placeholder='CVV' 
                             style={styles.card_inputsSmall} 
                             keyboardType="numeric"
                             maxLength={3}/>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.add_btn}>
        <Text style={{ color: 'white', fontSize: 18 }}>Proceed to Add Money</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  scrollContainer: {
    paddingBottom: 60, // Enough space for the button
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: `${TEXT_COLORS.primary}`,
    marginTop: 10,
  },
  input: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  text_inpt: {
    borderBottomWidth: 1,
    width: '90%',
  },
  add_btn: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    height: 40,
    alignItems: 'center',
    backgroundColor: THEME_COLORS.secondary,
    justifyContent: 'center',
    borderRadius: 10,
  },
  payment_types: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    borderTopWidth: 1,
    marginTop: 10,
    alignItems: 'center',
    paddingTop: 10,
  },
  card_inputs: {
    borderBottomWidth: 1,
    fontSize: 15,
    width: '100%',
  },
  card_inputsSmall: {
    borderBottomWidth: 1,
    fontSize: 15,
    width: '27%',
    marginHorizontal: 5,
  },
});
