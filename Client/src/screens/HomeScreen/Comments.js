import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import BottomInput from '../../components/BottomInput'
import CommentItem from '../../components/CommentItem'
import TopBar from '../../components/topbar'
import { URL, URL_COMMENT } from '../../store/apiUrl'
import { INCREASE_COMMENTS } from '../../store/types'

export default function Comments({ navigation, route: { params: { postId } } }) {

    const dispatch = useDispatch()

    const [addLoadingComment, setAddLoadingComment] = useState(false)
    const [disabledAddCommentButton, setDisabledAddCommentButton] = useState(true)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        fetchComments()
    }, [])

    const fetchComments = async () => {
        const token = await AsyncStorage.getItem('token')
        const response = await Axios.get(URL + URL_COMMENT + postId, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.data) {
            setComments(response.data)
        }
    }

    const onChange = (text) => {
        setComment(text)
        setDisabledAddCommentButton(false)
        if (text == "")
            setDisabledAddCommentButton(true)
    }

    const handleAddComment = async () => {
        const token = await AsyncStorage.getItem('token')
        setAddLoadingComment(true)
        const data = {
            content: comment,
            postId,
            commentId: -1
        }
        const response = await Axios.post(URL + URL_COMMENT, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (response.data) {
            response.data.replies = []
            comments.splice(0, 0, response.data);
            Keyboard.dismiss()
            setComment('')
            setDisabledAddCommentButton(true)
            dispatch({ type: INCREASE_COMMENTS, payload: postId })
        }
        setAddLoadingComment(false)
    }

    const _renderItem = ({ item }) => (
        <CommentItem comment={item} postId={postId} comments={comments} setComments={setComments} />
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >

            <TopBar title="Comments" leftIcon="left" leftIconClick={() => navigation.goBack()} />

            <FlatList
                data={comments}
                renderItem={_renderItem}
                //onEndReached={onEndReached}
                //ListHeaderComponent={_headerCompoenent}
                onEndReachedThreshold={1}
                keyExtractor={(item, index) => index.toString()}
            />
            <BottomInput
                onPressSend={handleAddComment}
                loading_process={addLoadingComment}
                onChange={onChange}
                disabledButton={disabledAddCommentButton}
                comment={comment}
            />
        </SafeAreaView>
    )
}

