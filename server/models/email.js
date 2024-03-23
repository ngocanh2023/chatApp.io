const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    customerArray: {
        type: Array,
        address: {
            type: String,
        },
        email: {
            type: String,
        },
        name: {
            type: String,
        },
        phone: {
            type: Number,
        },
    }, 
    productArray: {
        type: Array,
        count: {
            type: Number,
        },
        data: {
            type: Array,
            category: {
                type: String,
            },
            img1: {
                type: String,
            },
            img2: {
                type: String,
            },
            img3: {
                type: String,
            },
            img4: {
                type: String,
            },
            long_desc: {
                type: String,
            },
            name: {
                type: String,
            },
            price: {
                type: Number,
            },
            short_desc: {
                type: String,
            }
            },
    }, date: {
        type: String,
    }, sum: {
        type: Number,
    }
})
module.exports = mongoose.model("UserProductData", userSchema)

