import { linkActionTypes, messageActionTypes } from '../../config';
import { linkService } from '../../services';

const getLinks = (data) => (dispatch) => {
    dispatch({type: linkActionTypes.FETCH_LINKS_REQUEST});
    return linkService.getLinks(data)
    .then(data => {
        dispatch({
            type: linkActionTypes.FETCH_LINKS_SUCCESS,
            payload: data
        })
    })
    .catch(({errors}) => {
        dispatch({
            type: linkActionTypes.FETCH_LINKS_FAILURE,
            payload: error.message
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload : {
                message: errors[0].message,
                success: false
            }
        });
    })
};

const getTags = () => (dispatch) => {
    dispatch({type: linkActionTypes.FETCH_TAGS_REQUEST});
    return linkService.getTags()
    .then(data => {
        dispatch({
            type: linkActionTypes.FETCH_TAGS_SUCCESS,
            payload: data
        })
    })
    .catch(({errors}) => {
        dispatch({
            type: linkActionTypes.FETCH_TAGS_FAILURE,
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload : {
                message: errors[0].message,
                success: false
            }
        });
    })
}

const addLink = (data) => (dispatch) => {
    dispatch({type: linkActionTypes.EDIT_LINK_REQUEST});
    return linkService.addLink(data)
    .then(data => {
        dispatch({
            type: linkActionTypes.ADD_LINK_SUCCESS,
            payload: data
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload : {
                message: "Successfully Link Added",
                success: true
            }
        });
    })
    .catch(({errors}) => {
        dispatch({
            type: linkActionTypes.EDIT_LINK_FAILURE,
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload : {
                message: errors[0].message,
                success: false
            }
        });
    })
};

const updateLink = (data, id) => (dispatch) => {
    dispatch({type: linkActionTypes.EDIT_LINK_REQUEST});
    return linkService.updateLink(data, id)
    .then(data => {
        dispatch({
            type: linkActionTypes.UPDATE_LINK_SUCCESS,
            payload: data
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload : {
                message: "Successfully Link Updated",
                success: true
            }
        });
    })
    .catch(({errors}) => {
        dispatch({
            type: linkActionTypes.EDIT_LINK_FAILURE,
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload : {
                message: errors[0].message,
                success: false
            }
        });
    })
};

const deleteLinks = (lists) => dispatch => {
    dispatch({type: linkActionTypes.DELETE_LINK_REQUEST});
    return linkService.deleteLinks(lists)
    .then(data => {
        dispatch({
            type: linkActionTypes.DELETE_LINK_SUCCESS,
            payload: data
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload : {
                message: `${data.length} data successfully deleted`,
                success: true
            }
        });
    })
    .catch(({errors}) => {
        dispatch({
            type: linkActionTypes.DELETE_LINK_FAILURE,
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload : {
                message: errors[0].message,
                success: false
            }
        });
    })
}

const visitCounter = (id) => dispatch => {
    return linkService.visitCounter(id)
    .then(data => {
        dispatch({
            type: linkActionTypes.COUNT_SUCCESS,
            payload: {
                count: data,
                id: id
            }
        });
    })
    .catch(() => {
        dispatch({
            type: linkActionTypes.COUNT_FAILURE,
        });
    })
}

export const linkActions = {
    getLinks,
    getTags,
    addLink,
    updateLink,
    deleteLinks,
    visitCounter
}