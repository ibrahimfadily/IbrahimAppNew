import React, { useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Images from '../../assets/Images';
import ScreenNames from '../ScreenNames';

const WaitingScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(ScreenNames.WelcomeScreen);
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles}>
        <Image
          source={Images.Waitang1()} resizeMode='contain' style={styles.Image}>
        </Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  Image: {
    width: 550,
    height: 400,
    alignSelf: 'center',
    marginVertical: 20, // Add vertical margin
  },
});

export default WaitingScreen;
