import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory, Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const handleSignOut = () => {
        // later handling signout functionality
        dispatch(signOut());
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Todo App
                    </Typography>
                    {auth._id ? (
                        <>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                logged in as {auth.name}
                            </Typography>
                            <Button
                                color="inherit"
                                color="inherit"
                                onClick={() => handleSignOut()}
                            >
                                Sinout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" color="inherit">
                                <NavLink to="signup">Signup</NavLink>
                            </Button>
                            <Button color="inherit" color="inherit">
                                <NavLink to="signin">signin</NavLink>
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
