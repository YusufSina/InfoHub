import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CATEGORY_NUMBER } from '../store/types'

export default function CategoryItem({ category: { id, name } }) {
    const dispatch = useDispatch()
    const categoryNumber = useSelector(state => state.post.categoryNumber)

    return (
        <TouchableOpacity style={[styles.container, categoryNumber == id && { backgroundColor: '#21618C' }]} onPress={() => dispatch({ type: SET_CATEGORY_NUMBER, payload: id })}>
            <Text style={[styles.text, categoryNumber == id && { color: 'white' }]}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        marginLeft: 10,
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Roboto-Medium',
    }
})
