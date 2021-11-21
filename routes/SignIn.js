/**
 * joi to validate data
 * does the user exist
 * validate the password in database
 * generate a jwt token
 */

import express from 'express';
import joi from 'joi';
import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

export const secretKey = 'umerwaseem4';

router.post('/', async (req, res) => {
    const schema = joi.object({
        email: joi.string().min(3).max(200).required().email(),
        password: joi.string().min(6).max(200).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('uInvalid email and password');

        // compairing the password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            res.status(400).send('uInvalid email and password');
        }
        const token = jwt.sign(
            { _id: user._id, name: user.name, email: user.email },
            secretKey
        );

        res.send(token);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
});

export default router;
