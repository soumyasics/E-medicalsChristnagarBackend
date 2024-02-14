

const tests=require('./testSchema')


//add test
const addTest=async(req,res)=>{




    const { name, price, condition, duration, comments, details } = req.body;
    const newTest = new tests({
      name,
      price,
      condition,
      duration,
      comments,
      details, 
    });

    await newTest.save()
    .then(data=>{
        res.json({
            status:200,
            msg:"Inserted successfully",
            data:data
        })
    }).catch(err=>{
      console.log(err);
        res.json({
            status:500,
            msg:"Data not Inserted",
            Error:err
        })
    })
}



//View all Tests

const viewTests=(req,res)=>{

    tests.find().exec()
  .then(data=>{
    
    if(data.length>0){
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  }else{
    res.json({
      status:200,
      msg:"No Data obtained "
  })
  }
}).catch(err=>{
  console.log(err);
    res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
    })
})

}

// view Tests finished


//update Labs by id
const ediTestById=(req,res)=>{

  tests.findByIdAndUpdate({_id:(req.params.id)},{
    name:req.body.name,
        price:req.body.price,
        condition:req.body.condition,
        duration:req.body.duration,
        comments:req.body.comments,
   details:req.body.details
 
    })
.exec().then(data1=>{
  res.json({
      status:200,
      msg:"Updated successfully"
  })
}).catch(err=>{
  res.json({
      status:500,
      msg:"Data not Updated",
      Error:err
  })
})
}
//View  Lab by ID

const viewTestById=(req,res)=>{
  tests.findOne({_id:req.params.id}).exec()
  .then(data=>{
    console.log(data);
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  
}).catch(err=>{
  console.log(err);
    res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
    })
})

}

//Delete  Lab by ID

const deleteTestById=(req,res)=>{
  tests.findByIdAndDelete({_id:req.params.id}).exec()
  .then(data=>{

    console.log(data);
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  
}).catch(err=>{
  console.log(err);
    res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
    })
})
}


const viewTestByLabId=(req,res)=>{
    tests.find({labId:req.params.id}).exec()
    .then(data=>{
  
      console.log(data);
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
}
module.exports={addTest,
    deleteTestById,
    viewTestById,
    viewTests,
    ediTestById,
    viewTestByLabId}