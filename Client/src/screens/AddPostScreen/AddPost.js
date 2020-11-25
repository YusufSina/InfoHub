import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Button,
    ActivityIndicator,
} from 'react-native'
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

import TopBar from '../../components/topbar'
import { addPost } from '../../store/actions/postAction'

export default function AddPost() {
    const [valueHeader, setValueHeader] = React.useState('')
    const [valueLink, setValueLink] = React.useState('')
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()

    const sendPost = async () => {
        setLoader(true)
        let isSucceed = await dispatch(addPost({ title: valueHeader, link: valueLink, userId: 10 }))

        setLoader(false)
        if (isSucceed) {
            showMessage({
                message: "Başarılı!",
                description: "İşleminiz başarıyla gerçekleşti.",
                type: "success",
              });

            setValueHeader('')
            setValueLink('')
            return;
        }
        showMessage({
            message: "Hata!",
            description: "Bir hata meydana geldi.",
            type: "danger",
          });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopBar title="Share Wisely" />
            <View style={styles.ContainerOfInput}>
                <TextInput
                    style={styles.Input}
                    placeholder="Enter header"
                    disabled={loader}
                    onChangeText={(text) => setValueHeader(text)}
                    value={valueHeader}
                ></TextInput>
            </View>
            <View style={styles.ContainerOfInput}>
                <TextInput
                    style={styles.Input}
                    placeholder="Give the link"
                    disabled={loader}
                    onChangeText={(text) => setValueLink(text)}
                    value={valueLink}
                ></TextInput>
            </View>
            <View style={styles.ContainerOfInput}>
                <Button title="Share" disabled={!valueHeader || !valueLink || loader} onPress={() => sendPost()} />
            </View>
            {loader && (
                <View style={styles.loadingScreen}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )}
            <FlashMessage position="top" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ContainerOfInput: {
        padding: 10,
    },
    Input: {
        height: 52,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 5,
    },
    loadingScreen: {
        backgroundColor: 'gray',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
    },
})
