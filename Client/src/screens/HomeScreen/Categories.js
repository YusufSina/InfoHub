import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import CategoryItem from '../../components/categoryItem'
import { URL, URL_CATEGORY } from '../../store/apiUrl'
import { GET_CATEGORIES } from '../../store/types'

export default function Categories() {

    const categories = useSelector(state => state.post.categories)
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await Axios.get(URL + URL_CATEGORY)
            dispatch({
                type: GET_CATEGORIES,
                payload: response.data
            })
        }
        fetchCategories()
    }, [])

    return (
        <View style={styles.styles}>
            <ScrollView style={styles.innerContainer} horizontal={true} showsHorizontalScrollIndicator={false} >
                {categories.map((c) => (
                    <CategoryItem key={c.id} category={c} />
                ))}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'row'
    }
})
