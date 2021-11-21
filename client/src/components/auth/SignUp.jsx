import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
    formStyle: {
        margin: '0px auto',
        padding: '30px',
        borderRadius: '9px',
        boxShadow: '0px 0px 12px -3px #000000',
    },
    spacing: {
        marginTop: '20px',
    },
});

const SignUp = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(user));
        setUser({
            name: '',
            email: '',
            password: '',
        });
    };
    if (authState._id) return <Redirect to="/" />;

    return (
        <>
            <form
                noValidate
                autoComplete="off"
                className={classes.formStyle}
                onSubmit={handleSubmit}
            >
                <Typography variant="h5">SignUp;</Typography>
                <TextField
                    id="enter-name"
                    label="Enter your name"
                    className={classes.spacing}
                    variant="outlined"
                    fullWidth
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <TextField
                    className={classes.spacing}
                    id="enter-email"
                    label="enterEmail"
                    variant="outlined"
                    fullWidth
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />
                <TextField
                    className={classes.spacing}
                    id="enter-password"
                    type="password"
                    label="enterPassword"
                    variant="outlined"
                    fullWidth
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.spacing}
                    type="submit"
                >
                    SignUp
                </Button>
            </form>
        </>
    );
};

export default SignUp;
