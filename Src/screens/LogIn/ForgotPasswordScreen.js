import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { ForgotPassword } from '../../res/api/api';

const ForgotPasswordScreen = (props) => {
  const [email, setEmail] = useState('');
  const [Pass, setPass] = useState('');

  
  const [isLoading, setIsLoading] = useState(false);

    const ForgotPasswordserver = () => {
      const userInfo = {
          "email": email,
          "pass": Pass
      } //body


      ForgotPassword(userInfo).then((value) => {
          console.log("test",value.message);
          if (value.message == "done") {  
              props.navigation.navigate('WelcomeScreen')
          } else {
              console.log("not corrct");
          }
      }).catch((e) => {
          console.log(e.message);
      })

  }

  

const handleResetPassword = async () => {

  if (!email) {
    Alert.alert('Error', 'Please enter your email address');
    return;
  }

  // Add your password reset logic here (e.g., sending an email with a reset link)

  setIsLoading(true);

  try {
    // Simulate a password reset request (replace this with your actual logic)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    ForgotPasswordserver()
    Alert.alert('Success', 'Password reset link sent to your email');
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'An error occurred. Please try again later.');
  } finally {
    setIsLoading(false);
  }
};

return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Forgot Password</Text>
    <TextInput
      placeholder="Enter your email"
      onChangeText={(text) => setEmail(text)}
      value={email}
      style={{
        width: 300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        paddingHorizontal: 10,
      }}
    />
    <TextInput
      placeholder="Enter new  password"
      onChangeText={(text) => setPass(text)}
      value={Pass}
      style={{
        width: 250,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 20,
        paddingHorizontal: 10,
      }}
    />
    <Button
      title={isLoading ? 'Sending...' : 'Send Reset Link'}
      onPress={handleResetPassword}
      disabled={isLoading}
    />
  </View>
);
};

export default ForgotPasswordScreen;
