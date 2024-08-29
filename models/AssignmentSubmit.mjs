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
    name:{
        type : String,
        required : true
    },
    email:{
        type:String,
        required: true
    },
    createdAt: {
        type: String,  
        default: () => new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }), 
    },



})

const AssignmentSubmit = mongoose.model('AssignmentSubmit', assignmentSubmit);
export default AssignmentSubmit;