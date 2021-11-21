import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: String,
    uid: String,
    isCompleted: Boolean,
    date: {
        type: Date,
        default: new Date(),
    },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
