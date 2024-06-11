import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';

import ScreenNames from '../ScreenNames';
import Images from '../../assets/Images';

const SelectBtn = ({ navigation }) => {
  const handleButtonPress = (ScreenNames) => {
    navigation.navigate(ScreenNames);
  };

  return (
    <ImageBackground
      source={Images.background()}
      resizeMode='cover'
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* <Image source={Images.TEZT} resizeMode="cover" style={styles.backgroundImage} /> */}


        <View style={styles.overlayContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={Images.select()} resizeMode="contain" style={styles.logoImage} />
          </View>

          {/* Title */}
          <Text style={styles.title}>בחר את השירות!</Text>

          {/* Buttons */}
          <TouchableOpacity onPress={() => handleButtonPress(ScreenNames.CarWash)} style={styles.button}>
            <Text style={styles.buttonText}>הזמנה שטיפה לרכב</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleButtonPress(ScreenNames.TestCar)} style={styles.button}>
            <Text style={styles.buttonText}>הזמנה טסט לרכב</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    color: 'white',
  },
  overlayContainer: {
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 16,
    width: '80%',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 50,
  },
  logoImage: {
    width: 150,
    height: 100,
    // alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '70%',
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SelectBtn;
