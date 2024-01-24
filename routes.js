const express=require('express')
const router=express.Router()

const userController=require('./User/userController')

//user routes
router.post('/registerUser',userController.upload,userController.registerUser)
router.post('/loginUser',userController.loginUser)
router.post('/viewUserById/:id',userController.viewUserById)
router.post('/viewUsers',userController.viewUsers)
router.post('/editUserById/:id',userController.editUserById)
router.post('/editUserById/:id',userController.deleteUserById)
router.post('/forgotPwdUser',userController.forgotPwd)


module.exports=router