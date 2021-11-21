import { baseURL } from '../../api';
import axios from 'axios';

export const signUp = (user) => {
    return (dispatch) => {
        axios
            .post(`${baseURL}/signup`, user)
            .then((token) => {
                localStorage.setItem('token', token.data);
                dispatch({
                    type: 'SIGN_UP',
                    token: token.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const signIn = (cred) => {
    return (dispatch) => {
        axios
            .post(`${baseURL}/signin`, cred)
            .then((token) => {
                localStorage.setItem('token', token.data);
                dispatch({
                    type: 'SIGN_IN',
                    token: token.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const signOut = (cred) => {
    return (dispatch) => {
        dispatch({
            type: 'SIGN_OUT',
        });
    };
};
export const loadUser = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        if (token) {
            dispatch({
                type: 'USER_LOADED',
                token,
            });
        } else return null;
    };
};
