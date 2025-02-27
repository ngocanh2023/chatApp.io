const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        // required: true,
    }, 
    password: {
        type: String,
        // required: true,
    }, 
    fullName: {
        type: String,
        // required: true,
    }, 
    phoneNumber: {
        type: Number,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    } 

})
module.exports = mongoose.model("User", userSchema)

