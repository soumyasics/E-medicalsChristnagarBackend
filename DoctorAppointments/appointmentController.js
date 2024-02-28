
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

//view appointment by userid
const viewAppointmentByUserId=(req,res)=>{
    appointmentSchema.find({userid:req.params.userid})
    .populate('hospitalid')
    .populate('doctorid')
    .exec()
    .then(data=>{
      if(data.length>0){
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    }else{
      res.json({
        status:200,
        msg:"No Data obtained "
    })
    }
  }).catch(err=>{
      res.json({
          status:500,
          msg:"Data not Inserted",
          Error:err
      })
  })
  
  }
  

  //view Today's Appointment For Dr
const viewTodaysAppointmentForDr=(req,res)=>{
    let today=new Date()
    appointmentSchema.find({doctorid:req.params.doctorid,date:today})
    .populate('userid')
    
    .exec()
    .then(data=>{
      if(data.length>0){
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    }else{
      res.json({
        status:200,
        msg:"No Data obtained "
    })
    }
  }).catch(err=>{
      res.json({
          status:500,
          msg:"Data not Inserted",
          Error:err
      })
  })
  
  }
module.exports={addAppointment,
viewAppointmentByUserId,
viewTodaysAppointmentForDr}