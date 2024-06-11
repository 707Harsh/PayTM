const mongoose = require('mongoose');
mongoose.connect('connectionStringHere/paytm');
// add the connection string above

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
        minLength : 4,
        maxLength : 30
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    }
})

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,     // reference to user table  (foreign key like thing of SQL)
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User',userSchema);
module.exports = { User, Account };




/*In the real world we should't use float to store balance in the database. We usually store an integer which 
represents the INR value in decimal places, for ex: if we want to store 33.33 then in our database we will 
store 3333 and we know that our database contains integer with two decimal places hence while showing output 
to the user we will add decimal before two interger places and show it like 33.33

This is actually done to get rid of precision errors which we might face if we store balances in float form.
As in some cases 88.8777 might get rounded off to 88.88 and in real world scenarios we can't afford such
rounding off as it will result in false data. */