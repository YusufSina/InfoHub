import { GET_MY_POINTS, POST_LOADING } from "../types";
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




