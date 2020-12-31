import axios from 'axios';
import { API_URL } from '../config'

/**
 * 
 * @param {} data
 * data includes search keys for links and tag 
 * It returns promise on the response.
 */
const getLinks = (data) => {
    const url = data ? data.url : '';
    const tag = data ? data.tag : '';
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/link`, {
            params: {
                url: url || '',
                tag: tag || ''
            }
        })
        .then(respone => {
            const { data } = respone.data;
            resolve(data)
        })
        .catch(error => {
            const { data } = error.response;
            reject(data.error);
        })
    })
} 

/**
 * It fetches all available tag lists
 */
const getTags = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/tags`)
        .then(respone => {
            const { data } = respone.data;
            resolve(data)
        })
        .catch(error => {
            const { data } = error.response;
            reject(data.error);
        })
    })
} 

/**
 * 
 * @param {link data} data :It includes link, comment, tags. 
 * to add a new link to db
 */
const addLink = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/link`, data)
        .then(respone => {
            const { data } = respone.data;
            resolve(data)
        })
        .catch(error => {
            const { data } = error.response;
            reject(data.error);
        })
    })
} 

/**
 * 
 * @param {data} data : data to be updated
 * @param {id} id: id of the link being updated 
 */
const updateLink = (data, id) => {
    return new Promise((resolve, reject) => {
        axios.patch(`${API_URL}/link/${id}`, data)
        .then(respone => {
            const { data } = respone.data;
            resolve(data)
        })
        .catch(error => {
            const { data } = error.response;
            reject(data.error);
        })
    })
} 

/**
 * 
 * @param {*} lists : id array of the links to be deleted
 */
const deleteLinks = (lists) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_URL}/link`, {
            data : {
                id: lists
            }
        })
        .then(respone => {
            resolve(lists)
        })
        .catch(error => {
            const { data } = error.response;
            reject(data.error);
        })
    })
}

/**
 * 
 * @param {id} id: id of the visited link. 
 */
const visitCounter = (id) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/visit`, {
                id: id
        })
        .then(respone => {
            const { data } = respone.data;
            resolve(data);
        })
        .catch(error => {
            const { data } = error.response;
            reject(data.error);
        })
    })
}

export const linkService = {
    getLinks,
    getTags,
    addLink,
    updateLink,
    deleteLinks,
    visitCounter
}