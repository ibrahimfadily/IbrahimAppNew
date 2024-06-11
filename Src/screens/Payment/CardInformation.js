import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import ScreenNames from '../ScreenNames';
import { processPayment } from '../../res/api/api';
import Images from '../../assets/Images';

const CardInformation = ({ navigation }) => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');
  const [registeredInfo, setRegisteredInfo] = useState(null);
  const [cardNumberError, setCardNumberError] = useState('');

  const handleCardNumberChange = (text) => {
    setCardNumber(text);
    if (/^4/.test(text)) {
      setCardType('visa');
    } else if (/^5[1-5]/.test(text)) {
      setCardType('mastercard');
    } else if (/^3[47]/.test(text)) {
      setCardType('amex');
    } else if (/^(?:2131|1800|35\d{3})\d{11}$/.test(text)) {
      setCardType('jcb');
    } else {
      setCardType('');
    }

    if (!/^\d{16}$/.test(text)) {
      setCardNumberError('אנא הזן מספר כרטיס חוקי באורך 16 ספרות');
    } else {
      setCardNumberError('');
    }
  };

  const handleSubmit = async () => {
    if (!name || !cardNumber || !expiry || !cvv) {
      Alert.alert('אנא מלא את כל השדות.');
      return;
    }

    try {
      await processPayment(name, cardNumber, expiry, cvv);
      setRegisteredInfo({ name, cardNumber, expiry, cvv });
      navigation.navigate(ScreenNames.InformationReception, { registeredInfo: { name, cardNumber, expiry, cvv } });
    } catch (error) {
      console.error('שגיאה בשליחת פרטי המשתמש:', error);
      Alert.alert('נכשלה ניסיון שליחת פרטי המשתמש. אנא נסה שוב.');
    }
  };


  const cardImages = {
    visa: require('../../assets/visa.png'),
    mastercard: require('../../assets/mastercard.png'),
    amex: require('../../assets/amex.png'),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>פרטי תשלום</Text>

      <TextInput
        style={styles.input}
        placeholder="שם מלא"
        maxLength={20}
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="מספר כרטיס"
        keyboardType="numeric"
        maxLength={16}
        onChangeText={handleCardNumberChange}
        value={cardNumber}
      />
      {cardNumberError ? <Text style={styles.error}>{cardNumberError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="תוקף (חודש/שנה)"
        keyboardType="numeric"
        maxLength={5}
        onChangeText={(text) => {
          if (/^\d{0,2}\/?\d{0,2}$/.test(text)) {
            let formattedText = text.replace(/\//g, ''); // Remove any existing slashes
            if (formattedText.length > 2) {
              formattedText = formattedText.slice(0, 2) + '/' + formattedText.slice(2);
            }
            if (formattedText.length === 5) {
              const [month, year] = formattedText.split('/');
              const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
              const currentMonth = new Date().getMonth() + 1; // Get current month (1-indexed)
              if (parseInt(year, 10) < currentYear || (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)) {
                // Date is in the past, do not set expiry
                setExpiry('');
              } else {
                setExpiry(formattedText);
              }
            } else {
              setExpiry(formattedText);
            }
          }
        }}
        value={expiry}
      />


      <TextInput
        style={styles.input}
        placeholder="CVV"
        keyboardType="numeric"
        maxLength={3}
        onChangeText={(text) => setCvv(text)}
        value={cvv}
      />

      {cardType && (
        <Image
          source={cardImages[cardType]}
          style={styles.cardImage}
          resizeMode="contain"
        />
      )}

      <TouchableOpacity style={styles.payButton} onPress={handleSubmit}>
        <Text style={styles.payButtonText}>שלם עכשיו</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={Images.Back()} resizeMode="contain" style={styles.backButtonIcon} />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: '#333',
    width: '100%',
  },
  cardImage: {
    width: 50,
    height: 30,
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 10,
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

export default CardInformation;
