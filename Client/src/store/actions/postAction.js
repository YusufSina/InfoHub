import { GET_MY_POINTS, POST_LOADING, GET_POSTS } from "../types";
import { URL, URL_POST } from "../apiUrl";
import Axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';

export const getMyPoints = (pageNumber) => async dispatch => {
    const token = await AsyncStorage.getItem('token')
    dispatch({ type: POST_LOADING, payload: true })
    return Axios.get(URL + URL_POST + `myPoints?pageNumber=${pageNumber}&pageSize=20`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            dispatch({ type: GET_MY_POINTS, payload: res });
        }).catch(error => {
            //console.log(error.response);
        }).finally(() => dispatch({ type: POST_LOADING, payload: false }))

};

export const getPosts = (pageNumber) => async dispatch => {
    const token = await AsyncStorage.getItem('token')
    dispatch({ type: POST_LOADING, payload: true })
    return Axios.get(URL + URL_POST + `/?pageNumber=${pageNumber}&pageSize=20`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            dispatch({ type: GET_POSTS, payload: res });
        }).catch(error => {
            console.log(error);
        }).finally(() => dispatch({ type: POST_LOADING, payload: false }))

};

export const addPost = (data) => async dispatch => {
    const token = await AsyncStorage.getItem('token')
    dispatch({ type: POST_LOADING, payload: true })
    return Axios.post(URL + URL_POST, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            dispatch({ type: POST_LOADING, payload: false });
            return true;
        }).catch(error => {
            console.log(error);
            return false;
        }).finally(() => dispatch({ type: POST_LOADING, payload: false }))

};