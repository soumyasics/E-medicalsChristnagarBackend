
const doctorSchema = require('../Doctors/doctorSchema')
const appointmentSchema=require('./appointmentSchema')

const addAppointment=async(req,res)=>{
    let hospitalid=null
await doctorSchema.findById({_id:req.body.doctorid}).exec().then(data=>{
     hospitalid=data.hospitalid
}).catch(err=>{
    console.log("err",err);
})

    const newAppointment=new appointmentSchema({
        hospitalid:hospitalid,
        userid:req.body.userid,
        doctorid:req.body.doctorid,
        date:req.body.day
    })
    await newAppointment.save().then(data=>{
        res.json({
            status:200,
            msg:"Inserted successfully",
            data:data
        })
    }).catch(err=>{
   console.log(err);
        res.json({
            status:500,
            msg:"Data not Inserted",
            Error:err
        })
    })
}
// appointment -- finished

module.exports={addAppointment}