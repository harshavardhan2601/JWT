var mongoose = require("mongoose");
var signupselectSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    first_name:String,
    last_name:String,
    create_date: {
        type: Date,
        default: Date.now
      },
    
});

mongoose.model("signup", signupselectSchema );