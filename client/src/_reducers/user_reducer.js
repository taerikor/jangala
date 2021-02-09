import { ADD_TO_CART, AUTH_USER, GET_CART_ITEMS, LOGIN_USER, ON_SUCCESS_BUY, REGISTER_USER, REMOVE_FROM_CART } from '../_actions/types';

function userReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload}
        case REGISTER_USER:
            return { ...state, register: action.payload}
        case AUTH_USER:
            return { ...state, userData: action.payload}
        case ADD_TO_CART:
            return { ...state, 
                userData:{
                        ...state.userData,
                        cart:action.payload
                        }
                    }
        case GET_CART_ITEMS:
            return { ...state, cartDetail: action.payload }
        case REMOVE_FROM_CART:
            return { ...state, cartDetail: action.payload.productInfo,
            userData: {
                ...state.userData, cart: action.payload.cart
            } }
        case ON_SUCCESS_BUY:
            return { ...state, cartDetail: action.payload.cartDetail,
            userData:{
                ...state.userData, cart: action.payload.cart
            } }
        default:
            return state;
    }
}

export default userReducer;