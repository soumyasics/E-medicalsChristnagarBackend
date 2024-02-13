const express=require('express')
const router=express.Router()

const userController=require('./User/userController')
const HospitalController=require('./Hospital/hospitalController')
const test=require('./Lab/LabTests/testController')


//user routes
router.post('/registerUser',userController.upload,userController.registerUser)
router.post('/loginUser',userController.loginUser)
router.post('/viewUserById/:id',userController.viewUserById)
router.post('/viewUsers',userController.viewUsers)
router.post('/editUserById/:id',userController.editUserById)
router.post('/deleteUserById/:id',userController.deleteUserById)
router.post('/forgotPwdUser',userController.forgotPwd)


//hospital routes
router.post('/registerHospital',HospitalController.upload,HospitalController.registerHospital)
router.post('/loginHospital',HospitalController.loginHospital)
router.post('/viewHospitalById/:id',HospitalController.viewHospitalById)
router.post('/viewHospitals',HospitalController.viewHospitals)
router.post('/editHospitalById/:id',HospitalController.editHospitalById)
router.post('/deleteHospitalById/:id',HospitalController.deleteHospitalById)
router.post('/forgotPwdHospital',HospitalController.forgotPwd)

//test
router.post('/addTest',test.addTest)//done
router.post('/deleteTestById/:id',test.deleteTestById)//done
router.post('/viewTestById/:id',test.viewTestById)//done
router.post('/editTestById/:id',test.ediTestById)//done
router.post('/viewAllTests',test.viewTests)
router.post('/viewTestByLabId/:id',test.viewTestByLabId)


module.exports=router