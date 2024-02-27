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
        count:req.body.count
    })
    
    newMed.save().then(data=>{
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
  

module.exports={
    addMedicine,
    viewmedicines
}