const appointmentSchema = require('../../DoctorAppointments/appointmentSchema');
let prescriptions = require('./prescriptionSchema')


const addPrescription = async (req, res) => {

  let doctorid = null, department = '', date = new Date()
  await appointmentSchema.findById({ _id: req.params.id }).populate('doctorid').exec().then(data => {
    doctorid = data.doctorid._id
    department = data.doctorid.specialization
  })
    .catch(err => {
      console.log(err);
    })
  await appointmentSchema.findByIdAndUpdate({ _id: req.params.id }, {
    drvisited: true
  }).exec().then(data => {
    console.log("update drvisited");
  })
    .catch(err => {
      console.log(err);
    })
  const {

    userid,
    analysisreport,
    medications
  } = req.body;

  const newPrescription = new prescriptions({
    appointmentid: req.params.id,
    doctorid: doctorid,
    userid,
    date: date,
    department: department,
    analysisreport,
    medications
  });

  await newPrescription.save().then(data => {
    res.json({
      status: 200,
      msg: "Inserted successfully",
      data: data
    })
  }).catch(err => {
    res.json({
      status: 500,
      msg: "Data not Inserted",
      Error: err
    })
  })

}


const viewPrescriptionByUserId = (req, res) => {
  prescriptions.find({ userid: req.params.id }).populate('doctorid').exec()
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
          msg: "No Data obtained "
        })
      }
    }).catch(err => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err
      })
    })

}

const viewPrescriptionByDrId = (req, res) => {
  prescriptions.find({ doctorid: req.params.id }).populate('userid').exec()
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
          msg: "No Data obtained "
        })
      }
    }).catch(err => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err
      })
    })

}


  const viewPrescriptionByAppointId=(req,res)=>{
    prescriptions.findOne({appointmentid:req.params.id})
    .populate('userid')
    .populate('doctorid')
    .exec()
    .then(data=>{
      if(data!=null){
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
        status: 500,
        msg: "Data not Inserted",
        Error: err
      })
    })

}



  const viewPrescriptionById=(req,res)=>{
    prescriptions.findById({_id:req.params.id}).populate('doctorid').populate('userid').exec()
    .then(data=>{
      if(data!=null){
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
        status: 500,
        msg: "Data not Inserted",
        Error: err
      })
    })

}

module.exports = {
  addPrescription,
  viewPrescriptionByUserId,
  viewPrescriptionByDrId,
  viewPrescriptionById,
  viewPrescriptionByAppointId,
  
}
