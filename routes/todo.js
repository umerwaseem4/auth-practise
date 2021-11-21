import Todo from '../model/todo.js';
import express from 'express';
import joi from 'joi';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const todo = await Todo.find().sort({ date: -1 });
        const filteredTodo = todo.filter((todo) => todo.uid === req.user._id);
        res.json(filteredTodo);
    } catch (error) {
        res.json(error.message);
    }
});

router.post('/', auth, async (req, res) => {
    const schema = joi
        .object({
            name: joi.string().min(3).max(200).required(),
            author: joi.string().min(3).max(30),
            uid: joi.string(),
            isCompleted: joi.boolean(),
            date: joi.date(),
        })
        .options({ abortEarly: false });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    const { name, author, isCompleted, date, uid } = req.body;
    const todo = new Todo({
        name,
        author,
        isCompleted,
        date,
        uid,
    });
    try {
        const todoSave = await todo.save();
        res.json(todoSave);
    } catch (error) {
        res.json(error);
    }
});

router.delete('/:id', auth, async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).send('Todo not found...');

    if (todo.uid !== req.user._id)
        return res.status(401).send('Todo delete failed, Not Authorized');

    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    res.send(deletedTodo);
});

router.put('/:id', auth, async (req, res) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        author: joi.string().min(3),
        uid: joi.string(),
        isComplete: joi.boolean(),
        date: joi.date(),
    });

    const { error } = schema.validate(req.body);

    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).send('Todo not found...');
    if (todo.uid !== req.user._id)
        return res.status(401).send('Todo update failed, Not Authorized');

    const { name, author, isComplete, date, uid } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { name, author, isComplete, date, uid },
        { new: true }
    );

    res.send(updatedTodo);
});

router.patch('/:id', auth, async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).send('Todo not found...');
    if (todo.uid !== req.user._id)
        return res.status(401).send('Todo check/update failed, Not Authorized');

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
            isComplete: !todo.isComplete,
        },
        {
            new: true,
        }
    );

    res.send(updatedTodo);
});

export default router;
