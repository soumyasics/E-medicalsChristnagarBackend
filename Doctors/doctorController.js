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
//Hospital Registration 

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
        image:req.file
    })
    newDoctor.save().then(data=>{
        res.json({
            status:200,
            msg:"Inserted successfully",
            data:data
        })
    }).catch(err=>{
   
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
  
    Hospitals.findOne({email:email}).exec().then(data=>{
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
      msg:"password Mismatch",
      
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
  
  // view Hospitals finished
  
  
  //update Hospital by id
  const editHospitalById=(req,res)=>{
  
    
      
    Hospitals.findByIdAndUpdate({_id:req.params.id},{
        name:req.body.tname,
        email:req.body.email,
        city:req.body.city,
        pincode:req.body.pincode,
        contact:req.body.contact,
        district:req.body.district,
        regno:req.body.regno,
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
// view cust by id
  const viewHospitalById=(req,res)=>{
    Hospitals.findOne({_id:req.params.id}).exec()
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
  
  const deleteHospitalById=(req,res)=>{

    Hospitals.findByIdAndDelete({_id:req.params.id}).exec()
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
  //forgotvPawd Hospital by id
  const forgotPwd=(req,res)=>{
  
    
      
    Hospitals.findOneAndUpdate({email:req.body.email},{
     
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
      msg:"Hospital Not Found"
     
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
  



module.exports={
  registerHospital,
  viewHospitals,
  editHospitalById,
  loginHospital,
  forgotPwd,
  viewHospitalById,
  deleteHospitalById,
  upload
}