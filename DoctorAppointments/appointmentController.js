
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
  

  const viewTodaysAppointmentForDr = (req, res) => {
    let today = new Date();
    let startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    let endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999); // Set time to the end of the day

    appointmentSchema.find({
            doctorid: req.params.doctorid,
            date: { $gte: startOfDay, $lt: endOfDay }
        })
        .populate('userid')
        .exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                })
            } else {
                res.json({
                    status: 200,
                    msg: "No appointments for today"
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "Error occurred while fetching data",
                Error: err
            })
        })
}
const cancelAppointment = (req, res) => {
    let appointmentId = req.params.appointmentId;
    let today = new Date();
    let startOfToday = new Date(today);
    startOfToday.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    appointmentSchema.findById(appointmentId)
        .exec()
        .then(appointment => {
            if (!appointment) {
                return res.status(404).json({
                    status: 404,
                    msg: "Appointment not found"
                });
            }

            let appointmentDate = new Date(appointment.date);
            let appointmentDay = new Date(appointmentDate);
            appointmentDay.setHours(0, 0, 0, 0); // Set time to the beginning of the appointment day

            if (appointmentDay.getDate() <= startOfToday.getDate()) {
                return res.status(400).json({
                    status: 400,
                    msg: "Cannot cancel appointments scheduled for today or past dates."
                });
            }

            // Proceed to cancel the appointment
            appointmentSchema.findByIdAndDelete(appointmentId)
                .exec()
                .then(result => {
                    res.json({
                        status: 200,
                        msg: "Appointment cancelled successfully",
                        data: result
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        status: 500,
                        msg: "Error occurred while cancelling appointment",
                        Error: err
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 500,
                msg: "Error occurred while fetching appointment",
                Error: err
            });
        });
};


module.exports={addAppointment,
viewAppointmentByUserId,
viewTodaysAppointmentForDr,
cancelAppointment}