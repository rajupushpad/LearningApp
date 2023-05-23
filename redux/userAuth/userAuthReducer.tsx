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

const initialState = {
    users:[],
    loading:true,
    signup: {},
    userAuth: {},
    loginRequired: false
}

export default function userReducer(state = initialState, action:any){

    switch(action.type){

        case GET_USERS:
        return {
            ...state,
            users:action.payload,
            loading:false

        }
        case USERS_ERROR:
            return{
                loading: false, 
                error: action.payload 
            }

        case USER_LOGIN:
            return{
                ...state,
                loading: false, 
                userAuth: action.payload
            }

        case USER_LOGIN_ERROR:
            return{
            loading: false, 
            userAuth: {} 
        }

        case USER_SIGNUP:
            return{
                ...state,
                loading: false, 
                signup: action.payload
            }

        case USER_SIGNUP_ERROR:
            return{
            loading: false, 
            signup: {} 
        }

        case USER_LOGOUT:
            return{
            ...state,
            loading: false, 
            userAuth: {} 
        }

        case USER_LOGIN_REQUIRED: 
        return{
            ...state,
            loginRequired: action.payload.loginRequired
        }

        default: return state
    }

}
