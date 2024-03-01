const mongoose = require("mongoose");

const hSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    dosage: String,
    comments: {
        type: String,
    },
    image:{
        type:Object
    },
    count:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('medicines', hSchema)

