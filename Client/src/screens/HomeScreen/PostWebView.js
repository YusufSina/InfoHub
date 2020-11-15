import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import { Line } from '../../components/line'
import TopBar from '../../components/topbar'

export default function PostWebView({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopBar title="Header" leftIcon="left"  leftIconClick={()=>navigation.goBack()} />
            <Line/>
            <WebView source={{ uri: 'https://expo.io' }}  />
        </SafeAreaView>
    )
}
