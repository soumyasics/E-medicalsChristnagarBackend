const appointmentSchema = require("../DoctorAppointments/appointmentSchema");
const prescriptionSchema = require("../Doctors/Prescriptions/prescriptionSchema");
const resultSchema = require("../Lab/Results/resultSchema");
const users = require("./userSchema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");
//User Registration

const registerUser = (req, res) => {
  const newUser = new users({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    housename: req.body.housename,
    email: req.body.email,
    city: req.body.city,
    pincode: req.body.pincode,
    contact: req.body.contact,
    district: req.body.district,
    password: req.body.password,
    dob: req.body.dob,
    gender: req.body.gender,
    image: req.file,
  });
  newUser
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      if(err.code==1100){
       return res.json({
          status:409,
          msg:"Mail Id already in Use",
          Error:err
      })
      }
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
//User Registration -- finished

//Login User
const loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  users
    .findOne({ email: email })
    .exec()
    .then((data) => {
      if (password == data.password) {
        res.json({
          status: 200,
          msg: "Login successfully",
          data: data,
        });
      } else {
        res.json({
          status: 500,
          msg: "password Mismatch",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "User not found",
        Error: err,
      });
    });
};

//Login User --finished

//View all Users

const viewUsers = (req, res) => {
  users
    .find()
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

// view Users finished

//update User by id
const editUserById = (req, res) => {
  users
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        housename: req.body.housename,
        email: req.body.email,
        city: req.body.city,
        pincode: req.body.pincode,
        contact: req.body.contact,
        district: req.body.district,
        dob: req.body.dob,
        image:req.file
      }
    )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};
// view cust by id
const viewUserById = (req, res) => {
  users
    .findOne({ _id: req.params.id })
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const deleteUserById = (req, res) => {
  users
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data removed successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
//forgotvPawd User by id
const forgotPwd = (req, res) => {
  users
    .findOneAndUpdate(
      { email: req.body.email },
      {
        password: req.body.password,
      }
    )
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully",
        });
      else
        res.json({
          status: 500,
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};


const viewMedicalhistory=async(req,res)=>{
  let appointments=[],labreports=[],prescriptions=[]
 await appointmentSchema.find({userid:req.params.id})
  .populate('doctorid')
  .populate('hospitalid')
  .exec()
  .then((data) => {
    console.log(data);
    appointments=data
  })
  .catch((err) => {
    console.log(err);
    
  });
  await prescriptionSchema.find({userid:req.params.id})
  .populate('doctorid')
  .exec()
  .then((datass) => {
    console.log(datass);
    prescriptions=datass
  })
  .catch((err) => {
    console.log(err);
    
  });


  await resultSchema.find({userid:req.params.id})
  .populate('testid')
  .exec()
  .then((datas) => {
    console.log(datas);
    labreports=datas
  })
  .catch((err) => {
    console.log(err);
    
  });
  res.json({
    status: 200,
        msg: "Data obtained successfully",
        labreports,
        appointments,
        prescriptions
  })
}
module.exports = {
  registerUser,
  viewUsers,
  editUserById,
  loginUser,
  forgotPwd,
  viewUserById,
  deleteUserById,
  upload,
viewMedicalhistory
};
