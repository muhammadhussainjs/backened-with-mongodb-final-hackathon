import express from 'express'
import StudentUser from '../models/StudentUser.mjs'
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

router.post('/register', async (req, res) => {
    try {
        const user = new StudentUser(req.body);
        await user.save();
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).send({ message: 'Registration failed', error: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const user = await StudentUser.find();
        
        res.status(201).send({ message: 'User registered successfully!' , data:user});
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).send({ message: 'Registration failed', error: error.message });
    }
});


router.get('/user', authenticateToken ,  async (req, res) => {
    try {
       const userEmail = req.user.email
        
        const user = await StudentUser.findOne({ email: userEmail });
        
        if (!user) {
            console.log('user not found');
            
            return res.status(404).send({ message: 'User not found' });
        }
        
        res.status(200).send({ message: 'User data fetched successfully', data: user });
    
    } catch (error) {
        console.error('Error in /user route:', error.stack);  // Logging full error stack
        res.status(500).send({ message: 'Failed to fetch user data, please try again.' });
    }
});

    


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Step 1: Check if email exists
        const user = await StudentUser.findOne({ email });

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
        const token = jwt.sign({ id: user._id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });  
        

        await user.save();

        res.status(200).send({ message: 'User logged in successfully!' , token});
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Login failed, please try again.' });
    }
});






export default router