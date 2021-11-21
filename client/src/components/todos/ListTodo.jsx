import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Todo from './Todo';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { getTodos } from '../../store/actions/todoActions';

const useStyles = makeStyles({
    todosStyle: {
        margin: '20px auto',
        padding: '20px',
        borderRadius: '9px',
        boxShadow: '0px 0px 12px -3px #000000',
    },
});

const ListTodo = ({ setTodo }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
    console.log(todos);

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    return (
        <div>
            <div className={classes.todosStyle}>
                <Typography variant="h5">
                    {todos.length > 0 ? 'todos' : 'not todos'}
                </Typography>
                {todos &&
                    todos.map((todo) => (
                        <Todo todo={todo} key={todo._id} setTodo={setTodo} />
                    ))}
            </div>
        </div>
    );
};

export default ListTodo;
