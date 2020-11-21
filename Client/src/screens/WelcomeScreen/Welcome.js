import React, { useState, useEffect } from 'react'
import {  SafeAreaView, ImageBackground,  StyleSheet } from 'react-native'
import { SocialIcon } from 'react-native-elements'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import welcome from '../../../assets/welcome.png'
import * as Google from 'expo-google-app-auth';
import Axios from 'axios'
import { URL, URL_USER } from '../../store/apiUrl'
import { addUser } from '../../store/actions/authAction'
import { useDispatch } from 'react-redux'
import { AUTH_USER } from '../../store/types'
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'

export default function Welcome() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     AsyncStorage.setItem('token','eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5IiwidW5pcXVlX25hbWUiOiJ0ZXJ0a3VydDEyM0BnbWFpbC5jb20iLCJuYmYiOjE2MDU5NTQ4MDksImV4cCI6MTgyNjc5MzIwOSwiaWF0IjoxNjA1OTU0ODA5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxIn0.4o2EY153O1Ao6fstll78g-Ituo1xUPLotNWNkkfaghUVwQe_mLQSQAzbCZZFZgwze0MUOMsljFBDYBu2MN690g')
    // }, [])


    async function signInWithGoogleAsync() {
        try {
            setLoading(true)

            const result = await Google.logInAsync({
                androidClientId: "480017187353-ar05pj6j5c89vfk4np77l1ip7hjt1ghi.apps.googleusercontent.com",
                iosClientId: "480017187353-qp44d9es89gg8thdlet49q9fett1a9vi.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                const { user } = result

                const checkEmail = await Axios.post(URL + URL_USER + `checkEmail?email=${user.email}`)

                if (!checkEmail.data) {
                    const data = {
                        email: user.email,
                        name: user.givenName,
                        surname: user.familyName ? user.familyName : null,
                    }
                    dispatch(addUser(data));

                } else {
                    await AsyncStorage.setItem('token', checkEmail.data.token)
                    dispatch({ type: AUTH_USER, payload: checkEmail.data });
                }

            } else {
                setLoading(false)
                return { cancelled: true };
            }

        } catch (e) {
            setLoading(false)
            console.log(e.response);
            return { error: true };
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#21618C' }}>
            <Spinner visible={loading} />
            <ImageBackground source={welcome} style={styles.imageContainer}>
                <SocialIcon
                    title={"Sign In With Google"}
                    button={true}
                    light
                    type={"google"}
                    style={{ padding: 20 }}
                    onPress={signInWithGoogleAsync}
                />
            </ImageBackground>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        height: heightPercentageToDP('100%'),
        width: widthPercentageToDP('100%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
})