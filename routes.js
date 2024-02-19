const express=require('express')
const router=express.Router()

const userController=require('./User/userController')
const HospitalController=require('./Hospital/hospitalController')
const test=require('./Lab/LabTests/testController')
const booking=require('./Lab/Booking/bookingController')
//user routes
router.post('/registerUser',userController.upload,userController.registerUser)//done
router.post('/loginUser',userController.loginUser)//done
router.post('/viewUserById/:id',userController.viewUserById)//done
router.post('/viewUsers',userController.viewUsers)
router.post('/editUserById/:id',userController.upload,userController.editUserById)//done
router.post('/deleteUserById/:id',userController.deleteUserById)
router.post('/forgotPwdUser',userController.forgotPwd)//done


//user routes
router.post('/registerHospital',HospitalController.upload,HospitalController.registerHospital)//done
router.post('/loginHospital',HospitalController.loginHospital)//done
router.post('/viewHospitalById/:id',HospitalController.viewHospitalById)//done
router.post('/viewHospitals',HospitalController.viewHospitals)
router.post('/editHospitalById/:id',HospitalController.upload,HospitalController.editHospitalById)//done
router.post('/deleteHospitalById/:id',HospitalController.deleteHospitalById)
router.post('/forgotPwdHospital',HospitalController.forgotPwd)//done

//test
router.post('/addTest',test.addTest)//done
router.post('/deleteTestById/:id',test.deleteTestById)//done
router.post('/viewTestById/:id',test.viewTestById)//done
router.post('/editTestById/:id',test.ediTestById)//done
router.post('/viewAllTests',test.viewTests)//done
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