const express=require('express')
const router=express.Router()

const userController=require('./User/userController')
const HospitalController=require('./Hospital/hospitalController')
const test=require('./Lab/LabTests/testController')
const booking=require('./Lab/Booking/bookingController')
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
router.post('/addTest',test.addTest)
router.post('/deleteTestById/:id',test.deleteTestById)
router.post('/viewTestById/:id',test.viewTestById)
router.post('/editTestById/:id',test.ediTestById)
router.post('/viewAllTests',test.viewTests)
router.post('/viewTestByLabId/:id',test.viewTestByLabId)


//booking
router.post('/addBooking',booking.addBooking)
router.post('/viewBookingById/:id',booking.viewBookingById)
router.post('/viewBookings',booking.viewBookings)
router.post('/viewBookingByUserId/:id',booking.viewBookingByUserId)
router.post('/deleteBookingById/:id',booking.deleteBookingById)
router.post('/rejectBookingById/:id',booking.rejectBookingById)
router.post('/viewPendingBookingsByUserId/:id',booking.viewPendingBookingsByUserId)
router.post('/viewPendingBookingsByUserId/:id',booking.viewPendingBookingsByUserId)
router.post('/viewApprovedBookingsByUserId/:id',booking.viewApprovedBookingsByUserId)

router.post('/viewApprovedBookings',booking.viewApprovedBookings)
router.post('/approveBookingById/:id',booking.approveBookingById)


module.exports=router