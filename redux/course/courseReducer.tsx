import {
        GET_COURSES, 
        ADD_NEW_COURSE, 
        ADD_NEW_COURSE_ERROR, 
        UPDATE_COURSE, 
        UPDATE_COURSE_ERROR, 
        DELETE_COURSES, 
        GET_COURSES_ERROR,
        GET_SPECIFIC_CATEGORY_DETAILS_ERROR,
        GET_SPECIFIC_CATEGORY_DETAILS,
        GET_SPECIFIC_COURSE_DETAILS,
        GET_SPECIFIC_COURSE_DETAILS_ERROR
    } from '../types'

const initialState = {
    courses: [],
    addCourse: {},
    category: {},
    course: {}
}

function courseReducer(state = initialState, action: any) {

    switch (action.type) {

        case GET_COURSES:
            return {
                ...state,
                courses: action.payload
            }

        case GET_COURSES_ERROR:
            return {
                ...state,
                courses: []
            }

        case ADD_NEW_COURSE:
            return {
                ...state,
                addCourse: action.payload
            }

        case UPDATE_COURSE:
            return {
                ...state,
                addCourse: action.payload
            }


        case ADD_NEW_COURSE_ERROR:
            return {
                ...state,
                addCourse: {}
            }

        case UPDATE_COURSE_ERROR:
            return {
                ...state,
                addCourse: {}
            }
        
        case GET_SPECIFIC_CATEGORY_DETAILS:
            return {
                ...state,
                category: action.payload
        }

        case GET_SPECIFIC_CATEGORY_DETAILS:
            return {
                ...state,
                category: action.payload
        }

        case GET_SPECIFIC_COURSE_DETAILS:
            return {
                ...state,
                course: action.payload
        }

        case GET_SPECIFIC_COURSE_DETAILS_ERROR:
            return {
                ...state,
                course: action.payload
        }
            
        default: return state
    }

}

export default courseReducer;