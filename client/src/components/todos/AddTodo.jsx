import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../../store/actions/todoActions';

import { makeStyles } from '@mui/styles';
import { TextField, Button } from '@mui/material/';
import { Send } from '@mui/icons-material/';

const useStyles = makeStyles({
    formStyle: {
        margin: '0px auto',
        padding: '30px',
        borderRadius: '9px',
        boxShadow: '0px 0px 12px -3px #000000',
        display: 'flex',
        justifyContent: 'space-between',
    },
    submitButton: {
        marginLeft: '20px',
    },
});

const AddTodo = ({ todo, setTodo }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (todo._id) {
            const id = todo._id;
            const updatedTodo = {
                name: todo.name,
                isCompleted: todo.isCompleted,
                date: todo.date,
                author: todo.author,
                uid: todo.uid,
            };
            dispatch(updateTodo(updatedTodo, id));
        } else {
            dispatch(addTodo(todo));
        }
        setTodo({ name: '', isCompleted: false });
    };
    return (
        <div>
            <>
                <form
                    noValidate
                    autoComplete="off"
                    className={classes.formStyle}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        id="enter-todo"
                        label="enterToDo"
                        variant="outlined"
                        autoFocus
                        fullWidth
                        value={todo.name}
                        onChange={(e) =>
                            setTodo({ ...todo, name: e.target.value })
                        }
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                        type="submit"
                    >
                        <Send />
                    </Button>
                </form>
            </>
        </div>
    );
};

export default AddTodo;
