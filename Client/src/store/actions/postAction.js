import { GET_MY_POINTS, GET_POSTS, ADD_POST, POST_ERROR, POST_LOADING, ADD_POINT, POINT_ERROR, POINT_LOADING, REMOVE_POINT } from "../types";
import { DOWN_VOTE, UP_VOTE, URL, URL_POST } from "../apiUrl";
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

export const getPosts = (pageNumber, categoryNumber, option) => async dispatch => {
    const token = await AsyncStorage.getItem('token')
    dispatch({ type: POST_LOADING })
    return Axios.get(URL + URL_POST + `?pageNumber=${pageNumber}&pageSize=20&categoryId=${categoryNumber}&option=${option}`, {
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
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            console.log(res);
            categoryState && dispatch({ type: ADD_POST, payload: res.data });
        }).catch(error => {
            console.log(error);
            dispatch({ type: POST_ERROR });
        })

};

export const addPoint = (data) => async dispatch => {
    const token = await AsyncStorage.getItem('token')
    try {
        dispatch({ type: ADD_POINT, payload: data});
        await Axios.post(URL + URL_POST + UP_VOTE + data, null, { headers: { 'Authorization': `Bearer ${token}` } })
    } catch (error) {
        dispatch({ type: REMOVE_POINT, payload: data});
    }
}

export const removePoint = (data) => async dispatch => {
    const token = await AsyncStorage.getItem('token')
    try {
        dispatch({ type: REMOVE_POINT, payload: data });
        await Axios.post(URL + URL_POST + DOWN_VOTE + data, null, { headers: { 'Authorization': `Bearer ${token}` } })
    } catch (error) {
        dispatch({ type: ADD_POINT, payload: data });
    }

}


