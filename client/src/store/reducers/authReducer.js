import jwtDecode from 'jwt-decode';

const initial_state = {
    token: localStorage.getItem('token'),
    name: null,
    email: null,
    _id: null,
};

const authReducer = (state = initial_state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
        case 'SIGN_UP':
        case 'SIGN_IN':
            const user = jwtDecode(action.token);
            return {
                ...initial_state,
                token: action.token,
                name: user.name,
                email: user.email,
                _id: user._id,
            };
        case 'SIGN_OUT':
            localStorage.removeItem('token');
            return {
                token: null,
                name: null,
                email: null,
                _id: null,
            };
        default:
            return state;
    }
};

export default authReducer;
