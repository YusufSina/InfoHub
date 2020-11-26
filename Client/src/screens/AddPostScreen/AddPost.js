import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, TextInput, View, StyleSheet, Button } from 'react-native'
import TopBar from '../../components/topbar'
import { addPost } from '../../store/actions/postAction'

export default function AddPost() {
    const [valueHeader, onChangeHeader] = React.useState('');
    const [valueLink, onChangeLink] = React.useState('');
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch()

    const sendPost = () => {
        dispatch(addPost({ title: valueHeader, link: valueLink, userId: 10 }))
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopBar title="Share Wisely" />
            <View style={styles.ContainerOfInput}>
                <TextInput
                    style={styles.Input}
                    placeholder="Enter header"
                    onChangeText={text => onChangeHeader(text)}
                ></TextInput>
            </View>
            <View style={styles.ContainerOfInput}>
                <TextInput
                    style={styles.Input}
                    placeholder="Give the link"
                    onChangeText={text => onChangeLink(text)}
                ></TextInput>
            </View>
            <View style={styles.ContainerOfInput}>
                <Button
                    title="Share"
                    onPress={() => sendPost()}
                />
            </View>
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
        paddingHorizontal: 5
    },
})
