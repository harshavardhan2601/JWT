const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
var signup = require('../models/signup')
var session = require('express-session');
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');
var VerifyToken = require('../auth/VerifyToken');


router.post('/signdata' ,function (req,res,next) {
    var reqs = req.body
    console.log(reqs)
    var newobj ={
        username: reqs.username,
        password: reqs.password,
        email:reqs.email,
        first_name : reqs.first_name,
        last_name : reqs.last_name
    }
    mongoose.model('signup').create(newobj, function (err,signupobj) {
        if (err) {
            console.log(err);
        } else {
            console.log(signupobj)
            console.log('successfully')
            res.json(signupobj)
        }
    } )
})

router.post('/logindata', function (req,res,next) {
    var reqs = req.body
    console.log(reqs);
    mongoose.model('signup').findOne({username:reqs.username,password:reqs.password}, function (err,signup) {
        if (err) {
            console.log(err)
        } else {
            if (signup != null) {
                //set the sessions in
                req.session.login_Obj = signup;
                req.session.user_id = signup._id;
                console.log(req.session.login_Obj);
                console.log(req.session.user_id);
                //TOKEN VERIFICATIONS
                const payload = {
                    _id: signup._id,
                    username: signup.username,
                    password: signup.password,
                    email:signup.email,
                    first_name : signup.first_name,
                    last_name : signup.last_name
                  }
                console.log('checking ' + payload);
                token = jwt.sign(payload, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                console.log(token)
                res.cookie('x_access_token', token);
                res.cookie('auth', true)
                res.json(token)
            } else {
                
            }
            // res.cookie('data', signup);
            // console.log(signup)
            // res.json(signup)
        }
    })
})

router.get('/profile', function (req,res,next) {
    var decoded = jwt.verify(req.headers['authorization'], config.secret) 
    console.log(decoded)
    console.log(req.session.user_id)
    if (decoded._id) {
        mongoose.model('signup').findById({_id: decoded._id}, function (err,signupObj) {
            if (err) {
                console.log(err)
            } else {
                console.log(signupObj)
                res.json(signupObj)
            }
        })
    } 
});


module.exports = router;