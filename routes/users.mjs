import express from 'express'
import Users from '../models/Users.mjs'
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), 'your-secret-key');
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

router.post('/register', async (req, res) => {
    try {
        const user = new Users(req.body);
        await user.save();
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).send({ message: 'Registration failed', error: error.message });
    }
});

router.get('/', async (req, res) => {
    const users = await Users.find();
    res.send({ message: 'Users Data fetched successfully', data: users });
});

router.get('/user', authenticateToken, async (req, res) => {
    try {
        const teacherId = req.user.id; // Get the authenticated user's ID from the token
        const assignments = await Users.find({ _id: teacherId });

        if (assignments.length === 0) {
            return res.status(404).send({ message: 'No assignments found for this user.' });
        }

        res.status(200).send({ message: 'Assignments fetched successfully!', data: assignments });
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).send({ message: 'Failed to fetch assignments, please try again.' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Step 1: Check if email exists
        const user = await Users.findOne({ email });

        if (!user) {
            res.send({ message: "User not found!" });
            return;
        }

        // Step 2: Compare the passwords
        const isCorrectPassword = await user.comparePassword(password);

        if (!isCorrectPassword) {
            res.send({ message: "Invalid Password" });
            return;
        }

        // Step 3: Generate Token
        const token = jwt.sign({ id: user._id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

        // Step 4: Generate a unique link
        const uniqueIdentifier = uuidv4(); // You can use uuidv4 to generate a unique identifier
        const classLink = `https://final-hackathon-lf7r.vercel.app/students/${uniqueIdentifier}`;

        // Optionally, you can save the link or unique identifier to the user's record in the database
        user.classLink = classLink; // Add a field in your Users model to store this if needed
        await user.save();

        res.status(200).send({ message: 'User logged in successfully!', token, classLink });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Login failed, please try again.' });
    }
});

export default router;
