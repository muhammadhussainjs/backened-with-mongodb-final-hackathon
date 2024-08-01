import express from 'express'
import Admin from '../models/Admin.mjs'

const router = express.Router()

router.post('/admin' ,async (req , res) =>{
    try {
        
        const admin = new Admin(req.body)
        await admin.save()
    
        console.log('admin' , admin);
        res.send('Task submitted sucessfully')
    } catch (error) {
        console.log(error);
        res.send('Task is not submitted')
        
    }
})

router.get('/', async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).send({ message: 'Admin data fetched successfully', data: admins });
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).send('Error fetching admins');
    }
})

export default router