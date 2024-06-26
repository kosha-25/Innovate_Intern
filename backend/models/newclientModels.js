import mongoose from 'mongoose';

const newclientSchema = new mongoose.Schema({
  id: {
    type: String,
    require: false
  },
  name: {
    type: String,
    required: [true, 'name is required.']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required.']
  },
  password: {
    type: String,
    required: [true, 'password is required.']
  },

  address: {
    type: String,
    required: [true, 'address is required.']
  },
  image: {
    type: String,
    required: false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'category is required.'] // Make category optional
  },

  isApproved: {
    type: Boolean,
    default: false,
  },


});

const NewClient = mongoose.model('NewClient', newclientSchema);

export default NewClient;
