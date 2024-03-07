const prescriptionSchema = require('../Doctors/Prescriptions/prescriptionSchema');
const medicines=require('./medicineSchema')

const multer=require('multer')


const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const addMedicine=async(req,res)=>{
let flag=0
    await medicines.find({name:req.body.name,dosage:req.body.dosage}).exec().then(data=>{
        if(data.length>0){
            flag=1
            return res.json({
                status:409,
                msg:"Medicine Already Added With Us !!!"
            })
        }
    }).catch(err=>{
        console.log("err",err);
    }) 

    const newMed=new medicines({
        name:req.body.name,
        manufacturer:req.body.manufacturer,
        description:req.body.description,
        price:req.body.price,
        expiryDate:req.body.expiryDate,
        dosage:req.body.dosage,
        comments:req.body.comments,
        image:req.file,
        count:req.body.count,
        typoe:req.body.type
    })
    if(flag==0){
  await  newMed.save().then(data=>{
       return res.json({
            status:200,
            msg:"Inserted successfully",
            data:data
        })
    }).catch(err=>{
      
      
      return  res.json({
            status:500,
            msg:"Data not Inserted",
            Error:err
        })
    })
}
}
//View all 
  
const viewmedicines=(req,res)=>{
    medicines.find({}).exec()
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
   
const viewPrescriptionReqs=(req,res)=>{
  prescriptionSchema.find({pharmacyNeeded:true,pharmacyprocessed:false})
  .populate('doctorid')
  .populate('userid').exec()
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


async function checkMedicationAvailability(prescription) {
  const medications = prescription.medications;

  const medicationAvailability = [];

  for (const medication of medications) {
      const medicine = await medicines.findOne({ name: medication.name,dosage:medication.dosage});

      // Check if the medicine exists in the pharmacy
      if (medicine) {

        if (medicine.expiryDate < new Date()) {
          medicationAvailability.push({
              name: medicine.name,
              available: "Expired",
              message: 'Medication expired.'
          });
          continue; // Skip to the next medication
      }

         
          if(medicine.type=="Tablet"){
          if (medicine.count > (medication.frequency*medication.courseduration)) {
              // Add medication availability status
              medicationAvailability.push({
                  name: medicine.name,
                  available: "complete",
                  count: medication.frequency*medication.courseduration,

                  message: `Available in stock. ${medicine.count} units remaining.`
              });
             

              } else if(medicine.count > 0) {
                // Add medication availability status
                medicationAvailability.push({
                    name: medicine.name,
                    available: "partial",
                    count: medicine.count,
                    message: `Available in stock. But  ${medicine.count} units remaining.`
                });
               
  
                } else {
              // Add medication availability status
              medicationAvailability.push({
                  name: medicine.name,
                  available: "Not",
                  count:0, 
                  message: 'Out of stock. '
              });
          }
        }else{
          if (medicine.count >0) {
            // Add medication availability status
            medicationAvailability.push({
                name: medicine.name,
                available: "complete",
                count:medicine.count,
                message: `Available in stock. ${medicine.count} units remaining.`
            });
        } else {
            // Add medication availability status
            medicationAvailability.push({
                name: medicine.name,
                available: "Not",
              
                message: 'Out of stock.'
            });
        }
        }
      } else {
          // Medication not found in pharmacy
          medicationAvailability.push({
              name: medication.name,
              available: "Not",
              message: 'Not available in pharmacy.'
          });
      }
  }

  return medicationAvailability;
}

// Usage example: Assuming you have a prescription object


const checkMedicine=(req,res)=>{
  const prescription = req.body;

  // Call the function to check medication availability
  checkMedicationAvailability(prescription)
    .then(medicationAvailability => {
        console.log('Medication availability:', medicationAvailability);
        res.json({
          status:200,
          medicationAvailability
        })
    })
    .catch(error => {
        console.error('Error checking medication availability:', error);
        res.json({
          status:500,
          medicationAvailability:null
        })
    });
}

module.exports={
    addMedicine,
    viewmedicines,
    upload,
    viewPrescriptionReqs,
    checkMedicine
}