import React, { useState } from 'react';
import AddTodo from './AddTodo';
import ListTodo from './ListTodo';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Todos = () => {
    const auth = useSelector((state) => state.auth);
    const [todo, setTodo] = useState({
        name: '',
        isCompleted: false,
    });

    if (!auth._id) {
        return <Redirect to="/signin" />;
    }
    return (
        <>
            <AddTodo todo={todo} setTodo={setTodo} />
            <ListTodo setTodo={setTodo} />
        </>
    );
};

export default Todos;
