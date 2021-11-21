/** STEPS:
 * joi data validation
 * does the user exist
 * create new user
 * hash password
 * save the user to database
 */

import express from 'express';
import Joi from 'joi';
import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import { secretKey } from './SignIn.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists...');

    const { name, email, password } = req.body;

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const jwtSecretKey = secretKey;
    const token = jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        jwtSecretKey
    );

    res.send(token);
});

export default router;
