import { 
    GET_TOPICS,
    GET_TOPICS_ERROR, 
    ADD_NEW_TOPIC, 
    ADD_NEW_TOPIC_ERROR, 
    UPDATE_TOPIC,
    UPDATE_TOPIC_ERROR, 
    DELETE_TOPIC
} 
    from '../types'
import axios, { AxiosRequestConfig, AxiosResponse} from 'axios';
import {APP_BACKEND_URL} from '../../utils/constants';

export function getTopics() {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'get',
                url: APP_BACKEND_URL + `/api/topics/all`,
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': sessionStorage.getItem('token')
                }
              };
              const res: AxiosResponse = await axios(config);

            dispatch({
                type: GET_TOPICS,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: GET_TOPICS_ERROR,
                payload: error,
            })
        }
    }
}

export function addNewTopic(data:any) {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: APP_BACKEND_URL + `/api/topic/add`,
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': sessionStorage.getItem('token')
                },
                data: data
              };
              const res: AxiosResponse = await axios(config);

            dispatch({
                type: ADD_NEW_TOPIC,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: ADD_NEW_TOPIC_ERROR,
                payload: error,
            })
        }
    }
}

export function updateTopic(data:any) {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'patch',
                url: APP_BACKEND_URL + `/api/topic/update/`+data._id,
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': sessionStorage.getItem('token')
                },
                data: data
              };
              const res: AxiosResponse = await axios(config);

            dispatch({
                type: UPDATE_TOPIC,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: UPDATE_TOPIC_ERROR,
                payload: error,
            })
        }
    }
}
