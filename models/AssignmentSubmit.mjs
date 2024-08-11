import mongoose from 'mongoose'
const {Schema} = mongoose

const assignmentSubmit = new Schema({
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required: true
    },
    link:{
        type:String,
        required: true    
    },
    teacherId:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },



})

const AssignmentSubmit = mongoose.model('AssignmentSubmit', assignmentSubmit);
export default AssignmentSubmit;