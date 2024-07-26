import mongoose from 'mongoose'
const {Schema} = mongoose
import bcrypt from 'bcryptjs'

const usersSchema  = new Schema({
    fullName:{
        type: String,
        required:true
    },
    email :{
        type : String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minLength: 6
    
    }
   
    

})

usersSchema.pre("save" , function(next){
    const user = this
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
     user.password = hash
     next()
    
})

usersSchema.methods.comparePassword = function(password){
    const user = this
    //user.password === db password (encrypted) asjdhu2i346193
    //password === frontend password (normal) 123456
    console.log('db password', user.password)
    console.log('frontend password', password)

    return bcrypt.compareSync(password, user.password)
}

const Users = mongoose.model('Users' , usersSchema)
export default Users