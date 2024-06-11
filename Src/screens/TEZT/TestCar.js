import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  ImageBackground,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Images from '../../assets/Images'; // Make sure to replace with your actual image import
import ScreenNames from '../ScreenNames';
import { handleAppointmentTEZTRegistration } from '../../res/api/api';

const AppointmentScreen = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);
  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    hideTimePicker();
  };

  const handleAppointmentRegistrationTEZT = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('נא לבחור תאריך ושעה לפגישה!!');
      return;
    }

    try {
      // Make an HTTP POST request to the server's handleAppointmenTEZTtRegistration endpoint
      const response = await handleAppointmentTEZTRegistration(selectedDate, selectedTime);

      console.log('Appointment registered:', response);
      // Additional logic for handling the appointment registration
      // ...

      navigation.navigate(ScreenNames.InformationTest);
    } catch (error) {
      console.error('Error registering appointment:', error);
      Alert.alert('Failed to register appointment. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={Images.background()}
      resizeMode='cover'
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image source={Images.TEZT()} resizeMode='contain' style={styles.logo} />
        <Text style={styles.imageText}>עושים לכה טסט בשאתה יושן</Text>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={Images.Back()} resizeMode="contain" style={styles.backButtonIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={showDatePicker} style={styles.button}>
          <Text style={styles.buttonText}>{selectedDate ? selectedDate.toLocaleDateString() : 'בחר תאריך'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={showTimePicker} style={styles.button}>
          <Text style={styles.buttonText}>{selectedTime ? selectedTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'בחר שעה'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAppointmentRegistrationTEZT} style={styles.button}>
          <Text style={styles.buttonText}>הבא</Text>
        </TouchableOpacity>

        <Text
          style={styles.linkText}
          onPress={() =>
            Linking.openURL('https://www.gov.il/he/service/car_licence_renewal')
          }>
          לא שילמת את אגרת הטסט? לחץ כאן כדי להשלם
        </Text>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
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
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
  },
  imageText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#3498db',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  linkText: {
    color: '#3498db',
    textDecorationLine: 'underline',
    marginTop: 20,
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

export default AppointmentScreen;
