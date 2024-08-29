
import mongoose from 'mongoose';
import moment from 'moment-timezone'

const { Schema } = mongoose;

const assignmentSchema = new Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,  
        default: () => new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }), 
    },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;
