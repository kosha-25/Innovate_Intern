import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    cid: {
        type: String,
        require: false
    },

    name: {
        type: String,
        require:[true, 'name is required.']
    },


    


})

const Category = mongoose.model('Category', categorySchema);

    export default Category;