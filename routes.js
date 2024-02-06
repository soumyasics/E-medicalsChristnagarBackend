const express=require('express')
const router=express.Router()

const userController=require('./User/userController')
const HospitalController=require('./Hospital/hospitalController')


//user routes
router.post('/registerUser',userController.upload,userController.registerUser)
router.post('/loginUser',userController.loginUser)
router.post('/viewUserById/:id',userController.viewUserById)
router.post('/viewUsers',userController.viewUsers)
router.post('/editUserById/:id',userController.editUserById)
router.post('/deleteUserById/:id',userController.deleteUserById)
router.post('/forgotPwdUser',userController.forgotPwd)


//user routes
router.post('/registerHospital',HospitalController.upload,HospitalController.registerHospital)
router.post('/loginHospital',HospitalController.loginHospital)
router.post('/viewHospitalById/:id',HospitalController.viewHospitalById)
router.post('/viewHospitals',HospitalController.viewHospitals)
router.post('/editHospitalById/:id',HospitalController.editHospitalById)
router.post('/deleteHospitalById/:id',HospitalController.deleteHospitalById)
router.post('/forgotPwdHospital',HospitalController.forgotPwd)
module.exports=router