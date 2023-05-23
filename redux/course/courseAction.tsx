import {
    GET_COURSES,
    GET_COURSES_ERROR,
    ADD_NEW_COURSE,
    ADD_NEW_COURSE_ERROR,
    UPDATE_COURSE,
    UPDATE_COURSE_ERROR,
    DELETE_COURSES,
    GET_SPECIFIC_CATEGORY_DETAILS_ERROR,
    GET_SPECIFIC_CATEGORY_DETAILS,
    GET_SPECIFIC_COURSE_DETAILS,
    GET_SPECIFIC_COURSE_DETAILS_ERROR
} from '../types'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { APP_BACKEND_URL } from '../../utils/constants';

export function getCourses() {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'get',
                url: APP_BACKEND_URL + `/api/course/all`,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token')
                }
            };
            const res: AxiosResponse = await axios(config);

            dispatch({
                type: GET_COURSES,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: GET_COURSES_ERROR,
                payload: error,
            })
        }
    }
}

export function addNewCourse(data: any) {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: APP_BACKEND_URL + `/api/course/add`,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token')
                },
                data: data
            };
            const res: AxiosResponse = await axios(config);

            dispatch({
                type: ADD_NEW_COURSE,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: ADD_NEW_COURSE_ERROR,
                payload: error,
            })
        }
    }
}

export function updateCourse(data: any) {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'patch',
                url: APP_BACKEND_URL + `/api/course/update/` + data._id,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token')
                },
                data: data
            };
            const res: AxiosResponse = await axios(config);

            dispatch({
                type: UPDATE_COURSE,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: UPDATE_COURSE_ERROR,
                payload: error,
            })
        }
    }
}

export function getSpecificCategory(id: any) {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'get',
                url: APP_BACKEND_URL + `/api/category/` + id,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token')
                }
            };
            const res: AxiosResponse = await axios(config);

            dispatch({
                type: GET_SPECIFIC_CATEGORY_DETAILS,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: GET_SPECIFIC_CATEGORY_DETAILS_ERROR,
                payload: error,
            })
        }
    }
}

export function getSpecificCourse(id: any) {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'get',
                url: APP_BACKEND_URL + `/api/course/` + id,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': sessionStorage.getItem('token')
                }
            };
            const res: AxiosResponse = await axios(config);

            dispatch({
                type: GET_SPECIFIC_COURSE_DETAILS,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: GET_SPECIFIC_COURSE_DETAILS_ERROR,
                payload: error,
            })
        }
    }
}

