import { GET_CATEGORIES, ADD_NEW_CATEGORY, ADD_NEW_CATEGORY_ERROR, UPDATE_CATEGORY, UPDATE_CATEGORY_ERROR, DELETE_CATEGORIES, GET_CATEGORIES_ERROR } from '../types'

const initialState = {
    categories: [],
    addCategory: {}
}

function categoryReducer(state = initialState, action: any) {

    switch (action.type) {

        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }

        case GET_CATEGORIES_ERROR:
            return {
                ...state,
                categories: []
            }

        case ADD_NEW_CATEGORY:
            return {
                ...state,
                addCategory: action.payload
            }

        case UPDATE_CATEGORY:
            return {
                ...state,
                addCategory: action.payload
            }


        case ADD_NEW_CATEGORY_ERROR:
            return {
                ...state,
                addCategory: {}
            }

        case UPDATE_CATEGORY_ERROR:
            return {
                ...state,
                addCategory: {}
            }

        default: return state
    }

}

export default categoryReducer;