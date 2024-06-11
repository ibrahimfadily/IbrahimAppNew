import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import ScreenNames from '../ScreenNames';
import Images from '../../assets/Images';
import { login } from '../../res/api/api';

const LoginView = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginServer = async () => {
    try {
      // Validate input
      if (!email || !password) {
        Alert.alert('Error', 'Please provide both email and password');
        return;
      }

      const userInfo = { email, password };

      const response = await login(userInfo);

      if (response.message === 'User login successfully') {
        props.navigation.navigate(ScreenNames.SelectBtn);
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error.message || error);
      Alert.alert('Error', 'Login failed. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>

      <Image source={Images.LogIn()} resizeMode="contain" style={styles.logo} />

      <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/ios-filled/512/circled-envelope.png' }} />
        <TextInput
          style={styles.inputs}
          placeholder="אימייל"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/ios-glyphs/512/key.png' }} />
        <TextInput
          style={styles.inputs}
          placeholder="סיסמה"
          secureTextEntry
          underlineColorAndroid="transparent"
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={loginServer}>
        <Text style={styles.loginText}>התחברות</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate(ScreenNames.ChangePassword)}>
        <Text>שכחת ססמה?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate(ScreenNames.SignUpScreen)}>
        <Text>הירשם</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  loginButton: {
    backgroundColor: 'black',
  },
  loginText: {
    color: 'white',
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 15,
  },
 
});

export default LoginView;
