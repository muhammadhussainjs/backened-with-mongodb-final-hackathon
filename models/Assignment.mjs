
import mongoose from 'mongoose';

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
        type: Date,
        default: Date.now,
    },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
export default Assignment;
