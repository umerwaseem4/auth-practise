import React from 'react';
import { Typography, ButtonGroup, Button } from '@mui/material';
import { Create, Delete, CheckCircle, WindowSharp } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../store/actions/todoActions';

const useStyles = makeStyles({
    todoStyle: {
        margin: '20px auto',
        padding: '20px',
        border: '2px solid #bdbdbd',
        borderRadius: '9px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    moreStyle: {
        color: '#8f8f8f',
    },
    isComplete: {
        color: 'green',
    },
    checked: {
        textDecoration: 'line-through',
    },
});

const Todo = ({ todo, setTodo }) => {
    const dispatch = useDispatch();

    const handleUpdateClick = () => {
        setTodo(todo);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    const handleDeleteClick = (id) => {
        dispatch(deleteTodo(id));
    };
    const classes = useStyles();
    return (
        <div>
            <div className={classes.todoStyle}>
                <div>
                    {todo.isCompleted ? (
                        <Typography
                            variant="subtitle1"
                            className={classes.checked}
                        >
                            {todo.name}
                        </Typography>
                    ) : (
                        <Typography variant="subtitle1">{todo.name}</Typography>
                    )}
                    <Typography variant="body2" className={classes.moreStyle}>
                        Author: Umer
                    </Typography>
                    <Typography variant="body2" className={classes.moreStyle}>
                        Added: {moment(todo.date).fromNow()}
                    </Typography>
                </div>
                <div>
                    <ButtonGroup
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        {todo.isCompleted ? (
                            <Button>
                                <CheckCircle
                                    color="primary"
                                    className={classes.isComplete}
                                />
                            </Button>
                        ) : (
                            <CheckCircle color="action" />
                        )}
                        <Button onClick={() => handleUpdateClick()}>
                            <Create color="primary" />
                        </Button>
                        <Button onClick={() => handleDeleteClick(todo._id)}>
                            <Delete color="secondary" />
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
};

export default Todo;
