const express = require('express');
const http = require('http');
const multer = require('multer');
const user = express.Router();
const bcrypt = require("bcrypt");
const webToken = require("jsonwebtoken");
const bodyParser = express.json();
const mongoose = require("mongoose");
const User = require("./userSchema");

mongoose
.connect(
   "mongodb+srv://LoWeiBen:OnolSCbqAGPUxA3l@testcluster-0d17r.mongodb.net/reactProject?retryWrites=true", { useNewUrlParser: true })
//console logs if connection is successful
.then(() => {
  console.log("Connected to User Database!");
})
//console logs if it fails
.catch(() => {
  console.log("Connection failed!");
});

user.use(bodyParser);

user.post('/signup', (req, res, next) =>
{
  console.log("front end input: "+req.body);
  User.findOne({"username": req.body.user})
  .then(input => {
    console.log("output from database: "+input);
    if(!input)
    {
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        console.log("this is the hashed password: "+hash);
        const users = new User(
          {
            username: req.body.user,
            password: hash,
            firstName: req.body.fName,
            lastName: req.body.lName,
            //djoin: req.body.djoin,
            //image: req.body.image
            unhashed: req.body.password
          });
        users
        .save()
        .then(createdPost => {
          console.log("Successfully added!");
          return res.status(201).json({
            message: "User successfully added!",
            post_id: createdPost._id,
          });
        });
      });
    }
    else
    {
      console.log("Error: Username already exists!");
      return res.satus(201).json({
        message: "Error: User already exists!"
      });
    }
  });
})

user.post('/login', (req, res, next) =>
{
  let userInfo;
  console.log("incoming request: "+req.body);
  User.findOne({"username": req.body.user})
  .then(input => {
    if(!input)
    {
      console.log("Error: User does not exist!");
      return res.status(401).json({
        message: "Error: User does not exist!"
      });
    }
    userInfo = input
    console.log("Input Password: "+req.body.password+"\n"+"Output Hashed: "+input.password);
    return bcrypt.compare(req.body.password, input.password);
  })
  .then(result => {
    console.log("Does it match? "+result);
    if(!result)
    {
      return res.status(401).json({
        message: "Authorization failed"
      });
    }
    const token = webToken.sign(
      { username: userInfo.username, userId: userInfo._id },
      "secret_encode_status_monkey_see_monkey_do_cieling_fans_delta_probably_spelled_cieling_wrong_oh_well",
      { expiresIn: "1 hr" }
    );
    res.status(200).json({
      token: token,
      expiresIn: 1000,
      userId: userInfo._id,
      message: "delivery!"
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Failure, Try again!"
    });
  });
});

/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid)
    {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = fiel.orginalname
    .toLowerCase()
    .split(" ")
    .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

getImageData(storage, link)
{
  multer({});
}*/

module.exports = user;
