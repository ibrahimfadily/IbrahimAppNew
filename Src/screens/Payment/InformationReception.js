import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image , TouchableOpacity} from 'react-native';
import ScreenNames from '../ScreenNames';
import Images from '../../assets/Images';
// import { WebView } from 'react-native-webview';

const PaymentSuccess = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate(ScreenNames.SelectBtn);
    }, 3000); // Navigate after 3 seconds
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={Images.Success()} resizeMode="contain" style={styles.successIcon} />
      <Text style={styles.title}>!התשלום בוצע בהצלחה</Text>
      <Text style={styles.message}>תודה על התשלום שלך</Text>
      <Text style={styles.message}>תקבלו אישור בדוא"ל בקרוב</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate({ name: ScreenNames.SelectBtn })}>
  <Text style={styles.buttonText}>חזרה לדף הבית</Text>
</TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PaymentSuccess;
