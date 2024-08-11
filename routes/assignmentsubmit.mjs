import express from 'express'
import AssignmentSubmit from '../models/AssignmentSubmit.mjs'
import jwt from 'jsonwebtoken';

const router = express.Router()

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

router.post('/assignmentsubmits' , async (req , res)=>{
    const { title, description, link , teacherId } = req.body;

  try {
    const newSubmission = new AssignmentSubmit({
      title,
      description,
      link,
      teacherId
    });

    await newSubmission.save();

    res.status(201).json({ message: 'Assignment submitted successfully', submission: newSubmission });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting assignment', error });
  }
})

router.get('/', async (req, res) => {
    const assignment = await AssignmentSubmit.find()
    res.send({ message: 'Assignment Data fetched successfully',   data: assignment})

})
router.get('/assignmentsubmit', authenticateToken,  async (req, res) =>  {
  try {
      const teacherId = req.user.id; // Get the authenticated user's ID from the token

      // Find assignments where the teacherId matches the authenticated user's ID
      const assignments = await AssignmentSubmit.find({ teacherId: teacherId });

      if (assignments.length === 0) {
          return res.status(404).send({ message: 'No assignments found for this user.' });
      }

      res.status(200).send({ message: 'Assignments fetched successfully!', data: assignments });
  } catch (error) {
      console.error('Error fetching assignments:', error);
      res.status(500).send({ message: 'Failed to fetch assignments, please try again.' });
  }
});

export default router