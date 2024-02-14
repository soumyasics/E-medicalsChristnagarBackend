const express=require('express')
const router=express.Router()

const userController=require('./User/userController')
const HospitalController=require('./Hospital/hospitalController')


//user routes
router.post('/registerUser',userController.upload,userController.registerUser)//done
router.post('/loginUser',userController.loginUser)//done
router.post('/viewUserById/:id',userController.viewUserById)//done
router.post('/viewUsers',userController.viewUsers)
router.post('/editUserById/:id',userController.upload,userController.editUserById)
router.post('/deleteUserById/:id',userController.deleteUserById)
router.post('/forgotPwdUser',userController.forgotPwd)//done


//user routes
router.post('/registerHospital',HospitalController.upload,HospitalController.registerHospital)//done
router.post('/loginHospital',HospitalController.loginHospital)//done
router.post('/viewHospitalById/:id',HospitalController.viewHospitalById)//done
router.post('/viewHospitals',HospitalController.viewHospitals)
router.post('/editHospitalById/:id',HospitalController.upload,HospitalController.editHospitalById)
router.post('/deleteHospitalById/:id',HospitalController.deleteHospitalById)
router.post('/forgotPwdHospital',HospitalController.forgotPwd)//done
module.exports=router