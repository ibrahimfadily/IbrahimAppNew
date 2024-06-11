import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import Images from '../assets/Images';

const BackButton = ({ navigation }) => {


    return (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image source={Images.Back()} resizeMode="contain" style={styles.backButtonIcon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
});

export default BackButton;
