import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AppointmentRegistration = () => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => setTimePickerVisible(true);
  const hideTimePicker = () => setTimePickerVisible(false);
  const handleConfirmTime = (time) => {
    setSelectedTime(time);
    hideTimePicker();
  };

  const handleRegisterAppointment = () => {
    // Handle appointment registration with selectedDate and selectedTime
    if (selectedDate && selectedTime) {
      // You can send the data to your backend or perform any other actions here
      console.log('Appointment registered:', selectedDate, selectedTime);
    } else {
      console.log('Please select a date and time.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.label}>Select Date:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
          <Text style={styles.buttonText}>
            {selectedDate ? selectedDate.toDateString() : 'Pick a Date'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dateTimeContainer}>
        <Text style={styles.label}>Select Time:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={showTimePicker}>
          <Text style={styles.buttonText}>
            {selectedTime ? selectedTime.toLocaleTimeString() : 'Pick a Time'}
          </Text>
        </TouchableOpacity>
      </View>

      <Button title="Register Appointment" onPress={handleRegisterAppointment} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  dateTimeContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  dateButton: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#3498db',
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AppointmentRegistration;
