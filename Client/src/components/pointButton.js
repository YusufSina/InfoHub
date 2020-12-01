import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addPoint, removePoint } from '../store/actions/postAction'

function PointButton({ post }) {
    const dispatch = useDispatch()
    const { myPoints } = useSelector((state) => state.post)
    //FIXME: isPointed her türlü true geliyor, ilgilenecek
    const isPointed = myPoints.some((x) => x.id == post.id)

    return (
        <View style={styles.textAndIconContainer}>
            {isPointed ? (
                <TouchableOpacity onPress={() => dispatch(removePoint(post.id))}>
                    <AntDesign name="downcircleo" size={20} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => dispatch(addPoint(post.id))}>
                    <AntDesign name="upcircleo" size={20} />
                </TouchableOpacity>
            )}
            <Text> {post.pointCount} Points</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textAndIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default PointButton
