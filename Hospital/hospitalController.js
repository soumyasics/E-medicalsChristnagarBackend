const Hospitals=require('./hospitalSchema')
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

const registerHospital=(req,res)=>{


    const newHospital=new Hospitals({
        name:req.body.name,
        email:req.body.email,
        city:req.body.city,
        pincode:req.body.pincode,
        contact:req.body.contact,
        district:req.body.district,
        password:req.body.password,
        regno:req.body.regno,
        image:req.file
    })
    newHospital.save().then(data=>{
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
//Hospital Registration -- finished

//Login Hospital 
const loginHospital=(req,res)=>{
    const email=req.body.email
    const password=req.body.password
  
    Hospitals.findOne({email:email}).exec().then(data=>{
      if(password==data.password){
        res.json({
          status:200,
          msg:"Login successfully",
          data:data
      })
    }else{
      res.json({
        status:500,
        msg:"password Mismatch",
        
    })
    }
    
  }).catch(err=>{
  res.json({
      status:500,
      msg:"Hospital not found",
      Error:err
  })
  })
    };
  
  
  //Login Hospital --finished
  
  
  //View all Hospitals
  
  const viewHospitals=(req,res)=>{
    Hospitals.find().exec()
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