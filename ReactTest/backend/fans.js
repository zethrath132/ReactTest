const express = require('express');
const http = require('http');
const app = express();
const multer = require('multer');
const fans = express.Router();
const bodyParser = express.json();
const mongoose = require("mongoose");
const Fan = require("./fanSchema");

mongoose
.connect(
   "mongodb+srv://LoWeiBen:OnolSCbqAGPUxA3l@testcluster-0d17r.mongodb.net/reactProject?retryWrites=true", { useNewUrlParser: true })
//console logs if connection is successful
.then(() => {
  console.log("Connected to Product Database!");
})
//console logs if it fails
.catch(() => {
  console.log("Connection failed!");
});

fans.use(bodyParser);

fans.get('/getfans',(req,res,next)=>
{
  console.log(req.body);
  Fan.find({}).then(input =>
  {
   console.log(input);
   let responseArr = input;
    return res.status(200).json({
      message:"success",
      input:responseArr
    });
  });
});

fans.post('/addFan',(req,res,next)=>
{
  console.log(req.body);
  const fan = new Fan({
    fanName: req.body.fanName,
    fanSpecs: req.body.fanSpecs,
    pastSpecs: req.body.pastSpecs
  });
  console.log('middle'+fan);
  fan
  .save()
  .then(createdPost =>{
    return res.status(201).json(
      {
        message:"Product Data added properly!",
        post_id: createdPost._id
      });
  });
});

// attempting to add new columns to the existing db
// post.post('/addCols', (req, res, next) =>
// {
//   for (let i = 0; i < req.body.length; i++)
//   {
//     posts.aggregate([
//       {
//         $addFields : { "$req.body.fieldName" : "$req.body.typeDrop" }
//       }
//     ]);
//     posts
//     .save()
//     .then (() => {
//       return res.status(201).json (
//         {
//           message: "Columns added"
//         }
//       );
//     });
//   }
// });

module.exports = fans;
