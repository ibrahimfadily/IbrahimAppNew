import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Image } from 'react-native';
import Images from '../../assets/Images';

const DiscountTest = ({ navigation }) => {
    const handleClaimDiscount = () => {
        // Implement logic to claim discount
        // For example, navigate to a payment screen with the discount applied
        navigation.navigate('SignUpScreen');
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('PaymentCard')}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={Images.Back()} resizeMode="contain" style={styles.backButtonIcon} />
            </TouchableOpacity>

            <Text style={styles.title}>רוצה הנחה?</Text>
            <Text style={styles.description}>הצטרף כמשתמש חדש וקבל 10% הנחה על שטיפה!</Text>
            <TouchableOpacity style={styles.claimButton} onPress={handleClaimDiscount}>
                <Text style={styles.claimButtonText}>קבל הנחה</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
    },
    claimButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    claimButtonText: {
        fontSize: 18,
        color: 'white',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
        zIndex: 999, // Ensure the close button is above other content
    },
    closeButtonText: {
        fontSize: 24,
        color: '#333', // You can adjust the color to match your design
    },
    backButtonIcon: {
        width: 24,
        height: 24,

        tintColor: 'black', // You can adjust the color of the back arrow
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        padding: 10,
        zIndex: 999,
    },
});

export default DiscountTest;
