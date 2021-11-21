import { baseURL, setHeaders } from '../../api';
import axios from 'axios';

export const getTodos = () => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/todos`, setHeaders())
            .then((todos) => {
                dispatch({
                    type: 'GET_TODOS',
                    todos,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const addTodo = (todo) => {
    return (dispatch, getState) => {
        const author = getState().auth.name;
        const uid = getState().auth._id;
        axios
            .post(`${baseURL}/todos`, { ...todo, author, uid }, setHeaders())
            .then((todo) => {
                dispatch({
                    type: 'ADD_TODO',
                    todo,
                });
            })
            .catch((error) => {
                console.log(error.response);
            });
    };
};

export const updateTodo = (updatedTodo, id) => {
    return (dispatch, getState) => {
        axios
            .put(`${baseURL}/todos/${id}`, updatedTodo, setHeaders())
            .then((todo) => {
                dispatch({
                    type: 'UPDATE_TODO',
                    todo,
                });
            })
            .catch((error) => {
                console.log(error.response);
            });
    };
};
export const deleteTodo = (id) => {
    return (dispatch, getState) => {
        axios
            .delete(`${baseURL}/todos/${id}`, setHeaders())
            .then(() => {
                dispatch({
                    type: 'DELETE_TODO',
                    id,
                });
            })
            .catch((error) => {
                console.log(error.response);
            });
    };
};
