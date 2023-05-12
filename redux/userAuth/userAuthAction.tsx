import { GET_USERS, USERS_ERROR, USER_LOGIN, USER_LOGIN_ERROR, USER_SIGNUP, USER_SIGNUP_ERROR, USER_LOGOUT } from '../types'
import axios, { AxiosRequestConfig, AxiosResponse} from 'axios';

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
                url: `http://localhost:5000/api/user/login`,
                headers: {
                  'Content-Type': 'application/json'
                },
                data: data
              };
              const res: AxiosResponse = await axios(config);

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
                url: `http://localhost:5000/api/user/signup`,
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