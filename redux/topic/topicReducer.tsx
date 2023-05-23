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

const initialState = {
    topics: [],
    addTopic: {}
}

function topicReducer(state = initialState, action: any) {

    switch (action.type) {

        case GET_TOPICS:
            return {
                ...state,
                topics: action.payload.topics
            }

        case GET_TOPICS_ERROR:
            return {
                ...state,
                topics: []
            }

        case ADD_NEW_TOPIC:
            return {
                ...state,
                addTopic: action.payload
            }

        case UPDATE_TOPIC:
            return {
                ...state,
                addTopic: action.payload
            }


        case ADD_NEW_TOPIC_ERROR:
            return {
                ...state,
                addTopic: {}
            }

        case UPDATE_TOPIC_ERROR:
            return {
                ...state,
                addTopic: {}
            }

        default: return state
    }

}

export default topicReducer;