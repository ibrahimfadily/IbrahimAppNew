import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Images from '../../assets/Images';
import { SignUp } from '../../res/api/api';
import ScreenNames from '../ScreenNames';
export default function SignUpView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpServer = () => {
    const userInfo = {
      username,
      email,
      pass: password,
    };

    // Assuming SignUp function returns a Promise
    SignUp(userInfo)
      .then((value) => {
        console.log("signup res", value);
        if (!value?.error) {
          props.navigation.navigate(ScreenNames.SelectBtn);
        } else {
          console.log("not correct");
          Alert.alert("Error", "Sign up failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        let errorMessage = "Sign up failed";
        if (error.response && error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        }
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={Images.signup()} resizeMode='contain' style={styles.containerimage} />
      <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/ios-glyphs/512/user-male-circle.png' }} />
        <TextInput
          style={styles.inputs}
          placeholder="שם מלא"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={text => setUsername(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/ios-filled/512/circled-envelope.png' }} />
        <TextInput
          style={styles.inputs}
          placeholder="אימייל"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/ios-glyphs/512/key.png' }} />
        <TextInput
          style={styles.inputs}
          placeholder="סיסמה"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => props.navigation.goBack()}>
        <Image source={Images.Back()} resizeMode="contain" style={styles.backButtonIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]} onPress={signUpServer}>
        <Text style={styles.signUpText}>הירשם</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate(ScreenNames.WelcomeScreen)}>
        <Text>כבר יש לך חשבון?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    // flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: '#FF4DFF',
  },
  signUpText: {
    color: 'white',
  },
  containerimage: {
    width: 130,
    height: 130,
    marginBottom: 30,
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
})