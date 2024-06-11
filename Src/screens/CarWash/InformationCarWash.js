import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Images from '../../assets/Images';
import ScreenNames from '../ScreenNames';
import CustomDropDownPicker from '../../Components/CustomDropDownPicker';
import { CarWash } from '../../res/api/api'; // Import the API function
import { Alert } from 'react-native';

const DropdownPicker = ({ items, label, open, setOpen, value, onChangeValue }) => {
  const navigation = useNavigation();
  const [zIndex, setZIndex] = useState(0); // Initialize zIndex state

  const handleOpen = () => {
    setOpen(true);
    setZIndex(1); // Set zIndex to bring the DropdownPicker to the front
  };

  const handleClose = () => {
    setOpen(false);
    setZIndex(0); // Reset zIndex when the DropdownPicker is closed
  };

  const onItemPress = useCallback((item) => {
    onChangeValue(item.value);
    setOpen(false);
  }, []);

  const PickerItem = React.memo(({ item }) => (
    <TouchableOpacity
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
      onPress={() => onItemPress(item)}
    >
      <Text style={{ color: 'black' }}>
        {item.label}
      </Text>
    </TouchableOpacity>
  ));

  return (
    <DropDownPicker
      renderListItem={({ item }) => <PickerItem item={item} />}
      items={items}
      label={label}
      open={open}
      setOpen={setOpen}
      value={value}
      modalAnimationType='slide'
      placeholder={`בחר ${label}`}
      style={{ zIndex }}
      onOpen={handleOpen}
      onClose={handleClose}
      containerStyle={{ height: 40 }}
      

    />
  );
};

const InformationInput = () => {
  const navigation = useNavigation();

  const [carType, setCarType] = useState('');
  const [washType, setWashType] = useState('');
  const [carTypeOpen, setCarTypeOpen] = useState(false);
  const [washTypeOpen, setWashTypeOpen] = useState(false);
  const [price, setPrice] = useState('');

  const handleCarTypeChange = (value) => setCarType(value);
  const handleWashTypeChange = (value) => setWashType(value);

  const CarTypes = [
    { label: 'פרייבט', value: 'Car' },
    { label: 'גייפון', value: 'MiniSUV' },
    { label: 'גייפ', value: 'Suv' },
  ];

  const washTypes = [
    { label: 'שטיפה חצונית', value: 'WashNormal', price: 70 },
    { label: 'שטיפה כללית', value: 'AllWash', price: 100 },
    { label: ' שטיפה חכמה VIP', value: 'WashVIP', price: 150 },
  ];

  const handleSubmit = async () => {
    console.log('Car Type:', carType);
    console.log('Wash Type:', washType );
    console.log('Price:', price);
  
    if (!carType || !washType , !price) {
      Alert.alert('בבקשה מלא את כל השדות!');
      return;
    }
    try {
      // Make an HTTP POST request to send user info to the server
      await CarWash(carType, washType, price);
  
      // Navigate to the next screen after submitting
      navigation.navigate('CardInformation', { carType, washType, price });
    } catch (error) {
      // Error handling code...
    }
  };
  
  
  return (
    <ImageBackground
      source={Images.background1()}
      resizeMode='cover'
      style={styles.backgroundImage}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={Images.Back()} resizeMode="contain" style={styles.backButtonIcon} />
      </TouchableOpacity>
      <View style={styles.container}>

        <View style={styles.formContainer}>
          <Image
            source={Images.carWash()}
            resizeMode='contain'
            style={styles.containerImage}
          />

          <View style={styles.sectionContainer}>
            <Text style={styles.headerText}>בחר סוג הרכב:</Text>
            <DropdownPicker
              items={CarTypes}
              label="סוג הרכב"
              open={carTypeOpen}
              setOpen={setCarTypeOpen}
              value={carType}
              onChangeValue={handleCarTypeChange}
              zIndex={2}
              renderListItem={({ item }) => <PickerItem item={item} />}
              keyExtractor={(item) => item.value.toString()}
              carType={carType}

            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.headerText}>בחר שטיפת הרכב</Text>
            <CustomDropDownPicker
              items={washTypes}
              label="שטיפת הרכב"
              open={washTypeOpen}
              setOpen={setWashTypeOpen}
              value={washType}
              onChangeValue={handleWashTypeChange}
              setPrice={setPrice}
              zIndex={1}
              carType={carType}
              washType={washType}
              price={price}
            />
            {washType !== '' && <Text style={styles.selectedItem}>{`Selected Wash Type: ${washType}`}</Text>}
          </View>

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
  containerImage: {
    width: 250,
    height: 250,
    marginBottom: 25,
    borderRadius: 150,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContainer: {
    marginBottom: 20,

  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
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
    tintColor: 'black', // You can adjust the color of the back arrow
  },
  selectedItem: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default InformationInput;