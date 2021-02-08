import axios from 'axios'
import { ADD_TO_CART, AUTH_USER, LOGIN_USER, REGISTER_USER } from './types'

export function loginUser(dataToSubmit){

    const request = axios.post('/api/users/login', dataToSubmit)
    .then(res => res.data)
    return {
        type: LOGIN_USER,
        payload: request,
    }
}
export function registerUser(dataToSubmit){

    const request = axios.post('/api/users/register', dataToSubmit)
    .then(res => res.data)
    return {
        type: REGISTER_USER,
        payload: request,
    }
}
export function auth(){

    const request = axios.get('/api/users/auth')
    .then(res => res.data)
    return {
        type: AUTH_USER,
        payload: request,
    }
}
export function addToCart(productId){
    let body = {
        productId
    }

    const request = axios.post('/api/users/addToCart',body)
    .then(res => res.data)
    return {
        type: ADD_TO_CART,
        payload: request,
    }
}