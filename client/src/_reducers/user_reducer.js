import { ADD_TO_CART, AUTH_USER, LOGIN_USER, REGISTER_USER } from '../_actions/types';

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
        default:
            return state;
    }
}

export default userReducer;