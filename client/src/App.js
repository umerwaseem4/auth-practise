import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navBar/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Todos from './components/todos/Todos';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { loadUser } from './store/actions/authActions';

const useStyles = makeStyles({
    contentStyle: {
        margin: '30px auto',
    },
});

function App() {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <div className="App">
            <Router>
                <Container maxWidth="md">
                    <Navbar />
                    <div className={classes.contentStyle}>
                        <Switch>
                            <Route path="/signin" component={SignIn} />
                            <Route path="/signup" component={SignUp} />
                            <Route path="/" component={Todos} />
                        </Switch>
                    </div>
                </Container>
            </Router>
        </div>
    );
}

export default App;
