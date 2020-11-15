import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

function Card() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header}>Header</Text>
            </View>
            <View style={styles.footer}>
                <Text style={{}}>Points</Text>
                <Text style={{}}>Comments</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
})

export default Card
