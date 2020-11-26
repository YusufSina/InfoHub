import React, { useEffect, useState } from 'react'
import {
    Platform,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    View,
} from 'react-native'
import FlashMessage from "react-native-flash-message";
import Card from '../../components/card'
import TopBar from '../../components/topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../store/actions/postAction'
import Categories from './Categories';

export default function Posts({ navigation }) {
    const [loader, setLoader] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const { posts, loading, pagination, categoryNumber } = useSelector(state => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchPosts(pageNumber)
    }, [categoryNumber])

    const fetchPosts = (pageNumber) => {
        dispatch(getPosts(pageNumber, categoryNumber))
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

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
                paddingTop: Platform.OS === 'android' ? 20 : 0,
            }}
        >
            <TopBar title="Stream" rightIcon="setting" />

            <Categories />
            <FlatList
                data={posts}
                renderItem={_renderItem}
                onEndReached={onEndReached}
                ListHeaderComponent={_headerCompoenent}
                onEndReachedThreshold={1}
                keyExtractor={(item, index) => index.toString()}
            />
            <FlashMessage position="top" />
        </SafeAreaView>
    )
}
