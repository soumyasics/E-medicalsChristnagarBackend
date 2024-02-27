const mongoose= require("mongoose");

const appointmentSchema=mongoose.Schema({
    
   
    hospitalid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'hospitals'
    },
    doctorid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'doctors'
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    date:{
        type:Date
    }

});
module.exports=mongoose.model('doctorappointments',appointmentSchema)
