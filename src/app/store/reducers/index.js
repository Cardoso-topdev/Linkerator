import { combineReducers } from 'redux';
import links from './links.reducers';
import message from './message.reducer';
import tags from './tag.reducers';

/**
 * Root Reducer consists of link, message and tags
 * State also consists of link, message and tag
 */
const rootReducer = combineReducers({
    links,
    message,
    tags
})

export default rootReducer;