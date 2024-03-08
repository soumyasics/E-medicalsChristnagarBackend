const mongoose = require("mongoose");

const prescriptions = mongoose.Schema({


    appointmentid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'doctorappointments'
    },
    doctorid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'doctors'
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    date: {
        type: Date
    },
    department: {
        type: String,
        required: true
    },
    analysisreport: {
        type: String,
        required: true
    },
    medications: [
        {
            name: {
                type: String,
                required: true
            },
            dosage: {
                type: String,
                required: true
            },
            frequency: {
                type: Number,
                required: true
            },
            courseduration: {
                type: String,
                required: true
            },
            comments: {
                type: String
            }
           
        }
    ]
,pharmacyNeeded:{
    type: Boolean,
    default: false
},
pharmacyprocessed:{
    type: Boolean,
    default: false
}
});
module.exports = mongoose.model('prescriptions', prescriptions)
