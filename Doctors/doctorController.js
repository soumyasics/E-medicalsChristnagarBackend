const doctors=require('./doctorSchema')
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
// Registration 

const addDoctor=(req,res)=>{


    const newDoctor=new doctors({
        name:req.body.name,
        email:req.body.email,
        city:req.body.city,
        pincode:req.body.pincode,
        contact:req.body.contact,
        district:req.body.district,
        password:req.body.password,
        specialization:req.body.specialization,
        qualification:req.body.qualification,
        experience:req.body.experience,
        affiliationnumber:req.body.affiliationnumber,
        hospitalid:req.params.id,
        image:req.file,
        fromtime:req.body.fromtime,
      totime:req.body.totime,
      days:req.body.availabledays,
    })
    newDoctor.save().then(data=>{
        res.json({
            status:200,
            msg:"Inserted successfully",
            data:data
        })
    }).catch(err=>{
      if(err.code==11000){
        return res.json({
           status:409,
           msg:"Mail Id already in Use",
           Error:err
       })
       }
        res.json({
            status:500,
            msg:"Data not Inserted",
            Error:err
        })
    })
}
// Registration -- finished

//Login  
const loginDoctor=(req,res)=>{
    const email=req.body.email
    const password=req.body.password
  
    doctors.findOne({email:email}).exec().then(data=>{
      if(data.length>0){
      if(password==data.password){
        res.json({
          status:200,
          msg:"Login successfully",
          data:data
      })
    }else{
      res.json({
        status:401,
        msg:"password Mismatch",
        
    })
    }
  }
  else{
    res.json({
      status:401,
      msg:"No User Found",
      
  })
  }
    
  }).catch(err=>{
  res.json({
      status:500,
      msg:"Internal server error",
      Error:err
  })
  })
    };
  
  
  //Login  --finished
  
  
  //View all 
  
  const viewDoctors=(req,res)=>{
    doctors.find({isactive:true}).exec()
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
  

  const viewDoctorsByHospitalId=(req,res)=>{
    doctors.find({hospitalid:req.params.id}).exec()
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
  


  // view  finished
  
  
  //update  by id
  const editDoctorById=(req,res)=>{
  
    
      
    doctors.findByIdAndUpdate({_id:req.params.id},{
      name:req.body.name,
      email:req.body.email,
      city:req.body.city,
      pincode:req.body.pincode,
      contact:req.body.contact,
      district:req.body.district,
      specialization:req.body.specialization,
      qualification:req.body.qualification,
      experience:req.body.experience,
      fromtime:req.body.fromtime,
      totime:req.body.totime,
      days:req.body.days,

      image:req.file
      })
  .exec().then(data=>{
    res.json({
        status:200,
        msg:"Updated successfully"
    })
  }).catch(err=>{
    
    res.json({
        status:500,
        msg:"Data not Updated",
        Error:err
    })
  })
  }
// view  by id
  const viewDoctorById=(req,res)=>{
    doctors.findById({_id:req.params.id}).exec()
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }
  
  const deleteDoctorById=(req,res)=>{

    doctors.findByIdAndDelete({_id:req.params.id}).exec()
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data removed successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }
  //forgotvPawd  by id
  const forgotPwd=(req,res)=>{
  
    
      
    doctors.findOneAndUpdate({email:req.body.email},{
     
      password:req.body.password
      })
  .exec().then(data=>{
    if(data!=null)
    res.json({
        status:200,
        msg:"Updated successfully"
    })
    else
    res.json({
      status:500,
      msg:"doctors Not Found"
     
  })
  }).catch(err=>{
    console.log(err);
    res.json({
        status:500,
        msg:"Data not Updated",
        Error:err
    })
  })
  }
  
// view doctors by specialization

const viewDoctorBySpecialization=(req,res)=>{
  doctors.find({specialization:req.params.specialization}).exec()
  .then(data=>{
    console.log(data);
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  
}).catch(err=>{
  console.log(err);
    res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
    })
})

}


const checkDay=(req,res)=>{
  const requestedDate = req.body.date;


  const [year, month, day] = requestedDate.slice(0,11).split('-');
  const dateObject = new Date(year, month - 1, day);
  const dayOfWeek = dateObject.getDay();
  console.log(dayOfWeek);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get the name of the day from the array using the day of the week index
    const requestedDayOfWeek = daysOfWeek[dayOfWeek];
    console.log(requestedDayOfWeek);

  doctors.findById({_id:req.params.id}).exec()
  .then(data=>{
console.log(data.days);
if(data.days.includes(requestedDayOfWeek)){
res.json({
        status:200,
        msg:"date available"
    })
  }
    else{
      res.json({
        status:401,
        msg:"date not available"
    })
    }
  
}).catch(err=>{
  console.log(err);
    res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
    })
})

}



module.exports={
  addDoctor,
  viewDoctors,
  editDoctorById,
  loginDoctor,
  forgotPwd,
  viewDoctorById,
  deleteDoctorById,
  upload,
  viewDoctorsByHospitalId,
  viewDoctorBySpecialization,
  checkDay
}