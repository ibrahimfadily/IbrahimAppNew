import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Btn = (props) => {

    const btnStyle = [styles.button, props.style]

    return (
        <TouchableOpacity style={btnStyle} onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        width: '48%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00b5ec',
    },
    buttonText: {
        color: '#ffff',
        fontWeight: 'bold',
    },

})
export default Btn
