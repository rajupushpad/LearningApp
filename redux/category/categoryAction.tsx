import { GET_CATEGORIES, GET_CATEGORIES_ERROR, ADD_NEW_CATEGORY, ADD_NEW_CATEGORY_ERROR, UPDATE_CATEGORY, UPDATE_CATEGORY_ERROR, DELETE_CATEGORIES } from '../types'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { APP_BACKEND_URL } from '../../utils/constants';

export function getCategories() {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'get',
                url: APP_BACKEND_URL + `/api/category/all`,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token')
                }
            };
            const res: AxiosResponse = await axios(config);

            dispatch({
                type: GET_CATEGORIES,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: GET_CATEGORIES_ERROR,
                payload: error,
            })
        }
    }
}

export function addNewCategory(data: any) {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: APP_BACKEND_URL + `/api/category/add`,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token')
                },
                data: data
            };
            const res: AxiosResponse = await axios(config);

            dispatch({
                type: ADD_NEW_CATEGORY,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: ADD_NEW_CATEGORY_ERROR,
                payload: error,
            })
        }
    }
}

export function updateCategory(data: any) {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'patch',
                url: APP_BACKEND_URL + `/api/category/update/` + data._id,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token')
                },
                data: data
            };
            const res: AxiosResponse = await axios(config);

            dispatch({
                type: UPDATE_CATEGORY,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: UPDATE_CATEGORY_ERROR,
                payload: error,
            })
        }
    }
}
