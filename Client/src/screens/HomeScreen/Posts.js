import React from 'react'
import { Platform, SafeAreaView } from 'react-native'
import Card from '../../components/card'
import TopBar from '../../components/topbar'

export default function Posts({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: Platform.OS === "android" ? 20 : 0 }}>
            <TopBar title="Stream" rightIcon="setting"/>

            <Card navigation={navigation} />
            <Card navigation={navigation} />
        </SafeAreaView>
    )
}
