import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native'; // Remove the duplicate Share import
import Share from 'react-native-share';

const ReferralScreen = () => {
  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this amazing car wash app! [Your referral link here]',
      });

      if (result.action === Share.sharedAction) {
        // The message was successfully shared
        Alert.alert('Success', 'Your referral link has been shared.');
      } else if (result.action === Share.dismissedAction) {
        // The message was dismissed
        Alert.alert('Dismissed', 'Your referral link sharing was dismissed.');
      }
    } catch (error) {
      console.error('Error sharing app:', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Share the app with a friend to get a discount!</Text>
      <TouchableOpacity onPress={shareApp} style={{ marginTop: 20, padding: 10, backgroundColor: 'blue' }}>
        <Text style={{ color: 'white' }}>Share App</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReferralScreen;
