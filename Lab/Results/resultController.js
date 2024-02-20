
const booking = require('../Booking/bookingSchema')
const results = require('./resultSchema')
const testSchema = require('../LabTests/testSchema')
let mongoose = require('mongoose')



const addResult = async (req, res) => {

    let date = new Date()
    let needcomment = false
    let comment = "Everything is Normal, Have a Nice Day"

    let newres = [{
        description: '',
        value: 0,
        deviation: 0,
        problem: false
    }]
    let result = [{
        description: '',
        value: 0,
        deviation: 0,
        problem: false
    }]


    let deviation = 0
    result = req.body.resultdata
    let details = []
    await testSchema.findById({ _id: req.body.testid }).exec().then(data1 => {
        details = data1.details

    }).catch(err => {
        console.log("err in test finding");
    })

    console.log("details", details);
    console.log("details", result);

    for (let i = 0; i < details.length; i++) {
        console.log(details[i].minrange, "min", "max", details[i].maxrange, "val", result[i].value);
        if (details[i].minrange > result[i].value || details[i].maxrange < result[i].value) {
            console.log("deviation");
            deviation = 1
            result[i].deviation=1
            comment = "Please consult a doctor as you have some variations with your reports."
        }
    }

    const newUser = new results({
        userid: req.body.userid,
        bookingid: req.body.bookingid,
        staffid: req.body.staffid,
        comments: comment,
        testid: req.body.testid,
        date: date,
        resultdata: result

    })
    await newUser.save().then(data => {
        booking.findByIdAndUpdate({ _id: req.body.bookingid }, { result: true }).then(datas => {
            res.json({
                status: 200,
                msg: "Inserted successfully",
                data: data
            })
        })
            .catch(err => {
                console.log(err);
                res.json({
                    status: 500,
                    msg: "Data not Inserted",
                    Error: err
                })
            })

    }).catch(err => {
        console.log(err);

        res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err
        })
    })


}


//View  Result by ID

const viewResultById = (req, res) => {
    results.findOne({ _id: req.params.id }).
        populate('bookingid').
        populate('userid').
        populate('testid').exec()
        .then(data => {
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


//View  booking by booking id

const viewResultByBookingId = (req, res) => {
    let bookingid = req.params.id

    results.find({ bookingid: bookingid }).
        populate('userid').

        populate('testid')

    .exec().then(data => {
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



const viewResultByUserId = async (req, res) => {
    results.find({ userid: req.params.id }).populate('testid').exec().then(data => {
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


module.exports = {
    addResult,
    viewResultByBookingId,
    viewResultByUserId,
    viewResultById
}
