import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    id: {
        type: String,
        require: false
    },

    username: {
        type: String,
        require:[true, 'name is required.']
    },

    password: {
        type: String, 
        require:[true, 'password is required.']
    },
    email: {
        type: String,
        unique: true,
        require:[true, 'email is required.']
        
    },
    
})

const User = mongoose.model('Users', userSchema);

export default User;
