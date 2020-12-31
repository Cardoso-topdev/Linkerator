import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { linkActions } from '../store/actions';

/**
 * 
 * @param {*} children 
 * It is a wrappter to pass the current links and tags lists to the children
 */
const ContentWrapper = ({children}) => {
    const dispatch = useDispatch();
    
    //When the app renders first, it fetches the current links and tags listss
    // fromt the db to store them into the redux store.
    useEffect(() => {
        dispatch(linkActions.getLinks());
        dispatch(linkActions.getTags());
    }, []);

    return (
        <Container fixed>
            { children }
        </Container>

    )
}

export default ContentWrapper;