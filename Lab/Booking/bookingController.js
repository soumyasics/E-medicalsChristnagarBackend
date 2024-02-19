const booking = require('./bookingSchema')
let mongoose = require('mongoose')

const addBooking = (req, res) => {

    const newBooking = new booking({
        userid: req.body.userid,
        testid: req.body.testid,
        comments: req.body.comments,
        time: req.body.time,
        date: req.body.date,
        approvedByLab: 'Pending'
    })
    newBooking.save().then(data => {
        res.json({
            status: 200,
            msg: "Inserted successfully",
            data: data

        })
    }).catch(err => {
        res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err
        })
    })
}



//View all Bookings by Admin

const viewBookings = (req, res) => {

    booking.find({approvedByLab:'Pending'}).populate('userid').populate('testid').exec()
        .then(data => {
            emps = data
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                })
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained "
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            })
        })

}

// view  finished


//View  booking by ID

const viewBookingById = (req, res) => {
    booking.findOne({ _id: req.params.id })
        .populate('userid')
        .populate('testid')
        .exec()
        .then(data => {
            emps = data
            console.log(data);
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            })

        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            })
        })

}






const viewBookingByUserId = async (req, res) => {
    booking.find({ userid: req.params.id, isactive: true }).populate('labId').populate('testid').exec().then(data => {
        res.json({
            status: 200,
            data: data
        })
    }).catch(err => {
        res.json({
            status: 500,
            err: err
        })
    })


}


const viewPendingBookingsByUserId = async (req, res) => {
    booking.find({userid:req.params.id,approvedByLab:"Pending"})
    .populate('userid')
    .populate('testid')
    .exec()
    .then(data => {
        res.json({
            status: 200,
            data: data
        })
    }).catch(err => {
        res.json({
            status: 500,
            err: err
        })
    })


}
const viewApprovedBookingsByUserId = async (req, res) => {
    booking.find({userid:req.params.id,approvedByLab:"Approved"}) .populate('userid')
    .populate('testid').exec().then(data => {
        res.json({
            status: 200,
            data: data
        })
    }).catch(err => {
        res.json({
            status: 500,
            err: err
        })
    })


}
const viewApprovedBookings = async (req, res) => {
    booking.find({approvedByLab:"Approved"}) .populate('userid')
    .populate('testid').exec().then(data => {
        res.json({
            status: 200,
            data: data
        })
    }).catch(err => {
        res.json({
            status: 500,
            err: err
        })
    })


}


const approveBookingById = async (req, res) => {
    booking.findByIdAndUpdate({_id:req.params.id},{approvedByLab:"Approved"}).exec().then(data => {
        res.json({
            status: 200,
            data: data
        })
    }).catch(err => {
        res.json({
            status: 500,
            err: err
        })
    })


}

const rejectBookingById = async (req, res) => {
    booking.findByIdAndUpdate({_id:req.params.id},{approvedByLab:"Rejected"}).exec().then(data => {
        res.json({
            status: 200,
            data: data
        })
    }).catch(err => {
        res.json({
            status: 500,
            err: err
        })
    })


}

const deleteBookingById = (req, res) => {
    let date = new Date()
    let flag = 0
    booking.findById({ _id: req.params.id }).exec().then(data2 => {
        d = new Date(data2.date)
        console.log(((d.getMonth())), date.getMonth())
        if ((((d.getMonth())) > date.getMonth()))
            flag = 1
        else if (((((d.getMonth())) == date.getMonth())) && d.getDate() > date.getDate())
            flag = 1
        if (flag == 1) {
            booking.findByIdAndDelete({ _id: req.params.id }).exec()
                .then(data1 => {
                    res.json({
                        status: 200,
                        msg: "Booking Cancelled"
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        status: 500,
                        msg: "No Data obtained",
                        Error: err
                    })
                })
        }
        else {

            res.json({
                status: 200,
                msg: "Can't be deleted as Date Over"

            })
        }
    }).catch(err => {
        console.log(err);
        res.json({
            status: 500,
            msg: "No Data obtained",
            Error: err
        })
    })
}



module.exports = {
    addBooking,
    viewBookingById,
    viewBookings,
    viewBookingByUserId,
    deleteBookingById,
    rejectBookingById,
    viewPendingBookingsByUserId,
    viewApprovedBookings,
    approveBookingById,
    viewApprovedBookingsByUserId
}
