import express from 'express'
import Users from '../models/Users.mjs'
import jwt from 'jsonwebtoken';

import { v4 as uuidv4 } from 'uuid';

const router = express.Router()




router.post('/register', async (req, res) => {
    try {
              const user = new Users(req.body)
             await user.save()
        //const user = await Users.create(req.body)

        console.log('user ',user);
        res.send({ message: 'user registered successfully!' })
    } catch (error) {

        console.log(error);
        res.send('please enter correct email')

    }
})

router.get('/', async (req, res) => {
    const users = await Users.find()
    res.send({ message: 'Users Data fetched successfully', data: users })

})

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body
        //Step 1: Check if email exists
        const user = await Users.findOne({ email })

        if (!user) {
            res.send({ message: "User not found!" })
            return
        }


        //Step 2: Compare the passwords
        const isCorrectPassword = await user.comparePassword(password)

        if (!isCorrectPassword) {
            res.send({ message: "Invalid Password" })
            return
        }


      

        // Step 3: Generate Token
        const token = jwt.sign({ id: user._id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });
        

        // Step 4: Generate a unique link
        const uniqueIdentifier = uuidv4(); // You can use uuidv4 to generate a unique identifier
        const classLink = `http://localhost:5173/students/${uniqueIdentifier}`;
        
        // Optionally, you can save the link or unique identifier to the user's record in the database
        user.classLink = classLink; // Add a field in your Users model to store this if needed
        await user.save();

        res.status(200).send({ message: 'User logged in successfully!', token, classLink });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Login failed, please try again.' });
    }
});



export default router