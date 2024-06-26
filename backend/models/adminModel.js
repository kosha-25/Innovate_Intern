import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({

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

const Admin = mongoose.model('Admins', adminSchema);

export default Admin;