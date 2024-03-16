const prescriptionSchema = require('../Doctors/Prescriptions/prescriptionSchema');
const medicines = require('./medicineSchema')
const medbills=require('./medicineBill')
const multer = require('multer')


const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const addMedicine = async (req, res) => {
  let flag = 0
  await medicines.find({ name: req.body.name, dosage: req.body.dosage }).exec().then(data => {
    if (data.length > 0) {
      flag = 1
      return res.json({
        status: 409,
        msg: "Medicine Already Added With Us !!!"
      })
    }
  }).catch(err => {
    console.log("err", err);
  })

  const newMed = new medicines({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    price: req.body.price,
    expiryDate: req.body.expiryDate,
    dosage: req.body.dosage,
    comments: req.body.comments,
    image: req.file,
    count: req.body.count,
    type: req.body.type
  })
  if (flag == 0) {
    await newMed.save().then(data => {
      return res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data
      })
    }).catch(err => {


      return res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err
      })
    })
  }
}
//View all 

const viewmedicines = (req, res) => {
  medicines.find({}).exec()
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

const viewPrescriptionReqs = (req, res) => {
  prescriptionSchema.find({ pharmacyNeeded: true, pharmacyprocessed: false })
    .populate('doctorid')
    .populate('userid').exec()
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


async function checkMedicationAvailability(dbmedications) {
  const medications =dbmedications;

  const medicationAvailability = [];
let price=0
  for (const medication of medications) {
    const medicine = await medicines.findOne({ name: medication.name, dosage: medication.dosage });

    // Check if the medicine exists in the pharmacy
    if (medicine) {

      if (medicine.expiryDate < new Date()) {
        medicationAvailability.push({
          name: medicine.name,
          available: "Expired",
          message: 'Medication expired.',
          count: 0,
            price:0,
        });
        continue; // Skip to the next medication
      }


      if (medicine.type == "Tablet") {
        if (medicine.count > (medication.frequency * medication.courseduration)) {
          // Add medication availability status
          medicationAvailability.push({
            name: medicine.name,
            available: "complete",
            count: medication.frequency * medication.courseduration,
            price: (medicine.price) * (medicine.count),

            message: `Available in stock. ${medicine.count} units remaining.`
          });


        } else if (medicine.count > 0) {
          // Add medication availability status
          medicationAvailability.push({
            name: medicine.name,
            available: "partial",
            count: medicine.count,
            message: `Available in stock. But  ${medicine.count} units remaining.`,
            price: (medicine.price) * (medicine.count)
          });


        } else {
          // Add medication availability status
          medicationAvailability.push({
            name: medicine.name,
            available: "Not",
            count: 0,
            message: 'Out of stock. ',
            price: 0

          });
        }
      } else {
        if (medicine.count > 0) {
          // Add medication availability status
          medicationAvailability.push({
            name: medicine.name,
            available: "complete",
            count: 1,
            message: `Available in stock. `,
                price: (medicine.price) 

          });
        } else {
          // Add medication availability status
          medicationAvailability.push({
            name: medicine.name,
            available: "Not",
count:0,
price:0,
            message: 'Out of stock.'
          });
        }
      }
    } else {
      // Medication not found in pharmacy
      medicationAvailability.push({
        name: medication.name,
        available: "Not",
        message: 'Not available in pharmacy.',
        count:0,
price:0,
      });
    }
    price+=price
    totalprice=price
  }

  return medicationAvailability;
}

// Usage example: Assuming you have a prescription object


const checkMedicine = (req, res) => {
  
}

const sharePrescriptionTionToPharmacy =async (req, res) => {
let prescription=""
 

    await  prescriptionSchema.findById({ _id: req.params.id })
     .exec()
     .then(data => {
      console.log("updated");
      prescription=data
      console.log(prescription);
     }).catch(err => {
       console.log(err);
     })


//medic
dbmedications = prescription.medications;

  // Call the function to check medication availability
  checkMedicationAvailability(dbmedications)
    .then(medicationAvailability => {
      console.log('Medication availability:', medicationAvailability);
      let price=0
      medicationAvailability.map(x=>{
price+=x.price
      })
      res.json({
        status: 200,
        medicationAvailability,
        price
      })
    })
    .catch(error => {
      console.error('Error checking medication availability:', error);
      res.json({
        status: 500,
        medicationAvailability: null
      })
    });

}

const confirmMedBill=async(req,res)=>{
   await prescriptionSchema.findByIdAndUpdate({ _id: req.body.pid },
     { pharmacyNeeded: true })
    .exec()
    .then(data => {
     console.log("updated");
    }).catch(err => {
      console.log(err);
    })
const newBill=new medbills({
  pid: req.body.pid,
  userid: req.body.userid,
  date: new Date(),
  medications: req.body.medications,
  price: req.body.price
})
await newBill.save()
.then(data => {
  return res.json({
    status: 200,
    msg: "Inserted successfully",
    data: data
  })
}).catch(err => {


  return res.json({
    status: 500,
    msg: "Data not Inserted",
    Error: err
  })
})
}
const viewmedBillbyPid=(req,res)=>{
    medbills.findOne({ pid:req.params.id })
      .populate('userid').exec()
      .then(data => {
        if (data!=null) {
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

  const viewmedBillforPharmacy=(req,res)=>{
    medbills.find({})
      .populate('userid').exec()
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


module.exports = {
  addMedicine,
  viewmedicines,
  upload,
  viewPrescriptionReqs,
  checkMedicine,
sharePrescriptionTionToPharmacy,
confirmMedBill,
viewmedBillbyPid,
viewmedBillforPharmacy
}