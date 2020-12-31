import { linkActionTypes } from '../../config';
import { linkActions } from '../actions';

const initialState = {
    isLoading : false,
    links     : []
}
/**
 * 
 * @param {state} state the current state of the redux store 
 * @param {action} action the dispatched action
 */
const links = (state = initialState, action) => {
    switch(action.type) {
        case linkActionTypes.FETCH_LINKS_REQUEST:
        case linkActionTypes.EDIT_LINK_REQUEST:
        case linkActionTypes.DELETE_LINK_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case linkActionTypes.FETCH_LINKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                links: action.payload
            }
        case linkActionTypes.ADD_LINK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                links: state.links.concat(action.payload)
            }
        case linkActionTypes.UPDATE_LINK_SUCCESS:
            //update the current state with the new value.
            const newState = [...state.links];
            let updated_index = newState.findIndex(state => state.id === action.payload.id);
            newState[updated_index] = action.payload;
            return {
                ...state,
                isLoading: false,
                links: newState
            }
        
        case linkActionTypes.DELETE_LINK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                links: state.links.filter(link => !action.payload.includes(link.id))
            }
        case linkActionTypes.COUNT_SUCCESS:
            const $newState = [...state.links];
            let visited_index = $newState.findIndex((ele) => ele.id === action.payload.id);
            $newState[visited_index].count = action.payload.count;
            return {
                ...state,
                links: $newState
            }

        case linkActionTypes.FETCH_LINKS_FAILURE:
        case linkActionTypes.EDIT_LINK_FAILURE:
        case linkActionTypes.DELETE_LINK_FAILURE:
            return {
                ...state,
                isLoading: false
            }
        default: 
            return state;
    }
}

export default links;