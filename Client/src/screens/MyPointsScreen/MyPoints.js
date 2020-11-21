import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../components/card'
import TopBar from '../../components/topbar'
import { getMyPoints } from '../../store/actions/postAction'

export default function MyPoints({ navigation }) {
    
    const [loader, setLoader] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const { myPoints, loading, pagination } = useSelector(state => state.post)
    
    const dispatch = useDispatch()

    useEffect(() => {
        fetchMyPoints(1)
    }, [])

    const fetchMyPoints = (pageNumber) => {
        dispatch(getMyPoints(pageNumber))
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
            fetchMyPoints(CurrentPage + 1)
        }
        setTimeout(() => {
            setLoader(false)
        }, 200);
    }

    const _footerCompoenent = () => {
        if (loader && myPoints.length >= pagination.PageSize && !pagination.HasNext) {
            return <ActivityIndicator size="small" color="gray" />
        }
        return <View style={{ paddingVertical: 20 }} />
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <TopBar title="My Points" />
            <FlatList
                data={myPoints}
                renderItem={_renderItem}
                onEndReached={onEndReached}
                onEndReachedThreshold={1}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}
