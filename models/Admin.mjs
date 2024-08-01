import mongoose from "mongoose";
const {Schema} = mongoose

const adminSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

})

const Admin = mongoose.model('admin' , adminSchema)
export default Admin