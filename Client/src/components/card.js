import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import RNUrlPreview from "react-native-url-preview";
import { Line } from './line'

function Card({ navigation }) {
    return (
        <View style={styles.container}>

            {/**Header */}
            <View style={styles.headerContainer}>
                <View style={styles.textAndIconContainer}>
                    <AntDesign name="user" size={16} />
                    <Text style={styles.nameText}> Muhammed ALi balcı</Text>
                </View>

                <View style={styles.textAndIconContainer}>
                    <AntDesign name="clockcircleo" size={16} />
                    <Text style={styles.timeText}> 1 day ago</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('PostWebView')} >
                <RNUrlPreview text={"https://elemental.medium.com/the-u-s-is-in-no-shape-for-thanksgiving-a1bd95e40565"} />
            </TouchableOpacity>


            {/** Footer */}
            <View style={styles.footer}>

                <View style={styles.textAndIconContainer}>
                    <AntDesign name="upcircleo" size={16} />
                    <Text style={{}}> 151 Points</Text>
                </View>

                <View style={styles.textAndIconContainer}>
                    <AntDesign name="aliwangwang-o1" size={16} />
                    <Text style={{}}> 32 Comments</Text>
                </View>

            </View>

            <Line />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 15,
    },
    textAndIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nameText: {
        fontSize: heightPercentageToDP('2.3%'),
        fontFamily: 'Roboto-Medium'
    },
    titleText: {
        marginLeft: 10,
        color: '#21618C'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 15,
        marginBottom: 5,
    },
})

export default Card
