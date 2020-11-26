import React, { useEffect, useState } from 'react'
import { Platform, SafeAreaView, FlatList, ActivityIndicator, View } from 'react-native'
import Card from '../../components/card'
import TopBar from '../../components/topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../store/actions/postAction'


export default function Posts({ navigation }) {
   
    const [loader, setLoader] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const { posts, loading, pagination } = useSelector(state => state.post)
    console.log(posts);
    const dispatch = useDispatch()

    useEffect(() => {
        fetchPosts(1)
    }, [])

    const fetchPosts = (pageNumber) => {
        dispatch(getPosts(pageNumber))
    }

    const _renderItem = ({ item }) => (
        <Card navigation={navigation} post={item} />
    )

    const _headerCompoenent = () => {
        return <ActivityIndicator size="small" color="gray" style={{ paddingTop: 15 }} />
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
        }, 200);
    }

    const _footerCompoenent = () => {
        if (loader && posts.length >= pagination.PageSize && !pagination.HasNext) {
            return <ActivityIndicator size="small" color="gray" />
        }
        return <View style={{ paddingVertical: 20 }} />
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: Platform.OS === "android" ? 20 : 0 }}>
            <TopBar title="Stream" rightIcon="setting"/>
            <FlatList
            data={posts}
            renderItem={_renderItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={1}
            keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}
