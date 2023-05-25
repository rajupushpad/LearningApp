import { 
    GET_USERS, 
    USERS_ERROR, 
    USER_LOGIN, 
    USER_LOGIN_ERROR, 
    USER_SIGNUP, 
    USER_SIGNUP_ERROR, 
    USER_LOGOUT,
    USER_LOGIN_REQUIRED
} from '../types'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { APP_BACKEND_URL } from '../../utils/constants';

export function getUsers(data: any) {

    return async function (dispatch: any) {
        try {
            const res = await axios.get(`http://jsonplaceholder.typicode.com/users`)
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: USERS_ERROR,
                payload: error,
            })
        }
    }
}

export function userLogin(data: any) {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: APP_BACKEND_URL + `/api/user/login`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const res: AxiosResponse = await axios(config);
            sessionStorage.setItem('token', res.data.user.token );
            
            dispatch({
                type: USER_LOGIN,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: USER_LOGIN_ERROR,
                payload: error,
            })
        }
    }
}

export function userSignup(data: any) {

    return async function (dispatch: any) {
        try {
            const config: AxiosRequestConfig = {
                method: 'post',
                url: APP_BACKEND_URL + `/api/user/signup`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const res: AxiosResponse = await axios(config);

            dispatch({
                type: USER_SIGNUP,
                payload: res.data
            })
        }
        catch (error) {
            dispatch({
                type: USER_SIGNUP_ERROR,
                payload: error,
            })
        }
    }
}

export function userLogout() {

    sessionStorage.clear();
    
    return async function (dispatch: any) {
        try {

            dispatch({
                type: USER_LOGOUT,
                payload: {}
            })
        }
        catch (error) {
            dispatch({
                type: USER_LOGOUT,
                payload: {}
            })
        }
    }
}

export function setUserLoginRequired(loginRequired: boolean) {
    
    return async function (dispatch: any) {
        try {

            dispatch({
                type: USER_LOGIN_REQUIRED,
                payload: {loginRequired: loginRequired}
            })
        }
        catch (error) {
            dispatch({
                type: USER_LOGIN_REQUIRED,
                payload: {}
            })
        }
    }
}



