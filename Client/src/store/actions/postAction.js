import { GET_MY_POINTS, GET_POSTS, ADD_POST, POST_ERROR, POST_LOADING } from "../types";
import { URL, URL_POST } from "../apiUrl";
import Axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

export const getMyPoints = (pageNumber) => async dispatch => {
    const token = await AsyncStorage.getItem('token')
    dispatch({ type: POST_LOADING })
    return Axios.get(URL + URL_POST + `myPoints?pageNumber=${pageNumber}&pageSize=20`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            dispatch({ type: GET_MY_POINTS, payload: res });
        }).catch(error => {
            dispatch({ type: POST_ERROR });
        })
};

export const getPosts = (pageNumber, categoryNumber) => async dispatch => {
    const token = await AsyncStorage.getItem('token')
    dispatch({ type: POST_LOADING })
    return Axios.get(URL + URL_POST + `?pageNumber=${pageNumber}&pageSize=20&categoryId=${categoryNumber}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            dispatch({ type: GET_POSTS, payload: res });
        }).catch(error => {
            dispatch({ type: POST_ERROR });
        })

};

// categoryState = Eğer eklenen kategori ile şu anda açık olan kategori aynı ise o zaman reducer'a ekle 
export const addPost = (data, categoryState) => async dispatch => {
    const token = await AsyncStorage.getItem('token')
    dispatch({ type: POST_LOADING })
    return Axios.post(URL + URL_POST, data, {
        headers: {
            'Authorization': `Bearer ${token}asd`
        }
    })
        .then(res => {
            categoryState && dispatch({ type: ADD_POST, payload: res.data });
        }).catch(error => {
            dispatch({ type: POST_ERROR });
        })

};




