/**
 * function
 * does the token exist
 * varify the token
 * next() express middleware
 */

import jwt from 'jsonwebtoken';
import { secretKey } from '../routes/SignIn.js';

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('not authorized');
    }

    try {
        const payload = jwt.verify(token, secretKey);
        req.user = payload;
        next();
    } catch (error) {
        res.status(400).send('invalid token');
    }
}

export default auth;
