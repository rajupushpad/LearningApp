import { 
    GET_CONTENTS,
    GET_CONTENTS_ERROR, 
    ADD_NEW_CONTENT, 
    ADD_NEW_CONTENT_ERROR, 
    UPDATE_CONTENT,
    UPDATE_CONTENT_ERROR, 
    DELETE_CONTENT,
    GET_SPECIFIC_CONTENT_DETAILS,
    GET_SPECIFIC_CONTENT_DETAILS_ERROR
} 
    from '../types'
import axios, { AxiosRequestConfig, AxiosResponse} from 'axios';
import {APP_BACKEND_URL} from '../../utils/constants';

export function getContents() {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'get',
                url: APP_BACKEND_URL + `/api/contents/all`,
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': sessionStorage.getItem('token')
                }
              };
              const res: AxiosResponse = await axios(config);

            dispatch({
                type: GET_CONTENTS,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: GET_CONTENTS_ERROR,
                payload: error,
            })
        }
    }
}

export function addNewContent(data:any) {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: APP_BACKEND_URL + `/api/content/add`,
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': sessionStorage.getItem('token')
                },
                data: data
              };
              const res: AxiosResponse = await axios(config);

            dispatch({
                type: ADD_NEW_CONTENT,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: ADD_NEW_CONTENT_ERROR,
                payload: error,
            })
        }
    }
}

export function updateContent(data:any) {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'patch',
                url: APP_BACKEND_URL + `/api/content/update/`+data._id,
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': sessionStorage.getItem('token')
                },
                data: data
              };
              const res: AxiosResponse = await axios(config);

            dispatch({
                type: UPDATE_CONTENT,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: UPDATE_CONTENT_ERROR,
                payload: error,
            })
        }
    }
}

export function getSpecificContent(id:any) {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'get',
                url: APP_BACKEND_URL + `/api/content/`+id,
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': sessionStorage.getItem('token')
                }
              };
              const res: AxiosResponse = await axios(config);

            dispatch({
                type: GET_SPECIFIC_CONTENT_DETAILS,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: GET_SPECIFIC_CONTENT_DETAILS_ERROR,
                payload: error,
            })
        }
    }
}

