import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    TextInput,
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'
import { showMessage } from "react-native-flash-message";

import TopBar from '../../components/topbar'
import { addPost } from '../../store/actions/postAction'
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function AddPost({ navigation }) {
    const [valueHeader, setValueHeader] = React.useState('')
    const [valueLink, setValueLink] = React.useState('')
    const [selectedCategoryNumber, setSelectedCategoryNumber] = React.useState(1)
    const [submitButton, setSubmitButton] = React.useState(false)
    const [loader, setLoader] = React.useState(false)

    const dispatch = useDispatch()

    const { categories, categoryNumber, error } = useSelector(state => state.post)

    useEffect(() => {
        if (submitButton) {
            if (!loader && !error) {
                showMessage({
                    message: "Successfully!",
                    description: "Post added",
                    type: "success",
                });
                setValueHeader('')
                setValueLink('')

            } else {
                showMessage({
                    message: "Error!",
                    description: "An unexpected error occurred",
                    type: "danger",
                });
            }
            navigation.navigate('Home', { screen: 'Posts' })
            setSubmitButton(false)
        }
    }, [submitButton])

    const sendPost = async () => {
        setLoader(true)
        setSubmitButton(true)
        const data = {
            title: valueHeader != '' ? valueHeader : null,
            link: valueLink,
            categoryId: selectedCategoryNumber
        }
        dispatch(addPost(data, categoryNumber == selectedCategoryNumber))
        setLoader(false)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopBar title="Share Wisely" />
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
                <TextInput
                    style={styles.Input}
                    placeholder="Enter header (Optional)"
                    disabled={loader}
                    onChangeText={(text) => setValueHeader(text)}
                    value={valueHeader}
                ></TextInput>
            </View>
            <View style={styles.ContainerOfInput}>
                <Picker
                    selectedValue={selectedCategoryNumber}
                    onValueChange={(itemValue) => setSelectedCategoryNumber(itemValue)}
                >
                    {categories.map(c => (<Picker.Item key={c.id} label={c.name} value={c.id} />))}
                </Picker>
            </View>

            <View style={styles.ContainerOfInput}>
                <Button
                    title="Share"
                    icon={
                        <AntDesign
                            name="sharealt"
                            size={15}
                            color={!valueLink || loader ? 'gray' : 'white'}
                        />
                    }
                    disabled={!valueLink || loader}
                    onPress={() => sendPost()}
                    titleStyle={{ fontFamily: 'Roboto-Medium', marginLeft: 5 }}
                    buttonStyle={{ backgroundColor: '#21618C', padding: 10, borderRadius: 10 }} />
            </View>
            {loader && (
                <View style={styles.loadingScreen}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )}
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
        padding: 10
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
