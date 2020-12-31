import { linkActionTypes, messageActionTypes } from '../../config';

/**
 * initial state
 */
const initialState = {
    isLoading : false,
    tags     : []
}

const tags = (state = initialState, action) => {
    switch(action.type) {
        case linkActionTypes.FETCH_TAGS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case linkActionTypes.FETCH_TAGS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tags: action.payload
            }
        case linkActionTypes.FETCH_TAGS_FAILURE:
            return {
                ...state,
                isLoading: false
            }
        default: 
            return state;
    }
}

export default tags;