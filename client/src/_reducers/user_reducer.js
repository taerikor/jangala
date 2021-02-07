import { AUTH_USER, LOGIN_USER, REGISTER_USER } from '../_actions/types';

function userReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload}
        case REGISTER_USER:
            return { ...state, register: action.payload}
        case AUTH_USER:
            return { ...state, userData: action.payload}
        default:
            return state;
    }
}

export default userReducer;