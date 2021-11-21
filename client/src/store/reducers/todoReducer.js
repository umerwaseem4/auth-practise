const todoReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_TODOS':
            return action.todos.data;
        case 'ADD_TODO':
            return [action.todo.data, ...state];
        case 'UPDATE_TODO':
            return state.map((todo) =>
                todo._id === action.todo.data._id ? action.todo.data : todo
            );
        case 'DELETE_TODO':
            return state.filter((todo) => todo._id !== action.id);
        default:
            return state;
    }
};

export default todoReducer;
