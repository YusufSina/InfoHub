import React, { useEffect, useState } from 'react'
import {
    Platform,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    View,
    Modal,
    Text,
    StyleSheet,
} from 'react-native'
import FlashMessage from "react-native-flash-message";
import Card from '../../components/card'
import TopBar from '../../components/topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../store/actions/postAction'
import Categories from './Categories';
import { BottomSheet, Button, CheckBox } from 'react-native-elements';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { CLEAR_POST } from '../../store/types';

export default function Posts({ navigation }) {
    const [loader, setLoader] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [modalVisible, setModalVisible] = useState(false)
    const [option, setOption] = useState('hot')
    const { posts, loading, pagination, categoryNumber } = useSelector(state => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchPosts(pageNumber)
    }, [categoryNumber,option])

    const fetchPosts = (pageNumber) => {
        dispatch(getPosts(pageNumber, categoryNumber, option))
    }

    const _renderItem = ({ item }) => (
        <Card navigation={navigation} post={item} />
    )

    const _headerCompoenent = () => {
        return (
            loading && <ActivityIndicator
                size="small"
                color="gray"
                style={{ paddingTop: 15 }}
            />
        )
    }

    const onEndReached = () => {
        const { HasNext, CurrentPage } = pagination

        setLoader(true)
        if (HasNext && pageNumber != CurrentPage) {
            setPageNumber(CurrentPage)
            fetchPosts(CurrentPage + 1)
        }
        setTimeout(() => {
            setLoader(false)
        }, 200)
    }

    const _footerCompoenent = () => {
        if (
            loader &&
            posts.length >= pagination.PageSize &&
            !pagination.HasNext
        ) {
            return <ActivityIndicator size="small" color="gray" />
        }
        return <View style={{ paddingVertical: 20 }} />
    }

    const onPressCheckBox = (value) => {
       if (value != option) {
           dispatch({type:CLEAR_POST})
           setOption(value)
           setModalVisible(false)
        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
                paddingTop: Platform.OS === 'android' ? 20 : 0,
            }}
        >
            <TopBar title="Stream" rightIcon="setting" rightIconClick={() => setModalVisible(true)} />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <CheckBox
                            title='Hot'
                            onPress={() => onPressCheckBox('hot')}
                            containerStyle={{ width: 150 }}
                            checked={option == 'hot'}
                        />
                        <CheckBox
                            title='Latest'
                            onPress={() => onPressCheckBox('latest')}
                            checked={option == 'latest'}
                            containerStyle={{ width: 150 }}
                        />
                        <Button
                            title="Close"
                            containerStyle={{ width: 150, marginTop: 10 }}
                            onPress={() => setModalVisible(false)}
                            titleStyle={{fontSize:heightPercentageToDP('2.3%')}}
                            buttonStyle={{ backgroundColor: 'gray', padding: 5 }} />
                    </View>
                </View>
            </Modal>

            <Categories />
            <FlatList
                data={posts}
                renderItem={_renderItem}
                onEndReached={onEndReached}
                ListHeaderComponent={_headerCompoenent}
                ListFooterComponent={_footerCompoenent}
                onEndReachedThreshold={1}
                keyExtractor={(item, index) => index.toString()}
            />
            <FlashMessage position="top" />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: widthPercentageToDP('60%'),
        height: widthPercentageToDP('60%'),

    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});