const express=require('express')
const router=express.Router()

const userController=require('./User/userController')
const HospitalController=require('./Hospital/hospitalController')
const test=require('./Lab/LabTests/testController')
const booking=require('./Lab/Booking/bookingController')
const result=require('./Lab/Results/resultController')
const doctor=require('./Doctors/doctorController')

//user routes
router.post('/registerUser',userController.upload,userController.registerUser)//done
router.post('/loginUser',userController.loginUser)//done
router.post('/viewUserById/:id',userController.viewUserById)//done
router.post('/viewUsers',userController.viewUsers)
router.post('/editUserById/:id',userController.upload,userController.editUserById)
router.post('/deleteUserById/:id',userController.deleteUserById)
router.post('/forgotPwdUser',userController.forgotPwd)//done


//hopital routes
router.post('/registerHospital',HospitalController.upload,HospitalController.registerHospital)//done
router.post('/loginHospital',HospitalController.loginHospital)//done
router.post('/viewHospitalById/:id',HospitalController.viewHospitalById)//done
router.post('/viewHospitals',HospitalController.viewHospitals)
router.post('/editHospitalById/:id',HospitalController.upload,HospitalController.editHospitalById)
router.post('/deleteHospitalById/:id',HospitalController.deleteHospitalById)
router.post('/forgotPwdHospital',HospitalController.forgotPwd)


//Doctor routes
router.post('/addDoctor/:id',doctor.upload,doctor.addDoctor)
router.post('/loginDoctor',doctor.loginDoctor)
router.post('/viewDoctorById/:id',doctor.viewDoctorById)
router.post('/viewDoctors',doctor.viewDoctors)
router.post('/editDoctorById/:id',doctor.upload,doctor.editDoctorById)
router.post('/deleteDoctorById/:id',doctor.deleteDoctorById)
router.post('/forgotPwdDoctor',doctor.forgotPwd)
router.post('/viewDoctorsByHospitalId/:id',doctor.viewDoctorsByHospitalId)

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


//results
router.post('/addResult',result.addResult)
router.post('/viewResultByBookingId/:id',result.viewResultByBookingId)
router.post('/viewResultById/:id',result.viewResultById)
router.post('/viewResultByUserId/:id',result.viewResultByUserId)


module.exports=router