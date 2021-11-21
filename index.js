import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import todoRoutes from './routes/todo.js';
import signUpRoutes from './routes/signUp.js';
import signInRoutes from './routes/SignIn.js';

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use('/api/todos', todoRoutes);
app.use('/api/signup', signUpRoutes);
app.use('/api/signin', signInRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'hello world' });
});

app.listen(5000, () => console.log('server on 50000'));

// connecting to database
mongoose
    .connect('mongodb://localhost:27017/app')
    .then(() => console.log('mongodb connected'))
    .catch((error) => console.log(`error: ${error}`));
