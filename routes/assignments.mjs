import express from 'express'
import Assignment from '../models/Assignment.mjs';
import Users from '../models/Users.mjs'
import jwt from 'jsonwebtoken';


const router = express.Router()

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), 'your-secret-key');
        req.user = verified;
        next();;
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

router.get('/', async (req, res) => {
    const users = await Assignment.find()
    res.send({ message: 'Assignment Data fetched successfully', data: users })

})

router.post('/assignments',authenticateToken , async (req, res) => {
    try {
        const { title, description } = req.body;
        const teacherId = req.user.id;

        const newAssignment = new Assignment({
            teacherId,
            title,
            description,
        });

        await newAssignment.save();

        res.status(201).send({ message: 'Assignment created successfully!', data: newAssignment });
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).send({ message: 'Failed to create assignment, please try again.' });
    }
});

router.get('/students/:uniqueIdentifier', async (req, res) => {
    try {
        const { uniqueIdentifier } = req.params;
        const user = await Users.findOne({ classLink: `http://localhost:3000/students/${uniqueIdentifier}` });

        if (!user) {
            return res.status(404).send({ message: 'Teacher not found!' });
        }

        // Assuming you have an Assignment model and collection to fetch assignments
        const assignments = await Assignment.find({ teacherId: user._id });

        res.status(200).send({ message: 'Assignments fetched successfully', data: assignments });
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).send({ message: 'Failed to fetch assignments, please try again.' });
    }
});

export default router