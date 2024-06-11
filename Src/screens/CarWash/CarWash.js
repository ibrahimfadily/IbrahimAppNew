import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Images from '../../assets/Images'; // Make sure to replace with your actual image import
import ScreenNames from '../ScreenNames';
import { handleAppointmenCarWashtRegistration } from '../../res/api/api'; // Import your API function

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

  const handleAppointmentRegistration = async () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('נא לבחור תאריך ושעה לפגישה.!!');
      return;
    }

    try {
      // Make an HTTP POST request to the server's handleAppointmenCarWashtRegistration endpoint
      const response = await handleAppointmenCarWashtRegistration(selectedDate, selectedTime);

      console.log('Appointment registered:', response);
      // Additional logic for handling the appointment registration
      // ...

      navigation.navigate(ScreenNames.InformationCarWash);
    } catch (error) {
      console.error('Error registering appointment:', error);
      Alert.alert('Failed to register appointment. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={Images.background1()}
      resizeMode='cover'
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image source={Images.carWash()} resizeMode='contain' style={styles.logo} />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={Images.Back()} resizeMode="contain" style={styles.backButtonIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={showDatePicker} style={styles.button}>
          <Text style={styles.buttonText}>{selectedDate ? `תאריך: ${selectedDate.toLocaleDateString()}` : 'בחר תאריך'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={showTimePicker} style={styles.button}>
          <Text style={styles.buttonText}>{selectedTime ? `שעה: ${selectedTime.toLocaleTimeString()}` : 'בחר שעה'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAppointmentRegistration} style={styles.button}>
          <Text style={styles.buttonText}>הבא</Text>
        </TouchableOpacity>

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
    marginBottom: 20,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#fff',
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
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 18,
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
