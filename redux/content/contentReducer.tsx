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

const initialState = {
    contents: [],
    addContent: {},
    content: {}
}

function topicReducer(state = initialState, action: any) {

    switch (action.type) {

        case GET_CONTENTS:
            return {
                ...state,
                contents: action.payload.contents
            }

        case GET_CONTENTS_ERROR:
            return {
                ...state,
                contents: []
            }

        case ADD_NEW_CONTENT:
            return {
                ...state,
                addContent: action.payload
            }

        case UPDATE_CONTENT:
            return {
                ...state,
                addContent: action.payload
            }


        case ADD_NEW_CONTENT_ERROR:
            return {
                ...state,
                addContent: {}
            }

        case UPDATE_CONTENT_ERROR:
            return {
                ...state,
                addContent: {}
            }
        
        case GET_SPECIFIC_CONTENT_DETAILS:
            return {
                ...state,
                content: action.payload
            }

        case GET_SPECIFIC_CONTENT_DETAILS_ERROR:
            return {
                ...state,
                content: {}
            }
    
        default: return state
    }

}

export default topicReducer;