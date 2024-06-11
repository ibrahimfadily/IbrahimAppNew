import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Images from '../../assets/Images';
import ScreenNames from '../ScreenNames';
import DropPicker from '../../Components/DropPicker';
import { UserInformation } from '../../res/api/api'; // Import the API function

const InformationInput = () => {
  const navigation = useNavigation();

  const [idNumber, setIdNumber] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [carType, setCarType] = useState('');
  const [price, setPrice] = useState('');

  const handleIdNumberChange = (text) => {
    setIdNumber(text);
  };

  const handleCarNumberChange = (text) => {
    setCarNumber(text);
  };

  const CarTypes = [
    { label: 'אפנוע , קתנוע', value: 'Motosicle', price: 200 },
    { label: 'פרייבט', value: 'Car', price: 250 },
    { label: 'משאית , מסחרית', value: 'Truck', price: 400 },
  ];
  const handleSubmit = async () => {
    console.log('ID Number:', idNumber);
    console.log('Car Number:', carNumber);
    console.log('Car Type:', carType);
    console.log('Price:', price);
  
    if (!idNumber || !carNumber || !carType , !price) {
      Alert.alert('בבקשה מלא את כל השדות.!!');
      return;
    }
  
    try {
      // Make an HTTP POST request to send user info to the server
      await UserInformation(idNumber, carNumber, carType, price);
  
      // Navigate to the next screen after submitting
      navigation.navigate(ScreenNames.CardInformation);
    } catch (error) {
      console.error('Error sending user info:', error);
      Alert.alert('Failed to send user info. Please try again.');
    }
  };
  
  return (
    <ImageBackground
      source={Images.background()}
      resizeMode='cover'
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={Images.Back()} resizeMode="contain" style={styles.backButtonIcon} />
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <Image
            source={Images.LogIn()}
            resizeMode='contain'
            style={styles.containerImage}
          />
          <Text style={styles.title}>הזן את המידע שלך</Text>

          <Text>מספר ת.ע:</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={9}
            onChangeText={handleIdNumberChange}
            value={idNumber}
            placeholder="הזן מספר תעודת זהות"
          />

          <Text>מספר רכב:</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={8}
            onChangeText={handleCarNumberChange}
            value={carNumber}
            placeholder="הזן מספר רכב"
          />

          <DropPicker
            style={styles.sectionContainer}
            items={CarTypes}
            setCarType={setCarType}
            setPrice={setPrice}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>שלח</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    borderRadius: 10,
    padding: 16,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  containerImage: {
    width: 130,
    height: 130,
    marginBottom: 40,
    borderRadius: 150,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 999,
  },
  backButtonIcon: {
    width: 24,
    height: 24,
    tintColor: 'black',
  },
});

export default InformationInput;
