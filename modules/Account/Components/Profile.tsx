import React from 'react'
import { Modal,View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity,TouchableWithoutFeedback , ScrollView } from 'react-native';
import { THEME_COLORS } from '../../GlobalStyles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';


export default function Profile() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email,setEmail]=React.useState('')
  const [countryCode, setCountryCode] = React.useState('+91');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [show,setShow] = React.useState(false)
  const [error,setError]=React.useState("Hello Enter All Details")
  const [profileImage, setProfileImage] = React.useState('https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'); // Default image
  const navigation = useNavigation<any>();


  const handleContinue = () => {
    // if (!firstName || !lastName || !mobileNumber) {
    //   setShow(true)
    //   return;
    // }
    navigation.goBack()
  };

  const handelclose = ()=>{
    setShow(!show)
  }


  return (
    <>
    
    <View style={styles.container}>
      <Text style={styles.Title}>Profile</Text>
      <TouchableOpacity>
        <Image
          source={{ uri: profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter First Name"
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter Last Name"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Your Email"
        />
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.mobileContainer}>
          <TextInput
            style={styles.countryCodeInput}
            value={countryCode}
            onChangeText={setCountryCode}
            placeholder="+1"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.mobileInput}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder="Enter Mobile Number"
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    {show && <Modal
        transparent={true}
        visible={show}
        onRequestClose={handelclose}
    >
        <TouchableWithoutFeedback onPress={handelclose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.errorText}>{error}</Text>
                  <TouchableOpacity style={styles.modalButton} onPress={handelclose}>
                    <Text style={styles.modalBtnText}>Ok</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  Title: {
    alignSelf: 'center',
    fontSize: 35,
    color: THEME_COLORS.secondary,
    marginTop: 15,
    marginBottom: 15,
    letterSpacing:3,
    textTransform:"capitalize",
    fontWeight: 'bold'
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  editText: {
    alignSelf: 'center',
    fontSize: 20,
    color: THEME_COLORS.secondary,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    borderRadius: 10
  },
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  countryCodeInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    width: 60,
    marginRight: 10,
    paddingHorizontal: 8,
    textAlign: 'center',
    borderRadius: 10,
  },
  mobileInput: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  button: {
    backgroundColor: THEME_COLORS.secondary,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    letterSpacing:2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
},
modalContent: {
    width:"80%",
    height:100,
    backgroundColor: 'white',
    padding: 20,
    justifyContent:'space-between',
    borderRadius:20,
},
modalButton:{
  width:"10%",
  alignSelf:'flex-end'
},
modalBtnText:{
  color: THEME_COLORS.secondary,
},
errorText:{
  color:'#e01e37',
  fontSize:15,
}
});